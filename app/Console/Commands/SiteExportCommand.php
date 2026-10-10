<?php

namespace App\Console\Commands;

use App\Services\SiteTransferService;
use Illuminate\Console\Command;

class SiteExportCommand extends Command
{
    protected $signature = 'site:export {path? : Where to save the .zip (defaults to storage/app/site-exports)}';

    protected $description = 'Export all portfolio content and uploaded files to one .zip that site:import can read';

    public function handle(SiteTransferService $transfer): int
    {
        $path = $transfer->export();

        if ($target = $this->argument('path')) {
            rename($path, $target);
            $path = $target;
        }

        $this->info('Exported to '.$path.' ('.number_format(filesize($path) / 1048576, 1).' MB)');

        return self::SUCCESS;
    }
}
