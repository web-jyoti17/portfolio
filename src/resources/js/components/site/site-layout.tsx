import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUp,
    Briefcase,
    ChevronUp,
    Code2,
    Download,
    FolderGit2,
    Github,
    Home,
    Instagram,
    Link2,
    Linkedin,
    Mail,
    MapPin,
    Menu,
    Moon,
    Newspaper,
    Phone,
    Sparkles,
    Sun,
    X,
    Zap,
} from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { useScrollReveal } from '@/components/site/motion';
import { Sheet } from '@/components/site/sheet';
import { useAppearance } from '@/hooks/use-appearance';

export type NavLink = { label: string; url: string };

export type LatestUpdate = {
    key: string;
    title: string;
    url: string;
    external: boolean;
    source: 'blog' | 'medium';
    published_at: string;
};

export type SocialNetwork = 'github' | 'linkedin' | 'twitter' | 'instagram' | 'medium';

/** Social links allowed in one place (contact section or footer); others become null. */
export function socialLinksFor(site: SiteSettings, place: 'contact' | 'footer'): Record<SocialNetwork, string | null> {
    const allowed = site.social?.[place] ?? ['github', 'linkedin', 'twitter', 'instagram', 'medium'];
    const pick = (network: SocialNetwork) => (allowed.includes(network) ? site.contact[network] : null);

    return { github: pick('github'), linkedin: pick('linkedin'), twitter: pick('twitter'), instagram: pick('instagram'), medium: pick('medium') };
}

export type SiteSettings = {
    logo_text: string;
    logo_url: string | null;
    tagline: string | null;
    nav_links: NavLink[];
    mobile_nav_links: NavLink[];
    show_resume_button: boolean;
    resume_url: string;
    show_theme_toggle: boolean;
    default_theme: 'light' | 'dark' | 'system';
    show_share_buttons: boolean;
    show_new_badge: boolean;
    latest_update?: LatestUpdate | null;
    show_view_counts?: boolean;
    new_badge_days: number;
    show_availability: boolean;
    availability_status: string;
    response_time: string;
    accent: string;
    neutral: string;
    favicon_url: string;
    seo_title: string | null;
    seo_description: string | null;
    social: { contact: SocialNetwork[]; footer: SocialNetwork[] };
    contact: {
        email: string | null;
        phone: string | null;
        location: string | null;
        github: string | null;
        linkedin: string | null;
        twitter: string | null;
        instagram: string | null;
        medium: string | null;
    };
};

/** Medium "M" icon, drawn in the same outline style as the lucide-react icons (which have no Medium icon). */
export function MediumIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M7 16.5V8l5 6.5L17 8v8.5" />
        </svg>
    );
}

/** The X (formerly Twitter) logo; lucide-react only has the old bird. Drawn slightly inset to match the outline icons. */
export function XIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg viewBox="-2 -2 28 28" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function useSite(): SiteSettings {
    return usePage<{ site: SiteSettings }>().props.site;
}

/** Anchors saved by older versions of the admin, mapped to the ids on the page. */
const ANCHOR_ALIASES: Record<string, string> = {
    '#hero': '#about',
    '#featured': '#projects',
    '#apis': '#api',
};

const resolveUrl = (url: string): string => ANCHOR_ALIASES[url] ?? url;

/**
 * A header / footer / bottom bar link. Section anchors scroll on the portfolio
 * page and navigate back to it from every other page.
 */
function SiteLink({
    link,
    isHome,
    className,
    onNavigate,
    children,
}: {
    link: NavLink;
    isHome: boolean;
    className?: string;
    onNavigate?: () => void;
    children: ReactNode;
}) {
    const url = resolveUrl(link.url);

    if (url.startsWith('#')) {
        return isHome ? (
            <a href={url} className={className} onClick={onNavigate}>
                {children}
            </a>
        ) : (
            <Link href={`/${url}`} className={className} onClick={onNavigate}>
                {children}
            </Link>
        );
    }

    if (url.startsWith('/')) {
        return (
            <Link href={url} className={className} onClick={onNavigate}>
                {children}
            </Link>
        );
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
            {children}
        </a>
    );
}

