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
        Schema::create('blog_post_views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_post_id')->constrained()->cascadeOnDelete();
            $table->string('visitor_hash', 64);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->unique(['blog_post_id', 'visitor_hash']);
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->unsignedInteger('views_count')->default(0);
            $table->unsignedInteger('reads_count')->default(0);
        });

        Schema::table('header_settings', function (Blueprint $table) {
            $table->boolean('show_view_counts')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn('show_view_counts');
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['views_count', 'reads_count']);
        });

        Schema::dropIfExists('blog_post_views');
    }
};
