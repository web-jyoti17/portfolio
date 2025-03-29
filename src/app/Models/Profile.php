<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'bio',
        'about',
        'skills',
        'email',
        'phone',
        'location',
        'github',
        'linkedin',
        'twitter',
        'avatar'
    ];

    protected $casts = [
        'skills' => 'array'
    ];

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('start_date', 'desc');
    }
}
