import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Download, Github, Linkedin, MapPin, Menu, Share2, Tag, X, User } from 'lucide-react';
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
    headerSetting?: {
        logo_text: string;
        nav_links: { label: string; url: string }[] | null;
        show_resume_button: boolean;
    };
}

export default function Article({ article, resumes, sections = [], headerSetting }: ArticleProps) {
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

    // Calculate read time (approx 200 words per min)
    const wordCount = article.content ? article.content.trim().split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <>
            <Head title={`${article.title} - Insights`} />

            <div className="min-h-screen font-sans bg-white text-zinc-800 transition-colors duration-300">

                {/* Professional Header (Same as Landing Page) */}
                <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200 shadow-sm transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center md:justify-between">
                        <Link href="/" className="text-xl font-black tracking-tight text-zinc-900 transition-colors flex items-center gap-1.5">
                            {headerSetting?.logo_text || <>Lakshmi<span className="text-amber-500">.dev</span></>}
                        </Link>

                        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-500">
                            {headerSetting?.nav_links && headerSetting.nav_links.length > 0 ? (
                                headerSetting.nav_links.map((link, i) => (
                                    <Link key={i} href={link.url} className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">{link.label}</Link>
                                ))
                            ) : (
                                <>
                                    {getSection('banner').is_visible && <Link href="/#about" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">About</Link>}
                                    {showExperience && <Link href="/#experience" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">Experience</Link>}
                                    {showProjects && <Link href="/#projects" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">Projects</Link>}
                                    {showSkills && <Link href="/#skills" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">Skills</Link>}
                                </>
                            )}
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            {headerSetting?.show_resume_button !== false && (
                                <a
                                    href="/resume/download"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:flex items-center space-x-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white py-2 px-5 rounded-sm transition-all shadow-sm hover:shadow"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Resume</span>
                                </a>
                            )}
                        </div>
                    </div>
                </header>

                <main className="pt-24 pb-32 md:pb-32 pb-40">
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
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.tags?.map((tag: string, index: number) => (
                                    <span key={index} className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight mb-6">
                                {article.title}
                            </h1>

                            <div className="flex items-center text-sm font-medium text-zinc-500 mb-8 pb-8 border-b border-zinc-100 flex-wrap gap-y-4">
                                <div className="flex items-center mr-6">
                                    <Calendar className="w-4 h-4 mr-2 text-zinc-400" />
                                    {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'Draft'}
                                </div>
                                <div className="flex items-center mr-6">
                                    <User className="w-4 h-4 mr-2 text-zinc-400" />
                                    Lakshmi
                                </div>
                                <div className="flex items-center mr-6">
                                    <Clock className="w-4 h-4 mr-2 text-zinc-400" />
                                    {readTime} min read
                                </div>

                                {/* Social / External Links */}
                                {(article.medium_url || article.linkedin_url) && (
                                    <div className="flex items-center ml-auto gap-3">
                                        {article.medium_url && (
                                            <a href={article.medium_url} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition-colors">
                                                Read on Medium
                                            </a>
                                        )}
                                        {article.linkedin_url && (
                                            <a href={article.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1.5 bg-[#0077b5] text-white rounded-full text-xs font-semibold hover:bg-[#005e93] transition-colors">
                                                View on LinkedIn
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="text-xl text-zinc-600 leading-relaxed font-medium">
                                {article.summary}
                            </p>
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

                        {/* Content (HTML Rendering from RichEditor) */}
                        <div
                            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-zinc-900 prose-headings:tracking-tight prose-a:text-amber-600 hover:prose-a:text-amber-500 prose-img:rounded-2xl prose-img:border prose-img:border-zinc-200 prose-hr:border-zinc-200 prose-blockquote:border-amber-500 prose-blockquote:bg-zinc-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-zinc-700 prose-pre:bg-[#0d1117] prose-pre:text-stone-300 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:shadow-xl prose-pre:p-5 prose-code:text-amber-600 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none"
                            dangerouslySetInnerHTML={{ __html: article.content || '' }}
                        />
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
                <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 z-50 md:hidden flex justify-around items-center px-2 py-3 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] overflow-x-auto hide-scrollbar">
                    {headerSetting?.mobile_nav_links && headerSetting.mobile_nav_links.length > 0 ? (
                        headerSetting.mobile_nav_links.slice(0, 5).map((link, i) => {
                            const l = link.label.toLowerCase();
                            let icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
                            
                            if (l.includes('about') || l.includes('home')) {
                                icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
                            } else if (l.includes('experience') || l.includes('work')) {
                                icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
                            } else if (l.includes('project')) {
                                icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
                            } else if (l.includes('skill')) {
                                icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
                            } else if (l.includes('snippet') || l.includes('code')) {
                                icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
                            } else if (l.includes('blog') || l.includes('article') || l.includes('insight')) {
                                icon = <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;
                            }

                            return (
                                <Link key={i} href={link.url} className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600 min-w-[64px]">
                                    {icon}
                                    <span className="text-[10px] font-medium">{link.label}</span>
                                </Link>
                            );
                        })
                    ) : (
                        <>
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
                        </>
                    )}
                </nav>
            </div>
        </>
    );
}

Article.layout = (page: any) => page;
