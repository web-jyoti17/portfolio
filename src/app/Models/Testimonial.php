<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'company',
    'position',
    'rating',
    'review',
    'profile_image',
    'is_approved',
])]
class Testimonial extends Model
{
    use HasFactory;

    protected $appends = ['profile_image_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_approved' => 'boolean',
        ];
    }

    public function getProfileImageUrlAttribute(): ?string
    {
        return $this->profile_image ? \Illuminate\Support\Facades\Storage::disk('public')->url($this->profile_image) : null;
    }
}
