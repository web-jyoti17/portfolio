import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    Award,
    Bookmark,
    Briefcase,
    Check,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Copy,
    Database,
    Download,
    ExternalLink,
    FileText,
    GitBranch,
    Github,
    Linkedin,
    Link as LinkIcon,
    Lock,
    Search,
    Send,
    Server,
    Sparkles,
    Star,
    X,
    MapPin,
    Menu,
    Mail,
    Phone,
    icons as LucideIcons
} from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { toast, Toaster } from 'sonner';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string | null;
    image_path: string | string[] | null;
    image_url: string | string[] | null;
    github_url: string | null;
    live_url: string | null;
    tech_stack: string[] | null;
    is_featured: boolean;
    is_proprietary: boolean;
    category: string;
    client_name: string | null;
    challenge: string | null;
    outcome: string | null;
    completion_date: string | null;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover_image: string | null;
    cover_image_url: string | null;
    tags: string[] | null;
    status: string;
    published_at: string | null;
}

interface CaseStudy {
    id: number;
    title: string;
    slug: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string;
    tech_stack: string[] | null;
    image_path: string | string[] | null;
    image_url: string | string[] | null;
    client_name: string | null;
    duration: string | null;
}

interface Skill {
    id: number;
    name: string;
    category: string;
    level: string;
    percentage: number;
    icon_class: string | null;
    color: string | null;
    years_of_experience: number;
}

interface Experience {
    id: number;
    job_title: string;
    company: string;
    location: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
    achievements: string[] | null;
}

interface Education {
    id: number;
    degree: string;
    field_of_study: string;
    institution: string;
    location: string | null;
    start_date: string;
    end_date: string | null;
    description: string | null;
}

interface Certification {
    id: number;
    name: string;
    issuing_organization: string;
    issue_date: string;
    expiration_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    skills_covered: string[] | null;
    image_path: string | null;
    image_url: string | null;
}

interface CodeSnippet {
    id: number;
    title: string;
    slug: string;
    description: string;
    language: string;
    code: string;
    category: string;
    tags: string[] | null;
}

interface DeveloperResource {
    id: number;
    name: string;
    category: string;
    url: string;
    description: string;
    image_path: string | null;
    image_url: string | null;
    tags: string[] | null;
    is_featured: boolean;
}

interface Testimonial {
    id: number;
    name: string;
    company: string;
    position: string;
    rating: number;
    review: string;
    profile_image: string | null;
    is_approved: boolean;
    created_at: string;
}

interface Resume {
    id: number;
    name: string;
    file_path: string;
    category: string;
    download_count: number;
    is_active: boolean;
}

interface GitHubRepo {
    name: string;
    description: string;
    url: string;
    homepage: string | null;
    stars: number;
    forks: number;
    language: string;
    updated_at: string | null;
}

interface PortfolioSection {
    id: number;
    key: string;
    title: string;
    subtitle: string | null;
    is_visible: boolean;
    show_on_mobile?: boolean;
    show_on_desktop?: boolean;
    content: any | null;
}

interface PortfolioProps {
    projects: Project[];
    blogPosts: BlogPost[];
    caseStudies: CaseStudy[];
    skills: Skill[];
    experiences: Experience[];
    educations: Education[];
    certifications: Certification[];
    codeSnippets: CodeSnippet[];
    resources: DeveloperResource[];
    testimonials: Testimonial[];
    resumes: Resume[];
    githubRepos: GitHubRepo[];
    sections: PortfolioSection[];
    headerSetting?: {
        logo_text: string;
        nav_links: { label: string; url: string }[] | null;
        show_resume_button: boolean;
    };
}

