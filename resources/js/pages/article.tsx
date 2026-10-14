import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, BookOpenCheck, Calendar, Clock, Eye, List, Tag, User } from 'lucide-react';
import { ArticleContent, slugifyHeading } from '@/components/site/article-content';
import { ShareButtons } from '@/components/site/share-buttons';
import { MediumIcon, SiteLayout, useSite } from '@/components/site/site-layout';

interface ArticleSummary {
    id: number;
    title: string;
    slug: string;
    summary: string;
    tags: string[] | null;
    cover_image_url: string | null;
    published_at: string | null;
    is_new: boolean;
    views_count?: number;
    reads_count?: number;
}

interface ArticleProps {
    article: ArticleSummary & {
        content: string;
        medium_url: string | null;
        linkedin_url: string | null;
        status: string;
    };
    morePosts: ArticleSummary[];
    shareUrl: string;
}

type Heading = { id: string; text: string; level: 2 | 3 };

const decodeEntities = (text: string): string =>
    text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'");

/** Mirrors the ids ArticleContent gives to headings, so the table of contents can link to them. */
const extractHeadings = (html: string): Heading[] => {
    const usedIds = new Set<string>();
    const headings: Heading[] = [];

    for (const match of html.matchAll(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
        const text = decodeEntities(match[2].replace(/<[^>]*>/g, '')).trim();
        let id = slugifyHeading(text) || 'section';

        while (usedIds.has(id)) {
            id = `${id}-2`;
        }

        usedIds.add(id);
        headings.push({ id, text, level: match[1] === '2' ? 2 : 3 });
    }

    return headings;
};

const formatCount = (count: number): string => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(count);

const xsrfToken = (): string => decodeURIComponent(document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/)?.[1] ?? '');

/**
 * Tell the server once that this visitor read the article: they reached the end
 * and have been on the page for at least 15 seconds.
 */
function useReadTracking(slug: string) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const end = endRef.current;
        const openedAt = Date.now();
        let reachedEnd = false;
        let sent = false;

        const send = () => {
            if (sent || !reachedEnd || Date.now() - openedAt < 15000) {
                return;
            }

            sent = true;
            fetch(`/insights/${slug}/read`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-XSRF-TOKEN': xsrfToken() },
            }).catch(() => {});
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                reachedEnd = true;
                send();
            }
        });
        const timer = window.setInterval(send, 5000);

        if (end) {
            observer.observe(end);
        }

        return () => {
            observer.disconnect();
            window.clearInterval(timer);
        };
    }, [slug]);

    return endRef;
}

const formatDate = (value: string | null, month: 'long' | 'short' = 'long'): string =>
    value ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric' }) : 'Draft';

