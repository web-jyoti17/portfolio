<?php

namespace Tests\Feature;

use App\Filament\Resources\BlogPosts\Pages\EditBlogPost;
use App\Models\BlogPost;
use App\Models\User;
use App\Services\BlogTransferService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class DatabaseStorageTest extends TestCase
{
    use RefreshDatabase;

    private function png(): string
    {
        return UploadedFile::fake()->image('image.png', 40, 30)->getContent();
    }

    public function test_files_on_the_public_disk_are_saved_in_the_database(): void
    {
        $disk = Storage::disk('public');
        $disk->put('blog/demo/photo.png', $this->png());

        $this->assertDatabaseHas('stored_files', ['path' => 'blog/demo/photo.png', 'mime_type' => 'image/png']);
        $this->assertTrue($disk->exists('blog/demo/photo.png'));
        $this->assertSame(['blog/demo/photo.png'], $disk->allFiles());
        $this->assertSame(['blog'], $disk->directories());
        $this->assertStringEndsWith('/storage/blog/demo/photo.png', $disk->url('blog/demo/photo.png'));

        $disk->move('blog/demo/photo.png', 'blog/demo/renamed.png');
        $this->assertFalse($disk->exists('blog/demo/photo.png'));

        $disk->deleteDirectory('blog');
        $this->assertSame(0, DB::table('stored_files')->count());
    }

    public function test_stored_files_are_served_at_their_storage_url(): void
    {
        $png = $this->png();
        Storage::disk('public')->put('blog/demo/photo.png', $png);

        $response = $this->get('/storage/blog/demo/photo.png');

        $response->assertOk()->assertHeader('Content-Type', 'image/png');
        $this->assertSame($png, $response->getContent());
        $this->get('/storage/blog/demo/missing.png')->assertNotFound();
    }

    public function test_a_cover_uploaded_in_the_admin_is_saved_in_the_database(): void
    {
        $this->actingAs(User::factory()->create());
        $post = BlogPost::factory()->create();

        Livewire::test(EditBlogPost::class, ['record' => $post->getRouteKey()])
            ->set('data.cover_image', UploadedFile::fake()->image('cover.png', 120, 63))
            ->call('save')
            ->assertHasNoFormErrors();

        $path = $post->fresh()->cover_image;
        $this->assertStringStartsWith('blog/', $path);
        $this->assertDatabaseHas('stored_files', ['path' => $path]);
        $this->get('/storage/'.$path)->assertOk();
    }

    public function test_blog_export_and_import_keep_every_image(): void
    {
        $disk = Storage::disk('public');
        $disk->put('blog/demo/cover.png', $cover = $this->png());
        $disk->put('blog/demo/inline.png', $inline = $this->png());

        $post = BlogPost::factory()->create([
            'cover_image' => 'blog/demo/cover.png',
            'content' => '<p>Hi</p><img src="http://old-site.test/storage/blog/demo/inline.png">',
        ]);

        $transfer = app(BlogTransferService::class);
        $payload = $transfer->parse($transfer->toJson($transfer->export([$post])));

        $disk->deleteDirectory('blog');
        $post->delete();

        $transfer->import($payload);

        $this->assertSame($cover, $disk->get('blog/demo/cover.png'));
        $this->assertSame($inline, $disk->get('blog/demo/inline.png'));
        $this->assertStringContainsString('src="/storage/blog/demo/inline.png"', BlogPost::first()->content);
    }
}
