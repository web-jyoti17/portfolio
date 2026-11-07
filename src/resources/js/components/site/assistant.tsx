import { ArrowUp, RotateCcw, Sparkles, Square, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type AssistantInfo = { enabled: boolean; name: string; suggestions: string[] };

const STORAGE_KEY = 'portfolio-assistant:chat';
const OPEN_EVENT = 'portfolio-assistant:open';

// Whether the assistant is switched on, shared with the "Ask my AI" buttons around the site
let available = false;
const listeners = new Set<() => void>();

function setAvailable(value: boolean) {
    available = value;
    listeners.forEach(listener => listener());
}

export function useAssistantAvailable(): boolean {
    return useSyncExternalStore(
        listener => {
            listeners.add(listener);

            return () => listeners.delete(listener);
        },
        () => available,
        () => false,
    );
}

/** Open the assistant from anywhere on the page, optionally asking a question straight away. */
export function openAssistant(question?: string) {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { question } }));
}

function xsrfToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

function loadHistory(): ChatMessage[] {
    try {
        const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]');

        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function Markdown({ text }: { text: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                a: ({ href, children }) => {
                    const external = Boolean(href && /^https?:/.test(href) && !href.startsWith(window.location.origin));

                    return (
                        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="font-semibold text-amber-600 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-600">
                            {children}
                        </a>
                    );
                },
                p: ({ children }) => <p className="[&:not(:first-child)]:mt-2">{children}</p>,
                ul: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-amber-500">{children}</ul>,
                ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-5 marker:text-amber-500">{children}</ol>,
                strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
                code: ({ children }) => <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em]">{children}</code>,
            }}
        >
            {text}
        </ReactMarkdown>
    );
}

function AssistantAvatar({ className = 'h-8 w-8' }: { className?: string }) {
    return (
        <span className={`ai-orb relative flex shrink-0 items-center justify-center rounded-full text-white ${className}`} aria-hidden="true">
            <Sparkles className="h-[45%] w-[45%]" />
        </span>
    );
}

/**
 * "Ask my AI": a chat that answers visitors' questions from the portfolio content.
 * Hidden entirely until the site has an Anthropic API key.
 */
