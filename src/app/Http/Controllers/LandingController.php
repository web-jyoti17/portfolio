<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Experience;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $profile = Profile::with('experiences')->first();
        
        return Inertia::render('landing', [
            'profile' => $profile
        ]);
    }
} 