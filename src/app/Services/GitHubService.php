<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GitHubService
{
    /**
     * Fetch public repositories for CodeSproutX.
     */
    public function getPublicRepositories(string $username = 'CodeSproutX'): array
    {
        return Cache::remember("github_repos_{$username}", now()->addHours(6), function () use ($username) {
            try {
                $response = Http::withHeaders([
                    'User-Agent' => 'Laravel-Portfolio-App',
                ])->timeout(5)->get("https://api.github.com/users/{$username}/repos", [
                    'sort' => 'updated',
                    'per_page' => 20,
                ]);

                if ($response->successful()) {
                    $repos = $response->json();

                    return collect($repos)->map(function ($repo) {
                        return [
                            'name' => $repo['name'],
                            'description' => $repo['description'],
                            'url' => $repo['html_url'],
                            'homepage' => $repo['homepage'] ?? null,
                            'stars' => $repo['stargazers_count'] ?? 0,
                            'forks' => $repo['forks_count'] ?? 0,
                            'language' => $repo['language'] ?? 'PHP',
                            'updated_at' => $repo['updated_at'] ?? null,
                        ];
                    })->toArray();
                }

                Log::warning("GitHub API request failed for user {$username}: ".$response->body());

                return [];
            } catch (\Exception $e) {
                Log::error("Error fetching GitHub repos for {$username}: ".$e->getMessage());

                return [];
            }
        });
    }
}
