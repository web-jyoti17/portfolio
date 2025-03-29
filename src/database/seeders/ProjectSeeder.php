<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Portfolio Website',
                'description' => 'A modern portfolio website built with Laravel, React, and Tailwind CSS. Features include a responsive design, dark mode, and a contact form.',
                'image' => 'https://via.placeholder.com/800x600',
                'github_url' => 'https://github.com/yourusername/portfolio',
                'live_url' => 'https://yourportfolio.com',
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'E-commerce Platform',
                'description' => 'A full-featured e-commerce platform with product management, shopping cart, and payment integration.',
                'image' => 'https://via.placeholder.com/800x600',
                'github_url' => 'https://github.com/yourusername/ecommerce',
                'live_url' => 'https://yourstore.com',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Redis'],
                'is_featured' => true,
                'order' => 2
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A collaborative task management application with real-time updates and team collaboration features.',
                'image' => 'https://via.placeholder.com/800x600',
                'github_url' => 'https://github.com/yourusername/taskmanager',
                'live_url' => 'https://tasks.yourdomain.com',
                'technologies' => ['Laravel', 'React', 'WebSocket', 'PostgreSQL'],
                'is_featured' => false,
                'order' => 3
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
