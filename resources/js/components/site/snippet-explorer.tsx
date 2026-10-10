import { Bookmark, Check, ChevronDown, Copy, Download, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Sheet } from '@/components/site/sheet';

export type Snippet = {
    id: number;
    title: string;
    slug: string;
    description: string;
    language: string;
    code: string;
    category: string;
    tags: string[] | null;
};

export type SnippetOptions = {
    show_filters?: boolean;
    show_search?: boolean;
    show_bookmarks?: boolean;
    show_download?: boolean;
    show_description?: boolean;
};

const EXTENSIONS: Record<string, string> = {
    php: 'php',
    typescript: 'ts',
    javascript: 'js',
    liquid: 'liquid',
    css: 'css',
    html: 'html',
    vue: 'vue',
    react: 'jsx',
    json: 'json',
    python: 'py',
    bash: 'sh',
    yaml: 'yml',
    sql: 'sql',
};

const BOOKMARKS_KEY = 'snippet_bookmarks';

const readBookmarks = (): number[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const saved = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');

        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
};

const fileName = (snippet: Snippet): string =>
    `${snippet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.${EXTENSIONS[snippet.language.toLowerCase()] || 'txt'}`;

/**
 * Code snippets as a list on the left and one readable code viewer on the right.
 * On phones the list becomes a dropdown above the viewer.
 */
