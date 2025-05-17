<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

// Contact form route
Route::post('/contact', [ContactController::class, 'store']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin contact management routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::patch('/contacts/{contact}/mark-as-read', [ContactController::class, 'markAsRead'])->name('contacts.mark-as-read');
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
