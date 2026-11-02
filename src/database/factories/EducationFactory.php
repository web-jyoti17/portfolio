<?php

namespace Database\Factories;

use App\Models\Education;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Education>
 */
class EducationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $degrees = [
            [
                'degree' => 'Bachelor of Science',
                'field' => 'Computer Science & Engineering',
                'inst' => 'State Tech University',
            ],
            [
                'degree' => 'Master of Science',
                'field' => 'Software Engineering',
                'inst' => 'Global Institute of Technology',
            ],
        ];

        $edu = fake()->randomElement($degrees);

        return [
            'degree' => $edu['degree'],
            'field_of_study' => $edu['field'],
            'institution' => $edu['inst'],
            'location' => fake()->city().', '.fake()->stateAbbr(),
            'start_date' => fake()->dateTimeBetween('-8 years', '-4 years'),
            'end_date' => fake()->dateTimeBetween('-4 years', '-1 year'),
            'description' => fake()->paragraph(),
        ];
    }
}
