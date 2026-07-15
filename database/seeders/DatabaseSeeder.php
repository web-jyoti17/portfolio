<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use App\Models\CodeSnippet;
use App\Models\Resource;
use App\Models\Testimonial;
use App\Models\Resume;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create default admin user (Lakshmi)
        User::factory()->create([
            'name' => 'Lakshmi',
            'email' => 'laxmi20024@gmail.com',
            'password' => bcrypt('password'), // Access admin with this password
        ]);

        // 2. Seed Real projects for Lakshmi
        $projects = [
            [
                'title' => 'CMC Telehealth Platform',
                'slug' => 'cmc-telehealth-platform',
                'description' => 'A complete telemedicine platform supporting online and in-person / video consultations for Christian Medical College Ludhiana.',
                'content' => 'Built telemedicine modules for doctors, patients, appointments, prescriptions, and queue management. Developed secure REST APIs for Android and iOS applications. Integrated Whereby Video API for online consultations. Implemented Razorpay payment gateway. Developed Laravel Filament admin dashboard.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://telehealthwebapplive.cmcludhiana.in/admin/dashboard',
                'tech_stack' => ['Laravel', 'Filament', 'REST APIs', 'Razorpay', 'Whereby Video API', 'MySQL'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'CMC Ludhiana',
                'completion_date' => '2024-05-15',
            ],
            [
                'title' => 'DeployMeta Platform',
                'slug' => 'deploymeta-platform',
                'description' => 'Healthcare and education software solutions including support, patient care, appointment management, and operational workflows.',
                'content' => 'Contributed to multiple products under the DeployMeta ecosystem, focusing on Patient & Doctor Portals, Support & Ticket Management, Attendance Management, and Project & Task Management modules using Laravel and Next.js.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://support.deploymeta.com/',
                'tech_stack' => ['Laravel', 'React.js', 'Next.js', 'REST APIs', 'Tailwind CSS'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'DeployMeta',
                'completion_date' => '2024-11-20',
            ],
            [
                'title' => 'Orvella Studio Storefront',
                'slug' => 'orvella-studio',
                'description' => 'A custom Shopify e-commerce storefront integrated with AI-powered generative artwork capabilities.',
                'content' => 'Customized Shopify themes and storefront UI. Developed a custom AI Image Generation application using GPT-Image API. Built Laravel APIs to manage image generation and approval workflows. Implemented a community gallery where users can publish and purchase AI-generated artwork. Improved collection pages, product pages, and storefront performance.',
                'image_path' => null,
                'github_url' => 'https://github.com/CodeSproutX/orvella-studio',
                'live_url' => 'https://orvellastudio.com/',
                'tech_stack' => ['Shopify', 'Laravel', 'Liquid', 'JavaScript', 'AI Integration'],
                'is_featured' => true,
                'is_proprietary' => false,
                'category' => 'Shopify',
                'client_name' => 'Orvella Studio',
                'completion_date' => '2024-02-18',
            ],
            [
                'title' => 'Lisbon Star Tours',
                'slug' => 'lisbon-star',
                'description' => 'A customized tour booking platform integration with Bokun and SendOwl.',
                'content' => 'Developed and maintained a custom tour booking platform. Integrated Bokun booking widgets, SendOwl download deliverables, webhooks, and Google Console APIs for performance optimization.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://www.lisbonstar.pt/',
                'tech_stack' => ['WordPress', 'PHP', 'MySQL', 'Bokun Integration', 'SendOwl Integration', 'Webhooks'],
                'is_featured' => false,
                'is_proprietary' => false,
                'category' => 'WordPress',
                'client_name' => 'Lisbon Star',
                'completion_date' => '2023-08-10',
            ],
            [
                'title' => 'CMC Ludhiana Website',
                'slug' => 'cmc-ludhiana-website',
                'description' => 'The official web presence and information portal of Christian Medical College Ludhiana.',
                'content' => 'Designed and maintained corporate hospital page layouts, clinic directions, doctor rosters, and public resource directories.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://www.cmcludhiana.in/',
                'tech_stack' => ['WordPress', 'PHP', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
                'is_featured' => false,
                'is_proprietary' => false,
                'category' => 'WordPress',
                'client_name' => 'CMC Ludhiana',
                'completion_date' => '2023-12-05',
            ]
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }

        // 3. Seed Case Studies
        CaseStudy::create([
            'title' => 'CMC Telemedicine Platform Architecture',
            'slug' => 'cmc-telemedicine-architecture',
            'summary' => 'How we built a highly scalable video consultation queue and medical billing engine for a tier-1 hospital.',
            'challenge' => 'Christian Medical College needed to quickly pivot online. We had to support live WebRTC calls, handle high-traffic consultation queue numbers, ensure compliance with patient records, and integrate a secure local payment system (Razorpay).',
            'solution' => 'We built a Laravel-based queue and API gateway. The video rooms use Whereby API, which loads WebRTC frames inside the Inertia components. The prescription flows and Filament tables manage doctor queues in real-time, backed by Razorpay Webhooks.',
            'results' => 'Reduced queue waiting time by 40% and successfully routed over 50,000 online and in-person patient bookings with negligible error rate.',
            'tech_stack' => ['Laravel', 'Filament', 'REST APIs', 'Razorpay', 'Whereby API', 'MySQL'],
            'image_path' => null,
            'client_name' => 'CMC Ludhiana',
            'duration' => '6 Months',
        ]);

        CaseStudy::create([
            'title' => 'AI artwork generator for Orvella Studio',
            'slug' => 'orvella-studio-ai-generator',
            'summary' => 'Building a Laravel API backend for Shopify storefronts allowing real-time AI image generation and immediate purchase checkout.',
            'challenge' => 'Orvella Studio wanted users to create custom AI-generated art prints directly on Shopify. We needed to prevent OpenAI key exposure, handle image rendering, and publish products dynamically to Shopify Collections.',
            'solution' => 'Developed a Laravel intermediary API backend that validates customer requests, generates images using DALL-E/GPT-Image APIs, stores assets locally or in S3, and synchronizes product metadata via Shopify webhooks.',
            'results' => 'Increased e-commerce storefront user engagement by 60% and created a new revenue channel based on user-designed artwork.',
            'tech_stack' => ['Shopify', 'Laravel', 'Liquid', 'JavaScript', 'GPT-Image API'],
            'image_path' => null,
            'client_name' => 'Orvella Studio',
            'duration' => '4 Months',
        ]);

        // 4. Seed Skills
        $skills = [
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-laravel', 'color' => '#FF2D20', 'years_of_experience' => 3],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-php', 'color' => '#777BB4', 'years_of_experience' => 3],
            ['name' => 'Laravel Filament', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-cogs', 'color' => '#EAB308', 'years_of_experience' => 2],
            ['name' => 'REST APIs', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fas fa-project-diagram', 'color' => '#008080', 'years_of_experience' => 3],
            ['name' => 'MySQL', 'category' => 'Backend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-database', 'color' => '#4479A1', 'years_of_experience' => 3],
            
            ['name' => 'React.js', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-react', 'color' => '#61DAFB', 'years_of_experience' => 2],
            ['name' => 'Next.js', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-react', 'color' => '#000000', 'years_of_experience' => 2],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-js', 'color' => '#F7DF1E', 'years_of_experience' => 3],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fab fa-css3-alt', 'color' => '#06B6D4', 'years_of_experience' => 3],
            ['name' => 'HTML5 / CSS3', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-html5', 'color' => '#E34F26', 'years_of_experience' => 3],
            
            ['name' => 'WordPress', 'category' => 'CMS & E-commerce', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-wordpress', 'color' => '#21759B', 'years_of_experience' => 2],
            ['name' => 'Shopify & Liquid', 'category' => 'CMS & E-commerce', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-shopify', 'color' => '#96BF48', 'years_of_experience' => 2],
            
            ['name' => 'Docker', 'category' => 'Tools', 'level' => 'intermediate', 'percentage' => 75, 'icon_class' => 'fab fa-docker', 'color' => '#2496ED', 'years_of_experience' => 1],
            ['name' => 'GitHub & Git', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 90, 'icon_class' => 'fab fa-github', 'color' => '#181717', 'years_of_experience' => 3],
            ['name' => 'Cloudflare', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 80, 'icon_class' => 'fas fa-cloud', 'color' => '#F38020', 'years_of_experience' => 2],
        ];

        foreach ($skills as $sk) {
            Skill::create($sk);
        }

        // 5. Seed Experience
        Experience::create([
            'job_title' => 'Full Stack Web Developer',
            'company' => 'Quick Coders',
            'location' => 'Ludhiana, Punjab, India',
            'start_date' => '2022-10-01',
            'is_current' => true,
            'description' => 'Developed and maintained scalable web applications using Laravel, React.js, and Next.js. Designed secure REST APIs, built Laravel Filament admin panels, and customized WordPress and Shopify storefront integrations.',
            'achievements' => [
                'Developed secure REST APIs for web and Flutter mobile applications.',
                'Built Laravel Filament admin panels for healthcare, education, and SaaS platforms.',
                'Customized WordPress and Shopify solutions based on business requirements.',
                'Integrated payment gateways, Google APIs, and third-party services.',
                'Managed deployments using Docker, GitHub, Cloudflare, Hostinger, and Plesk.',
            ],
        ]);

        // 6. Seed Education
        Education::create([
            'degree' => 'Bachelor of Science',
            'field_of_study' => 'Information Technology',
            'institution' => 'Ludhiana College of Engineering & Technology',
            'location' => 'Ludhiana, Punjab, India',
            'start_date' => '2019-07-01',
            'end_date' => '2022-07-01',
            'description' => 'Graduated with core foundations in Software Engineering, Database Systems, Web Development, and Computer Networks.',
        ]);

        // 7. Seed Certifications
        Certification::create([
            'name' => 'Full Stack Web Development',
            'issuing_organization' => 'Quick Coders',
            'issue_date' => '2022-09-15',
            'credential_url' => 'https://quickcoders.in/',
            'skills_covered' => ['Laravel', 'PHP', 'React.js', 'Next.js'],
        ]);

        // 8. Seed Blog posts
        $posts = [
            [
                'title' => 'Building Multi-Tenant SaaS in Laravel',
                'slug' => 'building-multi-tenant-saas-laravel',
                'summary' => 'A deep dive into architecture strategies for building multi-tenant SaaS applications using Laravel, database separation, and domain mapping.',
                'content' => 'Multi-tenancy is a key architecture for SaaS applications. In Laravel, you can choose between single-database or multi-database strategies. Using packages like tenancy/tenancy, you can isolate database connections dynamically based on tenant subdomains. This post covers configuring database connections in config/database.php, resolving domains in request middleware, and running migrations across tenant databases.',
                'tags' => ['Laravel', 'SaaS', 'Database', 'Backend'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Laravel Filament Tips for Rapid Development',
                'slug' => 'laravel-filament-tips-rapid-development',
                'summary' => 'Must-know tips for customizing Filament tables, forms, and relations to deliver modern dashboard user interfaces in half the time.',
                'content' => 'Filament is a game changer for Laravel admins. To optimize tables, use `toggleable()` columns and `selectFilter()`. For relations, implement `RelationManagers` to embed sub-models. Make use of custom widgets to show dashboard analytics instantly.',
                'tags' => ['Laravel', 'Filament', 'Admin Dashboard'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'REST API Best Practices',
                'slug' => 'rest-api-best-practices',
                'summary' => 'A guide to designing secure, self-documenting REST APIs with standardized JSON response payloads and OAuth2/Sanctum authentication.',
                'content' => 'When designing REST APIs, consistency is vital. Use proper HTTP verbs (GET, POST, PUT, DELETE), return standard JSON response structures (e.g. data, errors, links), implement rate limiting, and protect routes using Laravel Sanctum.',
                'tags' => ['REST APIs', 'Backend', 'Security', 'Laravel'],
                'status' => 'published',
                'published_at' => now(),
            ]
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }

        // 9. Seed Code Snippets, Resources, Testimonials, Resumes
        CodeSnippet::factory(3)->create();
        Resource::factory(3)->create();
        Testimonial::factory(3)->create();
        Resume::factory(3)->create();
    }
}
