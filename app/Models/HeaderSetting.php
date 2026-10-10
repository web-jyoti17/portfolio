<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class HeaderSetting extends Model
{
    /**
     * Values used until the admin saves the Site Settings page.
     */
    public const DEFAULTS = [
        'logo_text' => 'Lakshmi.dev',
        'tagline' => 'Full Stack Developer building scalable web applications, mobile backends, and reliable production deployments.',
        'show_resume_button' => true,
        'show_email' => true,
        'show_phone' => false,
        'show_location' => true,
        'show_social_links' => true,
        'show_availability' => true,
        'location' => 'Punjab, India',
        'github_url' => 'https://github.com/CodeSproutX',
        'linkedin_url' => 'https://www.linkedin.com/in/lakshmi-backend-developer',
        'show_theme_toggle' => true,
        'default_theme' => 'light',
        'show_share_buttons' => true,
        'show_new_badge' => true,
        'new_badge_days' => 14,
        'accent_color' => 'amber',
        'neutral_color' => 'zinc',
        'seo_title' => 'Lakshmi | Full Stack Web & Mobile Developer',
        'seo_description' => 'Full Stack Developer portfolio of Lakshmi: Laravel, WordPress, Shopify, Flutter, Docker VPS, Cloudflare, AI integrations, REST APIs and production deployment.',
        'availability_status' => 'Available',
        'response_time' => '< 12 hours',
        'github_username' => 'CodeSproutX',
        'font_pair' => 'outfit-inter',
    ];

    public const ACCENTS = ['amber', 'orange', 'rose', 'violet', 'indigo', 'blue', 'teal', 'emerald'];

    public const NEUTRALS = ['zinc', 'slate', 'stone'];

    /**
     * Font choices: label, heading family, body family, and the families to load.
     */
    public const FONTS = [
        'outfit-inter' => ['Outfit + Inter (modern, default)', 'Outfit', 'Inter', 'outfit:500,600,700,800|inter:400,500,600,700'],
        'space-grotesk-inter' => ['Space Grotesk + Inter (technical)', 'Space Grotesk', 'Inter', 'space-grotesk:500,600,700|inter:400,500,600,700'],
        'sora-manrope' => ['Sora + Manrope (geometric)', 'Sora', 'Manrope', 'sora:600,700,800|manrope:400,500,600,700'],
        'jakarta' => ['Plus Jakarta Sans (friendly)', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'plus-jakarta-sans:400,500,600,700,800'],
        'montserrat-open-sans' => ['Montserrat + Open Sans (classic)', 'Montserrat', 'Open Sans', 'montserrat:600,700,800|open-sans:400,500,600,700'],
        'playfair-inter' => ['Playfair Display + Inter (elegant serif headings)', 'Playfair Display', 'Inter', 'playfair-display:600,700,800|inter:400,500,600,700'],
        'dm-sans' => ['DM Sans (soft)', 'DM Sans', 'DM Sans', 'dm-sans:400,500,600,700'],
        'poppins' => ['Poppins (rounded)', 'Poppins', 'Poppins', 'poppins:400,500,600,700'],
        'inter' => ['Inter (neutral)', 'Inter', 'Inter', 'inter:400,500,600,700,800'],
    ];

    protected $fillable = [
        'logo_text',
        'tagline',
        'show_resume_button',
        'resume_file',
        'nav_links',
        'mobile_nav_links',
        'show_email',
        'show_phone',
        'show_location',
        'show_social_links',
        'show_availability',
        'location',
        'github_url',
        'linkedin_url',
        'show_theme_toggle',
        'default_theme',
        'show_share_buttons',
        'show_new_badge',
        'new_badge_days',
        'accent_color',
        'neutral_color',
        'favicon',
        'logo_image',
        'font_pair',
        'twitter_url',
        'instagram_url',
        'contact_notification_email',
        'seo_title',
        'seo_description',
        'availability_status',
        'response_time',
        'github_username',
    ];

    protected $casts = [
        'show_resume_button' => 'boolean',
        'nav_links' => 'array',
        'mobile_nav_links' => 'array',
        'show_email' => 'boolean',
        'show_phone' => 'boolean',
        'show_location' => 'boolean',
        'show_social_links' => 'boolean',
        'show_availability' => 'boolean',
        'show_theme_toggle' => 'boolean',
        'show_share_buttons' => 'boolean',
        'show_new_badge' => 'boolean',
        'new_badge_days' => 'integer',
    ];

    /**
     * The saved settings merged over the defaults. Never touches the database twice per request.
     */
    public static function current(): self
    {
        static $resolved = null;

        if ($resolved instanceof self && ! app()->runningUnitTests()) {
            return $resolved;
        }

        try {
            $saved = self::query()->first();
        } catch (Throwable) {
            $saved = null;
        }

        $settings = new self(self::DEFAULTS);

        if ($saved) {
            $settings->setRawAttributes(array_merge(
                $settings->getAttributes(),
                array_filter($saved->getAttributes(), fn ($value) => $value !== null),
            ), true);
            $settings->exists = true;
        }

        return $resolved = $settings;
    }

    /**
     * The uploaded resume PDF, when one exists on disk.
     */
    public function resumePath(): ?string
    {
        if (! $this->resume_file || ! Storage::disk('public')->exists($this->resume_file)) {
            return null;
        }

        return $this->resume_file;
    }

    /**
     * @return array{heading: string, body: string, url: string}
     */
    public function fonts(): array
    {
        [, $heading, $body, $families] = self::FONTS[$this->font_pair] ?? self::FONTS['outfit-inter'];

        return [
            'heading' => $heading,
            'body' => $body,
            'url' => 'https://fonts.bunny.net/css?family='.$families.'&display=swap',
        ];
    }

    public function accent(): string
    {
        return in_array($this->accent_color, self::ACCENTS, true) ? $this->accent_color : 'amber';
    }

    public function neutral(): string
    {
        return in_array($this->neutral_color, self::NEUTRALS, true) ? $this->neutral_color : 'zinc';
    }

    /**
     * The uploaded favicon, or the built-in one.
     */
    public function faviconUrl(): string
    {
        if ($this->favicon && Storage::disk('public')->exists($this->favicon)) {
            return Storage::disk('public')->url($this->favicon);
        }

        return asset('favicon.svg');
    }

    /**
     * An uploaded logo image, when one exists. The site otherwise draws its own mark.
     */
    public function logoUrl(): ?string
    {
        if ($this->logo_image && Storage::disk('public')->exists($this->logo_image)) {
            return Storage::disk('public')->url($this->logo_image);
        }

        return null;
    }

    public function defaultTheme(): string
    {
        return in_array($this->default_theme, ['light', 'dark', 'system'], true) ? $this->default_theme : 'light';
    }
}
