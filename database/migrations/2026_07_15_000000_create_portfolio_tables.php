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
        // 1. Projects Table
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->longText('content')->nullable();
            $table->string('image_path')->nullable();
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->json('tech_stack')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_proprietary')->default(false);
            $table->string('category'); // e.g. Web, Mobile, Open Source
            $table->string('client_name')->nullable();
            $table->date('completion_date')->nullable();
            $table->timestamps();
        });

        // 2. Blog Posts Table
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->longText('content');
            $table->string('cover_image')->nullable();
            $table->json('tags')->nullable();
            $table->string('status')->default('draft'); // e.g. draft, published
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 3. Case Studies Table
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->text('challenge');
            $table->text('solution');
            $table->text('results');
            $table->json('tech_stack')->nullable();
            $table->string('image_path')->nullable();
            $table->string('client_name')->nullable();
            $table->string('duration')->nullable(); // e.g. "3 months"
            $table->timestamps();
        });

        // 4. Skills Table
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // e.g. frontend, backend, devops, tools
            $table->string('level'); // e.g. beginner, intermediate, advanced, expert
            $table->integer('percentage')->default(100);
            $table->string('icon_class')->nullable();
            $table->timestamps();
        });

        // 5. Experiences Table (Work History)
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->string('company');
            $table->string('location')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);
            $table->text('description')->nullable();
            $table->json('achievements')->nullable();
            $table->timestamps();
        });

        // 6. Educations Table
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('degree');
            $table->string('field_of_study');
            $table->string('institution');
            $table->string('location')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 7. Certifications Table
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('issuing_organization');
            $table->date('issue_date');
            $table->date('expiration_date')->nullable();
            $table->string('credential_id')->nullable();
            $table->string('credential_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('case_studies');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('projects');
    }
};
