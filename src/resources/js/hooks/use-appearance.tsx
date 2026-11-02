import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const STORAGE_KEY = 'site-appearance';
const COOKIE_NAME = 'site_appearance';

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light';

const isAppearance = (value: unknown): value is Appearance =>
    value === 'light' || value === 'dark' || value === 'system';

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

/** The theme the admin picked for first-time visitors (Site Settings). */
const getDefaultAppearance = (): Appearance => {
    if (typeof document === 'undefined') {
        return 'light';
    }

    const fallback = document.documentElement.dataset.defaultAppearance;

    return isAppearance(fallback) ? fallback : 'light';
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        return isAppearance(stored) ? stored : getDefaultAppearance();
    } catch {
        return getDefaultAppearance();
    }
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => {
    applyTheme(currentAppearance);
    notify();
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'light',
    );

    const resolvedAppearance: ResolvedAppearance = useSyncExternalStore(
        subscribe,
        () => (isDarkMode(currentAppearance) ? 'dark' : 'light'),
        () => 'light',
    );

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            // Storage can be unavailable (private mode); the cookie still remembers the choice.
        }

        setCookie(COOKIE_NAME, mode);
        applyTheme(mode);
        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
