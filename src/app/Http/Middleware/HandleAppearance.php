<?php

namespace App\Http\Middleware;

use App\Models\HeaderSetting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $settings = HeaderSetting::current();
        $default = $settings->defaultTheme();

        View::share('siteName', $settings->logo_text ?: config('app.name'));
        View::share('faviconUrl', $settings->faviconUrl());
        View::share('fonts', $settings->fonts());
        View::share('hasCustomFavicon', (bool) $settings->favicon);
        $chosen = $request->cookie('site_appearance');

        View::share('defaultAppearance', $default);
        View::share('appearance', in_array($chosen, ['light', 'dark', 'system'], true) ? $chosen : $default);

        return $next($request);
    }
}
