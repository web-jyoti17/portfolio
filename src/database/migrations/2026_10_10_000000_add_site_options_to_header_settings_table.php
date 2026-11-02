<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->string('tagline', 500)->nullable();
            $table->string('resume_file')->nullable();

            $table->boolean('show_email')->default(true);
            $table->boolean('show_phone')->default(false);
            $table->boolean('show_location')->default(true);
            $table->boolean('show_social_links')->default(true);
            $table->boolean('show_availability')->default(true);

            $table->string('location')->nullable();
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();

            $table->boolean('show_theme_toggle')->default(true);
            $table->string('default_theme', 10)->default('light');

            $table->boolean('show_share_buttons')->default(true);
            $table->boolean('show_new_badge')->default(true);
            $table->unsignedSmallInteger('new_badge_days')->default(14);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn([
                'tagline',
                'resume_file',
                'show_email',
                'show_phone',
                'show_location',
                'show_social_links',
                'show_availability',
                'location',
                'github_url',
                'linkedin_url',
                'show_theme_toggle',
                'default_theme',
                'show_share_buttons',
                'show_new_badge',
                'new_badge_days',
            ]);
        });
    }
};