function TableOfContents({ headings }: { headings: Heading[] }) {
    return (
        <ul className="space-y-2 text-sm">
            {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
                    <a href={`#${heading.id}`} className="block leading-snug text-zinc-500 transition-colors hover:text-amber-600">
                        {heading.text}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Article({ article, morePosts = [], shareUrl }: ArticleProps) {
    const site = useSite();
    const author = site.logo_text.split('.')[0];
    const content = article.content || '';
    const headings = extractHeadings(content).filter((heading) => heading.level === 2);

    // Approx. 200 words per minute
    const wordCount = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    const endRef = useReadTracking(article.slug);
    const showCounts = site.show_view_counts !== false && (article.views_count ?? 0) > 0;


    return (
        <SiteLayout>
            <Head title={article.title} />

            <main className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 md:pt-10 md:pb-24">
                <Link
                    href="/#blog"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:border-amber-200 hover:text-amber-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All articles
                </Link>

                <div className={`mt-8 ${headings.length > 2 ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12' : ''}`}>
                    <article className="w-full min-w-0">
                        <header>
                            <div className="flex flex-wrap items-center gap-2">
                                {article.is_new && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 py-1 pr-3 pl-2 text-[11px] font-bold tracking-wider text-white uppercase">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                                        </span>
                                        New
                                    </span>
                                )}
                                {article.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-700 uppercase"
                                    >
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-zinc-900 sm:text-4xl lg:text-[2.75rem]">
                                {article.title}
                            </h1>

                            <p className="mt-5 text-lg leading-relaxed text-zinc-600 sm:text-xl">{article.summary}</p>

                            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-500">
                                <span className="inline-flex items-center gap-2">
                                    <User className="h-4 w-4 text-zinc-400" />
                                    {author}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-zinc-400" />
                                    {formatDate(article.published_at)}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-zinc-400" />
                                    {readTime} min read
                                </span>
                                {showCounts && (
                                    <span className="inline-flex items-center gap-2" title="People who opened this article">
                                        <Eye className="h-4 w-4 text-zinc-400" />
                                        {formatCount(article.views_count ?? 0)} {article.views_count === 1 ? 'view' : 'views'}
                                    </span>
                                )}
                                {showCounts && (article.reads_count ?? 0) > 0 && (
                                    <span className="inline-flex items-center gap-2" title="People who read to the end">
                                        <BookOpenCheck className="h-4 w-4 text-zinc-400" />
                                        {formatCount(article.reads_count ?? 0)} read to the end
                                    </span>
                                )}
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-zinc-200 py-4">
                                {site.show_share_buttons && <ShareButtons url={shareUrl} title={article.title} summary={article.summary} />}

                                {(article.medium_url || article.linkedin_url) && (
                                    <div className="flex flex-wrap gap-2">
                                        {article.medium_url && (
                                            <a
                                                href={article.medium_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-amber-300 hover:text-amber-600"
                                            >
                                                Read on Medium
                                            </a>
                                        )}
                                        {article.linkedin_url && (
                                            <a
                                                href={article.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-full bg-[#0a66c2] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                                            >
                                                View on LinkedIn
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </header>

                        {article.cover_image_url && (
                            <img
                                src={article.cover_image_url}
                                alt=""
                                className="mt-8 aspect-[1200/630] max-h-[30rem] w-full rounded-2xl border border-zinc-200 object-cover"
                            />
                        )}

                        {/* Table of contents for phones and tablets */}
                        {headings.length > 2 && (
                            <details className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 lg:hidden">
                                <summary className="flex cursor-pointer items-center gap-2 text-sm font-bold text-zinc-800">
                                    <List className="h-4 w-4 text-amber-600" />
                                    On this page
                                </summary>
                                <div className="mt-4">
                                    <TableOfContents headings={headings} />
                                </div>
                            </details>
                        )}

                        <ArticleContent html={content} className="mt-8" />
                        <div ref={endRef} aria-hidden="true" />

                        {site.contact.medium && (
                            <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:flex-row sm:items-center sm:p-6">
                                <div>
                                    <p className="text-sm font-semibold text-zinc-800">I also write on Medium</p>
                                    <p className="mt-1 text-sm text-zinc-500">Follow me there to get new articles in your Medium feed.</p>
                                </div>
                                <a
                                    href={site.contact.medium}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                >
                                    <MediumIcon className="h-4 w-4" />
                                    Follow on Medium
                                </a>
                            </div>
                        )}

                        {site.show_share_buttons && (
                            <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
                                <p className="mb-4 text-sm font-semibold text-zinc-800">Found this useful? Share it with someone who is setting this up.</p>
                                <ShareButtons url={shareUrl} title={article.title} summary={article.summary} />
                            </div>
                        )}
                    </article>

                    {/* Table of contents for desktop */}
                    {headings.length > 2 && (
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-zinc-200 pl-5">
                                <p className="mb-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">On this page</p>
                                <TableOfContents headings={headings} />
                            </div>
                        </aside>
                    )}
                </div>

                {morePosts.length > 0 && (
                    <section className="mt-16 border-t border-zinc-200 pt-10 md:mt-20">
                        <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">More articles</h2>
                        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                            {morePosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/insights/${post.slug}`}
                                    className="group flex flex-col rounded-2xl border border-zinc-200 bg-surface p-5 shadow-sm transition-colors hover:border-amber-200"
                                >
                                    <span className="text-xs text-zinc-400">
                                        {formatDate(post.published_at, 'short')}
                                        {site.show_view_counts !== false && (post.views_count ?? 0) > 0 && ` • ${formatCount(post.views_count ?? 0)} views`}
                                    </span>
                                    <h3 className="mt-2 flex-1 text-base font-extrabold text-zinc-900 transition-colors group-hover:text-amber-600">{post.title}</h3>
                                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">{post.summary}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                                        Read
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </SiteLayout>
    );
}

Article.layout = (page: any) => page;
