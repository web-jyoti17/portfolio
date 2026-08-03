import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Download, Github, Linkedin, MapPin, Share2, Tag } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Resume {
    id: number;
    name: string;
    file_path: string;
    category: string;
}

interface PortfolioSection {
    id: number;
    key: string;
    is_visible: boolean;
    title: string | null;
    subtitle: string | null;
    content: any | null;
}

interface ArticleProps {
    article: {
        id: number;
        title: string;
        slug: string;
        summary: string;
        content: string;
        cover_image: string | null;
        cover_image_url: string | null;
        tags: string[];
        status: string;
        published_at: string | null;
    };
    resumes: Resume[];
    sections: PortfolioSection[];
}

export default function Article({ article, resumes, sections = [] }: ArticleProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    const getSection = (key: string): PortfolioSection => {
        return sections.find(s => s.key === key) || { key, is_visible: true, title: '', subtitle: '', content: null } as any;
    };

    const showExperience = getSection('experience').is_visible;
    const showProjects = getSection('projects').is_visible;
    const showSkills = getSection('skills').is_visible;
    const showSnippets = getSection('snippets').is_visible;
    const showBlog = getSection('blog').is_visible;
    const showResources = getSection('toolkit').is_visible;

    // Calculate read time (approx 200 words per min)
    const wordCount = article.content ? article.content.trim().split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <>
            <Head title={`${article.title} - Insights`} />

            <div className="min-h-screen font-sans bg-white text-zinc-800 transition-colors duration-300">

                {/* Header (Same as Landing Page) */}
                <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-zinc-200">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold tracking-tight text-amber-600">
                            Lakshmi<span className="text-zinc-400">.dev</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-650">
                            {getSection('banner').is_visible && <Link href="/#about" className="hover:text-amber-600 transition-colors">About</Link>}
                            {showExperience && <Link href="/#experience" className="hover:text-amber-600 transition-colors">Experience</Link>}
                            {showProjects && <Link href="/#projects" className="hover:text-amber-600 transition-colors">Projects</Link>}
                            {showSkills && <Link href="/#skills" className="hover:text-amber-600 transition-colors">Skills</Link>}
                            {showSnippets && <Link href="/#snippets" className="hover:text-amber-600 transition-colors">Snippets</Link>}
                            {showBlog && <Link href="/#blog" className="hover:text-amber-600 transition-colors">Blog</Link>}
                            {showResources && <Link href="/#toolkit" className="hover:text-amber-600 transition-colors">Toolkit</Link>}
                        </nav>

                        <div className="flex items-center space-x-4">
                            {resumes && resumes.length > 0 && (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition-all shadow-sm">
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Get Resume</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl border border-zinc-100 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                                        <div className="py-1">
                                            {resumes.map(resume => (
                                                <a
                                                    key={resume.id}
                                                    href={`/resumes/${resume.id}/download`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-amber-600"
                                                >
                                                    {resume.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="pt-24 pb-32">
                    <article className="max-w-7xl mx-auto px-6">
                        {/* Back to Portfolio Button */}
                        <div className="mb-8">
                            <Link href="/#blog" className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-amber-600 transition-colors bg-zinc-50 hover:bg-zinc-100 py-2 px-4 rounded-full border border-zinc-200">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Portfolio
                            </Link>
                        </div>

                        {/* Header */}
                        <header className="mb-12 pt-8">
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {article.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-2xl md:text-max-w-4xl mx-auto px-4xl lg:text-4xl font-black text-zinc-900 leading-tight mb-6">
                                {article.title}
                            </h1>
                            <p className="text-xl text-zinc-500 leading-relaxed mb-8 font-medium">
                                {article.summary}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {readTime} min read
                                </div>
                                <button onClick={() => handleCopy(window.location.href)} className="text-amber-600 hover:text-amber-500 transition-colors flex items-center gap-2 font-semibold ml-auto">
                                    {copied === window.location.href ? 'Copied Link!' : <><Share2 className="w-4 h-4" /> Share</>}
                                </button>
                            </div>
                        </header>

                        {/* Cover Image */}
                        {article.cover_image_url && (
                            <div className="mb-16 rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <img
                                    src={article.cover_image_url}
                                    alt={article.title}
                                    className="w-full h-auto max-h-[500px] object-cover"
                                />
                            </div>
                        )}

                        {/* Content (Markdown Rendering) */}
                        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-zinc-900 prose-headings:tracking-tight prose-a:text-amber-600 hover:prose-a:text-amber-500 prose-img:rounded-2xl prose-img:border prose-img:border-zinc-200 prose-hr:border-zinc-200 prose-blockquote:border-amber-500 prose-blockquote:bg-zinc-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-zinc-700 prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const language = match ? match[1] : 'text';

                                        return !inline ? (
                                            <div className="relative group my-8 rounded-xl overflow-hidden border border-zinc-200 shadow-xl bg-[#0d1117]">
                                                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-zinc-800">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex space-x-1.5">
                                                            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                                        </div>
                                                        <span className="ml-4 text-xs font-mono text-zinc-400 font-semibold">{language !== 'text' ? language : 'code'}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(String(children).replace(/\n$/, ''))}
                                                        className="text-xs font-medium text-zinc-400 hover:text-white transition-colors bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg flex items-center space-x-1.5"
                                                    >
                                                        <span>{copied === String(children).replace(/\n$/, '') ? 'Copied!' : 'Copy'}</span>
                                                    </button>
                                                </div>
                                                <SyntaxHighlighter
                                                    {...props}
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={vscDarkPlus}
                                                    language={language}
                                                    PreTag="div"
                                                    customStyle={{
                                                        margin: 0,
                                                        padding: '1.25rem 1.5rem',
                                                        background: 'transparent',
                                                        fontSize: '0.95rem',
                                                        lineHeight: '1.7',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <code {...props} className={`${className || ''} bg-zinc-100 text-amber-600 px-1.5 py-0.5 rounded-md font-mono text-[0.9em]`}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {article.content || ''}
                            </ReactMarkdown>
                        </div>
                    </article>
                </main>

                {/* Footer (Same as Landing Page) */}
                <footer className="bg-white border-t border-zinc-200 py-12">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-zinc-950">Lakshmi.dev</h4>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                Full Stack Web & Mobile Developer specializing in Laravel, WordPress, Shopify, Flutter, Docker VPS, and AI integrations.
                            </p>
                        </div>

                        <div className="space-y-3 text-xs text-zinc-550">
                            <h5 className="font-extrabold text-zinc-300 tracking-widest uppercase">CONTACT</h5>
                            <div className="text-zinc-400">Email: <a href={`mailto:${getSection('contact').content?.email || 'laxmi20024@gmail.com'}`} className="hover:underline text-amber-400 font-semibold">{getSection('contact').content?.email || 'laxmi20024@gmail.com'}</a></div>
                            <div className="text-zinc-400">Phone: <span className="text-amber-400 font-semibold">{getSection('contact').content?.phone || '+91 6280788413'}</span></div>
                            <div className="text-zinc-400">Location: Punjab, India</div>
                        </div>

                        <div className="space-y-3 text-xs text-zinc-400">
                            <h5 className="font-extrabold text-zinc-300 tracking-widest uppercase">AVAILABILITY</h5>
                            <div className="text-zinc-400">Status: <span className="text-amber-400 font-bold">Open for Freelance</span></div>
                            <div className="text-zinc-400">Response Time: <span className="text-zinc-300 font-bold">&lt; 12 Hours</span></div>
                        </div>

                        <div className="space-y-3 text-xs text-zinc-400">
                            <h5 className="font-extrabold text-zinc-300 tracking-widest uppercase">CONNECT</h5>
                            <div className="flex space-x-4 text-zinc-400">
                                <a href="https://github.com/CodeSproutX" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/lakshmi-backend-developer" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 border-t border-zinc-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
                        <span>&copy; {new Date().getFullYear()} Lakshmi. All rights reserved.</span>
                        <span>Built with Laravel + Inertia React.</span>
                    </div>
                </footer>

            </div>
        </>
    );
}

Article.layout = (page: any) => page;
