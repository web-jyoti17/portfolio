<?php

namespace Database\Factories;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $skills = [
            ['name' => 'Laravel', 'category' => 'Backend', 'icon_class' => 'fab fa-laravel'],
            ['name' => 'PHP', 'category' => 'Backend', 'icon_class' => 'fab fa-php'],
            ['name' => 'React', 'category' => 'Frontend', 'icon_class' => 'fab fa-react'],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'icon_class' => 'devicon-typescript-plain'],
            ['name' => 'MySQL', 'category' => 'Backend', 'icon_class' => 'fas fa-database'],
            ['name' => 'Docker', 'category' => 'DevOps', 'icon_class' => 'fab fa-docker'],
            ['name' => 'Kubernetes', 'category' => 'DevOps', 'icon_class' => 'devicon-kubernetes-plain'],
            ['name' => 'Git', 'category' => 'Tools', 'icon_class' => 'fab fa-git-alt'],
            ['name' => 'Node.js', 'category' => 'Backend', 'icon_class' => 'fab fa-node-js'],
            ['name' => 'TailwindCSS', 'category' => 'Frontend', 'icon_class' => 'fab fa-css3-alt'],
        ];

        $skill = fake()->unique()->randomElement($skills);
        $percentage = fake()->numberBetween(60, 95);
        
        $level = 'intermediate';
        if ($percentage >= 90) {
            $level = 'expert';
        } elseif ($percentage >= 80) {
            $level = 'advanced';
        }

        return [
            'name' => $skill['name'],
            'category' => $skill['category'],
            'level' => $level,
            'percentage' => $percentage,
            'icon_class' => $skill['icon_class'],
        ];
    }
}
