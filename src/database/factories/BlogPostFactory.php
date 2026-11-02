<?php

namespace Database\Factories;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->unique()->randomElement([
            'Optimizing Database Queries in Laravel 12',
            'A Complete Guide to Dockerizing React & Node Services',
            'Mastering CSS Grid & Flexbox Layouts for Modern Web Apps',
            'Why We Migrated from REST to GraphQL and How It Went',
            'Getting Started with Inertia.js: The Modern Monolith',
            'Securing Laravel API Endpoints with Passkey Authentication',
            'Building Reusable React Components with Tailwind CSS',
            'An Introduction to Test-Driven Development (TDD) in PHP',
        ]);

        $tags = [
            ['Laravel', 'PHP', 'Database'],
            ['Docker', 'React', 'DevOps'],
            ['CSS', 'Frontend', 'Design'],
            ['API', 'GraphQL', 'REST'],
            ['Inertia.js', 'React', 'PHP'],
            ['Security', 'Auth', 'Laravel'],
            ['Testing', 'PHPUnit', 'QA'],
        ];

        $status = fake()->randomElement(['published', 'draft']);
        $publishedAt = $status === 'published' ? fake()->dateTimeBetween('-1 year', 'now') : null;

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'summary' => fake()->paragraph(2),
            'content' => fake()->paragraphs(6, true),
            'cover_image' => 'images/blog/'.Str::slug($title).'.png',
            'tags' => fake()->randomElement($tags),
            'status' => $status,
            'published_at' => $publishedAt,
        ];
    }
}
