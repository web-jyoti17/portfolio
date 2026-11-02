<?php

namespace App\Models;

use Database\Factories\BlogPostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $summary
 * @property string $content
 * @property string|null $cover_image
 * @property string|null $medium_url
 * @property string|null $linkedin_url
 * @property array|null $tags
 * @property-read bool $is_new
 * @property string $status
 * @property int $views_count
 * @property int $reads_count
 * @property Carbon|null $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'title',
    'slug',
    'summary',
    'content',
    'cover_image',
    'medium_url',
    'linkedin_url',
    'tags',
    'status',
    'published_at',
])]
class BlogPost extends Model
{
    /** @use HasFactory<BlogPostFactory> */
    use HasFactory;

    protected $appends = ['cover_image_url', 'is_new'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'views_count' => 'integer',
            'reads_count' => 'integer',
            'tags' => 'array',
            'published_at' => 'datetime',
        ];
    }

    /**
     * Recently published posts get a "New" badge on the site.
     * The switch and the number of days live in Site Settings.
     */
    public function getIsNewAttribute(): bool
    {
        $settings = HeaderSetting::current();

        return $settings->show_new_badge
            && $this->status === 'published'
            && $this->published_at !== null
            && $this->published_at->isPast()
            && $this->published_at->gte(now()->subDays(max(1, (int) $settings->new_badge_days)));
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null;
    }
}
