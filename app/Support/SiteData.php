<?php

namespace App\Support;

use App\Models\HeaderSetting;
use App\Models\Section;
use Illuminate\Support\Collection;
use Throwable;

/**
 * Everything the public pages (portfolio, articles, showcase) share:
 * header, footer, contact details and the admin visibility switches.
 */
class SiteData
{
    /**
     * Section anchors offered in the admin mapped to the ids used on the page.
     */
    private const DEFAULT_NAV = [
        ['label' => 'About', 'url' => '#about', 'section' => 'banner'],
        ['label' => 'Experience', 'url' => '#experience', 'section' => 'experience'],
        ['label' => 'Projects', 'url' => '#projects', 'section' => 'projects'],
        ['label' => 'Skills', 'url' => '#skills', 'section' => 'skills'],
        ['label' => 'Blog', 'url' => '#blog', 'section' => 'blog'],
        ['label' => 'Contact', 'url' => '#contact', 'section' => 'contact'],
    ];

    private const DEFAULT_MOBILE_NAV = [
        ['label' => 'Home', 'url' => '#about', 'section' => 'banner'],
        ['label' => 'Projects', 'url' => '#projects', 'section' => 'projects'],
        ['label' => 'Skills', 'url' => '#skills', 'section' => 'skills'],
        ['label' => 'Blog', 'url' => '#blog', 'section' => 'blog'],
        ['label' => 'Contact', 'url' => '#contact', 'section' => 'contact'],
    ];

    /**
     * Sections for the browser. Contact details the admin has hidden are removed
     * here so they never reach the page source.
     *
     * @return Collection<int, Section>
     */
    public static function sections(): Collection
    {
        $settings = HeaderSetting::current();

        return Section::orderBy('sort_order')->orderBy('id')->get()->each(function (Section $section) use ($settings) {
            if ($section->key !== 'contact' || ! is_array($section->content)) {
                return;
            }

            $content = $section->content;

            if (! $settings->show_phone) {
                unset($content['phone']);
            }

            if (! $settings->show_email) {
                unset($content['email']);
            }

            $section->content = $content;
        });
    }

    /**
     * Shared Inertia props for the site header and footer.
     *
     * @return array<string, mixed>
     */
    public static function share(): array
    {
        $settings = HeaderSetting::current();

        try {
            $sections = Section::all()->keyBy('key');
        } catch (Throwable) {
            $sections = collect();
        }

        $contact = $sections->get('contact')?->content ?? [];
        $visible = fn (array $link) => $sections->get($link['section'])?->is_visible ?? true;
        $strip = fn (array $link) => ['label' => $link['label'], 'url' => $link['url']];

        $navLinks = $settings->nav_links ?: collect(self::DEFAULT_NAV)->filter($visible)->map($strip)->values()->all();
        $mobileNavLinks = $settings->mobile_nav_links ?: collect(self::DEFAULT_MOBILE_NAV)->filter($visible)->map($strip)->values()->all();

        return [
            'logo_text' => $settings->logo_text ?: HeaderSetting::DEFAULTS['logo_text'],
            'logo_url' => $settings->logoUrl(),
            'tagline' => $settings->tagline,
            'nav_links' => array_values($navLinks),
            'mobile_nav_links' => array_slice(array_values($mobileNavLinks), 0, 5),
            'show_resume_button' => (bool) $settings->show_resume_button,
            'resume_url' => route('resume.generate'),
            'show_theme_toggle' => (bool) $settings->show_theme_toggle,
            'default_theme' => $settings->defaultTheme(),
            'show_share_buttons' => (bool) $settings->show_share_buttons,
            'show_new_badge' => (bool) $settings->show_new_badge,
            'new_badge_days' => max(1, (int) $settings->new_badge_days),
            'show_availability' => (bool) $settings->show_availability,
            'availability_status' => $settings->availability_status ?: 'Available',
            'response_time' => $settings->response_time ?: '< 12 hours',
            'accent' => $settings->accent(),
            'neutral' => $settings->neutral(),
            'favicon_url' => $settings->faviconUrl(),
            'seo_title' => $settings->seo_title,
            'seo_description' => $settings->seo_description,
            'contact' => [
                'email' => $settings->show_email ? ($contact['email'] ?? null) : null,
                'phone' => $settings->show_phone ? ($contact['phone'] ?? null) : null,
                'location' => $settings->show_location ? $settings->location : null,
                'github' => $settings->show_social_links ? $settings->github_url : null,
                'linkedin' => $settings->show_social_links ? $settings->linkedin_url : null,
                'twitter' => $settings->show_social_links ? $settings->twitter_url : null,
                'instagram' => $settings->show_social_links ? $settings->instagram_url : null,
            ],
        ];
    }
}