export function SnippetExplorer({ snippets, options = {} }: { snippets: Snippet[]; options?: SnippetOptions }) {
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [onlyBookmarked, setOnlyBookmarked] = useState(false);
    const [bookmarks, setBookmarks] = useState<number[]>(readBookmarks);
    const [activeId, setActiveId] = useState<number | null>(snippets[0]?.id ?? null);
    const [copied, setCopied] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

    const showFilters = options.show_filters !== false;
    const showSearch = options.show_search !== false;
    const showBookmarks = options.show_bookmarks !== false;
    const showDownload = options.show_download !== false;
    const showDescription = options.show_description !== false;

    const categories = ['All', ...Array.from(new Set(snippets.map((snippet) => snippet.category).filter(Boolean)))];
    const query = search.trim().toLowerCase();

    const visible = snippets.filter((snippet) => {
        const matchesCategory = category === 'All' || snippet.category === category;
        const matchesBookmark = !onlyBookmarked || bookmarks.includes(snippet.id);
        const matchesSearch =
            query === '' ||
            snippet.title.toLowerCase().includes(query) ||
            snippet.description.toLowerCase().includes(query) ||
            snippet.language.toLowerCase().includes(query);

        return matchesCategory && matchesBookmark && matchesSearch;
    });

    const active = visible.find((snippet) => snippet.id === activeId) ?? visible[0] ?? null;

    const toggleBookmark = (id: number) => {
        const next = bookmarks.includes(id) ? bookmarks.filter((saved) => saved !== id) : [...bookmarks, id];

        setBookmarks(next);

        try {
            localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
        } catch {
            // Private browsing: the bookmark lasts for this visit only.
        }

        toast.success(next.includes(id) ? 'Snippet bookmarked' : 'Bookmark removed');
    };

    const copy = async (snippet: Snippet) => {
        try {
            await navigator.clipboard.writeText(snippet.code);
            setCopied(true);
            toast.success('Copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Could not copy the code');
        }
    };

    const download = (snippet: Snippet) => {
        const url = URL.createObjectURL(new Blob([snippet.code], { type: 'text/plain;charset=utf-8' }));
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName(snippet);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const pill = (selected: boolean) =>
        `rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            selected ? 'border-amber-500 bg-amber-500 text-white shadow-sm' : 'border-zinc-200 bg-surface text-zinc-600 hover:border-amber-300 hover:text-amber-600'
        }`;

    return (
        <div>
            {(showFilters || showBookmarks || showSearch) && (
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {showFilters &&
                            categories.map((name) => (
                                <button
                                    type="button"
                                    key={name}
                                    onClick={() => {
                                        setCategory(name);
                                        setOnlyBookmarked(false);
                                    }}
                                    className={pill(category === name && !onlyBookmarked)}
                                >
                                    {name}
                                </button>
                            ))}
                        {showBookmarks && (
                            <button
                                type="button"
                                onClick={() => {
                                    setOnlyBookmarked(!onlyBookmarked);
                                    setCategory('All');
                                }}
                                className={`inline-flex items-center gap-1.5 ${pill(onlyBookmarked)}`}
                            >
                                <Bookmark className={`h-3.5 w-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
                                Saved ({bookmarks.length})
                            </button>
                        )}
                    </div>

                    {showSearch && (
                        <label className="relative block w-full sm:w-64">
                            <span className="sr-only">Search snippets</span>
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search snippets"
                                className="w-full rounded-lg border border-zinc-200 bg-surface py-2 pr-3 pl-9 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none"
                            />
                        </label>
                    )}
                </div>
            )}

            {active ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[19rem_minmax(0,1fr)]">
                    {/* Phones: pick a snippet from a drawer */}
                    <button
                        type="button"
                        onClick={() => setPickerOpen(true)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-surface px-4 py-3 text-left lg:hidden"
                    >
                        <span className="min-w-0">
                            <span className="block text-[10px] font-bold tracking-wider text-amber-600 uppercase">Choose a snippet</span>
                            <span className="block truncate text-sm font-semibold text-zinc-800">{active.title}</span>
                        </span>
                        <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400" />
                    </button>

                    <Sheet open={pickerOpen} onClose={() => setPickerOpen(false)} label="Choose a snippet" size="md">
                        <h3 className="pr-10 text-lg font-extrabold text-zinc-900">Choose a snippet</h3>
                        <ul className="space-y-2">
                            {visible.map((snippet) => (
                                <li key={snippet.id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveId(snippet.id);
                                            setPickerOpen(false);
                                        }}
                                        className={`w-full rounded-xl border p-3.5 text-left ${
                                            snippet.id === active.id ? 'border-amber-300 bg-amber-50' : 'border-zinc-200 bg-surface'
                                        }`}
                                    >
                                        <span className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">{snippet.language}</span>
                                            <span className="text-[10px] font-medium text-zinc-400">{snippet.category}</span>
                                        </span>
                                        <span className="mt-1.5 block text-sm leading-snug font-semibold text-zinc-800">{snippet.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Sheet>

                    {/* Larger screens: the full list */}
                    <ul className="hidden max-h-[34rem] space-y-2 overflow-y-auto pr-1 lg:block">
                        {visible.map((snippet) => {
                            const selected = snippet.id === active.id;

                            return (
                                <li key={snippet.id}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveId(snippet.id)}
                                        aria-current={selected}
                                        className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                                            selected ? 'border-amber-300 bg-amber-50' : 'border-zinc-200 bg-surface hover:border-amber-200'
                                        }`}
                                    >
                                        <span className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">{snippet.language}</span>
                                            <span className="text-[10px] font-medium text-zinc-400">{snippet.category}</span>
                                        </span>
                                        <span className="mt-1.5 block text-sm leading-snug font-semibold text-zinc-800">{snippet.title}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Viewer */}
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 shadow-lg">
                        <div className="flex items-center justify-between gap-3 border-b border-stone-800 bg-stone-900 px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="hidden shrink-0 gap-1.5 sm:flex">
                                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="truncate font-mono text-xs text-stone-400">{fileName(active)}</span>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5">
                                {showBookmarks && (
                                    <button
                                        type="button"
                                        onClick={() => toggleBookmark(active.id)}
                                        aria-label={bookmarks.includes(active.id) ? 'Remove bookmark' : 'Bookmark snippet'}
                                        className="rounded-lg border border-stone-700 bg-stone-800 p-2 text-stone-300 transition-colors hover:text-white"
                                    >
                                        <Bookmark className={`h-3.5 w-3.5 ${bookmarks.includes(active.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                                    </button>
                                )}
                                {showDownload && (
                                    <button
                                        type="button"
                                        onClick={() => download(active)}
                                        aria-label="Download snippet"
                                        className="rounded-lg border border-stone-700 bg-stone-800 p-2 text-stone-300 transition-colors hover:text-white"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => copy(active)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-[11px] font-bold tracking-wide text-stone-200 uppercase transition-colors hover:text-white"
                                >
                                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            <h3 className="text-base font-bold text-white">{active.title}</h3>
                            {showDescription && active.description && <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{active.description}</p>}

                            <pre className="mt-4 max-h-[17rem] overflow-auto sm:max-h-[24rem] rounded-xl border border-stone-800 bg-stone-900/60 p-4 font-mono text-xs leading-relaxed text-stone-200 sm:text-[13px]">
                                <code>{active.code}</code>
                            </pre>

                            {active.tags && active.tags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {active.tags.map((tag) => (
                                        <span key={tag} className="rounded-md border border-stone-800 bg-stone-900 px-2 py-0.5 text-[11px] text-stone-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="rounded-2xl border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-400">No snippets match.</p>
            )}
        </div>
    );
}
