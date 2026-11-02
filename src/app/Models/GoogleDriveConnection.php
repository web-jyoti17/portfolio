<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * The Google account backups are uploaded to. There is at most one row.
 *
 * @property int $id
 * @property string|null $email
 * @property string $refresh_token
 * @property string|null $access_token
 * @property Carbon|null $access_token_expires_at
 * @property string|null $folder_id
 * @property Carbon|null $last_backup_at
 * @property string|null $last_backup_status
 * @property string|null $last_backup_message
 */
class GoogleDriveConnection extends Model
{
    protected $fillable = [
        'email',
        'refresh_token',
        'access_token',
        'access_token_expires_at',
        'folder_id',
        'last_backup_at',
        'last_backup_status',
        'last_backup_message',
    ];

    protected $hidden = ['refresh_token', 'access_token'];

    protected function casts(): array
    {
        return [
            'refresh_token' => 'encrypted',
            'access_token' => 'encrypted',
            'access_token_expires_at' => 'datetime',
            'last_backup_at' => 'datetime',
        ];
    }

    public static function current(): ?self
    {
        return self::query()->latest('id')->first();
    }
}
