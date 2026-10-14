<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ResumeGeneratorController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/test-mail', function () {
    Mail::html('<h1>This is test mail</h1><p>Testing email sending from Laravel.</p>', function ($message) {
        $message->to('laxmi20024@gmail.com')
            ->subject('Test Mail');
    });

    return 'Test mail sent!';
});

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/insights/{slug}', [PortfolioController::class, 'showArticle'])->name('article.show');
Route::post('/insights/{slug}/read', [PortfolioController::class, 'markArticleRead'])->middleware('throttle:30,1')->name('article.read');
Route::get('/projects/{slug}', [PortfolioController::class, 'showProject'])->name('project.show');
Route::get('/showcase/{slug}', [PortfolioController::class, 'showShowcase'])->name('showcase.show');
Route::post('/testimonials', [PortfolioController::class, 'storeTestimonial'])->name('testimonials.store');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,10')->name('contact.store');
Route::get('/resumes/{resume}/download', [PortfolioController::class, 'downloadResume'])->name('resumes.download');
Route::get('/resume/download', [ResumeGeneratorController::class, 'generate'])->name('resume.generate');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
