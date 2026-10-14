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
        Schema::create('google_drive_connections', function (Blueprint $table) {
            $table->id();
            $table->string('email')->nullable();
            $table->text('refresh_token');
            $table->text('access_token')->nullable();
            $table->timestamp('access_token_expires_at')->nullable();
            $table->string('folder_id')->nullable();
            $table->timestamp('last_backup_at')->nullable();
            $table->string('last_backup_status')->nullable();
            $table->text('last_backup_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('google_drive_connections');
    }
};
