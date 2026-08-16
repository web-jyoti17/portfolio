<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;


class HeaderSetting extends Model
{
    protected $fillable = [
        'logo_text',
        'show_resume_button',
        'nav_links',
        'mobile_nav_links',
    ];

    protected $casts = [
        'show_resume_button' => 'boolean',
        'nav_links' => 'array',
        'mobile_nav_links' => 'array',
    ];
}
