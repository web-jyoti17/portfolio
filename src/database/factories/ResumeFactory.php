<?php

namespace Database\Factories;

use App\Models\Resume;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResumeFactory extends Factory
{
    protected $model = Resume::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $resumes = [
            [
                'name' => 'Lakshmi - Full Stack Resume',
                'file_path' => 'resumes/lakshmi_fullstack_resume.pdf',
                'category' => 'Full Stack Developer',
            ],
            [
                'name' => 'Lakshmi - Laravel Specialist Resume',
                'file_path' => 'resumes/lakshmi_laravel_specialist_resume.pdf',
                'category' => 'Laravel Backend Developer',
            ],
            [
                'name' => 'Lakshmi - Shopify & Frontend Resume',
                'file_path' => 'resumes/lakshmi_shopify_frontend_resume.pdf',
                'category' => 'Shopify & Frontend Developer',
            ],
        ];

        $res = fake()->unique()->randomElement($resumes);

        return [
            'name' => $res['name'],
            'file_path' => $res['file_path'],
            'category' => $res['category'],
            'download_count' => fake()->numberBetween(10, 150),
            'is_active' => true,
        ];
    }
}
