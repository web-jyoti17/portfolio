<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use App\Services\BlogTransferService;
use Illuminate\Console\Command;

class BlogExportCommand extends Command
{
    protected $signature = 'blog:export
                            {path? : Where to write the file (defaults to storage/app/blog-export.json)}
                            {--slug=* : Only export these slugs}';

    protected $description = 'Export blog posts (with their images) to a JSON file that blog:import can read';

    public function handle(BlogTransferService $transfer): int
    {
        $posts = BlogPost::query()
            ->when($this->option('slug'), fn ($query, $slugs) => $query->whereIn('slug', $slugs))
            ->orderBy('published_at')
            ->get();

        if ($posts->isEmpty()) {
            $this->warn('No posts matched.');

            return self::FAILURE;
        }

        $path = $this->argument('path') ?: storage_path('app/blog-export.json');
        file_put_contents($path, $transfer->toJson($transfer->export($posts)));

        $this->info("Exported {$posts->count()} post(s) to {$path}");

        return self::SUCCESS;
    }
}
