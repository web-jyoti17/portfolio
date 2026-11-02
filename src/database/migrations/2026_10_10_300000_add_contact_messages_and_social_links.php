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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('project_type')->nullable();
            $table->text('message');
            $table->string('ip_address', 45)->nullable();
            $table->boolean('email_sent')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });

        Schema::table('header_settings', function (Blueprint $table) {
            $table->string('twitter_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('contact_notification_email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn(['twitter_url', 'instagram_url', 'contact_notification_email']);
        });

        Schema::dropIfExists('contact_messages');
    }
};
