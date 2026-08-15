<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'logo_text',
    'nav_links',
    'show_resume_button',
])]
class HeaderSetting extends Model
{
    protected function casts(): array
    {
        return [
            'nav_links' => 'array',
            'show_resume_button' => 'boolean',
        ];
    }
}
