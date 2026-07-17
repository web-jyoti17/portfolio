<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jobs = [
            [
                'title' => 'Senior Software Engineer',
                'company' => 'TechCorp Solutions',
                'location' => 'San Francisco, CA',
            ],
            [
                'title' => 'Full Stack Developer',
                'company' => 'InnoWeb Inc.',
                'location' => 'Austin, TX',
            ],
            [
                'title' => 'Software Engineer Intern',
                'company' => 'PixelForge Studio',
                'location' => 'Remote',
            ],
        ];

        $job = fake()->randomElement($jobs);
        $isCurrent = fake()->boolean(20);

        $startDate = fake()->dateTimeBetween('-5 years', '-2 years');
        $endDate = $isCurrent ? null : fake()->dateTimeBetween('-2 years', 'now');

        $achievements = [
            'Led migration from monolith architecture to event-driven microservices.',
            'Improved application response times by 35% through query optimization and Redis caching.',
            'Mentored 4 junior engineers on frontend and backend best practices.',
            'Designed and built critical third-party API integrations, reducing processing errors by 50%.',
            'Implemented CI/CD pipelines using GitHub Actions, cutting deploy times in half.',
        ];

        return [
            'job_title' => $job['title'],
            'company' => $job['company'],
            'location' => $job['location'],
            'start_date' => $startDate,
            'end_date' => $endDate,
            'is_current' => $isCurrent,
            'description' => fake()->paragraph(3),
            'achievements' => fake()->randomElements($achievements, fake()->numberBetween(2, 4)),
        ];
    }
}
