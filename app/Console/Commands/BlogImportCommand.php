<?php

namespace App\Console\Commands;

use App\Services\BlogTransferService;
use Illuminate\Console\Command;
use InvalidArgumentException;

class BlogImportCommand extends Command
{
    protected $signature = 'blog:import
                            {path : JSON file created by blog:export or the admin Export button}
                            {--keep-existing : Skip posts whose slug already exists instead of updating them}';

    protected $description = 'Import blog posts from an export file';

    public function handle(BlogTransferService $transfer): int
    {
        $path = $this->argument('path');

        if (! is_file($path)) {
            $this->error("File not found: {$path}");

            return self::FAILURE;
        }

        try {
            $result = $transfer->import(
                $transfer->parse(file_get_contents($path)),
                overwrite: ! $this->option('keep-existing'),
            );
        } catch (InvalidArgumentException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        foreach (['created', 'updated', 'skipped'] as $outcome) {
            foreach ($result[$outcome] as $title) {
                $this->line(str_pad(ucfirst($outcome), 8).' '.$title);
            }
        }

        $this->info(sprintf(
            '%d created, %d updated, %d skipped.',
            count($result['created']),
            count($result['updated']),
            count($result['skipped']),
        ));

        return self::SUCCESS;
    }
}
