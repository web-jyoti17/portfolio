<?php

namespace Database\Factories;

use App\Models\Certification;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Certification>
 */
class CertificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $certs = [
            ['name' => 'AWS Certified Solutions Architect', 'org' => 'Amazon Web Services (AWS)'],
            ['name' => 'Certified Kubernetes Administrator (CKA)', 'org' => 'The Linux Foundation'],
            ['name' => 'Professional Scrum Master I', 'org' => 'Scrum.org'],
            ['name' => 'Oracle Certified Professional: Java SE Programmer', 'org' => 'Oracle'],
        ];

        $cert = fake()->randomElement($certs);
        $issueDate = fake()->dateTimeBetween('-3 years', 'now');
        $hasExpiration = fake()->boolean(60);

        return [
            'name' => $cert['name'],
            'issuing_organization' => $cert['org'],
            'issue_date' => $issueDate,
            'expiration_date' => $hasExpiration ? fake()->dateTimeBetween($issueDate, '+3 years') : null,
            'credential_id' => strtoupper(Str::random(12)),
            'credential_url' => 'https://verify.certs.dev/' . Str::random(8),
        ];
    }
}
