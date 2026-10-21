<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;
use RuntimeException;
use ZipArchive;

/**
 * Moves the whole portfolio between installs (local → live) as one .zip file:
 * every content table plus every uploaded file (images, resumes, favicon).
 * Admin users and passwords are never included.
 */
class SiteTransferService
{
    public const FORMAT = 'portfolio-site-export';

    public const VERSION = 1;

    /**
     * Content tables, in the order they are written.
     */
    public const TABLES = [
        'sections',
        'header_settings',
        'projects',
        'case_studies',
        'skills',
        'experiences',
        'educations',
        'certifications',
        'code_snippets',
        'resources',
        'blog_posts',
        'testimonials',
        'resumes',
    ];

    /**
     * Folders on the public disk that are not content.
     */
    private const SKIPPED_FOLDERS = ['livewire-tmp', 'site-exports'];

    /**
     * Build the export archive and return its path on this server.
     */
    public function export(): string
    {
        $directory = storage_path('app/site-exports');

        if (! is_dir($directory) && ! mkdir($directory, 0775, true) && ! is_dir($directory)) {
            throw new RuntimeException('Could not create the export folder.');
        }

        $path = $directory.'/portfolio-export-'.now()->format('Y-m-d-His').'.zip';
        $zip = new ZipArchive;

        if ($zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new RuntimeException('Could not create the export file.');
        }

        $tables = [];

        foreach (self::TABLES as $table) {
            if (! Schema::hasTable($table)) {
                continue;
            }

            $tables[$table] = DB::table($table)
                ->get()
                ->map(fn ($row) => array_map(fn ($value) => $this->portableUrls($value), (array) $row))
                ->all();
        }

        $files = $this->contentFiles();

        $zip->addFromString('data.json', json_encode([
            'format' => self::FORMAT,
            'version' => self::VERSION,
            'exported_at' => now()->toIso8601String(),
            'tables' => $tables,
            'files' => $files,
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));

        foreach ($files as $file) {
            $zip->addFromString('files/'.$file, (string) Storage::disk('public')->get($file));
        }

        $zip->close();

        return $path;
    }

    /**
     * Replace this site's content with the content of an export archive.
     * Pass $data or $files as false to restore only the uploaded files or only the database rows.
     *
     * @return array{rows: array<string, int>, files: int}
     */
    public function import(string $zipPath, bool $data = true, bool $files = true): array
    {
        $zip = new ZipArchive;

        if ($zip->open($zipPath) !== true) {
            throw new InvalidArgumentException('The file is not a valid .zip archive.');
        }

        $payload = json_decode((string) $zip->getFromName('data.json'), true);

        if (! is_array($payload) || ($payload['format'] ?? null) !== self::FORMAT || ! is_array($payload['tables'] ?? null)) {
            $zip->close();

            throw new InvalidArgumentException('This is not a site export created by this portfolio.');
        }

        if ((int) ($payload['version'] ?? 0) > self::VERSION) {
            $zip->close();

            throw new InvalidArgumentException('This export was made by a newer version of the site. Update this site first.');
        }

        $summary = ['rows' => [], 'files' => 0];

        $data && DB::transaction(function () use ($payload, &$summary) {
            foreach (self::TABLES as $table) {
                if (! array_key_exists($table, $payload['tables']) || ! Schema::hasTable($table)) {
                    continue;
                }

                // Only columns this install has, so a slightly older or newer export still imports
                $columns = array_flip(Schema::getColumnListing($table));
                $rows = array_map(
                    fn ($row) => array_intersect_key((array) $row, $columns),
                    (array) $payload['tables'][$table],
                );

                DB::table($table)->delete();

                foreach (array_chunk($rows, 100) as $chunk) {
                    DB::table($table)->insert($chunk);
                }

                $summary['rows'][$table] = count($rows);
            }
        });

        for ($index = 0; $files && $index < $zip->numFiles; $index++) {
            $name = $zip->getNameIndex($index);

            if (! is_string($name) || ! str_starts_with($name, 'files/') || str_ends_with($name, '/')) {
                continue;
            }

            $relative = substr($name, strlen('files/'));

            if (! $this->isSafePath($relative)) {
                continue;
            }

            $contents = $zip->getFromIndex($index);

            if ($contents !== false) {
                Storage::disk('public')->put($relative, $contents, 'public');
                $summary['files']++;
            }
        }

        $zip->close();

        return $summary;
    }

    /**
     * Every uploaded file that belongs to the site's content.
     *
     * @return list<string>
     */
    private function contentFiles(): array
    {
        return collect(Storage::disk('public')->allFiles())
            ->filter(fn (string $file) => $this->isSafePath($file))
            ->values()
            ->all();
    }

    private function isSafePath(string $path): bool
    {
        if ($path === '' || str_contains($path, '..') || str_starts_with($path, '/')) {
            return false;
        }

        $segments = explode('/', $path);

        if (in_array($segments[0], self::SKIPPED_FOLDERS, true)) {
            return false;
        }

        // No dot-files, and nothing that could be run by the web server
        return ! str_starts_with(basename($path), '.')
            && ! in_array(strtolower(pathinfo($path, PATHINFO_EXTENSION)), ['php', 'phtml', 'phar', 'htaccess'], true);
    }

    /**
     * Uploaded files referenced with this server's address (for example images pasted
     * into an article) are rewritten to "/storage/..." so they work on any domain.
     */
    private function portableUrls(mixed $value): mixed
    {
        if (! is_string($value) || $value === '') {
            return $value;
        }

        $bases = array_unique(array_filter([
            rtrim((string) config('app.url'), '/').'/storage/',
            rtrim(Storage::disk('public')->url(''), '/').'/',
            rtrim(request()->getSchemeAndHttpHost(), '/').'/storage/',
        ]));

        foreach ($bases as $base) {
            $value = str_replace(
                [$base, str_replace('/', '\\/', $base)],
                ['/storage/', '\\/storage\\/'],
                $value,
            );
        }

        return $value;
    }
}
