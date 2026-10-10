import { Check, Facebook, Instagram, Link2, Linkedin, MessageCircle, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type ShareButtonsProps = {
    url: string;
    title: string;
    summary?: string;
    className?: string;
};

const buttonClass =
    'flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-surface text-zinc-600 transition-colors hover:border-amber-300 hover:text-amber-600 sm:h-10 sm:w-10';

/**
 * Share an article. LinkedIn, X, WhatsApp and Facebook open their share dialogs.
 * Instagram has no web share link, so it uses the phone's share sheet (which lists
 * Instagram) and falls back to copying the link.
 */
export function ShareButtons({ url, title, summary, className = '' }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const copyLink = async (message = 'Link copied') => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success(message);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Could not copy the link');
        }
    };

    const nativeShare = async (fallbackMessage: string) => {
        if (typeof navigator.share === 'function') {
            try {
                await navigator.share({ title, text: summary, url });
            } catch {
                // The visitor closed the share sheet.
            }

            return;
        }

        await copyLink(fallbackMessage);
    };

    const targets = [
        { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
        { name: 'X', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
        { name: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
        { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    ];

    return (
        <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 ${className}`}>
            <span className="mr-1 text-xs font-bold tracking-wider text-zinc-400 uppercase">Share</span>

            {targets.map(({ name, icon: Icon, href }) => (
                <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${name}`}
                    title={`Share on ${name}`}
                    className={buttonClass}
                >
                    <Icon className="h-4 w-4" />
                </a>
            ))}

            <button
                type="button"
                onClick={() => nativeShare('Link copied. Paste it into your Instagram story, bio or a message.')}
                aria-label="Share on Instagram"
                title="Share on Instagram"
                className={buttonClass}
            >
                <Instagram className="h-4 w-4" />
            </button>

            <button type="button" onClick={() => copyLink()} aria-label="Copy link" title="Copy link" className={buttonClass}>
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
            </button>

            <button
                type="button"
                onClick={() => nativeShare('Link copied')}
                aria-label="More sharing options"
                title="More sharing options"
                className={`${buttonClass} md:hidden`}
            >
                <Share2 className="h-4 w-4" />
            </button>
        </div>
    );
}
