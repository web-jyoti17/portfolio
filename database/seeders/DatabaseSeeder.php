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
                'title' => 'CMC Telehealth Platform',
                'slug' => 'cmc-telehealth-platform',
                'description' => 'A complete WebRTC-based telemedicine consultation portal and billing engine for Christian Medical College Ludhiana.',
                'content' => "Built consultation modules for doctor schedules, patient appointments, and queue management. Developed secure REST APIs for Android and iOS app integrations. Integrated Whereby Video API for live WebRTC consultations. Configured Stripe & Razorpay payment gateways with robust webhook queues. Developed custom Laravel Filament admin pages ensuring all interfaces share a unified page layout schema.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://telehealthwebapplive.cmcludhiana.in/admin/dashboard',
                'tech_stack' => ['Laravel', 'Filament Layouts', 'REST APIs', 'Razorpay', 'Whereby API', 'Stripe', 'MySQL'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'CMC Ludhiana',
                'completion_date' => '2024-05-15',
            ],
            [
                'title' => 'DeployMeta Ecosystem',
                'slug' => 'deploymeta-platform',
                'description' => 'Scalable educational and support platforms containerized via Docker on Hostinger VPS.',
                'content' => "Engineered doctor/patient portals, attendance managers, and support tickets in Laravel and Next.js. Deployed multiple container workloads on Hostinger VPS servers using Docker and Docker Compose. Configured Plesk hosting panels, mapped custom subdomains in Cloudflare DNS, and utilized Cloudflared tunnels to share local development environments live for client testing and previews.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://support.deploymeta.com/',
                'tech_stack' => ['Laravel', 'Docker', 'Hostinger VPS', 'Cloudflare DNS', 'Cloudflared', 'Plesk'],
                'is_featured' => true,
                'is_proprietary' => true,
                'category' => 'Laravel',
                'client_name' => 'DeployMeta',
                'completion_date' => '2024-11-20',
            ],
            [
                'title' => 'Orvella Studio Shopify Generator',
                'slug' => 'orvella-studio',
                'description' => 'Custom Shopify storefront featuring DALL-E/GPT AI-powered artwork generation.',
                'content' => "Built custom Liquid theme templates and integrated real-time ChatGPT image generation (DALL-E) directly into the Shopify storefront. Developed a Laravel API intermediary to secure credentials, cache images, and sync purchases. Configured SendOwl webhook integrations to instantly deliver digital downloads and coordinate upsells on the customer dashboard.",
                'image_path' => null,
                'github_url' => 'https://github.com/CodeSproutX/orvella-studio',
                'live_url' => 'https://orvellastudio.com/',
                'tech_stack' => ['Shopify', 'Laravel API', 'Liquid', 'ChatGPT DALL-E', 'SendOwl Webhooks'],
                'is_featured' => true,
                'is_proprietary' => false,
                'category' => 'Shopify',
                'client_name' => 'Orvella Studio',
                'completion_date' => '2024-02-18',
            ],
            [
                'title' => 'Lisbon Star Tour Platform',
                'slug' => 'lisbon-star',
                'description' => 'Tour booking engine integration syncing Bokun booking data with Google Contacts and SendOwl.',
                'content' => "Configured tour booking system featuring webhooks that sync booking data with MySQL. Designed a sync worker using Google People API via Google Cloud Console credentials to save customer entities into Google Contacts. Developed a WordPress admin dashboard listening to SendOwl webhooks, displaying booking schedules, sending follow-up emails prior to the selected tour dates, and displaying targeted promotional offers.",
                'image_path' => null,
                'github_url' => null,
                'live_url' => 'https://www.lisbonstar.pt/',
                'tech_stack' => ['WordPress Admin', 'Bokun API', 'Google Contacts', 'SendOwl Webhooks', 'MySQL'],
                'is_featured' => false,
                'is_proprietary' => false,
                'category' => 'WordPress',
                'client_name' => 'Lisbon Star',
                'completion_date' => '2023-08-10',
            ],
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }

        // 3. Seed Case Studies
        CaseStudy::create([
            'title' => 'CMC Telemedicine Queue & Video Consultation Setup',
            'slug' => 'cmc-telemedicine-architecture',
            'summary' => 'Building a highly scalable patient queue and WebRTC consultation room integrated with local payment flows.',
            'challenge' => 'CMC Ludhiana required a telehealth layout supporting live consultations, secure logs, and automated payments while keeping the administration experience consistent across different user roles.',
            'solution' => 'Integrated Whereby API video consultations inside React components. Wired Stripe and Razorpay payment gateways with robust webhook verification loops. Engineered custom base Laravel Filament resource pages ensuring all admin tables share a unified layout style.',
            'results' => 'Reduced consultation entry latency by 45% and successfully completed over 50,000 consults with zero layout errors.',
            'tech_stack' => ['Laravel', 'Filament Layouts', 'Whereby API', 'Stripe', 'Razorpay', 'MySQL'],
            'image_path' => null,
            'client_name' => 'CMC Ludhiana',
            'duration' => '6 Months',
        ]);

        CaseStudy::create([
            'title' => 'Dockerized Hostinger VPS & Cloudflare Subdomains setup',
            'slug' => 'docker-hostinger-vps-cloudflare',
            'summary' => 'Deploying scalable application container workloads on Hostinger VPS using Docker, Plesk routing, and Cloudflared staging tunnels.',
            'challenge' => 'Clients needed constant previews of development codebases. We had to host multiple containerized systems on a single Hostinger VPS with proper subdomain routing and local-to-live tunnel testing.',
            'solution' => 'Built Docker Compose scripts running PHP-FPM, Nginx, and MySQL on the VPS. Set up domain mapping on Plesk using Cloudflare DNS. Explicated local staging builds to live test URLs via Cloudflared tunnels to share immediately with project managers before deployment.',
            'results' => 'Simplified deployment steps, reduced hosting costs by 60%, and enabled direct local-to-live sharing for quick verification.',
            'tech_stack' => ['Docker Compose', 'Hostinger VPS', 'Plesk Web Host', 'Cloudflared Tunnels', 'Cloudflare Subdomains'],
            'image_path' => null,
            'client_name' => 'DeployMeta / Freelance',
            'duration' => '3 Months',
        ]);

        CaseStudy::create([
            'title' => 'Bokun API Booking Sync & SendOwl Webhook Automation',
            'slug' => 'bokun-sendowl-google-people-sync',
            'summary' => 'Automating customer contact syncing using Google People API and dispatching pre-tour follow-up email offers on WordPress.',
            'challenge' => 'Manually moving guest data from Bokun to contact lists took hours. We needed an automatic MySQL sync and a custom email system that sends follow-up offers a few days before the chosen tour dates.',
            'solution' => 'Built a Laravel webhook receiver that stores booking records in MySQL and synchronizes them to Google Contacts via the Google People API using Google Cloud Console credentials. Configured a WordPress dashboard that reads SendOwl webhooks, displays schedules, and sends pre-tour follow-ups.',
            'results' => 'Syncs 100% of customer names and emails instantly, increasing email click-through rate on tour campaigns by 35%.',
            'tech_stack' => ['Bokun API', 'Google People API', 'SendOwl Webhooks', 'MySQL Sync', 'WordPress Admin'],
            'image_path' => null,
            'client_name' => 'Lisbon Star / Orvella',
            'duration' => '4 Months',
        ]);

        // 4. Seed Skills
        $skills = [
            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-laravel', 'color' => '#FF2D20', 'years_of_experience' => 3],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-php', 'color' => '#777BB4', 'years_of_experience' => 3],
            ['name' => 'Laravel Filament', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-cogs', 'color' => '#EAB308', 'years_of_experience' => 2],
            ['name' => 'MySQL & DB Design', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-database', 'color' => '#4479A1', 'years_of_experience' => 3],
            ['name' => 'REST APIs & Webhooks', 'category' => 'Backend', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fas fa-link', 'color' => '#008080', 'years_of_experience' => 3],

            // Frontend
            ['name' => 'React.js', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-react', 'color' => '#61DAFB', 'years_of_experience' => 2],
            ['name' => 'Next.js', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-react', 'color' => '#000000', 'years_of_experience' => 2],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fab fa-css3-alt', 'color' => '#06B6D4', 'years_of_experience' => 3],
            ['name' => 'PageSpeed & LCP', 'category' => 'Frontend', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fas fa-tachometer-alt', 'color' => '#4CAF50', 'years_of_experience' => 2],
            ['name' => 'JavaScript & HTML5', 'category' => 'Frontend', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-js', 'color' => '#F7DF1E', 'years_of_experience' => 3],

            // CMS & E-commerce
            ['name' => 'WordPress & SendOwl', 'category' => 'CMS & E-commerce', 'level' => 'expert', 'percentage' => 90, 'icon_class' => 'fab fa-wordpress', 'color' => '#21759B', 'years_of_experience' => 3],
            ['name' => 'Shopify & Liquid', 'category' => 'CMS & E-commerce', 'level' => 'advanced', 'percentage' => 88, 'icon_class' => 'fab fa-shopify', 'color' => '#96BF48', 'years_of_experience' => 2],
            ['name' => 'Bokun Integration', 'category' => 'CMS & E-commerce', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-ticket-alt', 'color' => '#FF5722', 'years_of_experience' => 2],
            ['name' => 'Stripe & Razorpay', 'category' => 'CMS & E-commerce', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fas fa-credit-card', 'color' => '#6772E5', 'years_of_experience' => 3],

            // Tools & Architecture
            ['name' => 'Docker & Hostinger VPS', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fab fa-docker', 'color' => '#2496ED', 'years_of_experience' => 2],
            ['name' => 'Cloudflare & Cloudflared', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 90, 'icon_class' => 'fas fa-shield-alt', 'color' => '#F38020', 'years_of_experience' => 2],
            ['name' => 'Plesk Web Admin', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-server', 'color' => '#4F46E5', 'years_of_experience' => 2],
            ['name' => 'Postman API Testing', 'category' => 'Tools', 'level' => 'expert', 'percentage' => 92, 'icon_class' => 'fas fa-laptop-code', 'color' => '#FF6C37', 'years_of_experience' => 3],
            ['name' => 'Git & GitHub Versioning', 'category' => 'Tools', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fab fa-github', 'color' => '#181717', 'years_of_experience' => 3],
            ['name' => 'DB Diagram & Miro', 'category' => 'Tools', 'level' => 'advanced', 'percentage' => 85, 'icon_class' => 'fas fa-project-diagram', 'color' => '#059669', 'years_of_experience' => 2],
            ['name' => 'AI (ChatGPT & Cursor)', 'category' => 'Tools', 'level' => 'expert', 'percentage' => 95, 'icon_class' => 'fas fa-magic', 'color' => '#10A37F', 'years_of_experience' => 2],
        ];

        foreach ($skills as $sk) {
            Skill::create($sk);
        }

        // 5. Seed Experience
        Experience::create([
            'job_title' => 'Full Stack Web Developer & Contractor',
            'company' => 'Upwork Freelance / Quick Coders',
            'location' => 'Ludhiana, Punjab, India (Remote)',
            'start_date' => '2022-10-01',
            'is_current' => true,
            'description' => 'Delivered top-tier full-stack application development for global clients on Upwork. Configured containerized docker environments on Hostinger VPS, routed domains using Plesk with Cloudflare, and sync customer entries using webhooks.',
            'achievements' => [
                'Developed secure REST APIs for web and Flutter mobile applications tested using Postman.',
                'Built unified Laravel Filament admin layout configurations for hospital patient consultation queues.',
                'Exposed local development builds live for client testing using Cloudflared tunnels.',
                'Integrated payment gateways (Stripe, Razorpay) and APIs like Whereby and Google People API.',
                'Designed database models and mapped schemas using dbdiagram.io and Miro board mockups.',
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
                'summary' => 'How to use HTML fetchpriority, image preloading, and CSS content-visibility to get a 100/100 Lighthouse performance score.',
                'content' => "Largest Contentful Paint (LCP) is a key Google PageSpeed metric. In this post, we discuss how adding fetchpriority=\"high\" to hero images, preloading critical CSS resources in the HTML head, and applying content-visibility: auto to offscreen elements can dramatically speed up initial rendering. We also cover debugging LCP and MCP in Chrome DevTools to locate performance bottlenecks.",
                'tags' => ['PageSpeed', 'LCP', 'Frontend', 'Performance'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Deploying Dockerized Laravel Apps on Hostinger VPS using Plesk',
                'slug' => 'deploying-docker-laravel-hostinger-vps-plesk',
                'summary' => 'A complete walkthrough of setting up Docker containers on Hostinger, configuring Plesk hosting, and mapping subdomains via Cloudflare.',
                'content' => "Deploying applications to a VPS doesn't have to be complex. We walk through creating a docker-compose.yml file containing Laravel, PHP-FPM, Nginx, and MySQL. We then show how to set up Plesk to route traffic, and configure Cloudflare SSL/TLS rules to manage subdomains securely. This setup guarantees isolated app environments and high server performance.",
                'tags' => ['Docker', 'Hostinger', 'Plesk', 'Cloudflare'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Syncing Bokun API with Google Contacts using the Google People API',
                'slug' => 'syncing-bokun-api-google-contacts-google-people-api',
                'summary' => 'How to capture Bokun webhook entries, save them to MySQL, and sync them to Google Contacts using a Google Cloud Console App.',
                'content' => "Automating customer contact management keeps marketing lists updated. We implement a webhook endpoint in Laravel that listens to Bokun booking actions. On receipt of booking data, we update MySQL database records and dispatch a job that utilizes the Google People API via OAuth2.0 credentials from Google Cloud Console, creating or updating the contact record seamlessly.",
                'tags' => ['Laravel', 'Bokun API', 'Google Contacts', 'Webhooks'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Setting Up Cloudflared Tunnels for Zero-Configuration Local-to-Live Staging',
                'slug' => 'setting-up-cloudflared-tunnels-local-live-staging',
                'summary' => 'How to run cloudflared tunnels locally to let clients review staging codebases in real-time without deployment.',
                'content' => "Sharing local development environments with external testing parties is a breeze using Cloudflared tunnels. Instead of exposing router ports or pushing incomplete branches to production, we can run cloudflared tunnel locally. In this guide, we walk through installing cloudflared, authenticating with a Google Console Cloudflare domain, setting up config.yml, and starting the tunnel. This creates a secure tunnel mapped to staging.yourdomain.dev, allowing real-time testing.",
                'tags' => ['Cloudflare', 'Tunnel', 'DevOps', 'Staging'],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Securing Shopify Art Generators with Laravel Intermediary APIs',
                'slug' => 'securing-shopify-art-generators-laravel-intermediary-apis',
                'summary' => 'Using custom Laravel backends to protect OpenAI ChatGPT keys and validate client print requests on Shopify.',
                'content' => "Exposing API keys in clientside scripts is a major security flaw. To implement ChatGPT artwork generation securely on Shopify storefronts, we configure a Laravel backend API. The Shopify frontend sends requests to Laravel, which validates signatures, rate-limits users, communicates with DALL-E, caches generated image links in MySQL, and synchronizes the digital assets with SendOwl webhook callbacks.",
                'tags' => ['Shopify', 'Laravel', 'ChatGPT', 'Security'],
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
                'description' => 'A production docker-compose script running Laravel, PHP-FPM, Nginx, and MySQL with volume persistent storage on a Hostinger VPS server.',
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
                'language' => 'YAML',
                'category' => 'Tools',
                'description' => 'Expose local development ports (e.g. 8000) securely to a public Cloudflare URL to share testing builds with clients before deployment.',
                'code' => 'tunnel: local-dev-portfolio-tunnel
credentials-file: /users/apple/.cloudflared/local-dev-portfolio-tunnel.json

ingress:
  # Map local testing port to subdomains
  - hostname: staging.lakshmi.dev
    service: http://localhost:8000
  - hostname: api-test.lakshmi.dev
    service: http://localhost:8000
  # Catch-all rule returning 404
  - service: http_status:404',
                'tags' => ['cloudflare', 'cloudflared', 'tunnel', 'testing'],
            ],
            [
                'title' => 'Google People API Customer Sync Service',
                'slug' => 'google-people-api-customer-sync',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'A service syncing Bokun customer webhook entries to Google Contacts using the Google People API via Google Cloud Console credentials.',
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
                'description' => 'A custom PHP handler receiving SendOwl webhook payloads to parse tour dates, save customer entities, and schedule follow-up emails before departure dates.',
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
                'description' => 'Optimizing Google PageSpeed LCP using preloading, fetchpriority="high", and decoding="async" for major image assets.',
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
                'description' => 'A custom base Filament page class forcing all custom resource panels to render with identical layouts and style configurations.',
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
                'description' => 'A Laravel route controller handling ChatGPT image creation requests, storing assets locally to prevent key exposure.',
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
            [
                'title' => 'Whereby WebRTC Consultation Queue status checker',
                'slug' => 'webrtc-consultation-queue-status',
                'language' => 'PHP',
                'category' => 'Backend',
                'description' => 'Real-time consult room occupancy validator fetching doctor consultation status from Whereby REST API endpoint.',
                'code' => '<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TelehealthQueueService
{
    public function verifyRoomOccupancy(string $roomId): array
    {
        // Query Whereby Room API for active session status
        $response = Http::withToken(config(\'services.whereby.key\'))
            ->get("https://api.whereby.dev/v1/meetings/{$roomId}");
            
        if ($response->successful()) {
            return [
                \'active\' => true,
                \'participant_count\' => $response->json(\'participantCount\'),
                \'duration\' => $response->json(\'duration\')
            ];
        }
        
        return [\'active\' => false, \'participant_count\' => 0];
    }
}',
                'tags' => ['telehealth', 'webrtc', 'whereby', 'api'],
            ],
        ];

        foreach ($snippets as $snip) {
            CodeSnippet::create($snip);
        }

        // Seed Developer Toolkit resources
        $resources = [
            ['name' => 'Miro Board Design', 'category' => 'Design Resources', 'url' => 'https://miro.com/', 'description' => 'Visual collaboration whiteboard for database diagram architecture mappings.', 'is_featured' => true],
            ['name' => 'dbdiagram.io', 'category' => 'Design Resources', 'url' => 'https://dbdiagram.io/', 'description' => 'Fast, clean database model diagramming tool writing DBML to SQL.', 'is_featured' => true],
            ['name' => 'Postman Client', 'category' => 'API Testing Tools', 'url' => 'https://www.postman.com/', 'description' => 'API testing console supporting automated collections and request assertions.', 'is_featured' => true],
            ['name' => 'Cloudflared CLI Tunnel', 'category' => 'Deployment Tools', 'url' => 'https://github.com/cloudflare/cloudflared', 'description' => 'Argo tunnel tool to map local development endpoints to live testing URLs.', 'is_featured' => true],
            ['name' => 'Plesk Hosting Panel', 'category' => 'Deployment Tools', 'url' => 'https://www.plesk.com/', 'description' => 'Web hosting panel supporting Docker deployments, MySQL setups, and DNS routing.', 'is_featured' => true],
            ['name' => 'Docker Desktop', 'category' => 'Deployment Tools', 'url' => 'https://www.docker.com/', 'description' => 'Container management desktop platform to test isolated systems.', 'is_featured' => true],
            ['name' => 'ChatGPT Dev Console', 'category' => 'AI Tools', 'url' => 'https://platform.openai.com/', 'description' => 'AI developer console for API key management and billing configuration.', 'is_featured' => true],
            ['name' => 'Cursor Editor', 'category' => 'AI Tools', 'url' => 'https://www.cursor.com/', 'description' => 'Next-generation AI editor powered by large language models for paired coding.', 'is_featured' => true],
            ['name' => 'Laravel Filament Panel', 'category' => 'Laravel Packages', 'url' => 'https://filamentphp.com/', 'description' => 'Admin dashboard kit offering uniform schemas and data grids.', 'is_featured' => true],
            ['name' => 'SendOwl Digital Sync', 'category' => 'Laravel Packages', 'url' => 'https://www.sendowl.com/', 'description' => 'Digital downloads sync manager supporting webhooks for e-commerce stores.', 'is_featured' => true],
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
                'subtitle' => "Full Stack Web Developer",
                'is_visible' => true,
                'content' => [
                    'hero_subtitle' => 'Full Stack Web Developer with 3+ years of experience. Specialized in Hostinger VPS Docker setups, Cloudflare subdomains, Plesk configuration, ChatGPT API image generators, Whereby consultations, custom Filament layout pages, and webhook integrations like MySQL/Bokun/Google Contacts and WordPress/SendOwl follow-ups. Experienced with Git, Postman API testing, Miro database designs, dbdiagram.io, and optimizing Google PageSpeed LCP.',
                    'button_text_1' => 'Contact Me',
                    'button_text_2' => 'GitHub Profile',
                ],
            ],
            [
                'key' => 'experience',
                'title' => 'Professional Experience',
                'subtitle' => 'My work history and career path focusing on dockerized VPS deployments and local tunnel configurations',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'projects',
                'title' => 'Featured Projects',
                'subtitle' => 'A curated list of my client and personal projects',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'case_studies',
                'title' => 'Interactive Case Studies',
                'subtitle' => 'Deep dives into how we solved complex business and tech challenges',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'skills',
                'title' => 'Skills & Tech Stack',
                'subtitle' => 'Languages, frameworks, databases, and development tools I use',
                'is_visible' => true,
                'content' => null,
            ],
            [
                'key' => 'snippets',
                'title' => 'Code Snippets Library',
                'subtitle' => 'Reusable helpers and hook overrides managed directly from the Filament admin.',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'blog',
                'title' => 'Articles & Insights',
                'subtitle' => 'My tutorials, design thoughts, and tech writeups',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'resources',
                'title' => 'Developer Toolkit',
                'subtitle' => 'Useful links and libraries for development',
                'is_visible' => true,
                'content' => [
                    'use_slider' => true,
                ],
            ],
            [
                'key' => 'certifications',
                'title' => 'Certifications & Credentials',
                'subtitle' => 'Verified professional courses and learning achievements',
                'is_visible' => true,
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
                'subtitle' => 'Have a project in mind or looking for a developer? Get in touch!',
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
