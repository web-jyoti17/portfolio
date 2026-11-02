<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Articles count as "New" for one week instead of two.
     * Only sites still on the old default of 14 days are changed.
     */
    public function up(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->unsignedSmallInteger('new_badge_days')->default(7)->change();
        });

        DB::table('header_settings')->where('new_badge_days', 14)->update(['new_badge_days' => 7]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->unsignedSmallInteger('new_badge_days')->default(14)->change();
        });

        DB::table('header_settings')->where('new_badge_days', 7)->update(['new_badge_days' => 14]);
    }
};
