<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/insights/{slug}', [PortfolioController::class, 'showArticle'])->name('article.show');
Route::post('/testimonials', [PortfolioController::class, 'storeTestimonial'])->name('testimonials.store');
Route::get('/resumes/{resume}/download', [PortfolioController::class, 'downloadResume'])->name('resumes.download');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
