<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogViewTrackingTest extends TestCase
{
    use RefreshDatabase;

    private const BROWSER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15';

    private function publishedPost(): BlogPost
    {
        return BlogPost::factory()->create(['status' => 'published', 'published_at' => now()->subDay()]);
    }

    public function test_each_visitor_is_counted_once(): void
    {
        $post = $this->publishedPost();

        $first = $this->withHeader('User-Agent', self::BROWSER)->get(route('article.show', $post->slug));
        $first->assertOk()->assertCookie('visitor_id');
        $visitor = $first->getCookie('visitor_id')->getValue();

        $this->withHeader('User-Agent', self::BROWSER)->withCookie('visitor_id', $visitor)
            ->get(route('article.show', $post->slug))->assertOk();
        $this->withHeader('User-Agent', self::BROWSER)->withCookie('visitor_id', (string) str()->uuid())
            ->get(route('article.show', $post->slug))->assertOk();

        $this->assertSame(2, $post->fresh()->views_count);
    }

    public function test_reading_to_the_end_is_counted_once_per_visitor(): void
    {
        $post = $this->publishedPost();
        $visitor = $this->withHeader('User-Agent', self::BROWSER)->get(route('article.show', $post->slug))
            ->getCookie('visitor_id')->getValue();

        $read = fn () => $this->withHeader('User-Agent', self::BROWSER)->withCookie('visitor_id', $visitor)
            ->withCredentials()->postJson(route('article.read', $post->slug));

        $read()->assertJson(['counted' => true]);
        $read()->assertJson(['counted' => false]);

        $this->assertSame(1, $post->fresh()->reads_count);
    }

    public function test_a_read_without_a_counted_view_is_ignored(): void
    {
        $post = $this->publishedPost();

        $this->withHeader('User-Agent', self::BROWSER)->withCookie('visitor_id', (string) str()->uuid())
            ->withCredentials()->postJson(route('article.read', $post->slug))->assertJson(['counted' => false]);

        $this->assertSame(0, $post->fresh()->reads_count);
    }

    public function test_bots_and_logged_in_admins_are_not_counted(): void
    {
        $post = $this->publishedPost();

        $this->withHeader('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1)')->get(route('article.show', $post->slug))->assertOk();
        $this->actingAs(User::factory()->create())->withHeader('User-Agent', self::BROWSER)->get(route('article.show', $post->slug))->assertOk();

        $this->assertSame(0, $post->fresh()->views_count);
    }
}