/** Logo mark: the initial between code brackets on a tile in the theme colour. */
function LogoMark({ letter }: { letter: string }) {
    const gradient = `logo-${useId().replace(/:/g, '')}`;

    return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0 drop-shadow-sm" aria-hidden="true">
            <defs>
                <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style={{ stopColor: 'var(--color-amber-400)' }} />
                    <stop offset="1" style={{ stopColor: 'var(--color-amber-500)' }} />
                </linearGradient>
            </defs>
            <rect width="40" height="40" rx="11" fill={`url(#${gradient})`} />
            <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="#fff" strokeOpacity=".18" />
            <path d="M11.5 14 6.5 20l5 6M28.5 14l5 6-5 6" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="20" y="26.2" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" style={{ fontFamily: 'var(--font-display)' }}>
                {letter}
            </text>
        </svg>
    );
}

function Logo({ text, imageUrl, className = '' }: { text: string; imageUrl?: string | null; className?: string }) {
    if (imageUrl) {
        return <img src={imageUrl} alt={text} className="h-9 w-auto max-w-[11rem] object-contain" />;
    }

    const dot = text.indexOf('.');
    const name = dot > 0 ? text.slice(0, dot) : text;
    const suffix = dot > 0 ? text.slice(dot) : '';

    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <LogoMark letter={name.charAt(0).toUpperCase()} />
            <span className="font-display text-lg font-extrabold tracking-tight">
                {name}
                {suffix && <span className="text-amber-500">{suffix}</span>}
            </span>
        </span>
    );
}

function ThemeToggle({ className = '' }: { className?: string }) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <button
            type="button"
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Light theme' : 'Dark theme'}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-surface text-zinc-600 transition-colors hover:border-amber-300 hover:text-amber-600 ${className}`}
        >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}

/**
 * Back to top. Phones get a round arrow button above the bottom bar;
 * larger screens get a small "mouse" whose wheel scrolls upward.
 */
const isBlogLink = (link: NavLink): boolean => /blog|insights|article/i.test(`${link.url} ${link.label}`);

/** A small pulsing dot that marks the Blog menu link while a new article exists. */
function NewDot({ className = '' }: { className?: string }) {
    return (
        <span className={`pointer-events-none absolute flex h-2 w-2 ${className}`} aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
        </span>
    );
}

/**
 * Slides in once per new article (site or Medium) and links straight to it.
 * Each visitor sees a given article's notice only until they open or close it.
 */
function NewUpdateNotice({ update }: { update: LatestUpdate }) {
    const storageKey = `site-update-seen:${update.key}`;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let seen = false;

        try {
            seen = window.localStorage.getItem(storageKey) === '1';
        } catch {
            seen = false;
        }

        // Already reading it: nothing to announce
        if (seen || (!update.external && window.location.href.split(/[?#]/)[0] === update.url)) {
            return;
        }

        const timer = window.setTimeout(() => setVisible(true), 1400);

        return () => window.clearTimeout(timer);
    }, [storageKey, update.external, update.url]);

    const dismiss = () => {
        setVisible(false);

        try {
            window.localStorage.setItem(storageKey, '1');
        } catch {
            // Private mode: the notice simply shows again next visit
        }
    };

    if (!visible) {
        return null;
    }

    const linkProps = update.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    const when = new Date(update.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <div
            role="status"
            className="update-toast-in fixed bottom-24 left-3 right-[4.5rem] z-50 md:right-auto md:bottom-6 md:left-6 md:w-[380px]"
        >
            <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-surface p-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)]">
                <span className="update-toast-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-amber-100/70 to-transparent" aria-hidden="true" />
                <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Close"
                    className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="relative flex gap-3 pr-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                        {update.source === 'medium' ? <MediumIcon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </span>
                    <div className="min-w-0">
                        <p className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-amber-600 uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                            </span>
                            {update.source === 'medium' ? 'New on Medium' : 'New article'} · {when}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-snug font-extrabold text-zinc-900">{update.title}</p>
                        <a
                            href={update.url}
                            onClick={dismiss}
                            {...linkProps}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600 transition-colors hover:text-amber-700"
                        >
                            {update.source === 'medium' ? 'Read on Medium' : 'Read now'}
                            <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BackToTop() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;

            setVisible(window.scrollY > 700);
            setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });

        return () => window.removeEventListener('scroll', update);
    }, []);

    const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const state = visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0';
    const radius = 27;
    const circumference = 2 * Math.PI * radius;

    return (
        <>
            <button
                type="button"
                onClick={toTop}
                aria-label="Back to top"
                className={`fixed right-4 bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all duration-300 active:scale-95 md:hidden ${state}`}
            >
                <ArrowUp className="h-5 w-5" />
            </button>

            {/* Desktop: a mouse inside a ring that fills as you read down the page */}
            <button
                type="button"
                onClick={toTop}
                aria-label="Back to top"
                title="Back to top"
                className={`group fixed right-6 bottom-6 z-40 hidden h-16 w-16 items-center justify-center rounded-full bg-surface shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-500 hover:shadow-[0_16px_36px_-8px_var(--color-amber-500)] md:flex ${state}`}
            >
                <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="4" className="stroke-zinc-200 transition-colors group-hover:stroke-white/30" />
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - progress)}
                        className="stroke-amber-500 transition-colors group-hover:stroke-white"
                    />
                </svg>

                <span className="relative flex flex-col items-center gap-0.5">
                    <ChevronUp className="back-to-top-arrow h-3.5 w-3.5 text-amber-500 transition-colors group-hover:text-white" strokeWidth={3} />
                    <span className="flex h-6 w-4 justify-center rounded-full border-2 border-amber-500 pt-1 transition-colors group-hover:border-white">
                        <span className="back-to-top-wheel h-1.5 w-0.5 rounded-full bg-amber-500 transition-colors group-hover:bg-white" />
                    </span>
                </span>
            </button>
        </>
    );
}

