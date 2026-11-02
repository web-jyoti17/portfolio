import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type SliderProps = {
    children: ReactNode;
    /** Accessible name, for example "API integrations". */
    label: string;
    /** Cards visible at once on large screens. */
    perView?: 2 | 3;
};

const WIDTHS = {
    2: 'w-[86%] sm:w-[calc((100%-1.25rem)/2)]',
    3: 'w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]',
};

/**
 * Horizontal card slider: swipe on touch screens, arrows on larger ones.
 * Uses native scrolling with snap points, so it stays smooth and accessible.
 */
export function Slider({ children, label, perView = 3 }: SliderProps) {
    const track = useRef<HTMLDivElement>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const items = Children.toArray(children);

    useEffect(() => {
        const element = track.current;

        if (!element) {
            return;
        }

        const update = () => {
            setCanGoBack(element.scrollLeft > 4);
            setCanGoForward(element.scrollLeft + element.clientWidth < element.scrollWidth - 4);
        };

        update();
        element.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            element.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [items.length]);

    const move = (direction: 1 | -1) => {
        const element = track.current;

        element?.scrollBy({ left: direction * element.clientWidth, behavior: 'smooth' });
    };

    const arrow =
        'flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-surface text-zinc-600 shadow-sm transition-colors hover:border-amber-300 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-zinc-200 disabled:hover:text-zinc-600';

    return (
        <div role="region" aria-label={label}>
            <div ref={track} className="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pt-1 pb-3">
                {items.map((child, index) => (
                    <div key={index} className={`flex shrink-0 snap-start ${WIDTHS[perView]}`}>
                        {child}
                    </div>
                ))}
            </div>

            {(canGoBack || canGoForward) && (
                <div className="mt-4 flex items-center justify-center gap-3">
                    <button type="button" onClick={() => move(-1)} disabled={!canGoBack} aria-label="Previous" className={arrow}>
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="text-xs font-medium text-zinc-400">{items.length} items</span>
                    <button type="button" onClick={() => move(1)} disabled={!canGoForward} aria-label="Next" className={arrow}>
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
