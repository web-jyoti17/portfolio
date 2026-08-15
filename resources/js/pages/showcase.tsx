import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download, Github, Linkedin, Menu, X, Tag } from 'lucide-react';
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

interface ShowcaseProps {
    item: {
        name: string;
        endpoint: string;
        description: string;
        detailed_content?: string;
        code?: string;
        icon: string;
    };
    resumes: Resume[];
    sections: PortfolioSection[];
    headerSetting?: {
        logo_text: string;
        nav_links: { label: string; url: string }[] | null;
        show_resume_button: boolean;
    };
}

export default function Showcase({ item, resumes, sections = [], headerSetting }: ShowcaseProps) {
    const [copied, setCopied] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    return (
        <>
            <Head title={`${item.name} - API Integration Showcase`} />

            <div className="min-h-screen font-sans bg-white text-zinc-800 transition-colors duration-300">

                {/* Header (Same as Landing Page) */}
                <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-zinc-200">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold tracking-tight text-amber-600">
                            {headerSetting?.logo_text || <>Lakshmi<span className="text-zinc-400">.dev</span></>}
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-650">
                            {headerSetting?.nav_links && headerSetting.nav_links.length > 0 ? (
                                headerSetting.nav_links.map((link, i) => (
                                    <Link key={i} href={link.url} className="hover:text-amber-600 transition-colors">{link.label}</Link>
                                ))
                            ) : (
                                <>
                                    {getSection('banner').is_visible && <Link href="/#about" className="hover:text-amber-600 transition-colors">About</Link>}
                                    {showExperience && <Link href="/#experience" className="hover:text-amber-600 transition-colors">Experience</Link>}
                                    {showProjects && <Link href="/#projects" className="hover:text-amber-600 transition-colors">Projects</Link>}
                                    {showSkills && <Link href="/#skills" className="hover:text-amber-600 transition-colors">Skills</Link>}
                                    {showSnippets && <Link href="/#snippets" className="hover:text-amber-600 transition-colors">Snippets</Link>}
                                    {showBlog && <Link href="/#blog" className="hover:text-amber-600 transition-colors">Blog</Link>}
                                    {showResources && <Link href="/#toolkit" className="hover:text-amber-600 transition-colors">Toolkit</Link>}
                                </>
                            )}
                        </nav>

                        <div className="flex items-center space-x-4">
                            {headerSetting?.show_resume_button !== false && resumes && resumes.length > 0 && (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition-all shadow-sm">
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Get Resume</span>
                                    </button>
                                    <div className="absolute right-0 top-full pt-2 w-56 origin-top-right opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                                        <div className="rounded-xl bg-white shadow-xl border border-zinc-100 scale-95 group-hover:scale-100 transition-all duration-200 py-1">
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

                <main className="pt-24 pb-32 md:pb-32 pb-40">
                    <article className="max-w-7xl mx-auto px-6">
                        {/* Back to Portfolio Button */}
                        <div className="mb-8">
                            <Link href="/#snippets" className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-amber-600 transition-colors bg-zinc-50 hover:bg-zinc-100 py-2 px-4 rounded-full border border-zinc-200">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Portfolio
                            </Link>
                        </div>

                        {/* Header */}
                        <header className="mb-12 pt-8">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                    <Tag className="w-3 h-3" />
                                    API Integration
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-max-w-4xl mx-auto px-4xl lg:text-4xl font-black text-zinc-900 leading-tight mb-6">
                                {item.name}
                            </h1>
                            <div 
                                className="text-xl text-zinc-500 leading-relaxed mb-8 font-medium prose prose-zinc max-w-none"
                                dangerouslySetInnerHTML={{ __html: item.description }} 
                            />
                        </header>

                        {/* Content (Markdown Rendering) */}
                        {item.detailed_content && (
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
                                    {item.detailed_content || ''}
                                </ReactMarkdown>
                            </div>
                        )}
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

                {/* Mobile Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 z-50 md:hidden flex justify-around items-center px-2 py-3 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                    <Link href="/" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>
                    <Link href="/#projects" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span className="text-[10px] font-medium">Work</span>
                    </Link>
                    <Link href="/#snippets" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        <span className="text-[10px] font-medium">Code</span>
                    </Link>
                    <Link href="/#blog" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        <span className="text-[10px] font-medium">Blog</span>
                    </Link>
                </nav>
            </div>
        </>
    );
}

Showcase.layout = (page: any) => page;
