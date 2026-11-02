<?php

namespace App\Services;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use SimpleXMLElement;
use Throwable;

class MediumService
{
    /**
     * Accepts "name", "@name", "https://medium.com/@name" or "https://name.medium.com".
     */
    public static function normalizeUsername(?string $value): ?string
    {
        $value = trim((string) $value);

        if ($value === '') {
            return null;
        }

        if (preg_match('~medium\.com/@([A-Za-z0-9_.-]+)~', $value, $match)) {
            return $match[1];
        }

        if (preg_match('~^(?:https?://)?([A-Za-z0-9_-]+)\.medium\.com~', $value, $match) && $match[1] !== 'www') {
            return $match[1];
        }

        $value = ltrim($value, '@');

        return preg_match('/^[A-Za-z0-9_.-]+$/', $value) ? $value : null;
    }

    public static function profileUrl(?string $username): ?string
    {
        $username = self::normalizeUsername($username);

        return $username ? "https://medium.com/@{$username}" : null;
    }

    /**
     * Latest stories from the public Medium RSS feed (Medium only publishes the 10 newest).
     *
     * @return list<array{title: string, url: string, excerpt: string, image: string|null, tags: list<string>, published_at: string|null}>
     */
    public function getLatestPosts(?string $username): array
    {
        $username = self::normalizeUsername($username);

        if (! $username) {
            return [];
        }

        $key = "medium_posts_{$username}";

        if (($cached = Cache::get($key)) !== null) {
            return $cached;
        }

        $posts = $this->fetch($username);

        // A failed fetch is retried sooner than a successful one is refreshed.
        Cache::put($key, $posts ?? [], $posts === null ? now()->addMinutes(10) : now()->addMinutes(30));

        return $posts ?? [];
    }

    /**
     * @return list<array<string, mixed>>|null null when the feed could not be read
     */
    private function fetch(string $username): ?array
    {
        try {
            $response = Http::withHeaders(['User-Agent' => 'Laravel-Portfolio-App'])
                ->timeout(5)
                ->get("https://medium.com/feed/@{$username}");

            if (! $response->successful()) {
                Log::warning("Medium feed request failed for {$username}: HTTP {$response->status()}");

                return null;
            }

            $xml = new SimpleXMLElement($response->body(), LIBXML_NOCDATA | LIBXML_NONET);
        } catch (Throwable $exception) {
            Log::error("Error reading Medium feed for {$username}: ".$exception->getMessage());

            return null;
        }

        $posts = [];

        foreach ($xml->channel->item ?? [] as $item) {
            $html = (string) $item->children('content', true)->encoded;
            // The feed ends with a 1x1 tracking pixel; only real story images come from Medium's CDN.
            preg_match('~<img[^>]+src="(https://(?:cdn-images-\d+\.medium\.com|miro\.medium\.com)/[^"]+)"~i', $html, $image);

            $text = trim(preg_replace('/\s+/', ' ', html_entity_decode(strip_tags(str_replace('<', ' <', $html)))));

            $posts[] = [
                // Titles typed in Medium's editor can keep a leading Markdown "#"
                'title' => trim(ltrim(trim((string) $item->title), '# ')),
                'url' => self::cleanUrl((string) $item->link),
                'excerpt' => Str::limit($text, 180),
                'image' => $image[1] ?? null,
                'tags' => array_slice(array_map('strval', iterator_to_array($item->category, false)), 0, 3),
                'published_at' => $this->parseDate((string) $item->pubDate),
            ];
        }

        usort($posts, fn (array $a, array $b) => strcmp((string) $b['published_at'], (string) $a['published_at']));

        return $posts;
    }

    /**
     * Medium adds tracking parameters to feed links; drop them so links can be compared.
     */
    public static function cleanUrl(?string $url): string
    {
        return rtrim(strtok((string) $url, '?') ?: '', '/');
    }

    private function parseDate(string $value): ?string
    {
        try {
            return $value === '' ? null : Carbon::parse($value)->toIso8601String();
        } catch (Throwable) {
            return null;
        }
    }
}
