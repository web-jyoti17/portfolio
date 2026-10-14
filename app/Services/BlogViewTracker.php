<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\BlogPostView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

/**
 * Counts unique readers per article. Each browser gets an anonymous random id in a cookie;
 * only a hash of it is stored. Bots and logged-in admins are not counted.
 */
class BlogViewTracker
{
    public const COOKIE = 'visitor_id';

    private const BOTS = '/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|curl|wget|python|httpclient|headless|lighthouse|pingdom|uptime/i';

    /**
     * Count an article being opened. Returns the visitor id to remember in the browser.
     */
    public function recordView(BlogPost $post, Request $request): ?string
    {
        if (! $this->shouldCount($request)) {
            return null;
        }

        $visitor = $this->visitorId($request);

        $created = BlogPostView::query()->insertOrIgnore([
            'blog_post_id' => $post->getKey(),
            'visitor_hash' => $this->hash($visitor),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if ($created > 0) {
            $post->increment('views_count');
        }

        return $visitor;
    }

    /**
     * Count an article being read to the end. Only once per visitor, and only after a counted view.
     */
    public function recordRead(BlogPost $post, Request $request): bool
    {
        $visitor = $request->cookie(self::COOKIE);

        if (! is_string($visitor) || $visitor === '' || ! $this->shouldCount($request)) {
            return false;
        }

        $updated = BlogPostView::query()
            ->where('blog_post_id', $post->getKey())
            ->where('visitor_hash', $this->hash($visitor))
            ->whereNull('read_at')
            ->update(['read_at' => now(), 'updated_at' => now()]);

        if ($updated > 0) {
            $post->increment('reads_count');
        }

        return $updated > 0;
    }

    public function queueCookie(string $visitor): void
    {
        Cookie::queue(self::COOKIE, $visitor, 60 * 24 * 365 * 2);
    }

    private function shouldCount(Request $request): bool
    {
        $agent = (string) $request->userAgent();

        return $agent !== '' && ! preg_match(self::BOTS, $agent) && ! $request->user();
    }

    private function visitorId(Request $request): string
    {
        $visitor = $request->cookie(self::COOKIE);

        return is_string($visitor) && Str::isUuid($visitor) ? $visitor : (string) Str::uuid();
    }

    private function hash(string $visitor): string
    {
        return hash_hmac('sha256', $visitor, (string) config('app.key'));
    }
}
