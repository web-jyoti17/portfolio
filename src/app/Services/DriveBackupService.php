<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\GoogleDriveConnection;
use Illuminate\Support\Facades\File;
use RuntimeException;
use Throwable;

/**
 * Uploads three files to Google Drive: every blog post with its images (.json),
 * the whole site with uploaded files (.zip) and the full database (.sql.gz).
 */
class DriveBackupService
{
    public const KINDS = ['blog', 'site', 'database'];

    public function __construct(
        private GoogleDriveService $drive,
        private BlogTransferService $blog,
        private SiteTransferService $site,
        private DatabaseDumpService $database,
    ) {}

    /**
     * @return list<string> names of the uploaded files
     */
    public function run(): array
    {
        $connection = GoogleDriveConnection::current();

        if (! $connection) {
            throw new RuntimeException('Google Drive is not connected. Open Admin → Settings → Google Drive Backups and connect it first.');
        }

        $stamp = now()->format('Y-m-d-His');
        $prefix = self::filePrefix();
        $directory = storage_path('app/drive-backup-'.$stamp);
        File::ensureDirectoryExists($directory);

        try {
            $files = [
                "{$prefix}-blog-{$stamp}.json" => [$directory.'/blog.json', 'application/json'],
                "{$prefix}-site-{$stamp}.zip" => [$this->site->export(), 'application/zip'],
                "{$prefix}-database-{$stamp}.sql.gz" => [$directory.'/database.sql.gz', 'application/gzip'],
            ];

            file_put_contents($files["{$prefix}-blog-{$stamp}.json"][0], $this->blog->toJson($this->blog->export(BlogPost::orderBy('published_at')->get())));
            $this->database->dump($files["{$prefix}-database-{$stamp}.sql.gz"][0]);

            foreach ($files as $name => [$path, $mime]) {
                $this->drive->upload($connection, $path, $name, $mime);
            }

            $this->prune($connection);

            $connection->update([
                'last_backup_at' => now(),
                'last_backup_status' => 'success',
                'last_backup_message' => implode(', ', array_keys($files)),
            ]);

            return array_keys($files);
        } catch (Throwable $exception) {
            $connection->update([
                'last_backup_at' => now(),
                'last_backup_status' => 'failed',
                'last_backup_message' => $exception->getMessage(),
            ]);

            throw $exception;
        } finally {
            File::deleteDirectory($directory);

            if (isset($files["{$prefix}-site-{$stamp}.zip"][0])) {
                File::delete($files["{$prefix}-site-{$stamp}.zip"][0]);
            }
        }
    }

    /**
     * "lakshmidev-backup" for lakshmidev.laravel.cloud; set GOOGLE_DRIVE_FILE_PREFIX to change it.
     */
    public static function filePrefix(): string
    {
        $prefix = config('services.google_drive.file_prefix')
            ?: strtok((string) parse_url((string) config('app.url'), PHP_URL_HOST), '.').'-backup';

        return trim(preg_replace('/[^A-Za-z0-9._-]+/', '-', (string) $prefix), '-') ?: 'portfolio-backup';
    }

    /**
     * Keep the newest backups of each kind; delete the rest from Drive.
     */
    private function prune(GoogleDriveConnection $connection): void
    {
        $keep = max(1, (int) config('services.google_drive.keep', 30));
        // Works for current names (lakshmidev-backup-blog-…) and older ones (blog-…).
        $byKind = collect($this->drive->files($connection))
            ->groupBy(fn (array $file) => preg_match('/(?:^|-)(blog|site|database)-\d{4}-\d{2}-\d{2}-\d{6}\./', $file['name'], $match) ? $match[1] : 'other');

        foreach (self::KINDS as $kind) {
            foreach ($byKind->get($kind, collect())->slice($keep) as $old) {
                $this->drive->delete($connection, $old['id']);
            }
        }
    }
}
