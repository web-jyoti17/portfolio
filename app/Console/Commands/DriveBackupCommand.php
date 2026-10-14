<?php

namespace App\Console\Commands;

use App\Services\DriveBackupService;
use Illuminate\Console\Command;
use Throwable;

class DriveBackupCommand extends Command
{
    protected $signature = 'backup:drive';

    protected $description = 'Upload the blog, the whole site and the database to the connected Google Drive';

    public function handle(DriveBackupService $backup): int
    {
        try {
            foreach ($backup->run() as $name) {
                $this->line('Uploaded '.$name);
            }
        } catch (Throwable $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $this->info('Backup saved to Google Drive.');

        return self::SUCCESS;
    }
}