const Timeline = ({ timelineItems, title, subtitle, className }: { timelineItems: Array<{ year: string; title: string; description: string }>, title: string, subtitle?: string, className?: string }) => {
    if (!timelineItems || timelineItems.length === 0) return null;

    return (
        <section id="timeline" className={`py-20 bg-white border-y border-zinc-200 relative overflow-hidden ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mb-4">{title}</h2>
                    {subtitle && <p className="text-zinc-500 text-sm mt-2">{subtitle}</p>}
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="relative mt-8">
                    {/* Continuous Line Desktop */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-[2.5rem] right-[2.5rem] h-1 bg-zinc-100 rounded-full">
                        <div className="h-full bg-amber-500/20 w-full"></div>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 lg:flex-row lg:gap-4 lg:justify-between lg:overflow-visible">
                        {timelineItems.map((item, idx) => (
                            <div key={idx} className="relative group w-full shrink-0 snap-center lg:flex-1 lg:w-auto">
                                <div className="bg-white border border-zinc-200 rounded-3xl p-8 relative z-10 hover:border-amber-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                                    {/* Timeline Marker Desktop */}
                                    <div className="absolute top-[-1.5rem] left-8 hidden lg:flex w-12 h-12 rounded-full bg-white border-1 border-amber-500 shadow-sm items-center justify-center text-zinc-900 font-bold text-sm z-20 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        {item.year}
                                    </div>
                                    {/* Timeline Marker Mobile */}
                                    <div className="lg:hidden w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-bold flex items-center justify-center text-sm mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        {item.year}
                                    </div>

                                    <div className="lg:pt-6">
                                        <h3 className="text-zinc-900 text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-zinc-600 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Portfolio({
    projects = [],
    blogPosts = [],
    caseStudies = [],
    skills = [],
    experiences = [],
    educations = [],
    certifications = [],
    codeSnippets = [],
    resources = [],
    testimonials = [],
    resumes = [],
    githubRepos = [],
    sections = [],
    headerSetting,
}: PortfolioProps) {
    // Theme management - forced light mode
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // Helper to retrieve section configuration safely
    const getSection = (key: string): PortfolioSection => {
        return sections.find(s => s.key === key) || {
            id: 0,
            key,
            title: '',
            subtitle: null,
            is_visible: true,
            show_on_mobile: true,
            show_on_desktop: true,
            content: null,
        };
    };

    const getSectionVisibilityClasses = (key: string) => {
        const sec = getSection(key);
        const mobile = sec.show_on_mobile ?? sec.is_visible;
        const desktop = sec.show_on_desktop ?? sec.is_visible;
        if (!mobile && !desktop) return 'hidden';
        if (!mobile && desktop) return 'hidden md:block';
        if (mobile && !desktop) return 'block md:hidden';
        return '';
    };

    // Snippets slider state
    const [snippetSliderIndex, setSnippetSliderIndex] = useState<number>(0);
    const [resourceSliderIndex, setResourceSliderIndex] = useState<number>(0);
    const [blogSliderIndex, setBlogSliderIndex] = useState<number>(0);
    const [projectSliderIndex, setProjectSliderIndex] = useState<number>(0);

    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    // Moved useEffect below state declarations

    // Project filtering
    const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');
    const projectCategories = ['All', ...Array.from(new Set(projects.map(project => project.category).filter(Boolean)))];

    const filteredProjects = selectedProjectCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedProjectCategory);

    // Snippets filtering, search, and bookmarks
    const [snippetSearch, setSnippetSearch] = useState<string>('');
    const [selectedSnippetCategory, setSelectedSnippetCategory] = useState<string>('All');
    const [showOnlyBookmarked, setShowOnlyBookmarked] = useState<boolean>(false);
    const [bookmarks, setBookmarks] = useState<number[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('snippet_bookmarks');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const toggleBookmark = (id: number) => {
        const nextBookmarks = bookmarks.includes(id)
            ? bookmarks.filter(bId => bId !== id)
            : [...bookmarks, id];
        setBookmarks(nextBookmarks);
        localStorage.setItem('snippet_bookmarks', JSON.stringify(nextBookmarks));
        if (bookmarks.includes(id)) {
            toast.success('Snippet removed from bookmarks!');
        } else {
            toast.success('Snippet bookmarked successfully!');
        }
    };

    const [copiedSnippetId, setCopiedSnippetId] = useState<number | null>(null);

    const handleCopySnippet = (code: string, id: number) => {
        navigator.clipboard.writeText(code);
        setCopiedSnippetId(id);
        toast.success('Snippet copied to clipboard!');
        setTimeout(() => {
            setCopiedSnippetId(null);
        }, 2000);
    };

    const downloadSnippet = (title: string, code: string, language: string) => {
        const extensionMap: Record<string, string> = {
            'php': 'php',
            'typescript': 'ts',
            'javascript': 'js',
            'liquid': 'liquid',
            'css': 'css',
            'html': 'html',
            'vue': 'vue',
            'react': 'jsx',
            'json': 'json',
            'python': 'py',
            'bash': 'sh'
        };
        const ext = extensionMap[language.toLowerCase()] || 'txt';
        const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;
        const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success(`Downloaded ${filename}!`);
    };

    const snippetCategories = ['All', ...Array.from(new Set(codeSnippets.map(snippet => snippet.category).filter(Boolean)))];

    const filteredSnippets = codeSnippets.filter(s => {
        const matchesCategory = selectedSnippetCategory === 'All' || s.category === selectedSnippetCategory;
        const matchesBookmark = !showOnlyBookmarked || bookmarks.includes(s.id);
        const matchesSearch = s.title.toLowerCase().includes(snippetSearch.toLowerCase()) ||
            s.description.toLowerCase().includes(snippetSearch.toLowerCase()) ||
            s.language.toLowerCase().includes(snippetSearch.toLowerCase());
        return matchesCategory && matchesBookmark && matchesSearch;
    });

    // Resource filtering
    const [selectedResourceCategory, setSelectedResourceCategory] = useState<string>('All');
    const resourceCategories = ['All', ...Array.from(new Set(resources.map(resource => resource.category).filter(Boolean)))];

    const filteredResources = selectedResourceCategory === 'All'
        ? resources
        : resources.filter(r => r.category === selectedResourceCategory);

    // Detail Modal States
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [activePost, setActivePost] = useState<BlogPost | null>(null);
    const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
    const [activeResource, setActiveResource] = useState<DeveloperResource | null>(null);

    useEffect(() => {
        if (activeProject || activePost || activeCaseStudy || activeResource) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeProject, activePost, activeCaseStudy, activeResource]);

    // Project detail modal tab state
    const [activeProjectTab, setActiveProjectTab] = useState<'overview' | 'architecture' | 'technical'>('overview');
    const [projectImageIndex, setProjectImageIndex] = useState<number>(0);

    // Mobile sliders for multi-card sections
    const [experienceSliderIndex, setExperienceSliderIndex] = useState<number>(0);
    const [apiSliderIndex, setApiSliderIndex] = useState<number>(0);
    const [timelineSliderIndex, setTimelineSliderIndex] = useState<number>(0);

    // Interactive Terminal state
    const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([
        { command: 'system', output: 'Lakshmi Portfolio Terminal v1.0.0. Type "help" for a list of available commands.' }
    ]);
    const [terminalInput, setTerminalInput] = useState('');

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = terminalInput.trim().toLowerCase();
        if (!cmd) return;

        let output = '';
        switch (cmd) {
            case 'help':
                output = 'Available commands: about, skills, projects, contact, clear, system';
                break;
            case 'about':
                output = 'Lakshmi - Full Stack Web & Mobile Developer. Specializes in Laravel, WordPress, Shopify, Flutter, Docker VPS, and AI integrations. 3+ years experience, Punjab, India.';
                break;
            case 'skills':
                output = 'Backend: Laravel, PHP, REST APIs, MySQL, Filament, Queue Jobs\nFrontend: Blade, HTML, CSS, Bootstrap, JavaScript, Alpine.js, WordPress Themes\nMobile: Flutter, Firebase Auth, RevenueCat\nCloud & DevOps: Docker, Docker Compose, VPS, Laravel Cloud, Cloudflare, Plesk';
                break;
            case 'projects':
                output = 'Major: telehealth platform, WordPress booking system, ticketing and operations platform, Shopify AI image app, Flutter content backend, and attendance management system.';
                break;
            case 'contact':
                output = 'Email: laxmi20024@gmail.com\nPhone: +91 6280788413\nGitHub: github.com/CodeSproutX';
                break;
            case 'clear':
                setTerminalHistory([]);
                setTerminalInput('');
                return;
            case 'system':
                output = 'OS: LakshmiOS v1.0.0\nUptime: 3+ Years Web Development\nStatus: Available for Freelance / Full-time';
                break;
            default:
                output = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
        }

        setTerminalHistory(prev => [...prev, { command: cmd, output }]);
        setTerminalInput('');
    };

    // Live API Playground state
    const [apiEndpoint, setApiEndpoint] = useState('/api/v1/doctor/prescribe');
    const [apiResponse, setApiResponse] = useState<any>({
        status: 200,
        message: "Select an endpoint and click Send Request to query live mock routes."
    });
    const [apiLoading, setApiLoading] = useState(false);

    const handleSendApiRequest = async () => {
        setApiLoading(true);
        setApiResponse({ status: 100, message: "Querying mock API handler..." });
        await new Promise(resolve => setTimeout(resolve, 800));

        let responseData: any = {};
        if (apiEndpoint === '/api/v1/doctor/prescribe') {
            responseData = {
                success: true,
                data: {
                    doctor_id: "doc_99182",
                    patient_id: "pat_38291",
                    prescription: {
                        medication: "Amoxicillin 500mg",
                        dosage: "Three times daily",
                        duration: "7 days"
                    },
                    status: "synced_to_telehealth_portal",
                    voice_transcription: "Patient shows symptoms of bacterial infection. Prescribing standard Amoxicillin course."
                },
                meta: {
                    execution_time: "142ms",
                    db_queries: 4,
                    gateway: "REST API Gateway v2"
                }
            };
        } else if (apiEndpoint === '/api/v1/appointment/book') {
            responseData = {
                success: true,
                booking: {
                    id: "bk_776102",
                    patient: "John Doe",
                    doctor: "Dr. Elena Rostova",
                    schedule: "2026-07-18 10:30:00 UTC",
                    video_room_token: "tok_ea2b9182ff8271bbac",
                    payment_status: "paid_stripe",
                    amount: 75.00
                },
                meta: {
                    execution_time: "89ms",
                    queues: "notified_via_redis_worker"
                }
            };
        } else {
            responseData = {
                success: true,
                job: {
                    id: "shopify_sync_job_99812",
                    status: "queued",
                    connector: "ShopifyAdminGraphQL",
                    records_synced: 1450,
                    google_contacts_pushed: 420
                },
                meta: {
                    execution_time: "210ms",
                    driver: "redis"
                }
            };
        }
        setApiResponse(responseData);
        setApiLoading(false);
    };

    // AI Chatbot state
    const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
        { sender: 'ai', text: "Hi! I'm Lakshmi's virtual assistant. Ask me anything about her skills, experience, or availability!" }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    const [expandedTextCards, setExpandedTextCards] = useState<Record<string, boolean>>({});

    const handleSendChatMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const query = chatInput.trim();
        if (!query) return;

        setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
        setChatInput('');
        setChatLoading(true);
        await new Promise(resolve => setTimeout(resolve, 900));

        const lowercaseQuery = query.toLowerCase();
        let reply = "I'm not sure about that. Try asking about her stack, projects, experience, or hire details!";

        if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('work') || lowercaseQuery.includes('years')) {
            reply = "Lakshmi has 3+ years of professional full-stack web & mobile development experience, working on healthcare platforms, eCommerce apps, ticket management systems, and AI-powered Shopify applications.";
        } else if (lowercaseQuery.includes('stack') || lowercaseQuery.includes('skill') || lowercaseQuery.includes('technologies')) {
            reply = "Her core stack is Laravel and PHP on the backend, with WordPress, Shopify, and Flutter across product delivery, using MySQL, Docker, VPS hosting, Laravel Cloud, Cloudflare, and Plesk for deployment.";
        } else if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('email') || lowercaseQuery.includes('hire')) {
            reply = "You can email her at laxmi20024@gmail.com, call her at +91 6280788413, or use the contact form at the bottom of this page!";
        } else if (lowercaseQuery.includes('project') || lowercaseQuery.includes('built')) {
            reply = "Major projects include a telehealth platform, a custom WordPress booking system, a ticketing and operations platform, a Shopify AI image app, a Flutter content backend, and an attendance management system.";
        } else if (lowercaseQuery.includes('available') || lowercaseQuery.includes('hire') || lowercaseQuery.includes('freelance')) {
            reply = "Yes, she is currently available for remote full-time positions and high-impact freelance/contract roles!";
        } else if (lowercaseQuery.includes('hi') || lowercaseQuery.includes('hello') || lowercaseQuery.includes('hey')) {
            reply = "Hello! How can I help you today? Ask me about Lakshmi's developer profile or work highlights.";
        }

        setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
        setChatLoading(false);
    };

    // Contact Form state
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        company: '',
        budget: '₹35,000 - ₹1,50,000',
        projectType: 'Laravel Development',
        message: ''
    });
    const [contactSending, setContactSending] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactSending(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setContactSending(false);
        setContactSuccess(true);
        toast.success("Message sent successfully! Lakshmi will respond shortly.");
    };

    // Clipboard copies
    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${type} copied to clipboard!`);
    };

    const toggleExpandedText = (cardKey: string) => {
        setExpandedTextCards(prev => ({
            ...prev,
            [cardKey]: !prev[cardKey],
        }));
    };

    const renderExpandableCardText = (
        cardKey: string,
        text: string | null | undefined,
        className: string,
        lineClampClass = 'line-clamp-4',
        isHtml = true,
    ) => {
        if (!text) return null;
        const isExpanded = !!expandedTextCards[cardKey];

        const rawText = isHtml ? text.replace(/<[^>]*>?/gm, '') : text;
        const shouldShowToggle = rawText.trim().length > 300;

        return (
            <div>
                {isHtml ? (
                    <div
                        className={`${className} prose prose-sm max-w-none ${isExpanded || !shouldShowToggle ? '' : lineClampClass}`}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ) : (
                    <p className={`${className} ${isExpanded || !shouldShowToggle ? '' : lineClampClass}`}>{text}</p>
                )}
                {shouldShowToggle && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandedText(cardKey);
                        }}
                        className="mt-2 inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                        <span>{isExpanded ? 'Read less' : 'Read more'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                )}
            </div>
        );
    };

    const hasProjects = projects.length > 0;
    const hasCaseStudies = caseStudies.length > 0;
    const hasExperience = experiences.length > 0;
    const hasSkills = skills.length > 0;
    const hasSnippets = codeSnippets.length > 0;
    const hasResources = resources.length > 0;
    const hasBlog = blogPosts.length > 0;
    const hasCertifications = certifications.length > 0;
    const hasGithubRepos = githubRepos.length > 0;

    const checkVisibility = (key: string, hasContent: boolean = true) => {
        const sec = getSection(key);
        const mobile = sec.show_on_mobile ?? sec.is_visible;
        const desktop = sec.show_on_desktop ?? sec.is_visible;
        return (mobile || desktop) && hasContent;
    };

    const showProjects = checkVisibility('projects', hasProjects);
    const showCaseStudies = checkVisibility('case_studies', hasCaseStudies);
    const showExperience = checkVisibility('experience', hasExperience);
    const showSkills = checkVisibility('skills', hasSkills);
    const showSnippets = checkVisibility('snippets', hasSnippets);
    const showResources = checkVisibility('resources', hasResources);
    const showBlog = checkVisibility('blog', hasBlog);
    const showCertifications = checkVisibility('certifications', hasCertifications);
    const showGithub = checkVisibility('github', hasGithubRepos);
    const marqueeItems: string[] = getSection('tech_marquee').content?.items || [];
    const engineeringGroups: Array<{ title: string; items: string[] }> = getSection('engineering').content?.groups || [];
    const apiShowcaseItems: Array<{ name: string; description: string; endpoint: string; icon: string; code?: string; detailed_content?: string }> = getSection('api_integrations').content?.items || [];
    const productionExperienceItems: string[] = getSection('production_experience').content?.items || [];
    const experienceMatrixRows: Array<{ area: string; stars: number; level: string }> = getSection('experience_matrix').content?.rows || [];
    const timelineItems: Array<{ year: string; title: string; description: string }> = getSection('timeline').content?.items || [];
    const specializationItems: Array<{ title: string; points: string[] }> = getSection('specializations').content?.items || [];

    const showMarquee = checkVisibility('tech_marquee', marqueeItems.length > 0);
    const showEngineering = checkVisibility('engineering', engineeringGroups.length > 0);
    const showApiIntegrations = checkVisibility('api_integrations', apiShowcaseItems.length > 0);
    const showProductionExperience = checkVisibility('production_experience', productionExperienceItems.length > 0);
    const showExperienceMatrix = checkVisibility('experience_matrix', experienceMatrixRows.length > 0);
    const showTimeline = checkVisibility('timeline', timelineItems.length > 0);
    const showSpecializations = checkVisibility('specializations', specializationItems.length > 0);

    const marqueeBadgeStyles = [
        'border-amber-200 bg-amber-50 text-amber-700',
        'border-blue-200 bg-blue-50 text-blue-700',
        'border-amber-200 bg-amber-50 text-amber-700',
        'border-rose-200 bg-rose-50 text-rose-700',
        'border-violet-200 bg-violet-50 text-violet-700',
        'border-zinc-300 bg-zinc-100 text-zinc-700',
    ];

    const formatResourceDescription = (text: string) => {
        const lines = text.split('\n').filter(Boolean);

        return lines.map((line, index) => {
            const trimmedLine = line.trim();
            const looksLikeCode = trimmedLine.includes(' --') || trimmedLine.startsWith('cloudflared ') || trimmedLine.startsWith('docker ') || trimmedLine.startsWith('npm ') || trimmedLine.startsWith('php ') || trimmedLine.startsWith('composer ');

            if (looksLikeCode) {
                return (
                    <pre key={`${trimmedLine}-${index}`} className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 px-4 py-3 text-xs text-zinc-100">
                        <code>{trimmedLine}</code>
                    </pre>
                );
            }

            return (
                <p key={`${trimmedLine}-${index}`} className="text-sm leading-relaxed text-zinc-600">
                    {trimmedLine}
                </p>
            );
        });
    };

    return (
        <>
            <Head>
                <title>Lakshmi | Full Stack Web & Mobile Developer</title>
                <meta name="description" content="Full Stack Developer portfolio of Lakshmi — specializing in Laravel, WordPress, Shopify, Flutter, Docker VPS, Cloudflare, AI integrations (OpenAI, Deepgram), REST APIs, and production-grade deployment." />
            </Head>
            <style>{`
                @keyframes portfolio-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            <div className="min-h-screen font-sans bg-white text-zinc-800 transition-colors duration-300">
                {/* Professional Header */}
                <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200 shadow-sm transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center md:justify-between">
                        <a href="#" className="text-xl font-black tracking-tight text-zinc-900 transition-colors flex items-center gap-1.5">
                            Lakshmi<span className="text-amber-500">.dev</span>
                        </a>

                        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-500">
                            {headerSetting?.nav_links && headerSetting.nav_links.length > 0 ? (
                                headerSetting.nav_links.map((link, i) => (
                                    <a key={i} href={link.url} className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">{link.label}</a>
                                ))
                            ) : (
                                <>
                                    {getSection('banner').is_visible && <a href="#about" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">About</a>}
                                    {showExperience && <a href="#experience" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">Experience</a>}
                                    {showProjects && <a href="#projects" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">Projects</a>}
                                    {showSkills && <a href="#skills" className="hover:text-amber-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">Skills</a>}
                                </>
                            )}
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="/resume/download"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center space-x-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white py-2 px-5 rounded-sm transition-all shadow-sm hover:shadow"
                            >
                                <Download className="w-4 h-4" />
                                <span>Resume</span>
                            </a>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                {getSection('banner').is_visible && (
                    <section id="about" className={`relative 20 bg-white ${getSectionVisibilityClasses('banner')}`}>
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-600 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-200">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    <span>Available for Freelance / Full-time</span>
                                </div>

                                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                                    {getSection('banner').title || "Full Stack Web & Mobile Developer"}
                                </h1>

                                <h2 className="text-2xl sm:text-3xl font-semibold text-amber-600">
                                    {getSection('banner').subtitle || "Laravel • WordPress • Shopify • Flutter • Docker"}
                                </h2>

                                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-2xl">
                                    {getSection('banner').content?.hero_subtitle || "I build scalable web applications, custom admin panels, mobile backends, eCommerce solutions, and AI-powered products — from planning to live production deployment on VPS and cloud infrastructure."}
                                </p>

                                {/* Hero Stats */}
                                <div className="grid grid-cols-3 gap-4 py-4 max-w-xl border-y border-zinc-100">
                                    <div>
                                        <div className="text-2xl font-bold text-zinc-900">3+</div>
                                        <div className="text-xs text-zinc-500">Years Experience</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-zinc-900">6+</div>
                                        <div className="text-xs text-zinc-500">Major Projects</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-zinc-900">15+</div>
                                        <div className="text-xs text-zinc-500">APIs Integrated</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <a
                                        href="#projects"
                                        className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-sm flex items-center space-x-2 text-sm"
                                    >
                                        <span>{getSection('banner').content?.button_text_1 || 'View Projects'}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#contact"
                                        className="border border-zinc-200 hover:border-amber-200 hover:bg-amber-50 font-medium py-3 px-6 rounded-xl transition-all text-sm text-zinc-700"
                                    >
                                        {getSection('banner').content?.button_text_2 || 'Discuss a Project'}
                                    </a>
                                </div>
                            </div>

                            {/* Production System Status Monitor */}
                            <div className="lg:col-span-5 relative flex justify-center items-center">
                                <div className="relative w-full max-w-md bg-zinc-950 rounded-3xl p-6 shadow-2xl border border-zinc-800 font-mono text-xs overflow-hidden">
                                    {/* Terminal Title Bar */}
                                    <div className="flex items-center space-x-1.5 mb-5">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                        <span className="ml-3 text-zinc-400 text-[10px] font-mono">production-monitor — bash</span>
                                    </div>

                                    {/* Status Lines */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-400">$ system_status</span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                                <span className="text-green-400">Docker Engine</span>
                                            </div>
                                            <span className="text-zinc-300">Running · 3 containers</span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                                <span className="text-amber-600">Cloudflared Tunnel</span>
                                            </div>
                                            <span className="text-zinc-300">→ localhost:8080</span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                <span className="text-blue-400">API Latency</span>
                                            </div>
                                            <span className="text-green-300">14ms ✓</span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                                <span className="text-yellow-400">Queue Workers</span>
                                            </div>
                                            <span className="text-zinc-300">4 workers active</span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                                <span className="text-amber-700">Webhook Events</span>
                                            </div>
                                            <span className="text-zinc-300">Stripe · Bokun · SendOwl</span>
                                        </div>

                                        <div className="space-y-1 pt-1">
                                            <div className="text-zinc-500"># Recent deploys</div>
                                            <div className="text-green-400">✓ telehealth-api deployed (2h ago)</div>
                                            <div className="text-green-400">✓ shopify-connector synced (1d ago)</div>
                                            <div className="text-amber-600">→ google-contacts-sync running</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {showMarquee && (
                    <section className={`py-10 bg-zinc-50 border-y border-zinc-200 overflow-hidden ${getSectionVisibilityClasses('tech_marquee')}`}>
                        <div className="max-w-7xl mx-auto px-6 mb-6">
                            <h3 className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">{getSection('tech_marquee').title}</h3>
                            {getSection('tech_marquee').subtitle && (
                                <p className="text-center text-sm text-zinc-500 mt-3">{getSection('tech_marquee').subtitle}</p>
                            )}
                        </div>
                        <div className="flex overflow-hidden">
                            <div className="flex items-center gap-4 whitespace-nowrap" style={{ width: 'max-content', animation: 'portfolio-marquee 28s linear infinite' }}>
                                {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                                    <span key={`${item}-${idx}`} className={`inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-medium shrink-0 ${marqueeBadgeStyles[idx % marqueeBadgeStyles.length]}`}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                {/* Featured Projects Showcase */}
                {showProjects && (
                    <section id="projects" className={`py-20 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('projects')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('projects').title}</h2>
                                {getSection('projects').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('projects').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            {/* Controls Row (Filters + Slider Controls) */}
                            <div className={`flex flex-col md:flex-row items-center gap-4 ${getSection('projects').content?.use_slider ? 'md:justify-between mb-8 w-full' : 'justify-center mb-12'}`}>
                                {/* Pagination (Left) */}
                                {getSection('projects').content?.use_slider && filteredProjects.length > 0 && (
                                    <div className="hidden md:flex flex-1 justify-start">
                                        <span className="text-xs text-zinc-500 font-semibold">
                                            {projectSliderIndex + 1} / {filteredProjects.length}
                                        </span>
                                    </div>
                                )}

                                {/* Filter Tabs (Center) */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {projectCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedProjectCategory(cat);
                                                setProjectSliderIndex(0);
                                            }}
                                            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${selectedProjectCategory === cat
                                                ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                                : 'border-zinc-200 bg-white text-zinc-650 hover:border-amber-200 hover:text-amber-600'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Slider Arrows (Right) */}
                                {getSection('projects').content?.use_slider && filteredProjects.length > 0 && (
                                    <div className="hidden md:flex flex-1 justify-end gap-2">
                                        <button
                                            onClick={() => setProjectSliderIndex(prev => Math.max(0, prev - 1))}
                                            disabled={projectSliderIndex === 0}
                                            className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setProjectSliderIndex(prev => Math.min(filteredProjects.length - 1, prev + 1))}
                                            disabled={projectSliderIndex >= filteredProjects.length - 1}
                                            className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Projects Grid */}
                            <div className={`flex items-start overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:overflow-x-visible ${getSection('projects').content?.use_slider ? 'md:space-y-0 md:block md:items-stretch' : 'md:grid md:grid-cols-1 md:items-stretch'}`}>
                                {filteredProjects.map((proj, idx) => {
                                    const isDesktopHidden = getSection('projects').content?.use_slider && idx !== projectSliderIndex;
                                    return (
                                        <div
                                            key={proj.id}
                                            className={`bg-white rounded-3xl overflow-hidden transition-all flex flex-col lg:grid lg:grid-cols-12 gap-6 p-5 md:p-8 w-full shrink-0 snap-center ${isDesktopHidden ? 'md:!hidden' : ''} ${proj.is_featured
                                                ? 'border-2 border-amber-500 shadow-md relative'
                                                : 'border border-zinc-200 shadow-sm hover:shadow-lg hover:border-amber-300 hover:-translate-y-1'
                                                }`}
                                        >
                                            {proj.is_featured && (
                                                <div className="absolute top-0 right-8 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg tracking-wider uppercase shadow-sm z-20">
                                                    Featured Showcase
                                                </div>
                                            )}
                                            {/* Project visual preview */}
                                            <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-4 md:p-6 border border-zinc-100 flex flex-col justify-between h-auto relative group overflow-hidden">
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold py-1 px-2.5 rounded-lg border border-amber-200">
                                                            {proj.category}
                                                        </span>
                                                        {proj.is_proprietary ? (
                                                            <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-semibold">
                                                                <Lock className="w-3.5 h-3.5" />
                                                                <span>NDA Client Work</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-amber-600 text-xs font-semibold">Open Source Code</span>
                                                        )}
                                                    </div>

                                                    {/* Show thumbnail image if available, otherwise show mock terminal */}
                                                    {(() => {
                                                        let validImages: string[] = [];
                                                        if (proj.image_url) {
                                                            if (Array.isArray(proj.image_url)) {
                                                                validImages = proj.image_url;
                                                            } else if (typeof proj.image_url === 'string') {
                                                                try {
                                                                    const parsed = JSON.parse(proj.image_url);
                                                                    if (Array.isArray(parsed)) validImages = parsed;
                                                                    else if (parsed) validImages = [parsed];
                                                                } catch (e) {
                                                                    validImages = [proj.image_url];
                                                                }
                                                            } else {
                                                                validImages = [String(proj.image_url)];
                                                            }
                                                        }
                                                        validImages = validImages.filter(img => {
                                                            if (!img) return false;
                                                            if (img === "[]" || img === "null" || img === "undefined" || img === '""') return false;
                                                            if (typeof img === 'string' && img.trim() === "") return false;
                                                            return true;
                                                        });

                                                        if (validImages.length > 0) {
                                                            return (
                                                                <div className="relative group mt-4 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 flex items-center justify-center w-full aspect-video md:aspect-auto md:flex-1 md:min-h-[300px]">
                                                                    {validImages.length > 1 ? (
                                                                        <>
                                                                            <div id={`slider-${proj.id}`} className="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar scroll-smooth">
                                                                                {validImages.map((url, i) => (
                                                                                    <img
                                                                                        key={i}
                                                                                        src={url}
                                                                                        alt={`${proj.title} ${i + 1}`}
                                                                                        className="w-full h-full object-cover flex-shrink-0 snap-center"
                                                                                        onError={(e) => {
                                                                                            const target = e.target as HTMLImageElement;
                                                                                            target.onerror = null;
                                                                                            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNGY0ZjUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNhMWExYWEiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                                                                                        }}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    const slider = document.getElementById(`slider-${proj.id}`);
                                                                                    if (slider) slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
                                                                                }}
                                                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                                            >
                                                                                <ChevronLeft className="w-5 h-5" />
                                                                            </button>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    const slider = document.getElementById(`slider-${proj.id}`);
                                                                                    if (slider) slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
                                                                                }}
                                                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                                            >
                                                                                <ChevronRight className="w-5 h-5" />
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <img
                                                                            src={validImages[0]}
                                                                            alt={proj.title}
                                                                            className="w-full h-full object-cover rounded-2xl"
                                                                            onError={(e) => {
                                                                                const target = e.target as HTMLImageElement;
                                                                                target.onerror = null;
                                                                                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNGY0ZjUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNhMWExYWEiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <div className="bg-zinc-900 text-zinc-300 p-4 md:p-6 rounded-2xl font-mono text-xs space-y-3 border border-zinc-800 mt-4 w-full aspect-video md:aspect-auto md:min-h-[300px] flex flex-col justify-center overflow-hidden">
                                                                <div className="text-amber-400 font-bold">// {proj.title}</div>
                                                                <div className="flex items-center space-x-1.5 border-b border-zinc-800 pb-2">
                                                                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                                                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                                                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"></span>
                                                                    <span className="text-[8px] ml-2 text-zinc-450 truncate">{proj.title} System Console</span>
                                                                </div>
                                                                <div className="text-zinc-600">GET /api/v1/telehealth/status (200 OK)</div>
                                                                <div className="text-[8px] bg-zinc-950 p-2 rounded border border-zinc-800 text-zinc-500 overflow-x-auto whitespace-pre-wrap">
                                                                    {JSON.stringify({
                                                                        client: proj.client_name || "Internal Deploy",
                                                                        status: "fully_operational",
                                                                        sync_driver: "Redis/Laravel Queues",
                                                                        stack: proj.tech_stack?.slice(0, 3) || []
                                                                    }, null, 2)}
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>

                                                {/* Contribution Indicator */}
                                                <div className="border-t border-zinc-150 pt-4 mt-6">
                                                    <div className="flex justify-between items-center text-xs text-zinc-500 mb-1.5">
                                                        <span>Developer Contribution</span>
                                                        <span className="font-semibold text-amber-600">80% Core System</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Project text details */}
                                            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                                                <div className="space-y-4">
                                                    <h3 className="text-2xl font-extrabold text-zinc-900 line-clamp-2 min-h-[4rem] md:line-clamp-none md:min-h-0">{proj.title}</h3>
                                                    <div className="md:hidden text-sm text-zinc-600 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                                                        {proj.description}
                                                    </div>
                                                    <div className="hidden md:block">
                                                        {renderExpandableCardText(
                                                            `project-${proj.id}-description`,
                                                            proj.description,
                                                            'text-sm text-zinc-600 leading-relaxed',
                                                            'line-clamp-3',
                                                            true,
                                                        )}
                                                    </div>

                                                    {(proj.challenge || proj.outcome) && (
                                                        <div className="hidden md:grid md:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-150 text-xs">
                                                            {proj.challenge && (
                                                                <div>
                                                                    <span className="font-bold text-zinc-700 block mb-1">🏥 THE CHALLENGE</span>
                                                                    {renderExpandableCardText(
                                                                        `project-${proj.id}-challenge`,
                                                                        proj.challenge,
                                                                        'text-zinc-550',
                                                                        'line-clamp-4',
                                                                        true
                                                                    )}
                                                                </div>
                                                            )}
                                                            {proj.outcome && (
                                                                <div>
                                                                    <span className="font-bold text-amber-600 block mb-1">✔ THE OUTCOME</span>
                                                                    {renderExpandableCardText(
                                                                        `project-${proj.id}-outcome`,
                                                                        proj.outcome,
                                                                        'text-zinc-550',
                                                                        'line-clamp-4',
                                                                        true
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Tech stack badges */}
                                                    {proj.tech_stack && (
                                                        <div className="flex flex-wrap gap-1.5 pt-2 h-[34px] overflow-hidden md:h-auto md:overflow-visible">
                                                            {proj.tech_stack.map((tech, tIdx) => (
                                                                <span key={tIdx} className="text-xs bg-zinc-100 text-zinc-700 py-1 px-3 rounded-lg border border-zinc-200">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-3">
                                                    <button
                                                        onClick={() => {
                                                            setActiveProject(proj);
                                                            setActiveProjectTab('overview');
                                                            setProjectImageIndex(0);
                                                        }}
                                                        className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm flex items-center space-x-1"
                                                    >
                                                        <span>Explore Case Study</span>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                    {!proj.is_proprietary && proj.github_url && (
                                                        <a
                                                            href={proj.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold p-2.5 md:py-2.5 md:px-4 rounded-lg transition-colors flex items-center justify-center space-x-1"
                                                        >
                                                            <Github className="w-4 h-4 text-zinc-650" />
                                                            <span className="hidden md:inline">Source Code</span>
                                                        </a>
                                                    )}
                                                    {proj.live_url && (
                                                        <a
                                                            href={proj.live_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold p-2.5 md:py-2.5 md:px-4 rounded-lg transition-colors flex items-center justify-center space-x-1"
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-zinc-650" />
                                                            <span className="hidden md:inline">Live Preview</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
                {/* Detailed Case Studies deep dive reports */}
                {showCaseStudies && (
                    <section className={`py-10 lg-py-24 bg-white border-y border-zinc-200 ${getSectionVisibilityClasses('case_studies')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('case_studies').title}</h2>
                                {getSection('case_studies').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('case_studies').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                                {caseStudies.map(cs => (
                                    <div
                                        key={cs.id}
                                        onClick={() => setActiveCaseStudy(cs)}
                                        className="w-11/12 shrink-0 snap-center md:w-full cursor-pointer bg-white border border-zinc-200 hover:border-amber-500 p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                                    >
                                        <div>
                                            <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 mb-4">
                                                <Bookmark className="w-3.5 h-3.5 fill-amber-500" />
                                                <span>DEEP DIVE REPORT</span>
                                            </div>
                                            <h4 className="text-xl font-extrabold text-zinc-900 mb-3">{cs.title}</h4>
                                            <div className="mb-6">
                                                {renderExpandableCardText(
                                                    `case-study-${cs.id}-summary`,
                                                    cs.summary,
                                                    'text-sm text-zinc-600 leading-relaxed',
                                                )}
                                            </div>

                                            <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100 text-xs text-zinc-600 mb-6">
                                                <div className="flex justify-between">
                                                    <span className="font-bold text-zinc-900">Client / Industry:</span>
                                                    <span>{cs.client_name || 'Healthcare Platform'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-bold text-zinc-900">Duration:</span>
                                                    <span>{cs.duration || '3 Months'}</span>
                                                </div>
                                                {cs.tech_stack && (
                                                    <div className="flex justify-between">
                                                        <span className="font-bold text-zinc-900">Tech Stack:</span>
                                                        <span className="truncate max-w-60 text-right">{cs.tech_stack.join(' • ')}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-xs border-t border-zinc-100 pt-4">
                                            <span className="text-zinc-500 font-medium">Read Report</span>
                                            <span className="font-extrabold text-amber-600 flex items-center space-x-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                                <span>Explore</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Professional Experience — Classic Clean Layout */}
                {showExperience && (
                    <section id="experience" className={`py-20 bg-white relative border-t border-zinc-100 ${getSectionVisibilityClasses('experience')}`}>
                        <div className="max-w-4xl mx-auto px-6 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('experience').title || 'Professional Experience'}</h2>
                                {getSection('experience').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-3">{getSection('experience').subtitle}</p>
                                )}
                                <div className="h-1 w-12 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                            </div>

                            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:flex-col md:space-y-12 md:overflow-x-visible">
                                {experiences.map((exp, idx) => (
                                    <div key={exp.id} className="w-full shrink-0 snap-center group relative bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-zinc-900 group-hover:text-amber-600 transition-colors">
                                                    {exp.job_title}
                                                </h3>
                                                <div className="text-lg font-bold text-zinc-700 mt-1 flex flex-wrap items-center gap-2">
                                                    <span>{exp.company}</span>
                                                    {exp.location && (
                                                        <>
                                                            <span className="text-zinc-300">•</span>
                                                            <span className="text-zinc-500 text-sm font-medium">{exp.location}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="shrink-0 text-sm font-bold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">
                                                {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                {' — '}
                                                {exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                                            </div>
                                        </div>

                                        {exp.description && (
                                            <div className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">
                                                {renderExpandableCardText(
                                                    `experience-${exp.id}-description`,
                                                    exp.description,
                                                    'text-zinc-600',
                                                )}
                                            </div>
                                        )}

                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-5 border-t border-zinc-100">
                                                {exp.achievements.map((ach, aIdx) => (
                                                    <span key={aIdx} className="text-xs font-bold text-zinc-500 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg hover:text-zinc-800 hover:border-zinc-300 transition-colors">
                                                        {ach}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Experience Matrix - Separated */}
                {showExperienceMatrix && (
                    <section className={`py-10 lg-py-24 bg-white border-y border-zinc-200 ${getSectionVisibilityClasses('experience_matrix')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('experience_matrix').title}</h2>
                                {getSection('experience_matrix').subtitle && <p className="text-sm text-zinc-500 mt-2">{getSection('experience_matrix').subtitle}</p>}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="max-w-3xl mx-auto border border-zinc-200 rounded-2xl overflow-x-auto hide-scrollbar shadow-sm bg-white">
                                <table className="w-full min-w-[500px]">
                                    <thead>
                                        <tr className="bg-zinc-50 border-b border-zinc-200">
                                            <th className="text-left text-xs font-bold text-zinc-500 uppercase px-6 py-3">Area</th>
                                            <th className="text-left text-xs font-bold text-zinc-500 uppercase px-6 py-3">Proficiency</th>
                                            <th className="text-right text-xs font-bold text-zinc-500 uppercase px-6 py-3">Level</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {experienceMatrixRows.map(row => (
                                            <tr key={row.area} className="hover:bg-amber-50/40 transition-colors">
                                                <td className="px-6 py-3.5 text-sm font-semibold text-zinc-800">{row.area}</td>
                                                <td className="px-6 py-3.5">
                                                    <div className="flex space-x-0.5">
                                                        {[1, 2, 3, 4, 5].map(s => (
                                                            <Star key={s} className={`w-4 h-4 ${s <= row.stars ? 'text-amber-500 fill-amber-500' : 'text-zinc-200 fill-zinc-200'}`} />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3.5 text-right">
                                                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${row.stars === 5 ? 'bg-amber-50 text-amber-600' : 'bg-zinc-100 text-zinc-600'}`}>{row.level}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}


                {/* Production Experience Checklist */}
                {showProductionExperience && (
                    <section className={`py-5 lg-py-25 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('production_experience')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('production_experience').title}</h2>
                                {getSection('production_experience').subtitle && <p className="text-sm text-zinc-500 mt-2">{getSection('production_experience').subtitle}</p>}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                                {productionExperienceItems.map(item => (
                                    <div key={item} className="flex items-center space-x-3 bg-white border border-zinc-200 rounded-xl px-4 py-3 shadow-sm">
                                        <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-amber-600" />
                                        </div>
                                        <span className="text-sm text-zinc-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* API Integration Showcase */}
                {showApiIntegrations && (
                    <section id="api" className={`py-24 bg-stone-950 ${getSectionVisibilityClasses('api_integrations')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-white">{getSection('api_integrations').title}</h2>
                                {getSection('api_integrations').subtitle && <p className="text-sm text-stone-400 mt-2">{getSection('api_integrations').subtitle}</p>}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="relative">
                                {/* Slider controls */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-sm font-medium text-stone-400">
                                        Showing {apiShowcaseItems.length > 0 ? apiSliderIndex + 1 : 0}-{Math.min(apiSliderIndex + 3, apiShowcaseItems.length)} of {apiShowcaseItems.length}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setApiSliderIndex(prev => Math.max(0, prev - 3))}
                                            disabled={apiSliderIndex === 0}
                                            className="w-10 h-10 rounded-xl flex items-center justify-center bg-stone-900/50 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setApiSliderIndex(prev => Math.min(apiShowcaseItems.length - 1, prev + 3))}
                                            disabled={apiSliderIndex + 3 >= apiShowcaseItems.length}
                                            className="w-10 h-10 rounded-xl flex items-center justify-center bg-stone-900/50 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">
                                    {apiShowcaseItems.slice(apiSliderIndex, apiSliderIndex + 3).map(api => {
                                        // Parse method and endpoint if formatted like "GET /api/v1"
                                        const parts = api.endpoint.split(' ');
                                        const method = parts.length > 1 ? parts[0] : 'GET';
                                        const path = parts.length > 1 ? parts.slice(1).join(' ') : api.endpoint;
                                        const fullUrl = `https://api.example.com${path.startsWith('/') ? path : '/' + path}`;

                                        const getMethodColor = (m: string) => {
                                            switch (m.toUpperCase()) {
                                                case 'POST': return 'text-amber-400';
                                                case 'PUT': return 'text-amber-400';
                                                case 'DELETE': return 'text-rose-400';
                                                default: return 'text-sky-400';
                                            }
                                        };

                                        return (
                                            <div key={api.name} className="w-11/12 shrink-0 snap-center md:w-full flex flex-col bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                                                {/* Window Header */}
                                                <div className="flex items-center justify-between px-4 py-3 bg-stone-800/50 border-b border-stone-800 relative">
                                                    <div className="flex gap-1.5 w-16 shrink-0">
                                                        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                    </div>
                                                    <div className="text-[10px] font-mono text-stone-400 flex-1 text-center truncate px-2">{api.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.sh</div>
                                                    <div className="w-8 shrink-0 flex justify-end">
                                                        {api.detailed_content && (
                                                            <Link href={`/showcase/${api.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="p-1 rounded-md hover:bg-stone-800 text-amber-500 hover:text-amber-400 transition-colors group/link" title="View Details">
                                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-3">
                                                            <span className="text-amber-500 group-hover:scale-110 transition-transform">
                                                                {(() => {
                                                                    const IconComponent = (LucideIcons as any)[api.icon] || LucideIcons.Activity;
                                                                    return <IconComponent className="w-5 h-5" />;
                                                                })()}
                                                            </span>
                                                            <h4 className="font-bold text-white text-base truncate">{api.name}</h4>
                                                        </div>
                                                        <div className="text-sm text-stone-300 leading-relaxed max-h-[96px] overflow-y-auto prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: api.description }}></div>
                                                    </div>

                                                    {/* Code block */}
                                                    {api.code ? (
                                                        <div className="bg-[#0D0D0D] rounded-xl p-3 border border-stone-800/80 font-mono text-xs overflow-hidden relative mt-4">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-stone-800/50"></div>
                                                            <div className="pl-2">
                                                                <pre className="text-stone-300 whitespace-pre-wrap">{api.code}</pre>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-[#0D0D0D] rounded-xl p-3 border border-stone-800/80 font-mono text-xs overflow-hidden relative mt-4">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-stone-800/50"></div>
                                                            <div className="pl-2">
                                                                <span className="text-stone-500 select-none mr-2">$</span>
                                                                <span className="text-amber-300">curl</span>
                                                                <span className="text-stone-400"> -X </span>
                                                                <span className={`font-bold ${getMethodColor(method)}`}>{method}</span>
                                                                <br />
                                                                <span className="text-stone-500 select-none mr-2">&gt;</span>
                                                                <span className="text-stone-300 truncate block mt-1">{fullUrl}</span>
                                                            </div>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                )}



                {/* Technology Timeline */}
                {showTimeline && (
                    <Timeline
                        timelineItems={timelineItems}
                        title={getSection('timeline').title || 'Technology Timeline'}
                        subtitle={getSection('timeline').subtitle}
                        className={getSectionVisibilityClasses('timeline')}
                    />
                )}

                {/* What I Build (Specializations) */}
                {showSpecializations && (
                    <section className={`py-5 lg-py-25 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('specializations')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('specializations').title}</h2>
                                {getSection('specializations').subtitle && <p className="text-sm text-zinc-500 mt-2">{getSection('specializations').subtitle}</p>}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {specializationItems.map((item, idx) => {
                                    const icons = [Activity, LinkIcon, Server, Sparkles];
                                    const IconComponent = icons[idx] || Activity;

                                    return (
                                        <div key={item.title} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit border border-amber-200">
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-bold text-lg text-zinc-900">{item.title}</h4>
                                            <ul className="text-sm text-zinc-500 space-y-2">
                                                {item.points.map(point => (
                                                    <li key={point}>&bull; {point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Skills & Tech Stack */}
                {showSkills && (
                    <section id="skills" className={`py-20 bg-white border-y border-zinc-200 ${getSectionVisibilityClasses('skills')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('skills').title}</h2>
                                {getSection('skills').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('skills').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
                                {['Backend', 'Frontend', 'CMS & E-commerce', 'Tools'].map(cat => {
                                    const catSkills = skills.filter(s => s.category === cat);
                                    if (catSkills.length === 0) return null;

                                    return (
                                        <div key={cat} className="w-11/12 shrink-0 snap-center md:w-full border border-zinc-200 p-6 rounded-2xl bg-zinc-50 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                            <h3 className="font-bold text-lg mb-4 border-b border-zinc-200 pb-3 text-amber-600">{cat}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {catSkills.map(skill => (
                                                    <div
                                                        key={skill.id}
                                                        className="bg-white border border-zinc-200 py-1.5 px-3 rounded-lg text-[11px] font-bold text-zinc-700 flex items-center space-x-2 shadow-sm hover:shadow-md hover:border-amber-200 hover:text-amber-600 transition-all cursor-default"
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                                            style={{ backgroundColor: skill.color || '#8B5CF6' }}
                                                        ></span>
                                                        <span>{skill.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Code Snippets Library */}
                {getSection('snippets').is_visible && (
                    <section id="snippets" className={`py-20 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('snippets')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-12">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('snippets').title}</h2>
                                {getSection('snippets').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('snippets').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            {/* Filter and Search controls */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                    {snippetCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedSnippetCategory(cat);
                                                setShowOnlyBookmarked(false);
                                                setSnippetSliderIndex(0);
                                            }}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${selectedSnippetCategory === cat && !showOnlyBookmarked
                                                ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                                : 'border-zinc-200 bg-white text-zinc-650'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => {
                                            setShowOnlyBookmarked(!showOnlyBookmarked);
                                            setSelectedSnippetCategory('All');
                                            setSnippetSliderIndex(0);
                                        }}
                                        className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${showOnlyBookmarked
                                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                            : 'border-zinc-200 bg-white text-zinc-650 hover:border-amber-200 hover:text-amber-600'
                                            }`}
                                    >
                                        <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-white text-white' : 'text-zinc-400'}`} />
                                        <span>Bookmarked ({bookmarks.length})</span>
                                    </button>
                                </div>

                                <div className="relative w-full sm:w-64">
                                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={snippetSearch}
                                        onChange={(e) => {
                                            setSnippetSearch(e.target.value);
                                            setSnippetSliderIndex(0);
                                        }}
                                        placeholder="Search code..."
                                        className="w-full pl-9 pr-4 py-2 text-xs border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-amber-200"
                                    />
                                </div>
                            </div>

                            {/* Snippets code showcase */}
                            {filteredSnippets.length > 0 ? (
                                getSection('snippets').content?.use_slider ? (
                                    <div className="relative">
                                        {/* Slider controls */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="text-sm font-medium text-zinc-400">
                                                Showing {filteredSnippets.length > 0 ? snippetSliderIndex + 1 : 0}-{Math.min(snippetSliderIndex + 3, filteredSnippets.length)} of {filteredSnippets.length}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setSnippetSliderIndex(prev => Math.max(0, prev - 3))}
                                                    disabled={snippetSliderIndex === 0}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-zinc-200 text-zinc-400 hover:text-amber-600 hover:border-amber-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setSnippetSliderIndex(prev => Math.min(filteredSnippets.length - 1, prev + 3))}
                                                    disabled={snippetSliderIndex + 3 >= filteredSnippets.length}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-zinc-200 text-zinc-400 hover:text-amber-600 hover:border-amber-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* 3 snippets side by side */}
                                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">
                                            {filteredSnippets.slice(snippetSliderIndex, snippetSliderIndex + 3).map(snip => (
                                                <div key={snip.id} className="min-w-[85vw] snap-center md:min-w-0 md:w-auto bg-stone-950 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-xl transition-all border border-stone-800">

                                                    {/* Mac OS Header */}
                                                    <div className="flex items-center justify-between px-4 py-3 bg-stone-900 border-b border-stone-800 relative">
                                                        <div className="flex gap-1.5 w-16 shrink-0">
                                                            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                        </div>
                                                        <div className="text-[11px] font-mono text-stone-400 flex-1 text-center truncate px-2">{snip.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.{snip.language.toLowerCase()}</div>
                                                        <div className="w-16 shrink-0 flex justify-end gap-2">
                                                            <button
                                                                onClick={() => toggleBookmark(snip.id)}
                                                                className={`p-1 rounded hover:bg-stone-800 transition-colors ${bookmarks.includes(snip.id) ? 'text-amber-500' : 'text-stone-500'}`}
                                                                title={bookmarks.includes(snip.id) ? 'Remove Bookmark' : 'Bookmark Snippet'}
                                                            >
                                                                <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(snip.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="p-5 flex-1 overflow-hidden relative">
                                                        <div className="absolute top-4 right-4">
                                                            <span className="text-[9px] uppercase font-bold bg-stone-800 text-amber-500 py-1 px-2 rounded-md border border-stone-700">
                                                                {snip.language}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-stone-400 mb-4 pr-16">{snip.description}</p>

                                                        <div className="relative bg-stone-900/50 p-4 rounded-xl border border-stone-800 font-mono text-xs overflow-x-auto text-stone-300 max-h-48 leading-relaxed">
                                                            <pre className="whitespace-pre"><code>{snip.code}</code></pre>
                                                        </div>
                                                    </div>

                                                    <div className="px-5 py-4 bg-stone-900/50 border-t border-stone-800 flex justify-between items-center mt-auto">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => downloadSnippet(snip.title, snip.code, snip.language)}
                                                                className="text-[10px] font-bold tracking-wide uppercase bg-stone-800 text-stone-300 py-1.5 px-3 rounded-lg border border-stone-700 hover:text-white hover:border-stone-600 transition-colors flex items-center gap-1.5"
                                                            >
                                                                <Download className="w-3 h-3" /> DL
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleCopySnippet(snip.code, snip.id)}
                                                            className="text-[10px] font-bold tracking-wide uppercase bg-stone-800 text-stone-300 py-1.5 px-3 rounded-lg border border-stone-700 hover:text-amber-400 hover:border-stone-600 transition-colors flex items-center gap-1.5"
                                                        >
                                                            {copiedSnippetId === snip.id ? (
                                                                <><Check className="w-3 h-3 text-emerald-400" /> Copied!</>
                                                            ) : (
                                                                <><Copy className="w-3 h-3" /> Copy Code</>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {filteredSnippets.map(snip => (
                                            <div key={snip.id} className="bg-stone-950 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-xl transition-all border border-stone-800">
                                                {/* Mac OS Header */}
                                                <div className="flex items-center justify-between px-4 py-3 bg-stone-900 border-b border-stone-800 relative">
                                                    <div className="flex gap-1.5 w-16 shrink-0">
                                                        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                    </div>
                                                    <div className="text-[12px] font-mono text-stone-400 flex-1 text-center truncate px-2">{snip.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.{snip.language.toLowerCase()}</div>
                                                    <div className="w-16 shrink-0 flex justify-end gap-2">
                                                        <button
                                                            onClick={() => toggleBookmark(snip.id)}
                                                            className={`p-1 rounded hover:bg-stone-800 transition-colors ${bookmarks.includes(snip.id) ? 'text-amber-500' : 'text-stone-500'}`}
                                                            title={bookmarks.includes(snip.id) ? 'Remove Bookmark' : 'Bookmark Snippet'}
                                                        >
                                                            <Bookmark className={`w-4 h-4 ${bookmarks.includes(snip.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-6 flex-1 overflow-hidden relative">
                                                    <div className="absolute top-6 right-6">
                                                        <span className="text-[10px] uppercase font-bold bg-stone-800 text-amber-500 py-1 px-2 rounded-md border border-stone-700">
                                                            {snip.language}
                                                        </span>
                                                    </div>

                                                    <div className="bg-stone-900 p-3 rounded-lg border border-stone-800 text-[10px] text-stone-400 mb-4 pr-16 w-3/4">
                                                        <span className="font-bold text-stone-300 block mb-0.5">USE CASE:</span>
                                                        <p>{snip.category} snippet for reusable {snip.language} workflow logic.</p>
                                                    </div>

                                                    <p className="text-sm text-stone-300 mb-6">{snip.description}</p>

                                                    <div className="relative bg-stone-900/50 p-5 rounded-xl border border-stone-800 font-mono text-sm overflow-x-auto text-stone-300 max-h-64 leading-relaxed">
                                                        <pre className="whitespace-pre"><code>{snip.code}</code></pre>
                                                    </div>
                                                </div>

                                                <div className="px-6 py-5 bg-stone-900/50 border-t border-stone-800 flex justify-between items-center mt-auto">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => downloadSnippet(snip.title, snip.code, snip.language)}
                                                            className="text-xs font-bold tracking-wide uppercase bg-stone-800 text-stone-300 py-2 px-4 rounded-lg border border-stone-700 hover:text-white hover:border-stone-600 transition-colors flex items-center gap-2"
                                                        >
                                                            <Download className="w-4 h-4" /> Download
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopySnippet(snip.code, snip.id)}
                                                        className="text-xs font-bold tracking-wide uppercase bg-stone-800 text-stone-300 py-2 px-4 rounded-lg border border-stone-700 hover:text-amber-400 hover:border-stone-600 transition-colors flex items-center gap-2"
                                                    >
                                                        {copiedSnippetId === snip.id ? (
                                                            <><Check className="w-4 h-4 text-emerald-400" /> Copied!</>
                                                        ) : (
                                                            <><Copy className="w-4 h-4" /> Copy Code</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="text-center text-zinc-400 py-12">
                                    No code snippets found.
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Developer Toolkit (Toolkit, formerly Resources) */}
                {getSection('resources').is_visible && (
                    <section id="toolkit" className={`py-20 bg-white ${getSectionVisibilityClasses('resources')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-12">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">Developer Toolkit</h2>
                                {getSection('resources').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('resources').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            {/* Filter buttons */}
                            <div className="flex flex-wrap justify-center gap-2 mb-10">
                                {resourceCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedResourceCategory(cat);
                                            setResourceSliderIndex(0);
                                        }}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${selectedResourceCategory === cat
                                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                            : 'border-zinc-200 bg-white text-zinc-650'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            {getSection('resources').content?.use_slider ? (
                                <div className="relative">
                                    <div className="flex justify-between items-center gap-2 mb-4">
                                        <span className="text-xs text-zinc-500">
                                            Showing {resourceSliderIndex + 1}–{Math.min(resourceSliderIndex + 3, filteredResources.length)} of {filteredResources.length}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setResourceSliderIndex(prev => Math.max(0, prev - 3))}
                                                disabled={resourceSliderIndex === 0}
                                                className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setResourceSliderIndex(prev => Math.min(filteredResources.length - 1, prev + 3))}
                                                disabled={resourceSliderIndex + 3 >= filteredResources.length}
                                                className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">
                                        {filteredResources.slice(resourceSliderIndex, resourceSliderIndex + 3).map(res => (
                                            <button
                                                type="button"
                                                key={res.id}
                                                onClick={() => setActiveResource(res)}
                                                className="min-w-[85vw] snap-center md:min-w-0 md:w-auto group block text-left border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all shadow-sm"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{res.category}</span>
                                                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 transition-colors" />
                                                </div>
                                                <h4 className="font-bold text-base mb-2 group-hover:text-amber-600 transition-colors text-zinc-900">{res.name}</h4>
                                                {renderExpandableCardText(
                                                    `resource-slider-${res.id}-description`,
                                                    res.description,
                                                    'text-xs text-zinc-500 leading-relaxed',
                                                )}
                                                <div className="text-xs font-semibold text-amber-600 mt-4">View details</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4">
                                    {filteredResources.map(res => (
                                        <button
                                            type="button"
                                            key={res.id}
                                            onClick={() => setActiveResource(res)}
                                            className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[320px] snap-center group block border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all shadow-sm shrink-0"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{res.category}</span>
                                                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 transition-colors" />
                                            </div>
                                            <h4 className="font-bold text-base mb-2 group-hover:text-amber-600 transition-colors text-zinc-900">{res.name}</h4>
                                            {renderExpandableCardText(
                                                `resource-grid-${res.id}-description`,
                                                res.description,
                                                'text-xs text-zinc-505 leading-relaxed',
                                            )}
                                            <div className="text-xs font-semibold text-amber-600 mt-4">View details</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Medium-style Articles & Insights */}
                {showBlog && (
                    <section id="blog" className={`py-20 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('blog')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('blog').title}</h2>
                                {getSection('blog').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('blog').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            {getSection('blog').content?.use_slider ? (
                                <div className="relative">
                                    <div className="flex justify-between items-center gap-2 mb-4">
                                        <span className="text-xs text-zinc-500">
                                            Showing {blogSliderIndex + 1}–{Math.min(blogSliderIndex + 3, blogPosts.length)} of {blogPosts.length}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setBlogSliderIndex(prev => Math.max(0, prev - 3))}
                                                disabled={blogSliderIndex === 0}
                                                className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setBlogSliderIndex(prev => Math.min(blogPosts.length - 1, prev + 3))}
                                                disabled={blogSliderIndex + 3 >= blogPosts.length}
                                                className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">
                                        {blogPosts.slice(blogSliderIndex, blogSliderIndex + 3).map(post => (
                                            <Link
                                                key={post.id}
                                                href={`/insights/${post.slug}`}
                                                className="min-w-[85vw] snap-center md:min-w-0 md:w-auto cursor-pointer group border border-zinc-250 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all shadow-sm space-y-4 flex flex-col"
                                            >
                                                <div className="flex justify-between items-center text-xs text-zinc-400">
                                                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                                                    <div className="flex items-center space-x-2">
                                                        {post.medium_url && (
                                                            <div className="text-zinc-400 hover:text-zinc-900 transition-colors" title="Published on Medium">
                                                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm2.94 0c0 3.14-.38 5.68-.86 5.68-.47 0-.86-2.54-.86-5.68s.39-5.68.86-5.68c.48 0 .86 2.54.86 5.68z" /></svg>
                                                            </div>
                                                        )}
                                                        {post.linkedin_url && (
                                                            <div className="text-zinc-400 hover:text-[#0077b5] transition-colors" title="Shared on LinkedIn">
                                                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                            </div>
                                                        )}
                                                        <span className="bg-zinc-100 text-zinc-600 py-0.5 px-2 rounded-md text-[10px] font-bold uppercase tracking-wider">ARTICLE</span>
                                                    </div>
                                                </div>
                                                <h3 className="font-extrabold text-base group-hover:text-amber-600 transition-colors text-zinc-900 flex-1">
                                                    {post.title}
                                                </h3>
                                                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                                                    {post.summary}
                                                </p>
                                                <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                                                    <div className="flex flex-wrap gap-1">
                                                        {post.tags?.slice(0, 2).map((tag, idx) => (
                                                            <span key={idx} className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md font-medium">{tag}</span>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-amber-600 font-semibold flex items-center space-x-1 group-hover:underline">
                                                        <span>Read</span>
                                                        <ChevronRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 pb-4">
                                    {blogPosts.map(post => (
                                        <Link
                                            key={post.id}
                                            href={`/insights/${post.slug}`}
                                            className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[350px] shrink-0 snap-center cursor-pointer group border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all flex flex-col justify-between shadow-sm block"
                                        >
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs text-zinc-400">
                                                    <div className="flex items-center space-x-2">
                                                        <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                                                        <span>&bull; 5 min read</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {post.medium_url && (
                                                            <div className="text-zinc-400 hover:text-zinc-900 transition-colors" title="Published on Medium">
                                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm2.94 0c0 3.14-.38 5.68-.86 5.68-.47 0-.86-2.54-.86-5.68s.39-5.68.86-5.68c.48 0 .86 2.54.86 5.68z" /></svg>
                                                            </div>
                                                        )}
                                                        {post.linkedin_url && (
                                                            <div className="text-zinc-400 hover:text-[#0077b5] transition-colors" title="Shared on LinkedIn">
                                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <h3 className="font-extrabold text-lg group-hover:text-amber-600 transition-colors line-clamp-2 text-zinc-900">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-zinc-505 leading-relaxed line-clamp-3">
                                                    {post.summary}
                                                </p>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-zinc-150 flex items-center justify-between text-xs text-zinc-450">
                                                <div className="flex space-x-3">
                                                    <span>125 Views</span>
                                                    <span>42 Likes</span>
                                                </div>
                                                <span className="text-amber-600 font-semibold group-hover:underline flex items-center space-x-1">
                                                    <span>Read</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* GitHub Repo List & Commit Activity Feed */}
                {showGithub && (
                    <section className={`py-5 lg-py-25  bg-white border-b border-zinc-200 ${getSectionVisibilityClasses('github')}`}>
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-6">
                                <h3 className="text-2xl font-extrabold text-zinc-900 flex items-center space-x-2">
                                    <Github className="w-6 h-6 text-zinc-800" />
                                    <span>GitHub Repositories</span>
                                </h3>

                                {/* GitHub Repo List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {githubRepos.slice(0, 4).map(repo => (
                                        <a
                                            key={repo.name}
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 shadow-sm flex flex-col justify-between transition-all"
                                        >
                                            <div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 py-0.5 px-2 rounded-md border border-amber-200 uppercase">
                                                        {repo.language || 'PHP'}
                                                    </span>
                                                    <div className="flex items-center space-x-2 text-xs text-zinc-400">
                                                        <span className="flex items-center space-x-0.5">
                                                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                                                            <span>{repo.stars || 4}</span>
                                                        </span>
                                                        <span className="flex items-center space-x-0.5">
                                                            <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                                                            <span>{repo.forks || 1}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-base mb-2 group-hover:text-amber-600 transition-colors text-zinc-900">{repo.name}</h4>
                                                <p className="text-xs text-zinc-505 leading-relaxed mb-4">{repo.description || 'Laravel administrative template built with dynamic modules.'}</p>
                                            </div>

                                            <div className="text-[10px] text-zinc-450 border-t border-zinc-100 pt-3 flex justify-between">
                                                <span>Latest commit 2 days ago</span>
                                                <span className="text-amber-600 font-semibold flex items-center space-x-0.5">
                                                    <span>View Code</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Commit Feed */}
                            <div className="lg:col-span-4 space-y-6">
                                <h3 className="text-2xl font-extrabold text-zinc-900">
                                    <span>Latest Activity</span>
                                </h3>

                                {/* Commit log */}
                                <div className="border border-zinc-200 rounded-3xl p-6 bg-white shadow-sm space-y-4">
                                    <h4 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">LATEST COMMITS</h4>
                                    <div className="space-y-4 text-xs">
                                        <div className="border-l-2 border-amber-200 pl-3">
                                            <div className="font-semibold text-zinc-800">feat: openai voice transcription api</div>
                                            <div className="text-[10px] text-zinc-450">Repository: telehealth-core &bull; 1 hour ago</div>
                                        </div>
                                        <div className="border-l-2 border-amber-200 pl-3">
                                            <div className="font-semibold text-zinc-800">fix: optimized stripe webhooks queues</div>
                                            <div className="text-[10px] text-zinc-450">Repository: shopify-connector &bull; 1 day ago</div>
                                        </div>
                                        <div className="border-l-2 border-amber-200 pl-3">
                                            <div className="font-semibold text-zinc-800">refactor: custom json encryption casts</div>
                                            <div className="text-[10px] text-zinc-450">Repository: vps-multi-app &bull; 2 days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Certifications with credentials validation */}
                {showCertifications && (
                    <section className={`py-20 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('certifications')}`}>
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-xl mx-auto mb-16">
                                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('certifications').title}</h2>
                                {getSection('certifications').subtitle && (
                                    <p className="text-sm text-zinc-500 mt-2">{getSection('certifications').subtitle}</p>
                                )}
                                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {certifications.map(cert => (
                                    <div key={cert.id} className="border border-zinc-200 p-6 rounded-2xl flex items-start space-x-4 bg-zinc-50 shadow-sm">
                                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-200 shrink-0">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-extrabold text-base text-zinc-900">{cert.name}</h4>
                                            <div className="text-xs font-semibold text-zinc-400">
                                                {cert.issuing_organization} &bull; Issued {new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            </div>

                                            {cert.skills_covered && (
                                                <div className="flex flex-wrap gap-1 pt-1">
                                                    {cert.skills_covered.map((skill, sIdx) => (
                                                        <span key={sIdx} className="text-[10px] bg-white border border-zinc-200 text-zinc-650 py-0.5 px-2 rounded-md font-semibold">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {cert.credential_url && (
                                                <a
                                                    href={cert.credential_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center space-x-1.5 text-xs text-amber-600 hover:underline pt-2 font-bold"
                                                >
                                                    <span>Verify Credential</span>
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}



                {/* Let's Work Together Contact Form */}
                {getSection('contact').is_visible && (
                    <section id="contact" className="py-20 bg-white border-y border-zinc-200">
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Left Side: Information */}
                            <div className="flex flex-col justify-center">
                                <h2 className="text-4xl font-black text-zinc-900 mb-6 tracking-tight">{getSection('contact').title}</h2>
                                <div className="h-1.5 w-16 bg-amber-500 rounded-full mb-8"></div>
                                {getSection('contact').subtitle && (
                                    <p className="text-zinc-600 mb-12 max-w-md leading-relaxed">{getSection('contact').subtitle}</p>
                                )}

                                <div className="space-y-8 text-sm font-semibold text-zinc-800">
                                    <div className="flex items-center space-x-5 group">
                                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-200 shadow-sm transition-transform group-hover:scale-105">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-400 font-black tracking-widest mb-1">EMAIL ADDRESS</div>
                                            <a href={`mailto:${getSection('contact').content?.email || 'laxmi20024@gmail.com'}`} className="text-lg hover:text-amber-600 transition-colors">{getSection('contact').content?.email || 'laxmi20024@gmail.com'}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-5 group">
                                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-200 shadow-sm transition-transform group-hover:scale-105">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-400 font-black tracking-widest mb-1">PHONE NUMBER</div>
                                            <a href={`tel:${getSection('contact').content?.phone || '+916280788413'}`} className="text-lg hover:text-amber-600 transition-colors">{getSection('contact').content?.phone || '+91 6280788413'}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Contact Form */}
                            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 lg:p-10 shadow-lg relative overflow-hidden">
                                {contactSuccess ? (
                                    <div className="text-center py-16 space-y-6 h-full flex flex-col justify-center">
                                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 mx-auto flex items-center justify-center shadow-sm">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-black text-zinc-900">Message Received!</h3>
                                        <p className="text-zinc-600 max-w-sm mx-auto">
                                            Thank you for reaching out! Lakshmi will evaluate your query and send a response within 12 business hours.
                                        </p>
                                        <button
                                            onClick={() => setContactSuccess(false)}
                                            className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md text-sm mx-auto inline-block"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleContactSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 tracking-widest block mb-2">FULL NAME</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={contactForm.name}
                                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full text-sm border border-zinc-200 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white shadow-sm transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 tracking-widest block mb-2">EMAIL ADDRESS</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={contactForm.email}
                                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                    placeholder="johndoe@company.com"
                                                    className="w-full text-sm border border-zinc-200 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white shadow-sm transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 tracking-widest block mb-2">COMPANY (OPTIONAL)</label>
                                                <input
                                                    type="text"
                                                    value={contactForm.company}
                                                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                                                    placeholder="Acme Corp"
                                                    className="w-full text-sm border border-zinc-200 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white shadow-sm transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 tracking-widest block mb-2">PROJECT TYPE</label>
                                                <select
                                                    value={contactForm.projectType}
                                                    onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                                                    className="w-full text-sm border border-zinc-200 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white shadow-sm transition-all font-semibold text-zinc-700"
                                                >
                                                    <option>Laravel Development</option>
                                                    <option>WordPress Development</option>
                                                    <option>Shopify App / Theme Development</option>
                                                    <option>Flutter Mobile App</option>
                                                    <option>Docker VPS Deployment</option>
                                                    <option>AI Integration (OpenAI / Deepgram)</option>
                                                    <option>Healthcare / Telemedicine Platform</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-zinc-500 tracking-widest block mb-2">PROJECT DETAILS</label>
                                            <textarea
                                                required
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                placeholder="Describe the scope, objectives, and integrations needed..."
                                                rows={5}
                                                className="w-full text-sm border border-zinc-200 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white shadow-sm transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={contactSending}
                                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm uppercase tracking-wider"
                                        >
                                            <Send className="w-5 h-5" />
                                            <span>{contactSending ? 'Sending Inquiry...' : 'Submit Project Inquiry'}</span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                {/* Professional Footer */}
                <footer className="bg-zinc-950 border-t border-zinc-900 py-16 pb-32 md:pb-16 text-zinc-400 text-sm">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-5 space-y-4">
                            <h4 className="text-xl font-bold text-white tracking-tight">
                                Lakshmi<span className="text-amber-500">.dev</span>
                            </h4>
                            <p className="leading-relaxed max-w-sm">
                                Full Stack Developer building scalable web applications, modern mobile interfaces, and robust system architectures.
                            </p>
                            <div className="flex space-x-4 pt-4">
                                <a href="https://github.com/CodeSproutX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/lakshmi-backend-developer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-4">
                            <h5 className="font-semibold text-white">Contact</h5>
                            <ul className="space-y-3">
                                <li><a href={`mailto:${getSection('contact').content?.email || 'laxmi20024@gmail.com'}`} className="hover:text-amber-400 transition-colors">{getSection('contact').content?.email || 'laxmi20024@gmail.com'}</a></li>
                                <li>{getSection('contact').content?.phone || '+91 6280788413'}</li>
                                <li>Punjab, India</li>
                            </ul>
                        </div>

                        <div className="md:col-span-4 space-y-4">
                            <h5 className="font-semibold text-white">Availability</h5>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span>Status</span>
                                    <span className="text-amber-400 font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                        Available
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Response Time</span>
                                    <span className="text-white">&lt; 12 Hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 border-t border-zinc-900 pt-4 lg-pt-8 mt-0  lg-mt-12 flex flex-col md:flex-row justify-between items-center text-xs">
                        <span>&copy; {new Date().getFullYear()} Lakshmi. All rights reserved.</span>
                        <span className="mt-2 md:mt-0">Powered by Laravel + React</span>
                    </div>
                </footer>

                {/* ================= MODALS ================= */}

                {/* Project Detail Modal */}
                {activeProject && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm hhhjhjj" onClick={() => setActiveProject(null)}>
                        <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute right-6 top-6 p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-250 dark:hover:bg-zinc-750 text-gray-500 dark:text-zinc-400"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="space-y-2">
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{activeProject.category} Project</span>
                                <h3 className="text-2xl font-extrabold">{activeProject.title}</h3>

                                {activeProject.client_name && (
                                    <div className="text-sm font-semibold text-gray-500">Client: {activeProject.client_name}</div>
                                )}
                            </div>

                            {activeProject.is_proprietary ? (
                                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start space-x-3.5 text-amber-600 dark:text-amber-600">
                                    <Lock className="w-5 h-5 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-sm">Proprietary Enterprise Software</h4>
                                        <p className="text-xs text-amber-600 dark:text-amber-600 leading-relaxed">
                                            This application is hosted internally or protected by an NDA. Live codebase urls are restricted. Professional screen walkthroughs or architectural explanations can be requested under strict interview conditions.
                                        </p>
                                    </div>
                                </div>
                            ) : null}

                            {/* Optional Image Slider for Project */}
                            {(() => {
                                let validImages: string[] = [];
                                if (activeProject.image_url) {
                                    if (Array.isArray(activeProject.image_url)) {
                                        validImages = activeProject.image_url;
                                    } else if (typeof activeProject.image_url === 'string') {
                                        try {
                                            const parsed = JSON.parse(activeProject.image_url);
                                            if (Array.isArray(parsed)) validImages = parsed;
                                            else if (parsed) validImages = [parsed];
                                        } catch (e) {
                                            validImages = [activeProject.image_url];
                                        }
                                    } else {
                                        validImages = [String(activeProject.image_url)];
                                    }
                                }
                                validImages = validImages.filter(img => {
                                    if (!img) return false;
                                    if (img === "[]" || img === "null" || img === "undefined" || img === '""') return false;
                                    if (typeof img === 'string' && img.trim() === "") return false;
                                    return true;
                                });

                                if (validImages.length > 0) {
                                    return (
                                        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-zinc-100">
                                            {validImages.length > 1 ? (
                                                <div className="relative h-64">
                                                    {validImages.map((img, idx) => (
                                                        <img key={idx} src={img} alt="Project" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === projectImageIndex ? 'opacity-100' : 'opacity-0'}`} />
                                                    ))}
                                                    <div className="absolute inset-y-0 left-0 flex items-center p-4">
                                                        <button onClick={() => setProjectImageIndex(prev => Math.max(0, prev - 1))} disabled={projectImageIndex === 0} className="p-2 rounded-full bg-black/20 text-white disabled:opacity-30 hover:bg-black/40 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                                                    </div>
                                                    <div className="absolute inset-y-0 right-0 flex items-center p-4">
                                                        <button onClick={() => setProjectImageIndex(prev => Math.min(validImages.length - 1, prev + 1))} disabled={projectImageIndex >= validImages.length - 1} className="p-2 rounded-full bg-black/20 text-white disabled:opacity-30 hover:bg-black/40 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <img src={validImages[0]} alt="Project" className="w-full h-64 object-cover" />
                                            )}
                                        </div>
                                    );
                                }

                                return (
                                    <div className="bg-zinc-900 text-zinc-300 p-6 rounded-2xl font-mono text-xs space-y-3 border border-zinc-800 shadow-sm">
                                        <div className="text-amber-400 font-bold">// {activeProject.title}</div>
                                        <div className="flex items-center space-x-1.5 border-b border-zinc-800 pb-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"></span>
                                            <span className="text-[8px] ml-2 text-zinc-450 truncate">{activeProject.title} System Console</span>
                                        </div>
                                        <div className="text-zinc-600">GET /api/v1/telehealth/status (200 OK)</div>
                                        <div className="text-[8px] bg-zinc-950 p-2 rounded border border-zinc-800 text-zinc-500 overflow-x-auto whitespace-pre-wrap">
                                            {JSON.stringify({
                                                client: activeProject.client_name || "Internal Deploy",
                                                status: "fully_operational",
                                                sync_driver: "Redis/Laravel Queues",
                                                stack: activeProject.tech_stack?.slice(0, 3) || []
                                            }, null, 2)}
                                        </div>
                                    </div>
                                );
                            })()}

                            <div className="space-y-4">
                                <h4 className="font-bold text-sm text-gray-400">PROJECT SUMMARY</h4>
                                <div className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: activeProject.description }} />

                                {(activeProject.challenge || activeProject.outcome) && (
                                    <div className="flex flex-col space-y-4 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 text-xs my-4">
                                        {activeProject.challenge && (
                                            <div>
                                                <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">🏥 THE CHALLENGE</span>
                                                {renderExpandableCardText(
                                                    `modal-challenge-${activeProject.id}`,
                                                    activeProject.challenge,
                                                    'text-zinc-550 dark:text-zinc-400 leading-relaxed prose prose-sm max-w-none',
                                                    'line-clamp-2',
                                                    true
                                                )}
                                            </div>
                                        )}
                                        {activeProject.outcome && (
                                            <div>
                                                <span className="font-bold text-amber-600 block mb-1">✔ THE OUTCOME</span>
                                                {renderExpandableCardText(
                                                    `modal-outcome-${activeProject.id}`,
                                                    activeProject.outcome,
                                                    'text-zinc-550 dark:text-zinc-400 leading-relaxed prose prose-sm max-w-none',
                                                    'line-clamp-2',
                                                    true
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeProject.content && (
                                    <div className="pt-2 space-y-2">
                                        <h4 className="font-bold text-sm text-gray-400">KEY CONTRIBUTIONS & DETAILS</h4>
                                        <div className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: activeProject.content }} />
                                    </div>
                                )}
                            </div>

                            {activeProject.tech_stack && (
                                <div className="space-y-2">
                                    <h4 className="font-bold text-xs text-gray-400">TECHNOLOGY STACK</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeProject.tech_stack.map((tech, idx) => (
                                            <span key={idx} className="text-xs bg-gray-100 dark:bg-zinc-800 py-1.5 px-3 rounded-lg font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-gray-100 dark:border-zinc-800 pt-6 flex flex-wrap gap-4">
                                {!activeProject.is_proprietary && activeProject.live_url && (
                                    <a
                                        href={activeProject.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all shadow"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>Live Demonstration</span>
                                    </a>
                                )}
                                {!activeProject.is_proprietary && activeProject.github_url && (
                                    <a
                                        href={activeProject.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 dark:border-zinc-800 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium py-2.5 px-5 rounded-xl transition-all"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>View Repository</span>
                                    </a>
                                )}
                                {activeProject.completion_date && (
                                    <div className="ml-auto text-xs text-gray-400 self-center">
                                        Completed {new Date(activeProject.completion_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Case Study Detail Modal */}
                {activeCaseStudy && (
                    <div className="fixed  case inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setActiveCaseStudy(null)}>
                        <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setActiveCaseStudy(null)}
                                className="absolute right-6 top-6 p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-250 dark:hover:bg-zinc-750 text-gray-500 dark:text-zinc-400"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="space-y-1">
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">CASE STUDY ANALYSIS</span>
                                <h3 className="text-2xl font-extrabold">{activeCaseStudy.title}</h3>
                                <div className="text-sm font-medium text-gray-500">Client: {activeCaseStudy.client_name} &bull; Duration: {activeCaseStudy.duration}</div>
                            </div>

                            <div className="space-y-6 text-sm">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                            <span className="text-amber-600 text-sm">📝</span>
                                        </div>
                                        Summary Overview
                                    </h3>
                                    <div className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line prose max-w-none" dangerouslySetInnerHTML={{ __html: activeCaseStudy.summary }} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                            <span className="text-red-600 text-sm">🎯</span>
                                        </div>
                                        The Challenge
                                    </h3>
                                    <div className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line prose max-w-none" dangerouslySetInnerHTML={{ __html: activeCaseStudy.challenge }} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            <span className="text-blue-600 text-sm">💡</span>
                                        </div>
                                        The Solution
                                    </h3>
                                    <div className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line prose max-w-none" dangerouslySetInnerHTML={{ __html: activeCaseStudy.solution }} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                            <span className="text-amber-600 text-sm">📈</span>
                                        </div>
                                        The Results
                                    </h3>
                                    <div className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line prose max-w-none" dangerouslySetInnerHTML={{ __html: activeCaseStudy.results }} />
                                </div>

                                {activeCaseStudy.tech_stack && (
                                    <div className="space-y-2 pt-2">
                                        <h4 className="font-bold text-xs text-gray-400 uppercase">Architecture Stack</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeCaseStudy.tech_stack.map((tech, idx) => (
                                                <span key={idx} className="text-xs bg-gray-150 dark:bg-zinc-800 py-1.5 px-3 rounded-lg font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* BlogPost Detail Modal */}
                {activePost && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setActivePost(null)}>
                        <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setActivePost(null)}
                                className="absolute right-6 top-6 p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-250 dark:hover:bg-zinc-750 text-gray-500 dark:text-zinc-400"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="space-y-2">
                                {activePost.published_at && (
                                    <div className="text-xs text-gray-400">
                                        Published {new Date(activePost.published_at!).toLocaleDateString()}
                                    </div>
                                )}
                                <h3 className="text-2xl font-extrabold">{activePost.title}</h3>
                            </div>

                            <div className="border-t border-gray-150 dark:border-zinc-800 pt-6">
                                <div
                                    className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400 space-y-4 whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: activePost.content }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resource Detail Modal */}
                {activeResource && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setActiveResource(null)}>
                        <div className="relative w-full max-w-2xl bg-white border border-gray-200 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setActiveResource(null)}
                                className="absolute right-6 top-6 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="space-y-2">
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{activeResource.category}</span>
                                <h3 className="text-2xl font-extrabold text-zinc-900">{activeResource.name}</h3>
                                <div className="space-y-3">{formatResourceDescription(activeResource.description)}</div>
                            </div>

                            {activeResource.tags && activeResource.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {activeResource.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-zinc-100 text-zinc-700 py-1 px-2.5 rounded-md">#{tag}</span>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-zinc-100 pt-6">
                                <a
                                    href={activeResource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all shadow"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Open Tool Website</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}


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
