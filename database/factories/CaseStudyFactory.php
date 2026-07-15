<?php

namespace Database\Factories;

use App\Models\CaseStudy;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<CaseStudy>
 */
class CaseStudyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->unique()->randomElement([
            'Scaling E-Commerce Backend to 10k Active Connections',
            'Migrating Legacy Core Financial Systems to Cloud Native',
            'Overhauling Developer Onboarding with Containerized Tooling',
            'Reducing Page Load Speed by 60% Using Vite and SSR',
        ]);

        $techStacks = [
            ['Laravel', 'Redis', 'MySQL', 'Nginx', 'AWS EC2'],
            ['Go', 'Kubernetes', 'Docker', 'PostgreSQL', 'Google Cloud'],
            ['Docker', 'Bash', 'Makefile', 'GitHub Actions', 'Linux'],
            ['React', 'Next.js', 'TailwindCSS', 'Vite', 'Cloudflare'],
        ];

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'summary' => fake()->paragraph(2),
            'challenge' => fake()->paragraphs(3, true),
            'solution' => fake()->paragraphs(3, true),
            'results' => fake()->paragraphs(2, true),
            'tech_stack' => fake()->randomElement($techStacks),
            'image_path' => 'images/case-studies/' . Str::slug($title) . '.png',
            'client_name' => fake()->company(),
            'duration' => fake()->randomElement(['2 Months', '4 Months', '6 Months', '1 Year']),
        ];
    }
}
