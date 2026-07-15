<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->unique()->randomElement([
            'E-Commerce Microservices Engine',
            'Real-Time Collaborative Dashboard',
            'SaaS Multi-Tenant Boilerplate',
            'AI-Powered Predictive Analytics Tool',
            'Decentralized Asset Management Portal',
            'Cloud Native Monitoring Agent',
            'High-Throughput Message Queue API',
            'Interactive Resume Builder CLI',
        ]);

        $categories = ['Web Platform', 'Mobile App', 'Infrastructure', 'Developer Tooling'];
        $techStacks = [
            ['Laravel', 'React', 'TypeScript', 'MySQL', 'TailwindCSS'],
            ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
            ['Go', 'gRPC', 'Kubernetes', 'Prometheus', 'AWS'],
            ['Python', 'FastAPI', 'PyTorch', 'PostgreSQL', 'Docker'],
            ['React Native', 'Expo', 'Firebase', 'Redux Toolkit'],
        ];

        $isProprietary = fake()->boolean(25); // 25% chance of being proprietary
        $clientName = $isProprietary ? fake()->company() : null;

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraph(2),
            'content' => fake()->paragraphs(4, true),
            'image_path' => 'images/projects/' . Str::slug($title) . '.png',
            'github_url' => $isProprietary ? null : 'https://github.com/developer/' . Str::slug($title),
            'live_url' => $isProprietary ? null : 'https://' . Str::slug($title) . '.demo.dev',
            'tech_stack' => fake()->randomElement($techStacks),
            'is_featured' => fake()->boolean(20), // 20% chance of featured
            'is_proprietary' => $isProprietary,
            'category' => fake()->randomElement($categories),
            'client_name' => $clientName,
            'completion_date' => fake()->dateTimeBetween('-2 years', 'now'),
        ];
    }
}
