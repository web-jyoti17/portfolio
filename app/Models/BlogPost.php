<?php

namespace App\Models;

use Database\Factories\BlogPostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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
 * @property string $status
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

    protected $appends = ['cover_image_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'published_at' => 'datetime',
        ];
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->cover_image ? \Illuminate\Support\Facades\Storage::disk('public')->url($this->cover_image) : null;
    }
}