export function Assistant() {
    const [info, setInfo] = useState<AssistantInfo | null>(null);
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(() => (typeof window === 'undefined' ? [] : loadHistory()));
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesRef = useRef<ChatMessage[]>([]);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        // Ask the server whether the assistant is on once the page has settled
        const timer = window.setTimeout(() => {
            fetch('/assistant', { headers: { Accept: 'application/json' } })
                .then(response => (response.ok ? response.json() : null))
                .then((data: AssistantInfo | null) => {
                    setInfo(data);
                    setAvailable(Boolean(data?.enabled));
                })
                .catch(() => setInfo(null));
        }, 600);

        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        try {
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
        } catch {
            // Private mode: the chat just isn't kept between pages
        }

        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: busy ? 'auto' : 'smooth' });
    }, [messages, busy]);

    const send = useCallback(async (text: string) => {
        const question = text.trim();

        if (!question || abortRef.current) {
            return;
        }

        const history: ChatMessage[] = [...messagesRef.current, { role: 'user', content: question }];
        setMessages([...history, { role: 'assistant', content: '' }]);
        setInput('');
        setError(null);
        setBusy(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const response = await fetch('/assistant/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-XSRF-TOKEN': xsrfToken(), 'X-Requested-With': 'XMLHttpRequest' },
                body: JSON.stringify({ messages: history.slice(-12) }),
                signal: controller.signal,
            });

            if (!response.ok || !response.body) {
                const data = await response.json().catch(() => null);

                throw new Error(data?.message || (response.status === 429 ? 'Too many questions at once. Please wait a minute.' : 'Something went wrong. Please try again.'));
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let answer = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                answer += decoder.decode(value, { stream: true });
                setMessages([...history, { role: 'assistant', content: answer }]);
            }
        } catch (caught) {
            if (!controller.signal.aborted) {
                setError(caught instanceof Error ? caught.message : 'Something went wrong.');
                // Put the question back so it isn't lost
                setMessages(history.slice(0, -1));
                setInput(question);
            }
        } finally {
            abortRef.current = null;
            setBusy(false);
            setMessages(current => current.filter((message, index) => message.content !== '' || index !== current.length - 1));
        }
    }, []);

    useEffect(() => {
        const onOpen = (event: Event) => {
            const question = (event as CustomEvent<{ question?: string }>).detail?.question;
            setOpen(true);

            if (question) {
                send(question);
            }
        };

        window.addEventListener(OPEN_EVENT, onOpen);

        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, [send]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
        const onKey = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            send(input);
        }
    };

    const reset = () => {
        abortRef.current?.abort();
        setMessages([]);
        setError(null);
    };

    if (!info?.enabled) {
        return null;
    }

    const name = info.name;

    return (
        <>
            {/* Launcher */}
            <button
                type="button"
                onClick={() => setOpen(value => !value)}
                aria-label={open ? 'Close AI assistant' : `Ask AI about ${name}`}
                aria-expanded={open}
                className={`ai-launcher group fixed right-4 bottom-24 z-50 flex h-14 items-center gap-2.5 rounded-full p-2 md:pr-5 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_var(--color-amber-600)] transition-all duration-300 hover:-translate-y-0.5 md:right-6 md:bottom-6 ${open ? 'pointer-events-none translate-y-4 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100' : ''}`}
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" />}
                </span>
                <span className="hidden md:inline">{open ? 'Close' : 'Ask my AI'}</span>
            </button>

            {/* Panel */}
            <section
                role="dialog"
                aria-label={`AI assistant: ask about ${name}`}
                aria-hidden={!open}
                className={`fixed inset-0 z-[60] flex flex-col overflow-hidden bg-surface transition-all duration-300 md:inset-auto md:right-6 md:bottom-24 md:h-[min(640px,calc(100vh-8rem))] md:w-[410px] md:rounded-3xl md:border md:border-zinc-200 md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
            >
                <header className="ai-panel-header relative flex items-center gap-3 overflow-hidden px-5 py-4 text-white">
                    <AssistantAvatar className="h-10 w-10 ring-2 ring-white/30" />
                    <div className="min-w-0 flex-1">
                        <p className="font-display text-base leading-tight font-bold">Ask about {name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            AI assistant · answers from this portfolio
                        </p>
                    </div>
                    {messages.length > 0 && (
                        <button type="button" onClick={reset} aria-label="Start a new chat" title="New chat" className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white">
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    )}
                    <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </header>

                <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
                    <div className="flex gap-2.5">
                        <AssistantAvatar />
                        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-700">
                            Hi! 👋 I'm {name}'s AI assistant. Ask me anything about {name}'s experience, projects, skills or availability.
                        </div>
                    </div>

                    {messages.length === 0 && (
                        <div className="flex flex-wrap gap-2 pl-10">
                            {info.suggestions.map(suggestion => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => send(suggestion)}
                                    className="rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-left text-xs font-semibold text-amber-700 transition-colors hover:border-amber-400 hover:bg-amber-100"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {messages.map((message, index) =>
                        message.role === 'user' ? (
                            <div key={index} className="flex justify-end">
                                <div className="ai-user-bubble max-w-[85%] rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-white">{message.content}</div>
                            </div>
                        ) : (
                            <div key={index} className="flex gap-2.5">
                                <AssistantAvatar />
                                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-700">
                                    {message.content ? (
                                        <Markdown text={message.content} />
                                    ) : (
                                        <span className="flex gap-1 py-1.5" aria-label="Thinking">
                                            <span className="ai-dot h-2 w-2 rounded-full bg-amber-500" />
                                            <span className="ai-dot h-2 w-2 rounded-full bg-amber-500 [animation-delay:150ms]" />
                                            <span className="ai-dot h-2 w-2 rounded-full bg-amber-500 [animation-delay:300ms]" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ),
                    )}

                    {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700" role="alert">{error}</p>}
                </div>

                <form
                    onSubmit={event => {
                        event.preventDefault();
                        send(input);
                    }}
                    className="border-t border-zinc-200 bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                >
                    <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 pl-4 transition-colors focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-500/10">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={event => setInput(event.target.value.slice(0, 2000))}
                            onKeyDown={onKeyDown}
                            rows={1}
                            placeholder={`Ask about ${name}…`}
                            aria-label="Your question"
                            className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none [field-sizing:content]"
                        />
                        {busy ? (
                            <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-white">
                                <Square className="h-3.5 w-3.5 fill-current" />
                            </button>
                        ) : (
                            <button type="submit" disabled={!input.trim()} aria-label="Send" className="ai-send flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40">
                                <ArrowUp className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                    <p className="mt-2 text-center text-[10px] text-zinc-400">AI can make mistakes. For anything important, get in touch directly.</p>
                </form>
            </section>
        </>
    );
}
