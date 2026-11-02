<?php

namespace App\Models;

use Database\Factories\CaseStudyFactory;
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
 * @property string $challenge
 * @property string $solution
 * @property string $results
 * @property array|null $tech_stack
 * @property string|null $image_path
 * @property string|null $client_name
 * @property string|null $duration
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'title',
    'slug',
    'summary',
    'challenge',
    'solution',
    'results',
    'tech_stack',
    'image_path',
    'client_name',
    'duration',
    'is_visible',
    'sort_order',
])]
class CaseStudy extends Model
{
    /** @use HasFactory<CaseStudyFactory> */
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
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }
}
