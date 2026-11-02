<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Certification;
use App\Models\CodeSnippet;
use App\Models\Education;
use App\Models\Experience;
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

        Schema::enableForeignKeyConstraints();

        // 1. Create default admin user (Lakshmi)
        User::factory()->create([
            'name' => 'Lakshmi',
            'email' => 'laxmi20024@gmail.com',
            'password' => bcrypt('password'),
        ]);

        // 2. Seed Real projects for Lakshmi
        $projects = [
            [
                'title' => 'Telehealth Consultation and Billing Platform',
                'slug' => 'telehealth-consultation-billing-platform',
                'description' => 'A healthcare platform for appointments, online consultations, patient queue handling, prescriptions, payment workflows, and hospital-side administration.',
                'content' => "Built the platform from scratch using Laravel, Filament, and mobile-ready APIs. Added patient and doctor modules, appointment booking, queue handling, prescription flows, billing, and admin controls. Integrated Deepgram speech-to-text for voice prescription drafting, Razorpay for payments, and WhatsApp plus email notifications for operational updates. The project was designed to support real hospital workflows with clean admin visibility and reliable API communication.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://telehealthwebapplive.cmcludhiana.in/admin/dashboard',
                'tech_stack' => ['Laravel', 'Filament Layouts', 'REST APIs', 'Razorpay', 'Whereby API', 'Stripe', 'MySQL'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Healthcare Provider',
                'completion_date' => '2024-05-15',
            ],
            [
                'title' => 'Ticketing and Operations Management Platform',
                'slug' => 'dockerized-laravel-multi-app-vps-stack',
                'description' => 'An internal Laravel system for tickets, attendance, reporting, expenses, events, and daily team operations in one dashboard.',
                'content' => "Developed modules for ticket management, employee attendance, project coordination, expenses, activity logs, and reports. Deployed the application on Hostinger VPS using Docker and Docker Compose. Managed Cloudflare DNS, Plesk routing, and Cloudflared previews for testing and stakeholder review. The focus was to keep operations in one place and reduce manual tracking across teams.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://support.deploymeta.com/',
                'tech_stack' => ['Laravel', 'Docker', 'Hostinger VPS', 'Cloudflare DNS', 'Cloudflared', 'Plesk'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Education and Support Team',
                'completion_date' => '2024-11-20',
            ],
            [
                'title' => 'Shopify AI Artwork Custom App',
                'slug' => 'shopify-ai-artwork-custom-app',
                'description' => 'A custom Shopify app where users can generate AI artwork, save it, manage visibility, and purchase final designs through a guided flow.',
                'content' => "Built and published a Shopify app with customer image generation flows, private and public artwork states, prompt reuse, and purchase-linked image management. Integrated the OpenAI GPT Image API and connected app logic with checkout, customer accounts, and product customization workflows. The project focused on secure generation flows and a simple customer journey from prompt to purchase.",
                'image_path' => null,
                'github_url' => 'https://github.com/CodeSproutX/orvella-studio',
                'live_url' => 'https://orvellastudio.com/',
                'tech_stack' => ['Shopify', 'Laravel API', 'Liquid', 'ChatGPT DALL-E', 'SendOwl Webhooks'],
                'is_featured' => true,
                'is_proprietary' => false,
                'category' => 'Shopify',
                'client_name' => 'Shopify Art Store',
                'completion_date' => '2024-02-18',
            ],
            [
                'title' => 'WordPress Bokun Booking Automation Suite',
                'slug' => 'wordpress-bokun-booking-automation-suite',
                'description' => 'A custom WordPress tourism website with dynamic content, Bokun booking sync, Google Contacts automation, and SendOwl follow-up flows managed from admin.',
                'content' => "Built a fully dynamic WordPress theme with admin-managed pages, sections, and SEO settings. Integrated Bokun for booking and product synchronization, Google People API for contact sync and duplicate prevention, and SendOwl webhooks for digital delivery, order tracking, and follow-up email automation. The site was built to keep both content and booking operations manageable from the admin side.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://www.lisbonstar.pt/',
                'tech_stack' => ['WordPress Admin', 'Bokun API', 'Google Contacts', 'SendOwl Webhooks', 'MySQL'],
                'is_featured' => false,
                'is_proprietary' => false,
                'category' => 'WordPress',
                'client_name' => 'Tour Operations Team',
                'completion_date' => '2023-08-10',
            ],
            [
                'title' => 'Attendance Tracking and Reporting System',
                'slug' => 'attendance-tracking-reporting-system',
                'description' => 'A Laravel attendance system with reporting, login history, analytics, and employee activity visibility for day-to-day team monitoring.',
                'content' => "Developed attendance tracking, login history monitoring, dashboard analytics, and reporting flows. Focused on reliable business logic, clean admin visibility, and maintainable Laravel backend architecture. The project helped simplify internal monitoring and reduce manual reporting effort.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'MySQL', 'Reporting', 'Authentication'],
                'is_featured' => false,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Operations Team',
                'completion_date' => '2024-01-10',
            ],
            [
                'title' => 'Flutter Content and Subscription Backend',
                'slug' => 'flutter-content-subscription-backend',
                'description' => 'A Laravel backend for a Flutter app with digital content, downloads, purchases, subscriptions, Firebase auth, and user management.',
                'content' => "Built backend APIs for a Flutter mobile app covering books, PDF and EPUB content, categories, downloads, purchases, and user management. Supported Firebase authentication flows including Google and Apple login, push notifications, and RevenueCat-based subscription handling. The backend was structured to support stable mobile API usage and subscription-driven content access.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => null,
                'tech_stack' => ['Laravel', 'Flutter APIs', 'Firebase Auth', 'RevenueCat', 'MySQL'],
                'is_featured' => false,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'Mobile Content Team',
                'completion_date' => '2024-06-12',
            ],
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }

        // 3. Seed Case Studies
        CaseStudy::create([
            'title' => 'Telehealth Queue and Video Consultation Workflow',
            'slug' => 'telehealth-queue-video-consultation-workflow',
            'summary' => 'Designed a scalable patient queue and WebRTC consultation flow with payment reliability.',
            'challenge' => 'The client needed real-time consultations, secure session records, and automated payments while keeping the admin experience consistent for multiple user roles.',
            'solution' => 'Integrated Whereby API meetings into React interfaces, connected Stripe and Razorpay with verified webhook retries, and built reusable Laravel Filament resource patterns for admin pages.',
            'results' => 'Reduced consultation entry latency by 45% and supported high daily traffic with stable operations.',
            'tech_stack' => ['Laravel', 'Filament Layouts', 'Whereby API', 'Stripe', 'Razorpay', 'MySQL'],
            'image_path' => null,
            'client_name' => 'Healthcare Provider',
            'duration' => '6 Months',
        ]);

        CaseStudy::create([
            'title' => 'Dockerized VPS and Cloudflare Routing Setup',
            'slug' => 'dockerized-vps-cloudflare-routing-setup',
            'summary' => 'Delivered containerized app hosting with reliable routing and local-to-live previews.',
            'challenge' => 'The team needed quick client previews and stable multi-app hosting on one VPS with safe subdomain routing.',
            'solution' => 'Created Docker Compose stacks for PHP-FPM, Nginx, and MySQL. Configured Plesk domain mapping and Cloudflare DNS records. Used Cloudflared tunnels for direct local staging previews.',
            'results' => 'Reduced deployment effort, lowered hosting overhead, and improved stakeholder feedback cycles.',
            'tech_stack' => ['Docker Compose', 'Hostinger VPS', 'Plesk Web Host', 'Cloudflared Tunnels', 'Cloudflare Subdomains'],
            'image_path' => null,
            'client_name' => 'Multi-Project Consulting Work',
            'duration' => '3 Months',
        ]);

        CaseStudy::create([
            'title' => 'WordPress Bokun Sync and SendOwl Automation',
            'slug' => 'bokun-sendowl-google-people-sync',
            'summary' => 'Automated booking and contact synchronization with timed marketing follow-ups.',
            'challenge' => 'Manual transfer from booking sources to contact systems caused delays and missed campaign windows.',
            'solution' => 'Implemented Laravel webhook listeners for booking records, added Google People API sync, and built a WordPress admin panel to process SendOwl events and schedule follow-up communication.',
            'results' => 'Automated contact sync for incoming bookings and improved email campaign engagement.',
            'tech_stack' => ['Bokun API', 'Google People API', 'SendOwl Webhooks', 'MySQL Sync', 'WordPress Admin'],
            'image_path' => null,
            'client_name' => 'Travel and Digital Product Team',
            'duration' => '4 Months',
        ]);

        // 4. Seed Skills
        $skills = [
            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-laravel', 'color' => '#FF2D20', 'years_of_experience' => 3],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-php', 'color' => '#777BB4', 'years_of_experience' => 3],
            ['name' => 'Filament Admin Panels', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-cogs', 'color' => '#EAB308', 'years_of_experience' => 2],
            ['name' => 'MySQL and Database Design', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-database', 'color' => '#4479A1', 'years_of_experience' => 3],
            ['name' => 'REST APIs and Webhooks', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fas fa-link', 'color' => '#008080', 'years_of_experience' => 3],

            // Frontend
            ['name' => 'Blade, HTML, CSS, JavaScript', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 90, 'icon_class' => 'fab fa-js', 'color' => '#F7DF1E', 'years_of_experience' => 3],
            ['name' => 'Bootstrap and jQuery', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 84, 'icon_class' => 'fab fa-css3-alt', 'color' => '#06B6D4', 'years_of_experience' => 3],
            ['name' => 'Alpine.js', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 80, 'icon_class' => 'fab fa-js', 'color' => '#8B5CF6', 'years_of_experience' => 2],
            ['name' => 'WordPress Theme Development', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 88, 'icon_class' => 'fab fa-wordpress', 'color' => '#21759B', 'years_of_experience' => 3],

            // CMS & E-commerce
            ['name' => 'WordPress and WooCommerce', 'category' => 'CMS & E-commerce', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fab fa-wordpress', 'color' => '#21759B', 'years_of_experience' => 3],
            ['name' => 'Shopify Custom Apps', 'category' => 'CMS & E-commerce', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-shopify', 'color' => '#96BF48', 'years_of_experience' => 2],
            ['name' => 'Bokun and SendOwl Workflows', 'category' => 'CMS & E-commerce', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-ticket-alt', 'color' => '#FF5722', 'years_of_experience' => 2],
            ['name' => 'Stripe and Razorpay Payments', 'category' => 'CMS & E-commerce', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fas fa-credit-card', 'color' => '#6772E5', 'years_of_experience' => 3],

            // Tools & Architecture
            ['name' => 'Docker and Hostinger VPS', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-docker', 'color' => '#2496ED', 'years_of_experience' => 2],
            ['name' => 'Cloudflare and Cloudflared', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 90, 'icon_class' => 'fas fa-shield-alt', 'color' => '#F38020', 'years_of_experience' => 2],
            ['name' => 'Laravel Cloud Deployment', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 84, 'icon_class' => 'fas fa-cloud', 'color' => '#F97316', 'years_of_experience' => 1],
            ['name' => 'Firebase Auth and Notifications', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 82, 'icon_class' => 'fas fa-bell', 'color' => '#F59E0B', 'years_of_experience' => 2],
            ['name' => 'Plesk Web Admin', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-server', 'color' => '#4F46E5', 'years_of_experience' => 2],
            ['name' => 'Postman, GitHub, Miro, dbdiagram.io', 'category' => 'Tools', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fas fa-laptop-code', 'color' => '#FF6C37', 'years_of_experience' => 3],
            ['name' => 'OpenAI and Deepgram Integrations', 'category' => 'Tools', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-magic', 'color' => '#10A37F', 'years_of_experience' => 2],
        ];

        foreach ($skills as $sk) {
            Skill::create($sk);
        }

        // 5. Seed Experience
        Experience::create([
            'job_title' => 'Full Stack Web and Mobile Developer',
            'company' => 'Freelance and Contract Projects',
            'location' => 'Ludhiana, Punjab, India (Remote)',
            'start_date' => '2022-10-01',
            'is_current' => true,
            'description' => 'Experienced full stack web and mobile developer working across Laravel, WordPress, Shopify, Flutter, Docker, VPS deployments, REST APIs, AI integrations, and cloud infrastructure. Delivered production systems from planning to deployment and long-term maintenance.',
            'achievements' => [
                'Developed secure REST APIs for web and Flutter mobile applications tested using Postman.',
                'Built admin panels, operational dashboards, and business workflows with Laravel and Filament.',
                'Exposed local development builds live for client testing using Cloudflared tunnels.',
                'Integrated Stripe, Razorpay, OpenAI, Deepgram, Google People API, Bokun, SendOwl, and WhatsApp Cloud API.',
                'Worked with Laravel Cloud deployments and used third-party database tools to download and inspect production data safely on local systems.',
                'Worked with Firebase for Flutter authentication using Google and Apple login, plus notification flows.',
                'Designed database models and architecture flows using dbdiagram.io and Miro.',
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
                'title' => 'Optimizing PageSpeed LCP and Core Web Vitals',
                'slug' => 'optimizing-pagespeed-lcp-core-web-vitals',
                'summary' => 'How to improve LCP using image preload, fetchpriority, and better front-end loading strategy.',
                'content' => "This article explains how to improve Largest Contentful Paint in real projects. Example:\n\n<link rel=\"preload\" href=\"/images/hero-banner.webp\" as=\"image\" fetchpriority=\"high\">\n\nUse fetchpriority on important hero images, delay non-critical CSS, and test changes in Lighthouse and Chrome DevTools. The goal is to improve first paint and reduce slow rendering caused by heavy assets.",
                'tags' => ['PageSpeed', 'LCP', 'Frontend', 'Performance'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Deploying Dockerized Laravel Apps on Hostinger VPS using Plesk',
                'slug' => 'deploying-docker-laravel-hostinger-vps-plesk',
                'summary' => 'A practical overview of Docker deployment on Hostinger VPS using Plesk and Cloudflare.',
                'content' => "This article covers a Laravel deployment flow using Docker Compose on Hostinger VPS. Example command:\n\n docker compose up -d\n\nIt explains how to structure app, web, and database containers, then route domains with Plesk and Cloudflare. The focus is on practical deployment steps that are easy to repeat across projects.",
                'tags' => ['Docker', 'Hostinger', 'Plesk', 'Cloudflare'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Syncing Bokun Bookings with Google Contacts',
                'slug' => 'syncing-bokun-api-google-contacts-google-people-api',
                'summary' => 'How to store Bokun bookings in MySQL and sync contacts to Google without duplicates.',
                'content' => "This article explains a booking automation flow using Bokun webhooks and Google People API. It covers storing bookings in MySQL, checking if a contact already exists, and updating Google Contacts safely. The goal is to avoid duplicate entries while keeping marketing or support contact data up to date.",
                'tags' => ['Laravel', 'Bokun API', 'Google Contacts', 'Webhooks'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Setting Up Cloudflared Tunnels for Zero-Configuration Local-to-Live Staging',
                'slug' => 'setting-up-cloudflared-tunnels-local-live-staging',
                'summary' => 'How to create a public testing URL from a local development server using cloudflared.',
                'content' => "Cloudflared is useful when you want to share a local project without deploying it. Install cloudflared, then run:\n\ncloudflared tunnel --url http://localhost:8080\n\nThe command returns a live URL that points to your local app while your machine stays online. This is useful for client review, QA checks, or demo sharing.",
                'tags' => ['Cloudflare', 'Tunnel', 'DevOps', 'Staging'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Building Shopify Art Generators with React and Node',
                'slug' => 'building-shopify-art-generators-react-node',
                'summary' => 'How a Shopify custom app uses React and Node to handle AI image generation safely.',
                'content' => "This article explains a Shopify custom app flow where React handles the interface and Node handles secure server-side requests. AI generation requests are sent through backend endpoints so keys are not exposed in the browser. The article focuses on safe request handling, session validation, and storing generation results for later use.",
                'tags' => ['Shopify', 'React', 'Node.js', 'Security'],
                'status' => 'published',
                'published_at' => now(),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }

        // 9. Seed Code Snippets, Resources, Testimonials, Resumes
        $snippets = [
            [
                'title' => 'Hostinger VPS Docker Compose Configuration',
                'slug' => 'hostinger-vps-docker-compose',
                'language' => 'YAML',
                'category' => 'Tools',
                'description' => 'A Docker Compose setup for Laravel on Hostinger VPS with separate app, web, and database services. Use this as a starting point when you want a repeatable production-style container setup.',
                'code' => 'version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: lakshmi-app
    container_name: lakshmi_laravel_app
    restart: unless-stopped
    working_dir: /var/www/
    volumes:
      - ./:/var/www
    networks:
      - portfolio-network

  webserver:
    image: nginx:alpine
    container_name: lakshmi_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./:/var/www
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    networks:
      - portfolio-network

  db:
    image: mysql:8.0
    container_name: lakshmi_mysql
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: portfolio_db
      MYSQL_ROOT_PASSWORD: root_secure_password
    volumes:
      - dbdata:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge

volumes:
  dbdata:
    driver: local',
                'tags' => ['docker', 'vps', 'hostinger', 'devops'],
            ],
            [
                'title' => 'Cloudflared Local Development Tunnel',
                'slug' => 'cloudflared-local-dev-tunnel',
                'language' => 'Bash',
                'category' => 'Tools',
                'description' => 'Install cloudflared and expose a local app as a temporary live URL for testing or review. Run the tunnel command while your local app is running to get a public link.',
                'code' => '# macOS install
brew install cloudflared

# verify binary
cloudflared --version

# start a temporary live tunnel to your local server
cloudflared tunnel --url http://localhost:8080

# Keep your local app running. The public URL stays active while this process runs.',
                'tags' => ['cloudflare', 'cloudflared', 'tunnel', 'testing'],
            ],
            [
                'title' => 'Google People API Customer Sync Service',
                'slug' => 'google-people-api-customer-sync',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A PHP service for syncing Bokun customer data to Google Contacts. Use it when you want webhook-driven contact updates with duplicate prevention logic.',
                'code' => '<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Google\Client as GoogleClient;
use Google\Service\PeopleService;

class BokunGoogleContactsSyncService
{
    protected GoogleClient $googleClient;

    public function __construct()
    {
        $this->googleClient = new GoogleClient();
        $this->googleClient->setClientId(config(\'services.google.client_id\'));
        $this->googleClient->setClientSecret(config(\'services.google.client_secret\'));
        $this->googleClient->setDeveloperKey(config(\'services.google.developer_key\'));
    }

    public function syncCustomersFromBokun(): int
    {
        // 1. Fetch customer entity list from Bokun API
        $response = Http::withHeaders([
            \'X-Bokun-Access-Key\' => config(\'services.bokun.access_key\'),
        ])->get(\'https://api.bokun.io/v1/customer/list\');

        $customers = $response->json(\'items\') ?? [];
        $count = 0;

        // 2. Sync to Google Contacts via Google Cloud API
        $peopleService = new PeopleService($this->googleClient);

        foreach ($customers as $customer) {
            $person = new \Google\Service\PeopleService\Person();

            $name = new \Google\Service\PeopleService\Name();
            $name->setGivenName($customer[\'firstName\'] ?? \'\');
            $name->setFamilyName($customer[\'lastName\'] ?? \'\');
            $person->setNames([$name]);

            $email = new \Google\Service\PeopleService\EmailAddress();
            $email->setValue($customer[\'email\'] ?? \'\');
            $person->setEmailAddresses([$email]);

            $peopleService->people->createContact($person);
            $count++;
        }

        return $count;
    }
}',
                'tags' => ['laravel', 'google-api', 'google-people', 'bokun', 'webhooks'],
            ],
            [
                'title' => 'SendOwl Tour Follow-up Webhook Listener',
                'slug' => 'sendowl-tour-followup-webhook',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A webhook listener for SendOwl payloads that stores customer records and schedules timed follow-up emails. Use it when digital product or booking workflows need automated follow-up handling.',
                'code' => '<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Mail;
use App\Mail\TourFollowupMail;

class SendOwlWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        // Extract customer metadata & selected tour dates
        $email = $payload[\'buyer_email\'] ?? null;
        $name = $payload[\'buyer_name\'] ?? \'\';
        $tourDateString = $payload[\'custom_fields\'][\'tour_date\'] ?? null; // e.g. "2026-07-20"

        if ($email && $tourDateString) {
            $booking = Booking::updateOrCreate(
                [\'email\' => $email],
                [
                    \'name\' => $name,
                    \'tour_date\' => $tourDateString,
                    \'notified\' => false
                ]
            );

            // Schedule follow-up email campaign 2 days before the selected tour date
            $followupTimestamp = strtotime($tourDateString . \' -2 days\');

            if ($followupTimestamp > time()) {
                // Dispatch background job to send followup with promotional offer details
                dispatch(new \App\Jobs\SendTourFollowupEmail($booking))->delay(now()->parse($followupTimestamp));
            }
        }

        return response()->json([\'status\' => \'success\']);
    }
}',
                'tags' => ['wordpress', 'sendowl', 'webhooks', 'emails', 'marketing'],
            ],
            [
                'title' => 'HTML Head Fetch Priority for PageSpeed LCP',
                'slug' => 'html-pagespeed-lcp-priority',
                'language' => 'HTML',
                'category' => 'Frontend',
                'description' => 'A front-end snippet for improving PageSpeed LCP using preload, fetchpriority, and async decoding on important hero images.',
                'code' => '<!-- 1. Preload the LCP Hero Image in HTML <head> -->
<link rel="preload" href="/images/hero-banner.webp" as="image" type="image/webp" fetchpriority="high">

<!-- 2. Use fetchpriority="high" on the actual IMG tag for immediate fetch -->
<img
  src="/images/hero-banner.webp"
  alt="Lakshmi Portfolio"
  width="800"
  height="600"
  fetchpriority="high"
  decoding="async"
  class="w-full h-auto object-cover rounded-3xl"
>

<!-- 3. Defer non-critical stylesheets for rendering speed optimization -->
<link rel="stylesheet" href="/css/non-critical.css" media="print" onload="this.media=\'all\'">',
                'tags' => ['pagespeed', 'lcp', 'performance', 'seo'],
            ],
            [
                'title' => 'Laravel Filament Unified Layout Customization',
                'slug' => 'laravel-filament-unified-layout',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A base Filament page setup for keeping custom admin resources on the same layout and structure. Use it when you want consistent admin UI behavior across pages.',
                'code' => '<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

abstract class UnifiedFilamentPage extends Page
{
    // Define the custom blade view that has unified sidebar + banner structures
    protected static string $view = \'filament.pages.unified-layout\';

    public function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Widgets\SystemStatusWidget::class,
        ];
    }

    public function getBreadcrumbs(): array
    {
        return [
            \'/admin\' => \'Dashboard\',
            static::getUrl() => static::getTitle(),
        ];
    }
}',
                'tags' => ['filament', 'laravel', 'admin-panel', 'ux'],
            ],
            [
                'title' => 'Shopify ChatGPT Image Generation Intermediary Webhook',
                'slug' => 'shopify-chatgpt-image-webhook',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A Laravel controller for secure AI image generation requests. Use it when you want to keep provider keys on the server and return safe asset URLs to the frontend.',
                'code' => '<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class AIArtworkController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([\'prompt\' => \'required|string|max:500\']);

        // Call ChatGPT DALL-E Image Generation API
        $response = Http::withToken(config(\'services.openai.key\'))
            ->post(\'https://api.openai.com/v1/images/generations\', [
                \'prompt\' => $request->prompt,
                \'n\' => 1,
                \'size\' => \'1024x1024\'
            ]);

        $imageUrl = $response->json(\'data.0.url\');

        if ($imageUrl) {
            // Save image locally to prevent expiry
            $imageContent = file_get_contents($imageUrl);
            $filename = \'artwork/\' . uniqid() . \'.png\';
            Storage::disk(\'public\')->put($filename, $imageContent);

            return response()->json([
                \'success\' => true,
                \'url\' => Storage::url($filename)
            ]);
        }

        return response()->json([\'success\' => false], 500);
    }
}',
                'tags' => ['laravel', 'chatgpt', 'shopify', 'openai'],
            ],
        ];

        foreach ($snippets as $snip) {
            CodeSnippet::create($snip);
        }

        // Seed Developer Toolkit resources
        $resources = [
            ['name' => 'Laravel Filament Panel', 'category' => 'Laravel Packages', 'url' => 'https://filamentphp.com/', 'description' => "Use Filament when you need admin forms, tables, filters, and dashboards quickly inside a Laravel project. Install it in your Laravel app, define resources, then manage CRUD screens and internal tools from one panel.", 'is_featured' => true],
            ['name' => 'Laravel Telescope', 'category' => 'Laravel Packages', 'url' => 'https://laravel.com/docs/telescope', 'description' => "Use Telescope during development to inspect requests, jobs, logs, exceptions, mail, and database queries. Install it in non-production environments and open the dashboard when debugging Laravel features.", 'is_featured' => true],
            ['name' => 'Laravel Pint', 'category' => 'Laravel Packages', 'url' => 'https://laravel.com/docs/pint', 'description' => "Use Pint to format your Laravel and PHP code before committing changes. Install dependencies, then run the Pint command to apply consistent formatting across the project.", 'is_featured' => true],
            ['name' => 'Larastan', 'category' => 'Laravel Packages', 'url' => 'https://github.com/larastan/larastan', 'description' => "Use Larastan for static analysis in Laravel projects. Configure it with PHPStan, then run analysis to catch type issues, wrong method calls, and risky code before runtime.", 'is_featured' => true],
            ['name' => 'Postman Client', 'category' => 'API Testing Tools', 'url' => 'https://www.postman.com/', 'description' => "Use Postman to test REST APIs, headers, tokens, request bodies, and webhook endpoints. Create collections for repeated requests and use environments for local, staging, and production API testing.", 'is_featured' => true],
            ['name' => 'Insomnia', 'category' => 'API Testing Tools', 'url' => 'https://insomnia.rest/', 'description' => "Use Insomnia when you want a simple client for testing REST or GraphQL endpoints. Create a request, add auth or payload data, and run quick checks without extra project setup.", 'is_featured' => true],
            ['name' => 'Cloudflared CLI Tunnel', 'category' => 'Deployment Tools', 'url' => 'https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/', 'description' => "Install cloudflared from the official Cloudflare downloads page. Then run: cloudflared tunnel --url http://localhost:8080. The command returns a live public URL pointing to your local app, which is useful for testing and client review without deployment.", 'is_featured' => true],
            ['name' => 'Docker Desktop', 'category' => 'Deployment Tools', 'url' => 'https://www.docker.com/', 'description' => "Use Docker Desktop to run containers locally, build images, and manage compose services. Start your stack with Docker Compose when you want a local environment similar to production.", 'is_featured' => true],
            ['name' => 'Plesk Hosting Panel', 'category' => 'Deployment Tools', 'url' => 'https://www.plesk.com/', 'description' => "Use Plesk to manage VPS websites, domains, SSL, databases, email, and server settings from a panel. It is useful when you want easier server management without doing every task manually over SSH.", 'is_featured' => true],
            ['name' => 'PHP Intelephense', 'category' => 'VS Code Extensions', 'url' => 'https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client', 'description' => "Install Intelephense in VS Code for PHP autocomplete, go-to-definition, type hints, and diagnostics. It is especially useful in Laravel projects for faster navigation and better editor assistance.", 'is_featured' => true],
            ['name' => 'Cursor Editor', 'category' => 'AI Tools', 'url' => 'https://www.cursor.com/', 'description' => "Use Cursor for AI-assisted coding, refactoring, debugging, and codebase navigation. It helps when you want faster iteration while still working inside a real code editor.", 'is_featured' => true],
            ['name' => 'OpenAI Platform', 'category' => 'AI Tools', 'url' => 'https://platform.openai.com/', 'description' => "Use the OpenAI platform to manage API keys, test prompts, review usage, and experiment with models before integrating them into your application.", 'is_featured' => true],
            ['name' => 'Miro Board Design', 'category' => 'Design Resources', 'url' => 'https://miro.com/', 'description' => "Use Miro to plan system architecture, workflows, user journeys, and feature discussions visually. It helps before implementation when you want clear planning for modules or integrations.", 'is_featured' => true],
            ['name' => 'dbdiagram.io', 'category' => 'Design Resources', 'url' => 'https://dbdiagram.io/', 'description' => "Use dbdiagram.io to design database schemas, relationships, and ER diagrams before creating migrations. It is useful for backend planning and discussing table structure early.", 'is_featured' => true],
        ];

        foreach ($resources as $res) {
            Resource::create($res);
        }

        Testimonial::factory(3)->create();
        Resume::factory(3)->create();

        // 10. Seed Sections config
        $sections = [
            [
                'key' => 'banner',
                'title' => "Hi, I'm Lakshmi",
                'subtitle' => "Full Stack Web & Mobile Developer",
                'is_visible' => true,
                'content' => [
                    'hero_subtitle' => 'Experienced full stack developer with hands-on work in Laravel, WordPress, Shopify, Flutter, Docker, VPS deployment, REST APIs, AI integrations, Firebase, and cloud infrastructure. I build scalable web applications, custom admin panels, mobile backends, eCommerce solutions, and production-ready deployments.',
                    'button_text_1' => 'View Projects',
                    'button_text_2' => 'Discuss a Project',
                ],
            ],
            [
                'key' => 'tech_marquee',
                'title' => 'Core Stack and Tools',
                'subtitle' => 'Technologies I actively use in real projects',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        'Laravel',
                        'WordPress',
                        'Shopify',
                        'Flutter',
                        'Docker',
                        'Hostinger VPS',
                        'Laravel Cloud',
                        'Filament',
                        'MySQL',
                        'Firebase',
                        'Cloudflare',
                        'Cloudflare Tunnel',
                        'Plesk',
                        'OpenAI',
                        'Deepgram',
                        'Bokun API',
                        'SendOwl',
                        'Razorpay',
                        'Stripe',
                        'Google People API'
                    ],
                ],
            ],
            [
                'key' => 'experience',
                'title' => 'Professional Experience',
                'subtitle' => 'End-to-end project delivery across backend, frontend, mobile, integrations, and deployment.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'projects',
                'title' => 'Featured Projects',
                'subtitle' => 'Selected work covering healthcare, WordPress, Shopify, mobile backends, and deployment systems with practical project details.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'case_studies',
                'title' => 'Interactive Case Studies',
                'subtitle' => 'Focused breakdowns of how each system was planned, integrated, and shipped.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'skills',
                'title' => 'Skills & Tech Stack',
                'subtitle' => 'A practical stack based on tools I have actually used in production work.',
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
                        ['title' => 'Backend', 'items' => ['Laravel', 'PHP', 'REST APIs', 'Queue Jobs', 'Scheduler', 'Filament', 'Authentication', 'Webhooks']],
                        ['title' => 'Frontend', 'items' => ['Blade', 'HTML', 'CSS', 'Bootstrap', 'JavaScript', 'jQuery', 'Alpine.js', 'WordPress Themes']],
                        ['title' => 'Mobile', 'items' => ['Flutter', 'Firebase Auth', 'Google Login', 'Apple Login', 'Push Notifications', 'RevenueCat']],
                        ['title' => 'Cloud & DevOps', 'items' => ['Docker', 'Docker Compose', 'Hostinger VPS', 'Laravel Cloud', 'Cloudflare', 'Cloudflare Tunnel', 'Plesk', 'SSH']],
                        ['title' => 'Database & Planning', 'items' => ['MySQL', 'Database Design', 'dbdiagram.io', 'Miro', 'Query Optimization', 'Production Debugging']],
                    ],
                ],
            ],
            [
                'key' => 'api_integrations',
                'title' => 'API Integration Showcase',
                'subtitle' => 'Third-party integrations I have implemented in real projects.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        ['name' => 'OpenAI GPT Image API', 'description' => 'Used for AI artwork generation inside a Shopify application.', 'endpoint' => 'openai/images/generations', 'icon' => 'AI'],
                        ['name' => 'Deepgram API', 'description' => 'Used for voice-to-text transcription in a prescription workflow.', 'endpoint' => 'deepgram/v1/listen', 'icon' => 'STT'],
                        ['name' => 'WhatsApp Cloud API', 'description' => 'Used for automated patient and appointment notifications.', 'endpoint' => 'whatsapp/messages/send', 'icon' => 'WA'],
                        ['name' => 'Bokun API', 'description' => 'Used for tourism product and booking synchronization.', 'endpoint' => 'bokun/webhook/listener', 'icon' => 'TOUR'],
                        ['name' => 'Google People API', 'description' => 'Used for contact sync with duplicate prevention.', 'endpoint' => 'google/contacts/sync', 'icon' => 'CRM'],
                        ['name' => 'SendOwl Webhooks', 'description' => 'Used for order sync, digital delivery, and follow-up emails.', 'endpoint' => 'sendowl/webhook/event', 'icon' => 'DLV'],
                        ['name' => 'Razorpay', 'description' => 'Used for appointment payment collection and verification.', 'endpoint' => 'razorpay/v1/orders', 'icon' => 'PAY'],
                        ['name' => 'Stripe', 'description' => 'Used for checkout and payment verification flows.', 'endpoint' => 'stripe/v1/checkout', 'icon' => 'PAY'],
                        ['name' => 'RevenueCat', 'description' => 'Used for Flutter subscription and purchase management.', 'endpoint' => 'revenuecat/subscribers/info', 'icon' => 'SUB'],
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
                        'Shared Hosting Deployments',
                        'Hostinger VPS Deployments',
                        'Dockerized Production Setups',
                        'Laravel Cloud Deployments',
                        'Cloudflare DNS and SSL',
                        'Cloudflare Tunnel Previews',
                        'Queue Workers and Cron Jobs',
                        'Webhook Automation',
                        'Payment Integrations',
                        'Firebase Auth Workflows',
                        'Flutter Backend APIs',
                        'Production Debugging and Maintenance'
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
                        ['area' => 'Backend Development', 'stars' => 5, 'level' => 'Expert'],
                        ['area' => 'API Integrations', 'stars' => 5, 'level' => 'Expert'],
                        ['area' => 'WordPress and Shopify Work', 'stars' => 5, 'level' => 'Expert'],
                        ['area' => 'Flutter Backends', 'stars' => 4, 'level' => 'Advanced'],
                        ['area' => 'Cloud and Deployment', 'stars' => 4, 'level' => 'Advanced'],
                        ['area' => 'Database Design', 'stars' => 4, 'level' => 'Advanced'],
                        ['area' => 'AI Integrations', 'stars' => 4, 'level' => 'Advanced'],
                    ],
                ],
            ],
            [
                'key' => 'timeline',
                'title' => 'Technology Timeline',
                'subtitle' => 'A simple growth path from WordPress websites to Laravel systems, mobile backends, and cloud deployment work.',
                'is_visible' => true,
                'content' => [
                    'items' => [
                        ['year' => '2022', 'title' => 'WordPress and PHP Foundation', 'description' => 'Started with custom WordPress themes, dynamic pages, WooCommerce work, and core PHP-based implementation.'],
                        ['year' => '2023', 'title' => 'Laravel Full-Stack Projects', 'description' => 'Built Laravel admin panels, APIs, business workflows, and database-driven internal systems.'],
                        ['year' => '2024', 'title' => 'Shopify, Flutter, and AI Integrations', 'description' => 'Worked on Shopify apps, Flutter backends, Firebase auth flows, OpenAI integrations, and RevenueCat-based subscriptions.'],
                        ['year' => '2025', 'title' => 'Cloud and Production Delivery', 'description' => 'Handled Hostinger VPS deployments, Docker stacks, Laravel Cloud setups, Cloudflare configuration, and live maintenance work.'],
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
                        ['title' => 'Healthcare Systems', 'points' => ['Telemedicine platforms', 'Voice prescription workflows', 'Patient queues and notifications']],
                        ['title' => 'CMS and Booking Systems', 'points' => ['WordPress custom themes', 'Bokun integrations', 'Dynamic admin-managed content']],
                        ['title' => 'eCommerce and Shopify', 'points' => ['Custom Shopify apps', 'AI image generation flows', 'Payments and digital delivery']],
                        ['title' => 'Mobile Backends', 'points' => ['Flutter-ready APIs', 'Firebase authentication', 'RevenueCat subscriptions']],
                    ],
                ],
            ],
            [
                'key' => 'snippets',
                'title' => 'Code Snippets Library',
                'subtitle' => 'Practical backend, front-end, and deployment snippets with real use-case descriptions.',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'blog',
                'title' => 'Articles & Insights',
                'subtitle' => 'Short practical articles covering deployment, APIs, performance, and integration workflows.',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'resources',
                'title' => 'Developer Toolkit',
                'subtitle' => 'Laravel tools, deployment utilities, and references with simple notes on how to use them.',
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
                'subtitle' => 'Active developer scripts and libraries synced directly from GitHub.',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'contact',
                'title' => "Let's Work Together",
                'subtitle' => 'Share your project scope and goals. I will reply with a clear implementation plan.',
                'is_visible' => true,
                'content' => [
                    'email' => 'laxmi20024@gmail.com',
                    'phone' => '+91 6280788413',
                ],
            ],
        ];

        foreach ($sections as $sectionData) {
            Section::create($sectionData);
        }
    }
}
