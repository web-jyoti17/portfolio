<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'file_path',
    'category',
    'download_count',
    'is_active',
])]
class Resume extends Model
{
    use HasFactory;

    protected $appends = ['file_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'download_count' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? \Illuminate\Support\Facades\Storage::disk('public')->url($this->file_path) : null;
    }
}
