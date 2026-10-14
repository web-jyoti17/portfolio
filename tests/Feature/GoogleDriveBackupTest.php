<?php

namespace Tests\Feature;

use App\Filament\Pages\ManageDriveBackups;
use App\Models\GoogleDriveConnection;
use App\Models\User;
use App\Services\DatabaseDumpService;
use App\Services\DriveBackupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class GoogleDriveBackupTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.google_drive.client_id' => 'client-id',
            'services.google_drive.client_secret' => 'client-secret',
            'services.google_drive.redirect' => 'https://example.test/admin/integrations/google-drive/callback',
        ]);
    }

    public function test_the_callback_stores_the_connection(): void
    {
        $idToken = 'x.'.rtrim(strtr(base64_encode(json_encode(['email' => 'owner@example.com'])), '+/', '-_'), '=').'.y';

        Http::fake(['oauth2.googleapis.com/token' => Http::response([
            'access_token' => 'access', 'refresh_token' => 'refresh', 'expires_in' => 3600, 'id_token' => $idToken,
        ])]);

        $this->actingAs(User::factory()->create())
            ->withSession(['google_drive_state' => 'abc'])
            ->get('/admin/integrations/google-drive/callback?state=abc&code=the-code')
            ->assertRedirect();

        $connection = GoogleDriveConnection::current();
        $this->assertSame('owner@example.com', $connection->email);
        $this->assertSame('refresh', $connection->refresh_token);
        $this->assertNotSame('refresh', $connection->getRawOriginal('refresh_token'));
    }

    public function test_the_callback_rejects_a_wrong_state(): void
    {
        Http::fake();

        $this->actingAs(User::factory()->create())
            ->withSession(['google_drive_state' => 'abc'])
            ->get('/admin/integrations/google-drive/callback?state=evil&code=the-code')
            ->assertRedirect();

        $this->assertNull(GoogleDriveConnection::current());
        Http::assertNothingSent();
    }

    public function test_the_callback_needs_a_logged_in_admin(): void
    {
        $this->get('/admin/integrations/google-drive/callback?state=abc&code=x')->assertRedirect('/admin/login');
    }

    public function test_a_backup_uploads_three_files(): void
    {
        $this->mock(DatabaseDumpService::class)->shouldReceive('dump')->once()
            ->andReturnUsing(fn (string $path) => file_put_contents($path, gzencode("-- Dump completed\n")));

        GoogleDriveConnection::create([
            'refresh_token' => 'refresh', 'access_token' => 'access', 'access_token_expires_at' => now()->addHour(), 'folder_id' => 'folder',
        ]);

        Http::fake([
            'www.googleapis.com/drive/v3/files/folder*' => Http::response(['id' => 'folder', 'trashed' => false]),
            'www.googleapis.com/upload/drive/v3/files?uploadType=resumable' => Http::response([], 200, ['Location' => 'https://upload.test/session']),
            'upload.test/*' => Http::response(['id' => 'new-file']),
            'www.googleapis.com/drive/v3/files*' => Http::response(['files' => []]),
        ]);

        $names = app(DriveBackupService::class)->run();

        $this->assertCount(3, $names);
        $this->assertMatchesRegularExpression('/^blog-.+\.json$/', $names[0]);
        $this->assertMatchesRegularExpression('/^site-.+\.zip$/', $names[1]);
        $this->assertMatchesRegularExpression('/^database-.+\.sql\.gz$/', $names[2]);
        Http::assertSentCount(1 + 3 * 3 + 1); // folder check, (folder check + start + upload) per file, list for pruning
        Http::assertSent(fn (Request $request) => $request->url() === 'https://upload.test/session' && $request->hasHeader('Authorization', 'Bearer access'));
        $this->assertSame('success', GoogleDriveConnection::current()->last_backup_status);
    }

    public function test_the_admin_page_shows_the_connect_button(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(ManageDriveBackups::getUrl())
            ->assertOk()
            ->assertSee('Connect Google Drive')
            ->assertSee('What each backup contains');
    }
}
