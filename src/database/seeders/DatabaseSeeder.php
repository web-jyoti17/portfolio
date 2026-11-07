<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Certification;
use App\Models\CodeSnippet;
use App\Models\Education;
use App\Models\Experience;
use App\Models\HeaderSetting;
use App\Models\Project;
use App\Models\Resource;
use App\Models\Resume;
use App\Models\Section;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Truncate tables to make seeding idempotent
        Schema::disableForeignKeyConstraints();

        User::truncate();
        Project::truncate();
        CaseStudy::truncate();
        Skill::truncate();
        Experience::truncate();
        Education::truncate();
        Certification::truncate();
        BlogPost::truncate();
        CodeSnippet::truncate();
        Resource::truncate();
        Testimonial::truncate();
        Resume::truncate();
        Section::truncate();
        HeaderSetting::truncate();

        Schema::enableForeignKeyConstraints();

        // 1. Create default admin user (Jyoti)
        User::factory()->create([
            'name' => 'Jyoti',
            'email' => 'jyotika0617@gmail.com',
            'password' => bcrypt('Jyoti!@#456'),
        ]);

        // 2. Site settings. Empty strings replace the built-in defaults; add your profile links in the admin.
        HeaderSetting::create([
            'logo_text' => 'Jyoti.dev',
            'tagline' => 'Senior Full Stack Developer building scalable web applications and multi-tenant SaaS platforms with Laravel, React.js and Node.js.',
            'location' => 'Ludhiana, Punjab, India',
            'github_url' => '',
            'linkedin_url' => '',
            'github_username' => '',
            'contact_notification_email' => 'jyotika0617@gmail.com',
            'seo_title' => 'Jyoti | Senior Full Stack Developer (Laravel, PHP, React.js, Node.js, AWS)',
            'seo_description' => 'Portfolio of Jyoti, a Senior Full Stack Developer with 7+ years of experience in Laravel, PHP, React.js, Node.js, multi-tenant SaaS, RESTful APIs, payment integrations and AWS deployments.',
        ]);

        // 3. Seed projects (Key Projects from the resume)
        $projects = [
            [
                'title' => 'Rydeus – Ride-Hailing Platform',
                'slug' => 'rydeus-ride-hailing-platform',
                'description' => 'A real-time ride-hailing platform with Laravel APIs and a React.js front end.',
                'content' => 'Rydeus is a real-time ride-hailing platform. Laravel provides the RESTful APIs that handle the platform\'s business logic and data, and a React.js front end consumes them to give riders and operators a responsive interface.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'React.js', 'RESTful APIs', 'MySQL'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Rydeus',
                'completion_date' => null,
            ],
            [
                'title' => 'Bunch HRMS',
                'slug' => 'bunch-hrms',
                'description' => 'A full-featured HR management system covering payroll processing and employee tracking.',
                'content' => 'Bunch HRMS is a full-featured human resource management system built on Laravel. It covers payroll processing and employee tracking, bringing day-to-day HR operations into a single application.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'PHP', 'MySQL'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Bunch',
                'completion_date' => null,
            ],
            [
                'title' => 'Limousine Booking & Fleet Management',
                'slug' => 'limousine-booking-fleet-management',
                'description' => 'Online booking and fleet management systems for Kitchener Limousine and Sapphire Limo.',
                'content' => 'Built online booking and fleet management systems in Laravel for two limousine operators, Kitchener Limousine and Sapphire Limo, so customers can book online and operators can manage their fleets from one system.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'PHP', 'MySQL'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Kitchener Limousine, Sapphire Limo',
                'completion_date' => null,
            ],
            [
                'title' => 'Social Media Automation',
                'slug' => 'social-media-automation',
                'description' => 'Cross-platform content sharing and marketing automation workflows for Job Progress (Leap) and KW Integration.',
                'content' => 'Built cross-platform content sharing and marketing automation workflows on Laravel, integrating third-party social media APIs for Job Progress (Leap) and KW Integration.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'Third-party APIs', 'Webhooks', 'Queues'],
                'is_featured' => false,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Job Progress (Leap), KW Integration',
                'completion_date' => null,
            ],
            [
                'title' => 'Attendance Tracking & Analytics System',
                'slug' => 'attendance-tracking-analytics-system',
                'description' => 'A real-time attendance tracking and analytics system.',
                'content' => 'A real-time attendance tracking system with analytics, giving teams a live view of attendance and the reporting to go with it.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'MySQL'],
                'is_featured' => false,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => null,
                'completion_date' => null,
            ],
            [
                'title' => 'Donation & Volunteer Management Platform',
                'slug' => 'donation-volunteer-management-platform',
                'description' => 'A platform for managing donations and volunteers.',
                'content' => 'A web platform for managing donations and volunteers in one place.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'MySQL'],
                'is_featured' => false,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => null,
                'completion_date' => null,
            ],
            [
                'title' => 'Secure Sales Lead Management System',
                'slug' => 'secure-sales-lead-management-system',
                'description' => 'A secure system for managing sales leads.',
                'content' => 'A secure sales lead management system for capturing, tracking and following up on leads.',
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'MySQL'],
                'is_featured' => false,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => null,
                'completion_date' => null,
            ],
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }

        // 4. Seed Case Studies
        CaseStudy::create([
            'title' => 'Multi-Tenant SaaS with Tenant Data Isolation',
            'slug' => 'multi-tenant-saas-tenant-data-isolation',
            'summary' => 'Designed tenant-isolated SaaS modules with stancl/tenancy, serving 10+ client environments with custom domains.',
            'challenge' => 'Several clients needed to run on the same SaaS product while keeping their data completely separate and serving the application from their own domains.',
            'solution' => 'Designed the SaaS modules on stancl/tenancy, implementing tenant data isolation and custom domain mapping so each client environment is identified by its domain and works only with its own data.',
            'results' => 'The modules serve 10+ client environments, each with isolated data and its own domain.',
            'tech_stack' => ['Laravel', 'stancl/tenancy', 'MySQL', 'Redis'],
            'image_path' => null,
            'client_name' => 'LN Webworks clients',
            'duration' => null,
        ]);

        CaseStudy::create([
            'title' => 'Cutting Query Execution Time by 30%',
            'slug' => 'cutting-query-execution-time-30-percent',
            'summary' => 'Reduced query execution time by 30% through query optimization and database indexing.',
            'challenge' => 'Slow database queries were holding back the client applications and the RESTful APIs that served their React.js front ends.',
            'solution' => 'Analysed the slowest queries, rewrote them to do less work, and added database indexes that match how the data is filtered and sorted.',
            'results' => 'Query execution time dropped by 30%.',
            'tech_stack' => ['Laravel', 'MySQL', 'Database Indexing', 'RESTful APIs'],
            'image_path' => null,
            'client_name' => 'Infino Digital Agency',
            'duration' => null,
        ]);

        CaseStudy::create([
            'title' => 'Automated Containerized Deployments on AWS',
            'slug' => 'automated-containerized-deployments-aws',
            'summary' => 'Replaced manual deployments with Docker-based CI/CD pipelines on AWS ECS, S3 and RDS.',
            'challenge' => 'Releases were deployed by hand, which made them slow and inconsistent between environments.',
            'solution' => 'Containerized the applications with Docker and automated CI/CD pipelines that build and deploy them to AWS, using ECS for the containers, S3 for files and RDS for the database.',
            'results' => 'Manual deployments were replaced with consistent, repeatable releases.',
            'tech_stack' => ['Docker', 'AWS ECS', 'AWS S3', 'AWS RDS', 'CI/CD'],
            'image_path' => null,
            'client_name' => 'LN Webworks clients',
            'duration' => null,
        ]);

        // 5. Seed Skills
        $skills = [
            // Backend
            ['name' => 'PHP 8', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-php', 'color' => '#777BB4', 'years_of_experience' => 7],
            ['name' => 'Laravel (10/11)', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-laravel', 'color' => '#FF2D20', 'years_of_experience' => 7],
            ['name' => 'Lumen Microservices', 'category' => 'Backend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-bolt', 'color' => '#E74430', 'years_of_experience' => 3],
            ['name' => 'Node.js', 'category' => 'Backend', 'level' => 'advanced', 'percentage' => 80, 'icon_class' => 'fab fa-node-js', 'color' => '#339933', 'years_of_experience' => 0],
            ['name' => 'Python', 'category' => 'Backend', 'level' => 'intermediate', 'percentage' => 65, 'icon_class' => 'fab fa-python', 'color' => '#3776AB', 'years_of_experience' => 0],
            ['name' => 'RESTful APIs and Webhooks', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fas fa-link', 'color' => '#008080', 'years_of_experience' => 7],
            ['name' => 'Queues and Laravel Horizon', 'category' => 'Backend', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fas fa-layer-group', 'color' => '#405263', 'years_of_experience' => 0],

            // Frontend
            ['name' => 'React.js', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-react', 'color' => '#61DAFB', 'years_of_experience' => 0],
            ['name' => 'Livewire', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-bolt', 'color' => '#FB70A9', 'years_of_experience' => 0],
            ['name' => 'Filament', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-cogs', 'color' => '#EAB308', 'years_of_experience' => 0],
            ['name' => 'JavaScript, HTML5, CSS3', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-js', 'color' => '#F7DF1E', 'years_of_experience' => 7],
            ['name' => 'Material UI, Bootstrap 5, jQuery', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-bootstrap', 'color' => '#7952B3', 'years_of_experience' => 0],

            // Databases & Caching
            ['name' => 'MySQL', 'category' => 'Databases & Caching', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fas fa-database', 'color' => '#4479A1', 'years_of_experience' => 7],
            ['name' => 'PostgreSQL', 'category' => 'Databases & Caching', 'level' => 'advanced', 'percentage' => 78, 'icon_class' => 'fas fa-database', 'color' => '#4169E1', 'years_of_experience' => 0],
            ['name' => 'MongoDB', 'category' => 'Databases & Caching', 'level' => 'intermediate', 'percentage' => 70, 'icon_class' => 'fas fa-leaf', 'color' => '#47A248', 'years_of_experience' => 0],
            ['name' => 'Redis', 'category' => 'Databases & Caching', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-server', 'color' => '#DC382D', 'years_of_experience' => 0],

            // Architecture & Security
            ['name' => 'Multi-Tenant SaaS (stancl/tenancy)', 'category' => 'Architecture & Security', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-building', 'color' => '#6366F1', 'years_of_experience' => 0],
            ['name' => 'Role-Based Access Control', 'category' => 'Architecture & Security', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-user-shield', 'color' => '#0EA5E9', 'years_of_experience' => 0],
            ['name' => 'OAuth2, JWT, Laravel Passport', 'category' => 'Architecture & Security', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fas fa-key', 'color' => '#F59E0B', 'years_of_experience' => 0],
            ['name' => 'SOLID Principles and Clean Code', 'category' => 'Architecture & Security', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-code', 'color' => '#10B981', 'years_of_experience' => 0],

            // Cloud & DevOps
            ['name' => 'Docker', 'category' => 'Cloud & DevOps', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-docker', 'color' => '#2496ED', 'years_of_experience' => 0],
            ['name' => 'AWS (ECS, S3, RDS)', 'category' => 'Cloud & DevOps', 'level' => 'advanced', 'percentage' => 82, 'icon_class' => 'fab fa-aws', 'color' => '#FF9900', 'years_of_experience' => 0],
            ['name' => 'CI/CD, Git, GitHub, GitLab', 'category' => 'Cloud & DevOps', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-git-alt', 'color' => '#F05032', 'years_of_experience' => 7],
            ['name' => 'n8n and Make.com Automation', 'category' => 'Cloud & DevOps', 'level' => 'advanced', 'percentage' => 80, 'icon_class' => 'fas fa-project-diagram', 'color' => '#EA4B71', 'years_of_experience' => 0],

            // Tools
            ['name' => 'Stripe, Razorpay, Braintree, Plaid', 'category' => 'Tools', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-credit-card', 'color' => '#6772E5', 'years_of_experience' => 0],
            ['name' => 'Firebase, Google Maps, Mailchimp, Facebook Graph API', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-plug', 'color' => '#F59E0B', 'years_of_experience' => 0],
            ['name' => 'PHPUnit and JIRA', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 82, 'icon_class' => 'fas fa-vial', 'color' => '#3C9CD7', 'years_of_experience' => 0],
        ];

        foreach ($skills as $sk) {
            Skill::create($sk);
        }

        // 6. Seed Experience
        Experience::create([
            'job_title' => 'Senior Software Developer',
            'company' => 'LN Webworks Pvt. Ltd.',
            'location' => 'Ludhiana, Punjab, India',
            'start_date' => '2022-02-01',
            'is_current' => true,
            'description' => 'Lead end-to-end delivery of enterprise web applications on Laravel 11, React.js and Node.js, from requirements and architecture through deployment and production support.',
            'achievements' => [
                'Designed multi-tenant SaaS modules with stancl/tenancy, implementing tenant data isolation and custom domain mapping across 10+ client environments.',
                'Built Filament admin panels with role-based access control, dynamic forms and real-time analytics dashboards, replacing manual admin and reporting work for clients.',
                'Developed Livewire components for real-time validation, form submission and live dashboard updates, removing full page reloads from key user workflows.',
                'Led API architecture for third-party integrations, including webhooks, social media APIs and Stripe/Razorpay payment flows.',
                'Automated CI/CD pipelines with Docker and AWS (ECS, S3, RDS), replacing manual deployments with consistent, repeatable releases.',
                'Mentor junior developers through code reviews and guidance on Laravel best practices, clean code and SOLID principles.',
            ],
        ]);

        Experience::create([
            'job_title' => 'Software Developer',
            'company' => 'Infino Digital Agency',
            'location' => 'Ludhiana, Punjab, India',
            'start_date' => '2021-08-01',
            'end_date' => '2022-02-01',
            'is_current' => false,
            'description' => 'Built RESTful APIs and real-time interfaces for multiple client projects.',
            'achievements' => [
                'Reduced query execution time by 30% through query optimization and database indexing.',
                'Designed RESTful APIs powering React.js front ends for multiple client projects.',
                'Built hybrid interfaces combining Material UI and Livewire components for real-time updates.',
                'Integrated Mailchimp, Facebook Graph API and Google Maps to extend platform features.',
            ],
        ]);

        Experience::create([
            'job_title' => 'Laravel Developer',
            'company' => 'Logiciel Solutions',
            'location' => 'Ludhiana, Punjab, India',
            'start_date' => '2018-10-01',
            'end_date' => '2021-07-01',
            'is_current' => false,
            'description' => 'Built and maintained Laravel applications for client projects, with a focus on backend architecture and performance.',
            'achievements' => [
                'Developed lightweight Lumen microservices for high-throughput API delivery.',
                'Implemented Redis caching and Horizon-managed queues to move heavy processing to background jobs and improve reliability.',
                'Delivered Facebook, Twitter and Mailchimp API integrations for marketing and social features.',
            ],
        ]);

        // 7. Seed Education (the resume gives the completion year; start dates assume the standard course length)
        Education::create([
            'degree' => 'Master of Computer Applications (MCA)',
            'field_of_study' => 'Computer Applications',
            'institution' => 'Lovely Professional University',
            'location' => 'Phagwara, Punjab, India',
            'start_date' => '2015-07-01',
            'end_date' => '2017-06-01',
            'description' => null,
        ]);

        Education::create([
            'degree' => 'Bachelor of Science (B.Sc.)',
            'field_of_study' => 'Information Technology',
            'institution' => 'Lovely Professional University',
            'location' => 'Phagwara, Punjab, India',
            'start_date' => '2012-07-01',
            'end_date' => '2015-06-01',
            'description' => null,
        ]);

        // 8. Seed Blog posts
        $posts = [
            [
                'title' => 'Multi-Tenant Laravel with stancl/tenancy: Isolating Data per Client',
                'slug' => 'multi-tenant-laravel-stancl-tenancy-data-isolation',
                'summary' => 'How to identify tenants by domain and keep each client\'s data separate in a Laravel SaaS.',
                'content' => "When several clients share one SaaS product, every request has to answer one question first: which tenant is this?\n\nWith stancl/tenancy, the tenant is identified from the domain, and tenancy is initialized before your routes run:\n\nRoute::middleware(['web', InitializeTenancyByDomain::class, PreventAccessFromCentralDomains::class])\n    ->group(base_path('routes/tenant.php'));\n\nOnce tenancy is initialized, database queries, cache and file storage are scoped to that tenant. Custom domains are just extra domain records on the tenant, so each client can use their own address without any change to the application code.",
                'tags' => ['Laravel', 'SaaS', 'Multi-Tenancy', 'stancl/tenancy'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Moving Heavy Work to Queues with Redis and Laravel Horizon',
                'slug' => 'heavy-work-queues-redis-laravel-horizon',
                'summary' => 'Keep requests fast by pushing slow processing to background jobs, and watch them with Horizon.',
                'content' => "Sending emails, calling third-party APIs and generating reports do not need to happen while the user waits. Dispatch them as jobs instead:\n\nProcessReport::dispatch(\$report);\n\nWith Redis as the queue connection, Laravel Horizon runs the workers and gives you a dashboard for throughput, failed jobs and retries. Configure the number of processes per queue in config/horizon.php, give slow jobs their own queue so they never block quick ones, and set tries and backoff on each job so temporary API failures recover on their own.",
                'tags' => ['Laravel', 'Redis', 'Horizon', 'Queues'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Finding and Fixing Slow Queries with Database Indexes',
                'slug' => 'finding-fixing-slow-queries-database-indexes',
                'summary' => 'A practical approach to query optimization: measure, explain, then index what you filter and sort on.',
                'content' => "Before changing any code, find out which queries are slow. Laravel's query log or Telescope shows the queries a page runs and how long each one takes.\n\nRun EXPLAIN on the slowest ones. A full table scan on a column you filter by is the usual sign that an index is missing:\n\nSchema::table('orders', function (Blueprint \$table) {\n    \$table->index(['status', 'created_at']);\n});\n\nMatch composite indexes to how the query filters and sorts, select only the columns you need, and eager load relationships to avoid N+1 queries. Measure again after each change so you know what actually helped.",
                'tags' => ['MySQL', 'Performance', 'Laravel', 'Indexing'],
                'status' => 'published',
                'published_at' => now(),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }

        // 9. Seed Code Snippets
        $snippets = [
            [
                'title' => 'stancl/tenancy: Tenant Routes Identified by Domain',
                'slug' => 'stancl-tenancy-domain-tenant-routes',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'Route setup for a multi-tenant Laravel app. Each request is matched to a tenant by its domain, and the central domains cannot reach tenant routes.',
                'code' => '<?php

// routes/tenant.php

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::middleware([
    \'web\',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get(\'/\', function () {
        return \'Tenant: \'.tenant(\'id\');
    });
});

// Creating a tenant with a custom domain
$tenant = \App\Models\Tenant::create([\'id\' => \'acme\']);
$tenant->domains()->create([\'domain\' => \'portal.acme.com\']);',
                'tags' => ['laravel', 'multi-tenancy', 'stancl-tenancy', 'saas'],
            ],
            [
                'title' => 'Razorpay: Verify a Payment Signature in Laravel',
                'slug' => 'razorpay-verify-payment-signature-laravel',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'Confirm a Razorpay payment on the server before marking an order as paid. Never trust the browser alone.',
                'code' => '<?php

$expected = hash_hmac(
    \'sha256\',
    $request->input(\'razorpay_order_id\').\'|\'.$request->input(\'razorpay_payment_id\'),
    config(\'services.razorpay.secret\'),
);

abort_unless(
    hash_equals($expected, (string) $request->input(\'razorpay_signature\')),
    422,
    \'Invalid payment signature.\'
);

$order->update([\'paid_at\' => now()]);',
                'tags' => ['laravel', 'razorpay', 'payments', 'security'],
            ],
            [
                'title' => 'Laravel Horizon: Separate Queues for Fast and Slow Jobs',
                'slug' => 'laravel-horizon-separate-queues',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A Horizon supervisor setup that keeps slow jobs (reports, API syncs) from blocking quick ones (emails, notifications).',
                'code' => '<?php

// config/horizon.php
\'environments\' => [
    \'production\' => [
        \'fast\' => [
            \'connection\' => \'redis\',
            \'queue\' => [\'default\', \'notifications\'],
            \'balance\' => \'auto\',
            \'maxProcesses\' => 10,
            \'tries\' => 3,
        ],
        \'slow\' => [
            \'connection\' => \'redis\',
            \'queue\' => [\'reports\', \'sync\'],
            \'balance\' => \'simple\',
            \'maxProcesses\' => 3,
            \'timeout\' => 600,
            \'tries\' => 5,
        ],
    ],
],

// Dispatch a slow job to its own queue
GenerateReport::dispatch($report)->onQueue(\'reports\');',
                'tags' => ['laravel', 'horizon', 'redis', 'queues'],
            ],
            [
                'title' => 'Filament: Role-Based Access to Resources',
                'slug' => 'filament-role-based-access-resources',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'Limit who can open the admin panel and what each role can see, using Filament\'s access checks and Laravel policies.',
                'code' => '<?php

// app/Models/User.php
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasAnyRole([\'admin\', \'manager\']);
    }
}

// app/Policies/InvoicePolicy.php
class InvoicePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole([\'admin\', \'manager\']);
    }

    public function delete(User $user, Invoice $invoice): bool
    {
        return $user->hasRole(\'admin\');
    }
}

// Filament resources use the model\'s policy automatically.',
                'tags' => ['filament', 'laravel', 'rbac', 'security'],
            ],
        ];

        foreach ($snippets as $snip) {
            CodeSnippet::create($snip);
        }

        // Seed Developer Toolkit resources
        $resources = [
            ['name' => 'Laravel Filament Panel', 'category' => 'Laravel Packages', 'url' => 'https://filamentphp.com/', 'description' => 'Use Filament when you need admin forms, tables, filters and dashboards quickly inside a Laravel project. Define resources, then manage CRUD screens and internal tools from one panel.', 'is_featured' => true],
            ['name' => 'stancl/tenancy', 'category' => 'Laravel Packages', 'url' => 'https://tenancyforlaravel.com/', 'description' => 'Use Tenancy for Laravel to build multi-tenant SaaS applications. It identifies the tenant from the domain or subdomain and scopes the database, cache and storage to that tenant.', 'is_featured' => true],
            ['name' => 'Laravel Horizon', 'category' => 'Laravel Packages', 'url' => 'https://laravel.com/docs/horizon', 'description' => 'Use Horizon to run and monitor Redis queues. It shows throughput, runtime and failed jobs, and lets you configure workers per queue in code.', 'is_featured' => true],
            ['name' => 'Livewire', 'category' => 'Laravel Packages', 'url' => 'https://livewire.laravel.com/', 'description' => 'Use Livewire to build dynamic interfaces in Blade without writing a separate JavaScript front end. Useful for real-time validation, forms and live dashboards.', 'is_featured' => true],
            ['name' => 'Laravel Telescope', 'category' => 'Laravel Packages', 'url' => 'https://laravel.com/docs/telescope', 'description' => 'Use Telescope during development to inspect requests, jobs, logs, exceptions, mail and database queries. Install it in non-production environments when debugging.', 'is_featured' => true],
            ['name' => 'Laravel Pint', 'category' => 'Laravel Packages', 'url' => 'https://laravel.com/docs/pint', 'description' => 'Use Pint to format your Laravel and PHP code before committing, so the whole team follows the same style.', 'is_featured' => true],
            ['name' => 'Postman Client', 'category' => 'API Testing Tools', 'url' => 'https://www.postman.com/', 'description' => 'Use Postman to test REST APIs, headers, tokens, request bodies and webhook endpoints. Create collections for repeated requests and environments for local, staging and production.', 'is_featured' => true],
            ['name' => 'Docker Desktop', 'category' => 'Deployment Tools', 'url' => 'https://www.docker.com/', 'description' => 'Use Docker Desktop to run containers locally, build images and manage Compose services, so your local environment matches production.', 'is_featured' => true],
            ['name' => 'Amazon ECS', 'category' => 'Deployment Tools', 'url' => 'https://aws.amazon.com/ecs/', 'description' => 'Use ECS to run Docker containers on AWS. Pair it with RDS for the database and S3 for file storage, and deploy new images from your CI/CD pipeline.', 'is_featured' => true],
            ['name' => 'n8n', 'category' => 'Automation Tools', 'url' => 'https://n8n.io/', 'description' => 'Use n8n to automate workflows between apps and APIs with a visual editor. It can be self-hosted, and it calls webhooks in your own application.', 'is_featured' => true],
            ['name' => 'PHP Intelephense', 'category' => 'VS Code Extensions', 'url' => 'https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client', 'description' => 'Install Intelephense in VS Code for PHP autocomplete, go-to-definition, type hints and diagnostics. Especially useful in large Laravel projects.', 'is_featured' => true],
        ];

        foreach ($resources as $res) {
            Resource::create($res);
        }

        // Testimonials and resumes are added through the admin (or by visitors, for reviews).

        // 10. Seed Sections config
        $sections = [
            [
                'key' => 'banner',
                'title' => "Hi, I'm Jyoti",
                'subtitle' => 'Senior Full Stack Developer',
                'is_visible' => true,
                'content' => [
                    'hero_subtitle' => 'Senior Full Stack Developer with 7+ years of experience building scalable web applications and multi-tenant SaaS platforms with Laravel, PHP, React.js and Node.js. I build RESTful APIs and microservices, integrate payment gateways, and automate containerized deployments on AWS.',
                    'button_text_1' => 'View Projects',
                    'button_text_2' => 'Discuss a Project',
                    'show_badge' => false,
                    'badge_text' => 'Open to new opportunities',
                    'stats' => [
                        ['value' => '7+', 'label' => 'Years Experience'],
                        ['value' => '10+', 'label' => 'Tenant Environments'],
                        ['value' => '8+', 'label' => 'APIs Integrated'],
                    ],
                    'show_terminal' => true,
                    'terminal_title' => 'production-monitor — bash',
                    'terminal_rows' => [
                        ['label' => 'Docker Engine', 'value' => 'AWS ECS · running', 'color' => 'green'],
                        ['label' => 'Tenants', 'value' => '10+ isolated environments', 'color' => 'accent'],
                        ['label' => 'Horizon', 'value' => 'Redis queues · active', 'color' => 'yellow'],
                        ['label' => 'Database', 'value' => 'MySQL · RDS', 'color' => 'blue'],
                        ['label' => 'Webhook Events', 'value' => 'Stripe · Razorpay', 'color' => 'accent'],
                    ],
                    'terminal_log' => [
                        '✓ ci/cd pipeline: build passed',
                        '✓ image deployed to ECS',
                        '→ horizon processing queued jobs',
                    ],
                ],
            ],
            [
                'key' => 'products',
                'title' => 'My Products',
                'subtitle' => 'Things I have designed, built and run myself, end to end.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        [
                            'name' => 'Mic Mate',
                            'tagline' => 'Just talk. Your voice assistant for reminders, meetings and notes.',
                            'status' => 'Live',
                            'logo' => '/images/products/mic-mate.png',
                            'description' => 'Busy day? Say it out loud. Mic Mate makes the reminder, books the meeting, saves the note, and speaks up before it is time. I built it solo, from the AI assistant and real-time backend to the installable web app.',
                            'features' => [
                                ['icon' => 'Mic', 'title' => 'Speak, don’t type', 'body' => 'Say it the way you would tell a friend, in English, Hindi or Hinglish.'],
                                ['icon' => 'BellRing', 'title' => 'Spoken reminders', 'body' => 'It talks to you before a meeting or reminder, so you never miss it.'],
                                ['icon' => 'CalendarDays', 'title' => 'Calendar and notes', 'body' => 'Meetings go to Google Calendar. Notes are saved and summarised.'],
                                ['icon' => 'Sparkles', 'title' => 'Daily recap', 'body' => 'Every evening it tells you what you did and what you missed.'],
                            ],
                            'tech_stack' => ['Laravel 13', 'React', 'Claude AI', 'Laravel Reverb', 'Web Push', 'Google Calendar API', 'PWA'],
                            'primary_label' => 'Try it free',
                            'primary_url' => 'https://voice-assistant-app.laravel.cloud/register',
                            'secondary_label' => 'Visit website',
                            'secondary_url' => 'https://voice-assistant-app.laravel.cloud',
                            'show_in_hero' => true,
                        ],
                    ],
                ],
            ],
            [
                'key' => 'tech_marquee',
                'title' => 'Core Stack and Tools',
                'subtitle' => 'Technologies I actively use in real projects',
                'is_visible' => true,
                'content' => [
                    'layout' => 'both',
                    'speed' => 32,
                    'items' => [
                        'PHP 8',
                        'Laravel',
                        'Lumen',
                        'React.js',
                        'Node.js',
                        'Livewire',
                        'Filament',
                        'MySQL',
                        'PostgreSQL',
                        'MongoDB',
                        'Redis',
                        'Laravel Horizon',
                        'stancl/tenancy',
                        'Laravel Passport',
                        'Docker',
                        'AWS ECS',
                        'AWS S3',
                        'AWS RDS',
                        'Stripe',
                        'Razorpay',
                        'n8n',
                    ],
                ],
            ],
            [
                'key' => 'experience',
                'title' => 'Professional Experience',
                'subtitle' => '7+ years building Laravel applications, APIs and SaaS platforms, from requirements to production support.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'projects',
                'title' => 'Featured Projects',
                'subtitle' => 'Selected work across ride-hailing, HR, fleet management and marketing automation.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'case_studies',
                'title' => 'Case Studies',
                'subtitle' => 'How multi-tenancy, query performance and deployment problems were solved.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'skills',
                'title' => 'Skills & Tech Stack',
                'subtitle' => 'The languages, frameworks and tools I use in production work.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'engineering',
                'title' => 'Engineering Experience',
                'subtitle' => 'Grouped by the areas I work in most often.',
                'is_visible' => true,
                'content' => [
                    'groups' => [
                        ['title' => 'Backend', 'items' => ['PHP 8', 'Laravel (10/11)', 'Lumen', 'Node.js', 'Python', 'RESTful APIs', 'Microservices', 'Queues & Horizon']],
                        ['title' => 'Frontend', 'items' => ['React.js', 'JavaScript', 'Livewire', 'Filament', 'HTML5', 'CSS3', 'Material UI', 'Bootstrap 5', 'jQuery', 'AJAX']],
                        ['title' => 'Architecture & Security', 'items' => ['Multi-Tenant SaaS', 'stancl/tenancy', 'Webhooks', 'Role-Based Access Control', 'SOLID Principles', 'OAuth2', 'JWT', 'Laravel Passport']],
                        ['title' => 'Cloud & DevOps', 'items' => ['Docker', 'AWS ECS', 'AWS S3', 'AWS RDS', 'CI/CD', 'Git', 'GitHub', 'GitLab']],
                        ['title' => 'Databases & Caching', 'items' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Query Optimization', 'Database Indexing']],
                    ],
                ],
            ],
            [
                'key' => 'api_integrations',
                'title' => 'API Integration Showcase',
                'subtitle' => 'Third-party services I have integrated into production systems.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        ['name' => 'Stripe Checkout', 'description' => 'Payment flows with server-side verification through webhooks.', 'endpoint' => 'POST https://api.stripe.com/v1/checkout/sessions', 'icon' => 'CreditCard'],
                        ['name' => 'Razorpay', 'description' => 'Payment collection with order creation and signature verification.', 'endpoint' => 'POST https://api.razorpay.com/v1/orders', 'icon' => 'IndianRupee'],
                        ['name' => 'Braintree', 'description' => 'Card and wallet payment processing.', 'endpoint' => 'braintree/transaction/sale', 'icon' => 'Wallet'],
                        ['name' => 'Plaid', 'description' => 'Bank account linking and financial data access.', 'endpoint' => 'plaid/link/token/create', 'icon' => 'Landmark'],
                        ['name' => 'Firebase', 'description' => 'Authentication and push notifications.', 'endpoint' => 'firebase/messaging/send', 'icon' => 'Flame'],
                        ['name' => 'Google Maps', 'description' => 'Maps, geocoding and location features.', 'endpoint' => 'maps/api/geocode', 'icon' => 'MapPin'],
                        ['name' => 'Mailchimp', 'description' => 'Audience sync and email marketing campaigns.', 'endpoint' => 'mailchimp/lists/members', 'icon' => 'Mail'],
                        ['name' => 'Facebook Graph API', 'description' => 'Social media publishing and marketing features.', 'endpoint' => 'graph.facebook.com/{page-id}/feed', 'icon' => 'Share2'],
                    ],
                ],
            ],
            [
                'key' => 'production_experience',
                'title' => 'Production Experience',
                'subtitle' => 'Practical deployment and maintenance work across live systems.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        'Multi-Tenant SaaS Platforms',
                        'Custom Domain Mapping',
                        'Dockerized Deployments',
                        'AWS ECS, S3 and RDS',
                        'CI/CD Pipelines',
                        'Redis Caching',
                        'Horizon-Managed Queues',
                        'Webhook Automation',
                        'Payment Integrations',
                        'OAuth2 and JWT Security',
                        'Query Optimization',
                        'Production Support and Maintenance',
                    ],
                ],
            ],
            [
                'key' => 'experience_matrix',
                'title' => 'Experience Matrix',
                'subtitle' => 'A simple view of the areas I work in most confidently.',
                'is_visible' => true,
                'content' => [
                    'rows' => [
                        ['area' => 'Laravel and PHP Backend', 'stars' => 5, 'level' => 'Expert'],
                        ['area' => 'Multi-Tenant SaaS Architecture', 'stars' => 5, 'level' => 'Expert'],
                        ['area' => 'API and Payment Integrations', 'stars' => 5, 'level' => 'Expert'],
                        ['area' => 'React.js Front Ends', 'stars' => 4, 'level' => 'Advanced'],
                        ['area' => 'Cloud and DevOps (Docker, AWS)', 'stars' => 4, 'level' => 'Advanced'],
                        ['area' => 'Database Design and Optimization', 'stars' => 4, 'level' => 'Advanced'],
                        ['area' => 'Workflow Automation', 'stars' => 4, 'level' => 'Advanced'],
                    ],
                ],
            ],
            [
                'key' => 'timeline',
                'title' => 'Career Timeline',
                'subtitle' => 'From computer applications studies to leading enterprise Laravel delivery.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        ['year' => '2015', 'title' => 'B.Sc. Information Technology', 'description' => 'Graduated from Lovely Professional University.'],
                        ['year' => '2017', 'title' => 'Master of Computer Applications', 'description' => 'Completed an MCA at Lovely Professional University.'],
                        ['year' => '2018', 'title' => 'Laravel Developer at Logiciel Solutions', 'description' => 'Built Laravel applications and Lumen microservices, with Redis caching, Horizon queues and social media integrations.'],
                        ['year' => '2021', 'title' => 'Software Developer at Infino Digital Agency', 'description' => 'Designed RESTful APIs for React.js front ends and cut query execution time by 30%.'],
                        ['year' => '2022', 'title' => 'Senior Software Developer at LN Webworks', 'description' => 'Leading enterprise delivery on Laravel 11, React.js and Node.js, multi-tenant SaaS, and CI/CD on AWS.'],
                    ],
                ],
            ],
            [
                'key' => 'specializations',
                'title' => 'What I Build',
                'subtitle' => 'The kinds of systems I work on most often.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        ['title' => 'Multi-Tenant SaaS', 'icon' => 'Building2', 'points' => ['Tenant data isolation', 'Custom domain mapping', 'Shared codebase for many clients']],
                        ['title' => 'Admin Panels and Dashboards', 'icon' => 'LayoutDashboard', 'points' => ['Filament admin panels', 'Role-based access control', 'Real-time analytics with Livewire']],
                        ['title' => 'APIs and Integrations', 'icon' => 'Plug', 'points' => ['RESTful APIs and Lumen microservices', 'Stripe and Razorpay payments', 'Webhooks and social media APIs']],
                        ['title' => 'Cloud Deployments', 'icon' => 'Cloud', 'points' => ['Docker containers', 'AWS ECS, S3 and RDS', 'Automated CI/CD pipelines']],
                    ],
                ],
            ],
            [
                'key' => 'snippets',
                'title' => 'Code Snippets Library',
                'subtitle' => 'Practical Laravel snippets for multi-tenancy, queues, payments and access control.',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                    'show_filters' => true,
                    'show_search' => true,
                    'show_bookmarks' => true,
                    'show_download' => true,
                    'show_description' => true,
                ],
            ],
            [
                'key' => 'blog',
                'title' => 'Articles & Insights',
                'subtitle' => 'Short practical articles on Laravel, SaaS architecture, queues and performance.',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'resources',
                'title' => 'Developer Toolkit',
                'subtitle' => 'Laravel packages, deployment tools and references, with a note on when each one is useful.',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'certifications',
                'title' => 'Certifications & Credentials',
                'subtitle' => 'Verified professional courses and learning achievements',
                'is_visible' => false,
                'content' => null,
            ],
            [
                'key' => 'github',
                'title' => 'Open Source Repositories',
                'subtitle' => 'Public repositories from my GitHub account.',
                // Shown once a GitHub username is set in Site Settings
                'is_visible' => false,
                'content' => null,
            ],
            [
                'key' => 'contact',
                'title' => "Let's Work Together",
                'subtitle' => 'Share your project scope and goals. I will reply with a clear implementation plan.',
                'is_visible' => true,
                'content' => [
                    'email' => 'jyotika0617@gmail.com',
                    'phone' => '+91 8198042267',
                    'show_form' => true,
                    'project_types' => [
                        'Laravel Development',
                        'Multi-Tenant SaaS Platform',
                        'React.js / Node.js Application',
                        'API and Payment Integration',
                        'Filament Admin Panel',
                        'Docker and AWS Deployment',
                        'Workflow Automation (n8n / Make.com)',
                    ],
                ],
            ],
        ];

        foreach ($sections as $sectionData) {
            Section::create($sectionData);
        }
    }
}
