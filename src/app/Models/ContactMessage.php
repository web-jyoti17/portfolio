<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * A message sent through the portfolio's contact form.
 */
#[Fillable([
    'name',
    'email',
    'company',
    'project_type',
    'message',
    'ip_address',
    'email_sent',
    'read_at',
])]
class ContactMessage extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_sent' => 'boolean',
            'read_at' => 'datetime',
        ];
    }
}
