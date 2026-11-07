<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/contact', [ContactController::class, 'api'])->middleware('throttle:60,1')->name('api.contact');
