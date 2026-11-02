<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class MoveFilesToDatabaseCommand extends Command
{
    protected $signature = 'storage:to-database {--from= : Folder to read (defaults to storage/app/public)}';

    protected $description = 'Copy uploaded files from the storage folder into the database (existing database files are kept up to date)';

    private const SKIPPED_FOLDERS = ['livewire-tmp', 'site-exports'];

    public function handle(): int
    {
        if (config('filesystems.disks.public.driver') !== 'database') {
            $this->error('The public disk is not using the database driver (PUBLIC_DISK_DRIVER).');

            return self::FAILURE;
        }

        $source = Storage::build(['driver' => 'local', 'root' => $this->option('from') ?: storage_path('app/public')]);
        $target = Storage::disk('public');
        $copied = 0;

        foreach ($source->allFiles() as $path) {
            if (in_array(explode('/', $path)[0], self::SKIPPED_FOLDERS, true) || str_starts_with(basename($path), '.')) {
                continue;
            }

            $target->put($path, $source->get($path), 'public');
            $copied++;
            $this->line('Saved '.$path);
        }

        $this->info("{$copied} file(s) saved in the database.");

        return self::SUCCESS;
    }
}
