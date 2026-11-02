<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tables whose rows can be hidden and re-ordered from the admin.
     */
    private const ITEM_TABLES = ['projects', 'case_studies', 'skills', 'experiences', 'code_snippets', 'resources'];

    /**
     * The order the sections had on the page before ordering became editable.
     */
    private const SECTION_ORDER = [
        'banner',
        'tech_marquee',
        'projects',
        'case_studies',
        'experience',
        'experience_matrix',
        'production_experience',
        'api_integrations',
        'timeline',
        'specializations',
        'skills',
        'snippets',
        'resources',
        'blog',
        'github',
        'certifications',
        'contact',
        'engineering',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0)->index();
        });

        foreach (self::SECTION_ORDER as $position => $key) {
            DB::table('sections')->where('key', $key)->update(['sort_order' => ($position + 1) * 10]);
        }

        foreach (self::ITEM_TABLES as $name) {
            Schema::table($name, function (Blueprint $table) {
                $table->boolean('is_visible')->default(true);
                $table->unsignedInteger('sort_order')->default(0);
            });
        }

        Schema::table('header_settings', function (Blueprint $table) {
            $table->string('accent_color', 20)->default('amber');
            $table->string('neutral_color', 20)->default('zinc');
            $table->string('favicon')->nullable();
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->string('availability_status')->nullable();
            $table->string('response_time')->nullable();
            $table->string('github_username')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn([
                'accent_color',
                'neutral_color',
                'favicon',
                'seo_title',
                'seo_description',
                'availability_status',
                'response_time',
                'github_username',
            ]);
        });

        foreach (self::ITEM_TABLES as $name) {
            Schema::table($name, function (Blueprint $table) {
                $table->dropColumn(['is_visible', 'sort_order']);
            });
        }

        Schema::table('sections', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
};
