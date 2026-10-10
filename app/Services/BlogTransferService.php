<?php

namespace App\Services;

use App\Models\BlogPost;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;
use Throwable;

/**
 * Moves blog posts between installs (local → live) as a single JSON file.
 * Cover images and images uploaded into the article body travel inside the file.
 */
class BlogTransferService
{
    public const FORMAT = 'portfolio-blog-export';

    public const VERSION = 1;

    private const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif'];

    /**
     * @param  iterable<BlogPost>  $posts
     * @return array<string, mixed>
     */
    public function export(iterable $posts): array
    {
        $exported = [];

        foreach ($posts as $post) {
            [$content, $attachments] = $this->extractAttachments((string) $post->content);

            $exported[] = [
                'title' => $post->title,
                'slug' => $post->slug,
                'summary' => $post->summary,
                'content' => $content,
                'tags' => $post->tags ?? [],
                'status' => $post->status,
                'published_at' => $post->published_at?->toIso8601String(),
                'medium_url' => $post->medium_url,
                'linkedin_url' => $post->linkedin_url,
                'cover_image' => $this->readFile($post->cover_image),
                'attachments' => $attachments,
            ];
        }

        return [
            'format' => self::FORMAT,
            'version' => self::VERSION,
            'exported_at' => now()->toIso8601String(),
            'posts' => $exported,
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    public function toJson(array $payload): string
    {
        return json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }

    /**
     * @return array<string, mixed>
     */
    public function parse(string $json): array
    {
        try {
            $payload = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        } catch (Throwable) {
            throw new InvalidArgumentException('The file is not valid JSON.');
        }

        if (! is_array($payload) || ($payload['format'] ?? null) !== self::FORMAT || ! is_array($payload['posts'] ?? null)) {
            throw new InvalidArgumentException('This is not a blog export file created by this portfolio.');
        }

        if ((int) ($payload['version'] ?? 0) > self::VERSION) {
            throw new InvalidArgumentException('This export was made by a newer version of the site. Update this site first.');
        }

        return $payload;
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array{created: list<string>, updated: list<string>, skipped: list<string>}
     */
    public function import(array $payload, bool $overwrite = true): array
    {
        $result = ['created' => [], 'updated' => [], 'skipped' => []];

        foreach ($payload['posts'] as $data) {
            if (! is_array($data)) {
                continue;
            }

            $title = trim((string) ($data['title'] ?? ''));
            $slug = Str::slug((string) ($data['slug'] ?? $title));
            $content = (string) ($data['content'] ?? '');

            if ($title === '' || $slug === '' || $content === '') {
                $result['skipped'][] = $title !== '' ? $title : '(post without a title)';

                continue;
            }

            $existing = BlogPost::where('slug', $slug)->first();

            if ($existing && ! $overwrite) {
                $result['skipped'][] = $title;

                continue;
            }

            foreach ((array) ($data['attachments'] ?? []) as $attachment) {
                $this->writeFile($attachment);
            }

            $attributes = [
                'title' => $title,
                'slug' => $slug,
                'summary' => (string) ($data['summary'] ?? ''),
                'content' => $content,
                'tags' => array_values(array_filter(array_map('strval', (array) ($data['tags'] ?? [])))),
                'status' => ($data['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
                'published_at' => $this->parseDate($data['published_at'] ?? null),
                'medium_url' => $data['medium_url'] ?? null,
                'linkedin_url' => $data['linkedin_url'] ?? null,
            ];

            if ($coverPath = $this->writeFile($data['cover_image'] ?? null)) {
                $attributes['cover_image'] = $coverPath;
            }

            if ($existing) {
                $existing->update($attributes);
                $result['updated'][] = $title;
            } else {
                BlogPost::create($attributes);
                $result['created'][] = $title;
            }
        }

        return $result;
    }

    /**
     * Find images stored on this site inside the article body, collect them,
     * and make their URLs host-independent so they work on any domain.
     *
     * @return array{0: string, 1: list<array{path: string, data: string}>}
     */
    private function extractAttachments(string $content): array
    {
        $attachments = [];

        $content = preg_replace_callback(
            '/(<img\b[^>]*?\bsrc=)(["\'])(.*?)\2/i',
            function (array $match) use (&$attachments) {
                $path = parse_url(html_entity_decode($match[3]), PHP_URL_PATH) ?: '';

                if (! str_starts_with($path, '/storage/')) {
                    return $match[0];
                }

                $relative = ltrim(Str::after($path, '/storage/'), '/');

                if ($file = $this->readFile($relative)) {
                    $attachments[$relative] = $file;
                }

                return $match[1].$match[2].'/storage/'.$relative.$match[2];
            },
            $content,
        ) ?? $content;

        return [$content, array_values($attachments)];
    }

    /**
     * @return array{path: string, data: string}|null
     */
    private function readFile(?string $path): ?array
    {
        if (! $path || ! $this->isSafeImagePath($path) || ! Storage::disk('public')->exists($path)) {
            return null;
        }

        return [
            'path' => $path,
            'data' => base64_encode(Storage::disk('public')->get($path)),
        ];
    }

    /**
     * Write an exported image back to the public disk. Returns the stored path.
     */
    private function writeFile(mixed $file): ?string
    {
        if (! is_array($file) || ! is_string($file['path'] ?? null) || ! is_string($file['data'] ?? null)) {
            return null;
        }

        $path = ltrim($file['path'], '/');
        $contents = base64_decode($file['data'], true);

        if ($contents === false || ! $this->isSafeImagePath($path)) {
            return null;
        }

        Storage::disk('public')->put($path, $contents, 'public');

        return $path;
    }

    /**
     * Only image files, and only inside the public disk.
     */
    private function isSafeImagePath(string $path): bool
    {
        return ! str_contains($path, '..')
            && ! str_starts_with($path, '/')
            && in_array(strtolower(pathinfo($path, PATHINFO_EXTENSION)), self::IMAGE_EXTENSIONS, true);
    }

    private function parseDate(mixed $value): ?Carbon
    {
        if (! is_string($value) || $value === '') {
            return null;
        }

        try {
            return Carbon::parse($value);
        } catch (Throwable) {
            return null;
        }
    }
}
