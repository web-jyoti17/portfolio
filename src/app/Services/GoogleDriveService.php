<?php

namespace App\Services;

use App\Models\GoogleDriveConnection;
use GuzzleHttp\Psr7\Utils;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Talks to the Google Drive API with the OAuth client from config/services.php.
 * Uses the drive.file scope: the site can only see the files and folder it created.
 */
class GoogleDriveService
{
    private const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

    private const TOKEN_URL = 'https://oauth2.googleapis.com/token';

    private const API = 'https://www.googleapis.com/drive/v3';

    private const UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3/files';

    private const FOLDER_MIME = 'application/vnd.google-apps.folder';

    public function isConfigured(): bool
    {
        return filled(config('services.google_drive.client_id'))
            && filled(config('services.google_drive.client_secret'))
            && filled(config('services.google_drive.redirect'));
    }

    public function authorizationUrl(string $state): string
    {
        return self::AUTH_URL.'?'.http_build_query([
            'client_id' => config('services.google_drive.client_id'),
            'redirect_uri' => config('services.google_drive.redirect'),
            'response_type' => 'code',
            'scope' => 'openid email https://www.googleapis.com/auth/drive.file',
            'access_type' => 'offline',
            'prompt' => 'consent',
            'include_granted_scopes' => 'true',
            'state' => $state,
        ]);
    }

    /**
     * Swap the code from the callback for tokens and remember the account.
     */
    public function connect(string $code): GoogleDriveConnection
    {
        $response = Http::asForm()->timeout(15)->post(self::TOKEN_URL, [
            'code' => $code,
            'client_id' => config('services.google_drive.client_id'),
            'client_secret' => config('services.google_drive.client_secret'),
            'redirect_uri' => config('services.google_drive.redirect'),
            'grant_type' => 'authorization_code',
        ]);

        if (! $response->successful() || ! $response->json('refresh_token')) {
            throw new RuntimeException('Google did not return a refresh token: '.($response->json('error_description') ?? $response->json('error') ?? 'HTTP '.$response->status()));
        }

        GoogleDriveConnection::query()->delete();

        return GoogleDriveConnection::create([
            'email' => $this->emailFromIdToken((string) $response->json('id_token')),
            'refresh_token' => $response->json('refresh_token'),
            'access_token' => $response->json('access_token'),
            'access_token_expires_at' => now()->addSeconds((int) $response->json('expires_in', 3600) - 60),
        ]);
    }

    public function disconnect(GoogleDriveConnection $connection): void
    {
        // Revoking is best effort; the local token is removed either way.
        Http::asForm()->timeout(10)->post('https://oauth2.googleapis.com/revoke', ['token' => $connection->refresh_token]);

        $connection->delete();
    }

    /**
     * Upload a local file into the backup folder and return its Drive id.
     */
    public function upload(GoogleDriveConnection $connection, string $path, string $name, string $mimeType): string
    {
        $session = $this->client($connection)
            ->withHeaders(['X-Upload-Content-Type' => $mimeType, 'X-Upload-Content-Length' => (string) filesize($path)])
            ->post(self::UPLOAD_API.'?uploadType=resumable', [
                'name' => $name,
                'parents' => [$this->folderId($connection)],
            ]);

        $location = $session->header('Location');

        if (! $session->successful() || $location === '') {
            throw new RuntimeException("Could not start the upload of {$name}: ".$this->error($session));
        }

        $upload = $this->client($connection)
            ->timeout(600)
            ->withBody(Utils::streamFor(fopen($path, 'rb')), $mimeType)
            ->put($location);

        if (! $upload->successful()) {
            throw new RuntimeException("Uploading {$name} failed: ".$this->error($upload));
        }

        return (string) $upload->json('id');
    }

    /**
     * Files in the backup folder, newest first.
     *
     * @return list<array{id: string, name: string, size: int, created_at: string, url: string|null}>
     */
    public function files(GoogleDriveConnection $connection): array
    {
        $response = $this->client($connection)->get(self::API.'/files', [
            'q' => sprintf("'%s' in parents and trashed = false", $this->folderId($connection)),
            'orderBy' => 'createdTime desc',
            'pageSize' => 200,
            'fields' => 'files(id,name,size,createdTime,webViewLink)',
        ]);

        if (! $response->successful()) {
            throw new RuntimeException('Could not list backups: '.$this->error($response));
        }

        return array_map(fn (array $file) => [
            'id' => $file['id'],
            'name' => $file['name'],
            'size' => (int) ($file['size'] ?? 0),
            'created_at' => $file['createdTime'],
            'url' => $file['webViewLink'] ?? null,
        ], $response->json('files', []));
    }

    public function delete(GoogleDriveConnection $connection, string $fileId): void
    {
        $this->client($connection)->delete(self::API.'/files/'.$fileId);
    }

    public function folderUrl(GoogleDriveConnection $connection): ?string
    {
        return $connection->folder_id ? 'https://drive.google.com/drive/folders/'.$connection->folder_id : null;
    }

    /**
     * The backup folder, created on first use and again if it was deleted in Drive.
     */
    private function folderId(GoogleDriveConnection $connection): string
    {
        if ($connection->folder_id) {
            $existing = $this->client($connection)->get(self::API.'/files/'.$connection->folder_id, ['fields' => 'id,trashed']);

            if ($existing->successful() && ! $existing->json('trashed')) {
                return $connection->folder_id;
            }
        }

        $created = $this->client($connection)->post(self::API.'/files?fields=id', [
            'name' => config('services.google_drive.folder', 'Portfolio Backups'),
            'mimeType' => self::FOLDER_MIME,
        ]);

        if (! $created->successful()) {
            throw new RuntimeException('Could not create the backup folder: '.$this->error($created));
        }

        $connection->update(['folder_id' => $created->json('id')]);

        return $connection->folder_id;
    }

    private function client(GoogleDriveConnection $connection): PendingRequest
    {
        return Http::withToken($this->accessToken($connection))->timeout(30)->acceptJson();
    }

    private function accessToken(GoogleDriveConnection $connection): string
    {
        if ($connection->access_token && $connection->access_token_expires_at?->isFuture()) {
            return $connection->access_token;
        }

        $response = Http::asForm()->timeout(15)->post(self::TOKEN_URL, [
            'client_id' => config('services.google_drive.client_id'),
            'client_secret' => config('services.google_drive.client_secret'),
            'refresh_token' => $connection->refresh_token,
            'grant_type' => 'refresh_token',
        ]);

        if (! $response->successful()) {
            throw new RuntimeException('Google Drive access was refused ('.($response->json('error') ?? $response->status()).'). Connect Google Drive again.');
        }

        $connection->update([
            'access_token' => $response->json('access_token'),
            'access_token_expires_at' => now()->addSeconds((int) $response->json('expires_in', 3600) - 60),
        ]);

        return $connection->access_token;
    }

    private function emailFromIdToken(string $idToken): ?string
    {
        $payload = json_decode((string) base64_decode(strtr(Str::between($idToken, '.', '.'), '-_', '+/')), true);

        return is_array($payload) ? ($payload['email'] ?? null) : null;
    }

    private function error(Response $response): string
    {
        return (string) ($response->json('error.message') ?? $response->json('error') ?? 'HTTP '.$response->status());
    }
}
