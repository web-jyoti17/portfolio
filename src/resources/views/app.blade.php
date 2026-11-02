<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-default-appearance="{{ $defaultAppearance ?? 'light' }}" @class(['dark' => ($appearance ?? 'light') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="theme-color" content="#f59e0b">
        <meta name="site-name" content="{{ $siteName ?? config('app.name') }}">

        {{-- Apply the visitor's saved theme before the first paint so the page never flashes --}}
        <script>
            (function() {
                var appearance = '{{ $appearance ?? "light" }}';

                try {
                    appearance = localStorage.getItem('site-appearance') || appearance;
                } catch (e) {}

                if (appearance === 'system') {
                    appearance = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }

                document.documentElement.classList.toggle('dark', appearance === 'dark');
                document.documentElement.style.colorScheme = appearance === 'dark' ? 'dark' : 'light';
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #ffffff;
            }

            html.dark {
                background-color: #0f0f11;
            }
        </style>

        @if ($hasCustomFavicon ?? false)
            <link rel="icon" href="{{ $faviconUrl }}">
            <link rel="apple-touch-icon" href="{{ $faviconUrl }}">
        @else
            <link rel="icon" href="/favicon.ico" sizes="any">
            <link rel="icon" href="/favicon.svg" type="image/svg+xml">
            <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        @endif

        {{-- Link previews for LinkedIn, WhatsApp, X and others (they do not run JavaScript) --}}
        @isset($meta)
            <meta name="description" content="{{ $meta['description'] ?? '' }}">
            <link rel="canonical" href="{{ $meta['url'] ?? url()->current() }}">
            <meta property="og:site_name" content="{{ $siteName ?? config('app.name') }}">
            <meta property="og:type" content="{{ $meta['type'] ?? 'website' }}">
            <meta property="og:title" content="{{ $meta['title'] ?? ($siteName ?? config('app.name')) }}">
            <meta property="og:description" content="{{ $meta['description'] ?? '' }}">
            <meta property="og:url" content="{{ $meta['url'] ?? url()->current() }}">
            @if (! empty($meta['image']))
                <meta property="og:image" content="{{ $meta['image'] }}">
                <meta name="twitter:image" content="{{ $meta['image'] }}">
            @endif
            @if (! empty($meta['published_at']))
                <meta property="article:published_time" content="{{ $meta['published_at'] }}">
            @endif
            <meta name="twitter:card" content="{{ empty($meta['image']) ? 'summary' : 'summary_large_image' }}">
            <meta name="twitter:title" content="{{ $meta['title'] ?? ($siteName ?? config('app.name')) }}">
            <meta name="twitter:description" content="{{ $meta['description'] ?? '' }}">
        @endisset

        {{-- The font pair is chosen in the admin (Site Settings → Theme) --}}
        @isset($fonts)
            <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
            <link rel="stylesheet" href="{{ $fonts['url'] }}">
            <style>
                :root {
                    --font-sans: '{{ $fonts['body'] }}', ui-sans-serif, system-ui, sans-serif;
                    --font-display: '{{ $fonts['heading'] }}', '{{ $fonts['body'] }}', ui-sans-serif, system-ui, sans-serif;
                }
            </style>
        @endisset

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ isset($meta['title']) ? $meta['title'].' - ' : '' }}{{ $siteName ?? config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
