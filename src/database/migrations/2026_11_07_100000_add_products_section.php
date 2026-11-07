<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Adds the "My Products" section, starting with Mic Mate. Everything here can be
     * edited in the admin under Sections → My Products.
     */
    public function up(): void
    {
        if (DB::table('sections')->where('key', 'products')->exists()) {
            return;
        }

        DB::table('sections')->insert([
            'key' => 'products',
            'title' => 'My Products',
            'subtitle' => 'Things I have designed, built and run myself, end to end.',
            'is_visible' => true,
            'show_on_mobile' => true,
            'show_on_desktop' => true,
            'sort_order' => 0,
            'content' => json_encode([
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
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('sections')->where('key', 'products')->delete();
    }
};
