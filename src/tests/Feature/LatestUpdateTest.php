<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use App\Models\HeaderSetting;
use App\Support\SiteData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LatestUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_newest_recent_article_is_announced(): void
    {
        BlogPost::factory()->create(['status' => 'published', 'slug' => 'older', 'published_at' => now()->subDays(5)]);
        BlogPost::factory()->create(['status' => 'published', 'slug' => 'newest', 'published_at' => now()->subDay()]);

        $update = SiteData::share()['latest_update'];

        $this->assertSame('blog:newest', $update['key']);
        $this->assertSame(route('article.show', 'newest'), $update['url']);
        $this->assertFalse($update['external']);
    }

    public function test_drafts_old_posts_and_future_posts_are_not_announced(): void
    {
        BlogPost::factory()->create(['status' => 'draft', 'published_at' => now()->subDay()]);
        BlogPost::factory()->create(['status' => 'published', 'published_at' => now()->subDays(60)]);
        BlogPost::factory()->create(['status' => 'published', 'published_at' => now()->addDay()]);

        $this->assertNull(SiteData::share()['latest_update']);
    }

    public function test_nothing_is_announced_when_new_badges_are_off(): void
    {
        HeaderSetting::create(['show_new_badge' => false]);
        BlogPost::factory()->create(['status' => 'published', 'published_at' => now()->subDay()]);

        $this->assertNull(SiteData::share()['latest_update']);
    }
}
