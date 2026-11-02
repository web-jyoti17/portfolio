<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $testimonials = [
            [
                'name' => 'Amit Sharma',
                'company' => 'Quick Coders',
                'position' => 'Senior Project Manager',
                'rating' => 5,
                'review' => 'Lakshmi is an exceptional Full Stack developer. Her expertise in Laravel APIs and React/Next.js frontend development accelerated our project delivery significantly.',
            ],
            [
                'name' => 'Sarah Connor',
                'company' => 'Orvella Studio',
                'position' => 'Creative Director',
                'rating' => 5,
                'review' => 'We hired Lakshmi to build our custom Shopify and Laravel integration. The AI artwork generation feature she implemented works flawlessly and has wowed our clients.',
            ],
            [
                'name' => 'John Doe',
                'company' => 'SaaS Ventures',
                'position' => 'Co-Founder',
                'rating' => 5,
                'review' => 'Lakshmi delivered clean, maintainable code for our medical consult application. Her professionalism and responsiveness were top-notch throughout the project.',
            ],
        ];

        $testimonial = fake()->unique()->randomElement($testimonials);

        return [
            'name' => $testimonial['name'],
            'company' => $testimonial['company'],
            'position' => $testimonial['position'],
            'rating' => $testimonial['rating'],
            'review' => $testimonial['review'],
            'profile_image' => null,
            'is_approved' => true,
        ];
    }
}
