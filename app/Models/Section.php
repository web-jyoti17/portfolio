<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = [
        'key',
        'title',
        'subtitle',
        'is_visible',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
        'is_visible' => 'boolean',
    ];
}
