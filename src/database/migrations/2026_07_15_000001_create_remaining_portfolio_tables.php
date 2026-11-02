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
        // 1. Code Snippets Table
        Schema::create('code_snippets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('language');
            $table->text('code');
            $table->string('category');
            $table->json('tags')->nullable();
            $table->timestamps();
        });

        // 2. Resources Table
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->string('url');
            $table->text('description');
            $table->string('image_path')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        // 3. Testimonials Table
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company');
            $table->string('position');
            $table->integer('rating')->default(5);
            $table->text('review');
            $table->string('profile_image')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });

        // 4. Resumes Table
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('file_path');
            $table->string('category');
            $table->integer('download_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 5. Update Skills Table
        Schema::table('skills', function (Blueprint $table) {
            $table->string('color')->nullable();
            $table->integer('years_of_experience')->default(0);
        });

        // 6. Update Certifications Table
        Schema::table('certifications', function (Blueprint $table) {
            $table->json('skills_covered')->nullable();
            $table->string('image_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn(['skills_covered', 'image_path']);
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->dropColumn(['color', 'years_of_experience']);
        });

        Schema::dropIfExists('resumes');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('resources');
        Schema::dropIfExists('code_snippets');
    }
};
