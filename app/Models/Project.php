<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string|null $content
 * @property string|null $image_path
 * @property string|null $github_url
 * @property string|null $live_url
 * @property array|null $tech_stack
 * @property bool $is_featured
 * @property bool $is_proprietary
 * @property string $category
 * @property string|null $client_name
 * @property string|null $challenge
 * @property string|null $outcome
 * @property Carbon|null $completion_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'title',
    'slug',
    'description',
    'content',
    'image_path',
    'github_url',
    'live_url',
    'tech_stack',
    'is_featured',
    'is_proprietary',
    'category',
    'client_name',
    'challenge',
    'outcome',
    'completion_date',
    'is_visible',
    'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $appends = ['image_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
            'sort_order' => 'integer',
            'tech_stack' => 'array',
            'image_path' => 'array',
            'is_featured' => 'boolean',
            'is_proprietary' => 'boolean',
            'completion_date' => 'date',
        ];
    }

    public function getImageUrlAttribute()
    {
        if (is_array($this->image_path)) {
            return array_map(function ($path) {
                return Storage::disk('public')->url($path);
            }, $this->image_path);
        }

        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }
}
