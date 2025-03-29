<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Admin\ProjectController;

Route::get('/', [LandingController::class, 'index'])->name('home');

// Public Contact Form Route
Route::post('contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Profile Routes
    Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
    
    // Experience Routes
    Route::resource('experiences', ExperienceController::class);
    
    // Education Routes
    Route::resource('educations', EducationController::class);
    
    // Project Routes
    Route::resource('projects', ProjectController::class);
    
    // Contact Routes
    Route::resource('contacts', ContactController::class);
    Route::post('contacts/{contact}/mark-as-read', [Admin\ContactController::class, 'markAsRead'])->name('contacts.mark-as-read');
    Route::post('contacts/{contact}/mark-as-unread', [Admin\ContactController::class, 'markAsUnread'])->name('contacts.mark-as-unread');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
