<?php

namespace App\Models;

use Database\Factories\ExperienceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $job_title
 * @property string $company
 * @property string|null $location
 * @property Carbon $start_date
 * @property Carbon|null $end_date
 * @property bool $is_current
 * @property string|null $description
 * @property array|null $achievements
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'job_title',
    'company',
    'location',
    'start_date',
    'end_date',
    'is_current',
    'description',
    'achievements',
    'is_visible',
    'sort_order',
])]
class Experience extends Model
{
    /** @use HasFactory<ExperienceFactory> */
    use HasFactory;

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
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
            'achievements' => 'array',
        ];
    }
}
