<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::create([
            'name' => 'John Doe',
            'title' => 'Full Stack Developer',
            'bio' => 'Experienced full-stack developer with a passion for creating elegant, efficient solutions.',
            'email' => 'john@example.com',
            'phone' => '+1 (555) 123-4567',
            'location' => 'New York, NY',
            'github' => 'https://github.com/johndoe',
            'linkedin' => 'https://linkedin.com/in/johndoe',
            'twitter' => 'https://twitter.com/johndoe'
        ]);
    }
} 