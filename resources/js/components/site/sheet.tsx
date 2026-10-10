import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode, TouchEvent } from 'react';

type SheetProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    /** Accessible name for the panel. */
    label: string;
    /** Width of the desktop dialog. */
    size?: 'md' | 'lg';
};

const CLOSE_DRAG_DISTANCE = 110;

/**
 * Detail panel used across the public site.
 * Phones get a bottom drawer (drag the handle down to close); larger screens get a centered dialog.
 */
export function Sheet({ open, onClose, children, label, size = 'lg' }: SheetProps) {
    const [dragOffset, setDragOffset] = useState(0);
    const dragStart = useRef<number | null>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    const onTouchStart = (event: TouchEvent) => {
        dragStart.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
        if (dragStart.current === null) {
            return;
        }

        setDragOffset(Math.max(0, event.touches[0].clientY - dragStart.current));
    };

    const onTouchEnd = () => {
        const shouldClose = dragOffset > CLOSE_DRAG_DISTANCE;

        dragStart.current = null;
        setDragOffset(0);

        if (shouldClose) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 md:items-center md:p-6"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={label}
                className={`relative flex max-h-[90dvh] w-full flex-col rounded-t-3xl border border-zinc-200 bg-surface text-zinc-800 shadow-2xl animate-in slide-in-from-bottom duration-300 md:rounded-3xl md:zoom-in-95 md:slide-in-from-bottom-4 ${size === 'md' ? 'md:max-w-2xl' : 'md:max-w-3xl'}`}
                style={dragOffset ? { transform: `translateY(${dragOffset}px)`, transition: 'none' } : undefined}
                onClick={(event) => event.stopPropagation()}
            >
                {/* Drag handle (phones only) */}
                <div
                    className="flex shrink-0 touch-none justify-center pt-3 pb-2 md:hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <span className="h-1.5 w-11 rounded-full bg-zinc-300" />
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-4 z-10 rounded-xl bg-zinc-100 p-2 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-800 md:top-5 md:right-5"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 pt-2 pb-[max(2rem,env(safe-area-inset-bottom))] md:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
