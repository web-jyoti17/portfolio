<?php

namespace App\Console\Commands;

use App\Services\SiteTransferService;
use Illuminate\Console\Command;
use InvalidArgumentException;

class SiteImportCommand extends Command
{
    protected $signature = 'site:import
                            {path : The .zip created by site:export or the admin Export button}
                            {--files-only : Restore only the uploaded files (images, resume); the database is not touched}
                            {--data-only : Restore only the database content}
                            {--force : Do not ask for confirmation}';

    protected $description = 'Replace this site\'s portfolio content and uploaded files with an export';

    public function handle(SiteTransferService $transfer): int
    {
        $path = $this->argument('path');

        if (! is_file($path)) {
            $this->error("File not found: {$path}");

            return self::FAILURE;
        }

        $filesOnly = (bool) $this->option('files-only');

        if (! $filesOnly && ! $this->option('force') && ! $this->confirm('This replaces ALL portfolio content on this site (sections, projects, articles, settings). Admin logins are kept. Continue?')) {
            return self::FAILURE;
        }

        try {
            $summary = $transfer->import($path, data: ! $filesOnly, files: ! $this->option('data-only'));
        } catch (InvalidArgumentException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        foreach ($summary['rows'] as $table => $count) {
            $this->line(str_pad($table, 18).$count.' rows');
        }

        $this->info($summary['files'].' files restored.');

        return self::SUCCESS;
    }
}