function ResumeButton({ href, className = '' }: { href: string; className?: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`items-center justify-center gap-2 rounded-lg bg-amber-500 font-bold text-white shadow-sm transition-colors hover:bg-amber-600 ${className}`}
        >
            <Download className="h-4 w-4" />
            <span>Resume</span>
        </a>
    );
}

const mobileNavIcon = (label: string) => {
    const name = label.toLowerCase();

    if (name.includes('home') || name.includes('about')) {
        return Home;
    }

    if (name.includes('experience') || name.includes('work')) {
        return Briefcase;
    }

    if (name.includes('project')) {
        return FolderGit2;
    }

    if (name.includes('skill')) {
        return Zap;
    }

    if (name.includes('snippet') || name.includes('code')) {
        return Code2;
    }

    if (name.includes('blog') || name.includes('article') || name.includes('insight')) {
        return Newspaper;
    }

    if (name.includes('contact') || name.includes('hire')) {
        return Mail;
    }

    return Link2;
};

type SiteLayoutProps = {
    children: ReactNode;
    /** True on the portfolio page, where section links scroll instead of navigating. */
    isHome?: boolean;
};

/**
 * Header, footer and mobile navigation shared by every public page.
 */
export function SiteLayout({ children, isHome = false }: SiteLayoutProps) {
    const site = useSite();
    const [menuOpen, setMenuOpen] = useState(false);
    const { contact } = site;
    const hasContact = Boolean(contact.email || contact.phone || contact.location);
    const social = socialLinksFor(site, 'footer');
    const hasSocial = Object.values(social).some(Boolean);
    useScrollReveal(usePage().url);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 8);
        update();
        window.addEventListener('scroll', update, { passive: true });

        return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <div
            className="site-theme min-h-screen bg-surface font-sans text-zinc-800"
            data-accent={site.accent !== 'amber' ? site.accent : undefined}
            data-neutral={site.neutral !== 'zinc' ? site.neutral : undefined}
        >

            <header
                className={`sticky top-0 z-50 w-full border-b border-zinc-200 bg-surface/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)]' : ''}`}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                    <Link href="/" className="shrink-0 text-zinc-900" aria-label={`${site.logo_text} home`}>
                        <Logo text={site.logo_text} imageUrl={site.logo_url} />
                    </Link>

                    <nav className="hidden items-center gap-7 text-sm font-semibold text-zinc-500 md:flex" aria-label="Main">
                        {site.nav_links.map((link) => (
                            <SiteLink
                                key={`${link.label}-${link.url}`}
                                link={link}
                                isHome={isHome}
                                className="relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-amber-500 after:transition-transform hover:text-amber-600 hover:after:scale-x-100"
                            >
                                {link.label}
                                {site.latest_update && isBlogLink(link) && <NewDot className="-top-1 -right-2.5" />}
                            </SiteLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        {site.show_theme_toggle && <ThemeToggle />}
                        {site.show_resume_button && (
                            <ResumeButton href={site.resume_url} className="hidden h-9 px-4 text-xs md:inline-flex" />
                        )}
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-surface text-zinc-700 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            {children}

            <footer className="theme-fixed border-t border-zinc-900 bg-zinc-950 pt-14 pb-28 text-sm text-zinc-400 md:pb-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-12">
                    <div className="space-y-4 sm:col-span-2 lg:col-span-5">
                        <Logo text={site.logo_text} className="text-white" />
                        {site.tagline && <p className="max-w-sm leading-relaxed">{site.tagline}</p>}
                        {hasSocial && (
                            <div className="flex gap-4 pt-2">
                                {social.github && (
                                    <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                                {social.linkedin && (
                                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {social.twitter && (
                                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="transition-colors hover:text-white">
                                        <XIcon />
                                    </a>
                                )}
                                {social.instagram && (
                                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-white">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                )}
                                {social.medium && (
                                    <a href={social.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="transition-colors hover:text-white">
                                        <MediumIcon />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {hasContact && (
                        <div className="space-y-4 lg:col-span-3">
                            <h2 className="font-semibold text-white">Contact</h2>
                            <ul className="space-y-3">
                                {contact.email && (
                                    <li>
                                        <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all transition-colors hover:text-amber-400">
                                            <Mail className="h-4 w-4 shrink-0" />
                                            {contact.email}
                                        </a>
                                    </li>
                                )}
                                {contact.phone && (
                                    <li>
                                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 transition-colors hover:text-amber-400">
                                            <Phone className="h-4 w-4 shrink-0" />
                                            {contact.phone}
                                        </a>
                                    </li>
                                )}
                                {contact.location && (
                                    <li className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        {contact.location}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {site.show_availability && (
                        <div className="space-y-4 lg:col-span-4">
                            <h2 className="font-semibold text-white">Availability</h2>
                            <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Status</span>
                                    <span className="flex items-center gap-2 font-medium text-amber-400">
                                        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                                        {site.availability_status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Response time</span>
                                    <span className="text-white">{site.response_time}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-zinc-900 px-4 pt-6 text-xs sm:px-6 md:flex-row">
                    <span>&copy; {new Date().getFullYear()} {site.logo_text.split('.')[0]}. All rights reserved.</span>
                    <span>Built with Laravel + React</span>
                </div>
            </footer>

            {/* Mobile bottom bar */}
            {site.mobile_nav_links.length > 0 && (
                <nav
                    aria-label="Quick links"
                    className="pb-safe fixed bottom-0 left-0 z-40 flex w-full items-stretch justify-around border-t border-zinc-200 bg-surface/95 px-1 pt-1.5 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.15)] backdrop-blur-md md:hidden"
                >
                    {site.mobile_nav_links.map((link) => {
                        const Icon = mobileNavIcon(link.label);

                        return (
                            <SiteLink
                                key={`${link.label}-${link.url}`}
                                link={link}
                                isHome={isHome}
                                className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-zinc-500 transition-colors hover:text-amber-600 active:text-amber-600"
                            >
                                <span className="relative">
                                    <Icon className="h-5 w-5" />
                                    {site.latest_update && isBlogLink(link) && <NewDot className="-top-0.5 -right-1" />}
                                </span>
                                <span className="max-w-full truncate text-[10px] font-medium">{link.label}</span>
                            </SiteLink>
                        );
                    })}
                </nav>
            )}

            <BackToTop />
            {site.latest_update && <NewUpdateNotice key={site.latest_update.key} update={site.latest_update} />}

            {/* Mobile menu drawer */}
            <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu" size="md">
                <div className="space-y-5 pt-2">
                    <Logo text={site.logo_text} className="text-zinc-900" />

                    <nav className="-mx-2 flex flex-col" aria-label="Menu">
                        {site.nav_links.map((link) => (
                            <SiteLink
                                key={`${link.label}-${link.url}`}
                                link={link}
                                isHome={isHome}
                                onNavigate={() => setMenuOpen(false)}
                                className="rounded-xl px-3 py-3 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-amber-600"
                            >
                                {link.label}
                            </SiteLink>
                        ))}
                    </nav>

                    {site.show_resume_button && <ResumeButton href={site.resume_url} className="flex h-12 w-full text-sm" />}

                    {(contact.email || hasSocial) && (
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 text-sm text-zinc-500">
                            {contact.email && (
                                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all hover:text-amber-600">
                                    <Mail className="h-4 w-4 shrink-0" />
                                    {contact.email}
                                </a>
                            )}
                            <div className="flex gap-4">
                                {social.github && (
                                    <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-amber-600">
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                                {social.linkedin && (
                                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-amber-600">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {social.twitter && (
                                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-amber-600">
                                        <XIcon />
                                    </a>
                                )}
                                {social.instagram && (
                                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-amber-600">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                )}
                                {social.medium && (
                                    <a href={social.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="hover:text-amber-600">
                                        <MediumIcon />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Sheet>
        </div>
    );
}
