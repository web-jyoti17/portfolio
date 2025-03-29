<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profile = Profile::first();

        if (!$profile) {
            return;
        }

        $experiences = [
            [
                'company' => 'Tech Solutions Inc.',
                'position' => 'Senior Full Stack Developer',
                'description' => '<p>Led development of enterprise-level applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented best practices.</p><ul><li>Led a team of 5 developers in building a scalable microservices architecture</li><li>Implemented CI/CD pipelines reducing deployment time by 60%</li><li>Developed real-time analytics dashboard processing 1M+ events daily</li></ul>',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'location' => 'San Francisco, CA'
            ],
            [
                'company' => 'Digital Innovations',
                'position' => 'Full Stack Developer',
                'description' => '<p>Developed and maintained multiple web applications using modern technologies. Improved application performance by 40% through optimization techniques.</p><ul><li>Implemented automated testing increasing coverage to 85%</li><li>Developed RESTful APIs serving 100K+ daily requests</li></ul>',
                'start_date' => '2021-03-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'location' => 'Austin, TX'
            ],
            [
                'company' => 'Web Solutions',
                'position' => 'Frontend Developer',
                'description' => '<p>Created responsive and interactive user interfaces using React and modern CSS frameworks. Collaborated with design team to implement pixel-perfect designs.</p><ul><li>Built responsive UI components used across 10+ projects</li><li>Reduced bundle size by 30% through code optimization</li><li>Implemented PWA features increasing user engagement by 25%</li></ul>',
                'start_date' => '2019-06-01',
                'end_date' => '2021-02-28',
                'is_current' => false,
                'location' => 'Seattle, WA'
            ]
        ];

        foreach ($experiences as $experience) {
            Experience::create([
                'profile_id' => $profile->id,
                ...$experience
            ]);
        }
    }
}
