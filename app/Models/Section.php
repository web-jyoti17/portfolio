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
        'show_on_mobile',
        'show_on_desktop',
        'sort_order',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
        'is_visible' => 'boolean',
        'show_on_mobile' => 'boolean',
        'show_on_desktop' => 'boolean',
        'sort_order' => 'integer',
    ];
}
