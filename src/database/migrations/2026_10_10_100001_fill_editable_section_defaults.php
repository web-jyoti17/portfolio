<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Text that used to be fixed in the page code. It now lives in each section's
     * content so it can be edited in the admin. Existing values are never replaced.
     */
    private const DEFAULTS = [
        'banner' => [
            'show_badge' => true,
            'badge_text' => 'Available for Freelance / Full-time',
            'stats' => [
                ['value' => '3+', 'label' => 'Years Experience'],
                ['value' => '6+', 'label' => 'Major Projects'],
                ['value' => '15+', 'label' => 'APIs Integrated'],
            ],
            'show_terminal' => true,
            'terminal_title' => 'production-monitor — bash',
            'terminal_rows' => [
                ['label' => 'Docker Engine', 'value' => 'Running · 3 containers', 'color' => 'green'],
                ['label' => 'Cloudflared Tunnel', 'value' => '→ localhost:8080', 'color' => 'accent'],
                ['label' => 'API Latency', 'value' => '14ms ✓', 'color' => 'blue'],
                ['label' => 'Queue Workers', 'value' => '4 workers active', 'color' => 'yellow'],
                ['label' => 'Webhook Events', 'value' => 'Stripe · Bokun · SendOwl', 'color' => 'accent'],
            ],
            'terminal_log' => [
                '✓ telehealth-api deployed (2h ago)',
                '✓ shopify-connector synced (1d ago)',
                '→ google-contacts-sync running',
            ],
        ],
        'tech_marquee' => [
            'layout' => 'both',
            'speed' => 32,
        ],
        'snippets' => [
            'show_filters' => true,
            'show_search' => true,
            'show_bookmarks' => true,
            'show_download' => true,
            'show_description' => true,
        ],
        'contact' => [
            'show_form' => true,
            'project_types' => [
                'Laravel Development',
                'WordPress Development',
                'Shopify App / Theme Development',
                'Flutter Mobile App',
                'Docker VPS Deployment',
                'AI Integration (OpenAI / Deepgram)',
                'Healthcare / Telemedicine Platform',
            ],
        ],
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach (self::DEFAULTS as $key => $defaults) {
            $section = DB::table('sections')->where('key', $key)->first();

            if (! $section) {
                continue;
            }

            $content = json_decode($section->content ?? 'null', true) ?: [];

            DB::table('sections')->where('key', $key)->update([
                'content' => json_encode($content + $defaults),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // The filled-in values are ordinary content from here on; nothing to undo.
    }
};
