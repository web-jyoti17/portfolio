<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * One anonymous visitor who opened an article, and when they finished reading it.
 *
 * @property int $id
 * @property int $blog_post_id
 * @property string $visitor_hash
 * @property Carbon|null $read_at
 */
class BlogPostView extends Model
{
    protected $fillable = ['blog_post_id', 'visitor_hash', 'read_at'];

    protected function casts(): array
    {
        return ['read_at' => 'datetime'];
    }

    public function blogPost(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class);
    }
}
