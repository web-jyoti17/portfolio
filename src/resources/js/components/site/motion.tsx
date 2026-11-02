import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Section headings and cards fade up once as they scroll into view, a few at a time.
 * Elements are tagged before the first paint, so nothing flashes. Horizontal sliders and
 * the Featured Projects carousel are left alone. If this never runs, everything stays visible.
 */
export function useScrollReveal(pageKey: string): void {
    useLayoutEffect(() => {
        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            return;
        }

        // Sliders, Featured Projects and anything that already runs its own animation (like the skills ticker)
        const skip = (el: Element) =>
            el.closest('#projects, [class*="overflow-x"], [class*="snap-x"], [data-no-reveal], [style*="animation"]') !== null ||
            el.querySelector('[style*="animation"]') !== null;

        const targets = new Set<HTMLElement>();

        document.querySelectorAll<HTMLElement>('main section .grid > *').forEach((el) => {
            if (!skip(el)) {
                targets.add(el);
            }
        });

        document.querySelectorAll<HTMLElement>('main section > div > *').forEach((el) => {
            if (!skip(el) && !el.querySelector('.grid')) {
                targets.add(el);
            }
        });

        // A short wave: siblings start 70 ms apart, at most 5 steps
        const order = new Map<Element, number>();
        targets.forEach((el) => {
            const parent = el.parentElement;
            const index = parent ? order.get(parent) ?? 0 : 0;

            if (parent) {
                order.set(parent, index + 1);
            }

            el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`);
            el.classList.add('reveal');
        });

        const timers: number[] = [];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const el = entry.target as HTMLElement;
                    observer.unobserve(el);
                    el.classList.add('is-visible');

                    // Hand transitions back to the element's own hover effects afterwards
                    timers.push(
                        window.setTimeout(() => {
                            el.classList.remove('reveal', 'is-visible');
                            el.style.removeProperty('--reveal-delay');
                        }, 1100),
                    );
                });
            },
            // Any visible pixel counts, so very wide or tall elements can never stay hidden
            { rootMargin: '0px 0px -8% 0px', threshold: 0 },
        );

        targets.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
            timers.forEach((timer) => window.clearTimeout(timer));
            targets.forEach((el) => {
                el.classList.remove('reveal', 'is-visible');
                el.style.removeProperty('--reveal-delay');
            });
        };
    }, [pageKey]);
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Counts the number inside a value like "15+" or "3 yrs" up from 0 the first time it is seen.
 * Text without a number is shown as it is.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/s);
    const target = match ? parseFloat(match[2]) : 0;
    const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;
    const ref = useRef<HTMLSpanElement>(null);
    const [current, setCurrent] = useState<number | null>(() => (match && !prefersReducedMotion() ? 0 : null));

    useEffect(() => {
        const el = ref.current;

        if (!match || current === null || !el) {
            return;
        }

        let frame = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                return;
            }

            observer.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min(1, (now - start) / duration);
                setCurrent(target * easeOutCubic(progress));

                if (progress < 1) {
                    frame = requestAnimationFrame(tick);
                } else {
                    setCurrent(null);
                }
            };
            frame = requestAnimationFrame(tick);
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!match || current === null) {
        return <span ref={ref}>{value}</span>;
    }

    return (
        <span ref={ref} aria-label={value}>
            {match[1]}
            {current.toFixed(decimals)}
            {match[3]}
        </span>
    );
}

/** A thin bar at the top of the window that fills as the reader moves through the article. */
export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
            });
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
            <div className="h-full origin-left bg-amber-500 transition-transform duration-150 ease-out" style={{ transform: `scaleX(${progress})` }} />
        </div>
    );
}
