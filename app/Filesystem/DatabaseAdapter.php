<?php

namespace App\Filesystem;

use Illuminate\Support\Facades\DB;
use League\Flysystem\Config;
use League\Flysystem\DirectoryAttributes;
use League\Flysystem\FileAttributes;
use League\Flysystem\FilesystemAdapter;
use League\Flysystem\UnableToReadFile;
use League\Flysystem\UnableToRetrieveMetadata;
use League\MimeTypeDetection\FinfoMimeTypeDetector;

/**
 * A Flysystem adapter that keeps every file inside the `stored_files` table.
 * Folders are not stored; they exist as long as a file path starts with them.
 */
class DatabaseAdapter implements FilesystemAdapter
{
    private const TABLE = 'stored_files';

    private FinfoMimeTypeDetector $mimeTypes;

    /**
     * @param  string  $baseUrl  public address of the files, e.g. https://example.com/storage
     */
    public function __construct(private string $baseUrl = '/storage')
    {
        $this->mimeTypes = new FinfoMimeTypeDetector;
    }

    /**
     * Used by Storage::disk(...)->url().
     */
    public function getUrl(string $path): string
    {
        return rtrim($this->baseUrl, '/').'/'.implode('/', array_map('rawurlencode', explode('/', $this->clean($path))));
    }

    public function fileExists(string $path): bool
    {
        return $this->query()->where('path', $this->clean($path))->exists();
    }

    public function directoryExists(string $path): bool
    {
        $prefix = $this->prefix($path);

        return $prefix === '' || $this->query()->where('path', 'like', $this->escapeLike($prefix).'%')->exists();
    }

    public function write(string $path, string $contents, Config $config): void
    {
        $path = $this->clean($path);
        $now = now();

        $this->query()->upsert([[
            'path' => $path,
            'mime_type' => $this->mimeTypes->detectMimeType($path, $contents) ?? 'application/octet-stream',
            'size' => strlen($contents),
            'visibility' => $config->get('visibility', 'public'),
            'checksum' => sha1($contents),
            'contents' => $contents,
            'created_at' => $now,
            'updated_at' => $now,
        ]], ['path'], ['mime_type', 'size', 'visibility', 'checksum', 'contents', 'updated_at']);
    }

    public function writeStream(string $path, $contents, Config $config): void
    {
        $this->write($path, (string) stream_get_contents($contents), $config);
    }

    public function read(string $path): string
    {
        $contents = $this->query()->where('path', $this->clean($path))->value('contents');

        if ($contents === null) {
            throw UnableToReadFile::fromLocation($path, 'File not found in the database.');
        }

        return is_resource($contents) ? (string) stream_get_contents($contents) : (string) $contents;
    }

    public function readStream(string $path)
    {
        $stream = fopen('php://temp', 'w+b');
        fwrite($stream, $this->read($path));
        rewind($stream);

        return $stream;
    }

    public function delete(string $path): void
    {
        $this->query()->where('path', $this->clean($path))->delete();
    }

    public function deleteDirectory(string $path): void
    {
        $this->query()->where('path', 'like', $this->escapeLike($this->prefix($path)).'%')->delete();
    }

    public function createDirectory(string $path, Config $config): void
    {
        // Folders are implied by file paths.
    }

    public function setVisibility(string $path, string $visibility): void
    {
        $this->query()->where('path', $this->clean($path))->update(['visibility' => $visibility]);
    }

    public function visibility(string $path): FileAttributes
    {
        return $this->attributes($path);
    }

    public function mimeType(string $path): FileAttributes
    {
        return $this->attributes($path);
    }

    public function lastModified(string $path): FileAttributes
    {
        return $this->attributes($path);
    }

    public function fileSize(string $path): FileAttributes
    {
        return $this->attributes($path);
    }

    public function listContents(string $path, bool $deep): iterable
    {
        $prefix = $this->prefix($path);
        $directories = [];

        $rows = $this->query()
            ->when($prefix !== '', fn ($query) => $query->where('path', 'like', $this->escapeLike($prefix).'%'))
            ->orderBy('path')
            ->get(['path', 'mime_type', 'size', 'visibility', 'updated_at']);

        foreach ($rows as $row) {
            $relative = substr($row->path, strlen($prefix));
            $segments = explode('/', $relative);

            // Every folder above the file, once
            for ($i = 1; $i < count($segments); $i++) {
                if (! $deep && $i > 1) {
                    break;
                }

                $directory = $prefix.implode('/', array_slice($segments, 0, $i));

                if (! isset($directories[$directory])) {
                    $directories[$directory] = true;
                    yield new DirectoryAttributes($directory);
                }
            }

            if ($deep || count($segments) === 1) {
                yield $this->toAttributes($row);
            }
        }
    }

    public function move(string $source, string $destination, Config $config): void
    {
        $this->query()->where('path', $this->clean($destination))->delete();
        $this->query()->where('path', $this->clean($source))->update(['path' => $this->clean($destination), 'updated_at' => now()]);
    }

    public function copy(string $source, string $destination, Config $config): void
    {
        $this->write($destination, $this->read($source), $config);
    }

    private function attributes(string $path): FileAttributes
    {
        $row = $this->query()->where('path', $this->clean($path))->first(['path', 'mime_type', 'size', 'visibility', 'updated_at']);

        if (! $row) {
            throw UnableToRetrieveMetadata::create($path, 'metadata', 'File not found in the database.');
        }

        return $this->toAttributes($row);
    }

    private function toAttributes(object $row): FileAttributes
    {
        return new FileAttributes(
            $row->path,
            (int) $row->size,
            $row->visibility,
            $row->updated_at ? strtotime((string) $row->updated_at) : null,
            $row->mime_type,
        );
    }

    private function query(): \Illuminate\Database\Query\Builder
    {
        return DB::table(self::TABLE);
    }

    private function clean(string $path): string
    {
        return ltrim(str_replace('\\', '/', $path), '/');
    }

    private function prefix(string $path): string
    {
        $path = trim($this->clean($path), '/');

        return $path === '' ? '' : $path.'/';
    }

    private function escapeLike(string $value): string
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $value);
    }
}
