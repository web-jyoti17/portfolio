import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Plug, Tag } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { SiteLayout } from '@/components/site/site-layout';

interface ShowcaseProps {
    item: {
        name: string;
        endpoint: string;
        description: string;
        detailed_content?: string;
        code?: string;
        icon: string;
        image?: string | null;
    };
}

function CodeBlock({ code, language }: { code: string; language: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-surface overflow-hidden rounded-xl border border-[#262c36] bg-[#0d1117] shadow-lg">
            <div className="flex items-center justify-between border-b border-[#262c36] bg-[#161b22] px-4 py-2.5">
                <span className="font-mono text-xs font-semibold text-[#9da7b3]">{language !== 'text' ? language : 'code'}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="rounded-lg border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs font-medium text-[#9da7b3] transition-colors hover:text-white"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    padding: '1.1rem 1.25rem',
                    overflowX: 'auto',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    lineHeight: '1.7',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

export default function Showcase({ item }: ShowcaseProps) {
    const parts = item.endpoint.trim().split(/\s+/);
    const hasMethod = parts.length > 1 && /^[A-Z]+$/.test(parts[0]);
    const method = hasMethod ? parts[0] : '';
    const url = hasMethod ? parts.slice(1).join(' ') : item.endpoint;
    const logo = item.image ? `/storage/${item.image}` : null;

    return (
        <SiteLayout>
            <Head title={`${item.name} - API Integration`} />

            <main className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 md:pt-10 md:pb-24">
                <Link
                    href="/#api"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:border-amber-200 hover:text-amber-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All integrations
                </Link>

                <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-10">
                    <article className="min-w-0">
                        <header className="flex flex-col gap-5 border-b border-zinc-200 pb-8 sm:flex-row sm:items-start">
                            {/* The service's own logo, in one colour */}
                            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-surface">
                                {logo ? (
                                    <span
                                        aria-hidden="true"
                                        className="h-8 w-8 bg-surface"
                                        style={{
                                            maskImage: `url(${logo})`,
                                            WebkitMaskImage: `url(${logo})`,
                                            maskSize: 'contain',
                                            WebkitMaskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            WebkitMaskPosition: 'center',
                                        }}
                                    />
                                ) : (
                                    <Plug className="h-8 w-8" />
                                )}
                            </span>
                            <div className="min-w-0">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-700 uppercase">
                                    <Tag className="h-3 w-3" />
                                    API Integration
                                </span>
                                <h1 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-balance text-zinc-900 sm:text-4xl">{item.name}</h1>
                                <div className="article-content mt-3" dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div>
                        </header>

                        {item.detailed_content && (
                            <div className="article-content mt-2">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        // Fenced code blocks arrive as <pre><code class="language-x">
                                        pre({ children }: any) {
                                            const child = React.Children.toArray(children)[0] as any;
                                            const language = /language-(\w+)/.exec(child?.props?.className || '')?.[1] ?? 'text';
                                            const code = String(child?.props?.children ?? '').replace(/\n$/, '');

                                            return <CodeBlock code={code} language={language} />;
                                        },
                                        table({ children }: any) {
                                            return (
                                                <div className="table-scroll">
                                                    <table>{children}</table>
                                                </div>
                                            );
                                        },
                                    }}
                                >
                                    {item.detailed_content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </article>

                    {/* Quick reference */}
                    <aside className="mt-10 lg:mt-0">
                        <div className="space-y-6 lg:sticky lg:top-24">
                            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                                <h2 className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">Endpoint</h2>
                                <p className="mt-2.5 flex flex-wrap items-center gap-2">
                                    {method && <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-white">{method}</span>}
                                    <code className="font-mono text-xs break-all text-zinc-700">{url}</code>
                                </p>
                            </div>

                            {item.code && (
                                <div>
                                    <h2 className="mb-2.5 text-[11px] font-black tracking-widest text-zinc-400 uppercase">Example request</h2>
                                    <CodeBlock code={item.code} language="bash" />
                                </div>
                            )}

                            <Link
                                href="/#contact"
                                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
                            >
                                Need this integrated?
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>
        </SiteLayout>
    );
}

Showcase.layout = (page: any) => page;
