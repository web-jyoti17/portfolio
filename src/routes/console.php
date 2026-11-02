<?php

use App\Models\GoogleDriveConnection;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Schema;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Daily Google Drive backup; does nothing until Drive is connected in the admin.
Schedule::command('backup:drive')
    ->dailyAt('02:00')
    ->when(fn () => Schema::hasTable('google_drive_connections') && GoogleDriveConnection::query()->exists())
    ->withoutOverlapping();
