<?php

namespace Database\Factories;

use App\Models\Resource;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResourceFactory extends Factory
{
    protected $model = Resource::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $resources = [
            [
                'name' => 'Laravel Filament Admin Panel Documentation',
                'category' => 'Laravel Packages',
                'url' => 'https://filamentphp.com/docs',
                'description' => 'Official docs for building rapid admin panels, tables, and form components in Laravel.',
                'image_path' => null,
                'tags' => ['laravel', 'filament', 'admin'],
                'is_featured' => true,
            ],
            [
                'name' => 'Lucide Icons Collection',
                'category' => 'Design Resources',
                'url' => 'https://lucide.dev',
                'description' => 'Beautiful, open-source pixel-perfect icons for React, web, and layout designs.',
                'image_path' => null,
                'tags' => ['design', 'icons', 'react'],
                'is_featured' => false,
            ],
            [
                'name' => 'Postman API Testing Tool',
                'category' => 'API Testing Tools',
                'url' => 'https://www.postman.com',
                'description' => 'An extensible platform for designing, building, and mock testing REST APIs.',
                'image_path' => null,
                'tags' => ['api', 'testing', 'postman'],
                'is_featured' => true,
            ],
        ];

        $res = fake()->unique()->randomElement($resources);

        return [
            'name' => $res['name'],
            'category' => $res['category'],
            'url' => $res['url'],
            'description' => $res['description'],
            'image_path' => $res['image_path'],
            'tags' => $res['tags'],
            'is_featured' => $res['is_featured'],
        ];
    }
}
