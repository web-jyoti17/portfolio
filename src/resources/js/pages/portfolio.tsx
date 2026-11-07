import { Head, Link, router } from '@inertiajs/react';
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
    Instagram,
    Star,
    Target,
    X,
    MapPin,
    Menu,
    Mail,
    Phone,
    icons as LucideIcons
} from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { ArticleContent, tidyHtml } from '@/components/site/article-content';
import { Sheet } from '@/components/site/sheet';
import { Slider } from '@/components/site/slider';
import { SnippetExplorer } from '@/components/site/snippet-explorer';
import { CountUp } from '@/components/site/motion';
import { openAssistant, useAssistantAvailable } from '@/components/site/assistant';
import { MediumIcon, SiteLayout, socialLinksFor, useSite, XIcon } from '@/components/site/site-layout';

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
    medium_url?: string | null;
    linkedin_url?: string | null;
    is_new?: boolean;
    views_count?: number;
    reads_count?: number;
    tags: string[] | null;
    status: string;
    published_at: string | null;
}

interface MediumPost {
    title: string;
    url: string;
    excerpt: string;
    image: string | null;
    tags: string[];
    published_at: string | null;
    is_new?: boolean;
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
    sort_order?: number;
    show_on_mobile?: boolean;
    show_on_desktop?: boolean;
    content: any | null;
}

interface Product {
    name: string;
    tagline: string;
    status?: string | null;
    logo?: string | null;
    description?: string | null;
    features?: Array<{ icon?: string | null; title: string; body: string }>;
    tech_stack?: string[] | null;
    primary_label?: string | null;
    primary_url?: string | null;
    secondary_label?: string | null;
    secondary_url?: string | null;
    show_in_hero?: boolean;
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
    mediumPosts?: MediumPost[];
    sections: PortfolioSection[];
}

/** Section eyebrows: a short label above each section title. */
const SECTION_EYEBROWS: Record<string, string> = {
    products: 'Product',
    tech_marquee: 'Stack',
    projects: 'Selected work',
    case_studies: 'Case studies',
    experience: 'Career',
    experience_matrix: 'Strengths',
    production_experience: 'In production',
    api_integrations: 'Integrations',
    specializations: 'Services',
    skills: 'Skills',
    snippets: 'Code',
    resources: 'Toolkit',
    blog: 'Writing',
    github: 'Open source',
    certifications: 'Credentials',
};

/** Editorial section heading: eyebrow, large title, and the subtitle set to the right on wide screens. */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: string | null }) {
    return (
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
                {eyebrow && (
                    <p className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] text-amber-600 uppercase">
                        <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-transparent" aria-hidden="true" />
                        {eyebrow}
                    </p>
                )}
                <h2 className="mt-3 text-3xl leading-[1.08] font-extrabold tracking-[-0.035em] text-balance text-zinc-900 sm:text-4xl lg:text-5xl">{title}</h2>
            </div>
            {subtitle && <p className="max-w-md text-base leading-relaxed text-zinc-500 md:pb-1.5 md:text-right">{subtitle}</p>}
        </div>
    );
}

const Timeline = ({ timelineItems, title, subtitle, className, style }: { timelineItems: Array<{ year: string; title: string; description: string }>, title: string, subtitle?: string | null, className?: string, style?: React.CSSProperties }) => {
    if (!timelineItems || timelineItems.length === 0) return null;

    return (
        <section id="timeline" style={style} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 relative overflow-hidden ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mb-4">{title}</h2>
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
                            <div key={idx} className="relative group w-[85%] sm:w-[60%] shrink-0 snap-center lg:flex-1 lg:w-auto">
                                <div className="bg-surface border border-zinc-200 rounded-3xl p-6 sm:p-8 relative z-10 hover:border-amber-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                                    {/* Timeline Marker Desktop */}
                                    <div className="absolute top-[-1.5rem] left-8 hidden lg:flex w-12 h-12 rounded-full bg-surface border-1 border-amber-500 shadow-sm items-center justify-center text-zinc-900 font-bold text-sm z-20 group-hover:bg-amber-500 group-hover:text-white transition-colors">
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
    projects: allProjects = [],
    blogPosts: allBlogPosts = [],
    caseStudies: allCaseStudies = [],
    skills = [],
    experiences = [],
    educations = [],
    certifications = [],
    codeSnippets: allCodeSnippets = [],
    resources: allResources = [],
    testimonials = [],
    resumes = [],
    githubRepos: allGithubRepos = [],
    mediumPosts = [],
    sections = [],
}: PortfolioProps) {
    const site = useSite();
    const contactSocial = socialLinksFor(site, 'contact');

    // Recently published articles get a "New" badge (window set in Site Settings)
    const isNewPost = (post: BlogPost): boolean => Boolean(post.is_new);

    const plainText = (html: string | null | undefined): string =>
        (html || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#0?39;/g, "'")
            .replace(/\s+/g, ' ')
            .trim();

    const postReadTime = (post: BlogPost): number => {
        const words = (post.content || '').replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;

        return Math.max(1, Math.ceil(words / 200));
    };

    const newBadge = (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 py-0.5 pr-2 pl-1.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
            New
        </span>
    );

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

    // "Maximum items to show" from the admin; empty means all
    const limitItems = <T,>(key: string, items: T[], fallback = 0): T[] => {
        const limit = Number(getSection(key).content?.limit) || fallback;

        return limit > 0 ? items.slice(0, limit) : items;
    };

    const projects = limitItems('projects', allProjects);
    const blogPosts = limitItems('blog', allBlogPosts);
    const caseStudies = limitItems('case_studies', allCaseStudies);
    const codeSnippets = limitItems('snippets', allCodeSnippets);
    const resources = limitItems('resources', allResources);
    const githubRepos = limitItems('github', allGithubRepos, 6);

    // Sections follow the order set in the admin (Sections: drag to reorder)
    const sectionStyle = (key: string): React.CSSProperties => ({
        order: sections.find(s => s.key === key)?.sort_order ?? 0,
    });

    const getSectionVisibilityClasses = (key: string) => {
        const sec = getSection(key);
        const mobile = sec.show_on_mobile ?? sec.is_visible;
        const desktop = sec.show_on_desktop ?? sec.is_visible;
        if (!mobile && !desktop) return 'hidden';
        if (!mobile && desktop) return 'hidden md:block';
        if (mobile && !desktop) return 'block md:hidden';
        return '';
    };

    // Project filtering
    const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');
    const projectCategories = ['All', ...Array.from(new Set(projects.map(project => project.category).filter(Boolean)))];

    const filteredProjects = selectedProjectCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedProjectCategory);

    // Resource filtering
    const [selectedResourceCategory, setSelectedResourceCategory] = useState<string>('All');
    const resourceCategories = ['All', ...Array.from(new Set(resources.map(resource => resource.category).filter(Boolean)))];

    const filteredResources = selectedResourceCategory === 'All'
        ? resources
        : resources.filter(r => r.category === selectedResourceCategory);

    // Detail Modal States
    const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    // The project shown in the Featured Projects spotlight (defaults to the first)
    const [spotlightId, setSpotlightId] = useState<number | null>(null);
    // "Show all" toggles for the longer lists
    const [showAllPosts, setShowAllPosts] = useState(false);
    // Case study covers whose file failed to load fall back to the numbered header
    const [brokenCaseImages, setBrokenCaseImages] = useState<Record<number, boolean>>({});
    const [activeResource, setActiveResource] = useState<DeveloperResource | null>(null);


    // Mobile sliders for multi-card sections
    const [experienceSliderIndex, setExperienceSliderIndex] = useState<number>(0);
    const [apiSliderIndex, setApiSliderIndex] = useState<number>(0);
    const [timelineSliderIndex, setTimelineSliderIndex] = useState<number>(0);

    const [expandedTextCards, setExpandedTextCards] = useState<Record<string, boolean>>({});

    // "Ask my AI" bar in the hero
    const aiAvailable = useAssistantAvailable();
    const [heroQuestion, setHeroQuestion] = useState('');

    // Contact form: posts to /contact, which saves the message and emails it
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        message: '',
        website: '',
    });
    const [contactSending, setContactSending] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);
    const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

    const contactFieldClass = (error?: string): string =>
        `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${error ? 'border-red-400 focus:border-red-500' : 'border-zinc-300 focus:border-amber-500'}`;

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setContactSending(true);
        setContactErrors({});

        router.post(
            '/contact',
            {
                name: contactForm.name,
                email: contactForm.email,
                company: contactForm.company,
                project_type: contactForm.projectType || (getSection('contact').content?.project_types?.[0] ?? ''),
                message: contactForm.message,
                website: contactForm.website,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setContactSuccess(true);
                    setContactForm({ name: '', email: '', company: '', projectType: '', message: '', website: '' });
                },
                onError: (errors) => {
                    setContactErrors(errors as Record<string, string>);
                    toast.error('Please check the highlighted fields.');
                },
                onFinish: () => setContactSending(false),
            },
        );
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
        lineClampClass = 'line-clamp-3',
        isHtml = true,
    ) => {
        if (!text) return null;
        if (isHtml) text = tidyHtml(text);
        const isExpanded = !!expandedTextCards[cardKey];

        const rawText = isHtml ? text.replace(/<[^>]*>?/gm, '') : text;
        const shouldShowToggle = rawText.trim().length > 300;

        return (
            <div>
                {isHtml ? (
                    <div
                        className={`${className} prose prose-sm dark:prose-invert max-w-none ${isExpanded || !shouldShowToggle ? '' : lineClampClass}`}
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
    const hasBlog = blogPosts.length > 0 || mediumPosts.length > 0;
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
    const apiShowcaseItems: Array<{ name: string; description: string; endpoint: string; icon: string; image?: string | null; code?: string; detailed_content?: string }> = getSection('api_integrations').content?.items || [];
    const productionExperienceItems: string[] = getSection('production_experience').content?.items || [];
    const experienceMatrixRows: Array<{ area: string; stars: number; level: string }> = getSection('experience_matrix').content?.rows || [];
    const timelineItems: Array<{ year: string; title: string; description: string }> = getSection('timeline').content?.items || [];
    const specializationItems: Array<{ title: string; icon?: string | null; points: string[] }> = getSection('specializations').content?.items || [];
    const productItems: Product[] = getSection('products').content?.items || [];
    const showProducts = checkVisibility('products', productItems.length > 0);
    const heroProduct = showProducts ? productItems.find(product => product.show_in_hero) : undefined;

    // Uploaded logos are stored paths; the default logo is a full URL
    const assetUrl = (path: string | null | undefined): string | null =>
        !path ? null : /^(https?:)?\//.test(path) ? path : `/storage/${path}`;

    // Hero content (Sections: Hero)
    const hero = getSection('banner').content || {};
    const heroStats: Array<{ value: string; label: string }> = hero.stats || [];
    const heroTerminalRows: Array<{ label: string; value: string; color?: string }> = hero.terminal_rows || [];
    const heroTerminalLog: string[] = hero.terminal_log || [];
    // The panel beside the intro: a profile card (default) or the terminal
    const heroVisual: string = hero.hero_visual || 'profile';
    const showHeroTerminal = hero.show_terminal !== false && heroVisual === 'terminal' && heroTerminalRows.length > 0;
    const showHeroProfile = hero.show_terminal !== false && heroVisual === 'profile';
    const showHeroPanel = showHeroTerminal || showHeroProfile;
    const currentJob = experiences.find(job => job.is_current) || experiences[0];
    const heroSkills: string[] = (marqueeItems.length > 0 ? marqueeItems : skills.map(skill => skill.name)).slice(0, 8);
    const heroName = (getSection('banner').title || site.logo_text).replace(/^hi,?\s*i'?m\s*/i, '').trim();
    const terminalTones: Record<string, { dot: string; text: string }> = {
        green: { dot: 'bg-green-400', text: 'text-green-400' },
        accent: { dot: 'bg-amber-500', text: 'text-amber-500' },
        blue: { dot: 'bg-blue-400', text: 'text-blue-400' },
        yellow: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
    };

    // Skills grouped by category, in the order the categories first appear
    const skillGroups: Array<[string, Skill[]]> = [];
    skills.forEach(skill => {
        const group = skillGroups.find(([category]) => category === skill.category);

        if (group) {
            group[1].push(skill);
        } else {
            skillGroups.push([skill.category, [skill]]);
        }
    });

    // Keep the familiar order for the standard categories; any others follow
    const categoryOrder = ['Backend', 'Frontend', 'Mobile', 'CMS & E-commerce', 'Tools'];
    const categoryRank = (category: string): number => {
        const index = categoryOrder.indexOf(category);

        return index === -1 ? categoryOrder.length : index;
    };
    skillGroups.sort((a, b) => categoryRank(a[0]) - categoryRank(b[0]));

    // Core Stack and Tools can show the ticker, the grouped skills, or both.
    // While it shows the grouped skills, the separate Skills section is not repeated.
    const stackLayout: string = getSection('tech_marquee').content?.layout || 'both';
    const stackShowsTicker = stackLayout !== 'cards' && marqueeItems.length > 0;
    const stackShowsCards = stackLayout !== 'ticker' && skillGroups.length > 0;
    const stackTickerSpeed = Math.min(120, Math.max(8, Number(getSection('tech_marquee').content?.speed) || 32));
    const showMarquee = checkVisibility('tech_marquee', stackShowsTicker || stackShowsCards);
    const showSkillsSection = showSkills && !(showMarquee && stackShowsCards);

    // Strengths grouped by level, strongest first
    const strengthLevels: Array<{ level: string; stars: number; areas: string[] }> = [];
    [...experienceMatrixRows]
        .sort((first, second) => Number(second.stars) - Number(first.stars))
        .forEach(row => {
            const group = strengthLevels.find(item => item.level === row.level);

            if (group) {
                group.areas.push(row.area);
            } else {
                strengthLevels.push({ level: row.level, stars: Math.min(5, Math.max(0, Number(row.stars) || 0)), areas: [row.area] });
            }
        });

    const snippetOptions = getSection('snippets').content || {};
    const contactProjectTypes: string[] = getSection('contact').content?.project_types || [];
    const showContactForm = getSection('contact').content?.show_form !== false;

    const firstImage = (value: string | string[] | null | undefined): string | null => {
        let images: unknown = value;

        if (typeof value === 'string') {
            try {
                images = JSON.parse(value);
            } catch {
                images = value;
            }
        }

        const first = Array.isArray(images) ? images[0] : images;

        return typeof first === 'string' && first.trim() !== '' && first !== '[]' ? first : null;
    };

    const formatMonth = (value: string): string =>
        new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const showEngineering = checkVisibility('engineering', engineeringGroups.length > 0);
    const showApiIntegrations = checkVisibility('api_integrations', apiShowcaseItems.length > 0);
    const showProductionExperience = checkVisibility('production_experience', productionExperienceItems.length > 0);
    const showExperienceMatrix = checkVisibility('experience_matrix', experienceMatrixRows.length > 0);
    const showTimeline = checkVisibility('timeline', timelineItems.length > 0);
    const showSpecializations = checkVisibility('specializations', specializationItems.length > 0);

    const marqueeBadgeStyles = [
        'border-amber-200 bg-amber-50 text-amber-700',
        'border-zinc-200 bg-surface text-zinc-700',
    ];

    const formatResourceDescription = (text: string) => {
        const lines = text.split('\n').filter(Boolean);

        return lines.map((line, index) => {
            const trimmedLine = line.trim();
            const looksLikeCode = trimmedLine.includes(' --') || trimmedLine.startsWith('cloudflared ') || trimmedLine.startsWith('docker ') || trimmedLine.startsWith('npm ') || trimmedLine.startsWith('php ') || trimmedLine.startsWith('composer ');

            if (looksLikeCode) {
                return (
                    <pre key={`${trimmedLine}-${index}`} className="mt-3 overflow-x-auto theme-fixed rounded-xl bg-zinc-950 px-4 py-3 text-xs text-zinc-100">
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
                <title>{site.seo_title || site.logo_text}</title>
            </Head>
            <style>{`
                @keyframes portfolio-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            <SiteLayout isHome>
                <main className="flex flex-col [&>*]:min-w-0">

                {/* Hero Section */}
                {getSection('banner').is_visible && (
                    <section id="about" style={sectionStyle('banner')} className={`relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 ${getSectionVisibilityClasses('banner')}`}>
                        <div className="aurora-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                        <div className="hero-orb pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full" aria-hidden="true" />

                        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 gap-12 lg:gap-14 items-center ${showHeroPanel ? 'lg:grid-cols-12' : ''}`}>
                            <div className={`space-y-7 ${showHeroPanel ? 'lg:col-span-7' : 'max-w-3xl'}`}>
                                {((hero.show_badge !== false && hero.badge_text) || heroProduct) && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        {hero.show_badge !== false && hero.badge_text && (
                                            <div className="glass-card inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-zinc-700">
                                                <span className="flex h-2 w-2 relative">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                </span>
                                                <span>{hero.badge_text}</span>
                                            </div>
                                        )}
                                        {heroProduct && (
                                            <a
                                                href="#products"
                                                className="glass-card group inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-xs font-semibold text-zinc-700 transition-colors hover:text-amber-700"
                                            >
                                                {assetUrl(heroProduct.logo) ? (
                                                    <img src={assetUrl(heroProduct.logo)!} alt="" className="h-6 w-6 rounded-full object-cover" />
                                                ) : (
                                                    <Sparkles className="h-4 w-4 text-amber-500 ml-1.5" />
                                                )}
                                                <span>I built <strong className="font-bold text-zinc-900">{heroProduct.name}</strong>, see it</span>
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                            </a>
                                        )}
                                    </div>
                                )}

                                <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.045em] text-zinc-900 leading-[1.02] text-balance">
                                    {(() => {
                                        const title = getSection('banner').title || 'Full Stack Web & Mobile Developer';
                                        const greeting = title.match(/^(hi,?\s*i'?m\s*)/i)?.[0];

                                        return greeting ? (
                                            <>
                                                <span className="block text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-500 mb-2">{greeting.replace(/\s+$/, '')}</span>
                                                <span className="text-aurora">{title.slice(greeting.length)}</span>
                                            </>
                                        ) : title;
                                    })()}
                                </h1>

                                {getSection('banner').subtitle && (
                                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-800">
                                        {getSection('banner').subtitle}
                                    </p>
                                )}

                                {hero.hero_subtitle && (
                                    <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-2xl">
                                        {hero.hero_subtitle}
                                    </p>
                                )}

                                {/* Ask the AI straight from the hero */}
                                {aiAvailable && (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            openAssistant(heroQuestion.trim() || undefined);
                                            setHeroQuestion('');
                                        }}
                                        className="ai-ask-bar flex max-w-xl items-center gap-2 rounded-2xl p-1.5 pl-4 shadow-[0_20px_50px_-25px_var(--color-amber-600)]"
                                    >
                                        <Sparkles className="h-5 w-5 shrink-0 text-amber-500" />
                                        <input
                                            value={heroQuestion}
                                            onChange={(e) => setHeroQuestion(e.target.value)}
                                            placeholder={`Ask my AI anything about ${heroName}…`}
                                            aria-label="Ask the AI assistant a question"
                                            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
                                        />
                                        <button type="submit" className="ai-send inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white">
                                            Ask
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </form>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {showProjects && (
                                        <a
                                            href="#projects"
                                            className="button-shine group bg-amber-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 text-sm"
                                        >
                                            <span>{hero.button_text_1 || 'View Projects'}</span>
                                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </a>
                                    )}
                                    <a
                                        href="#contact"
                                        className="glass-card font-semibold py-3.5 px-6 rounded-xl transition-all text-sm text-zinc-800 hover:border-amber-300"
                                    >
                                        {hero.button_text_2 || 'Discuss a Project'}
                                    </a>
                                </div>

                                {/* Hero Stats (shown in the profile card when it is on) */}
                                {heroStats.length > 0 && !showHeroProfile && (
                                    <dl className="grid max-w-xl grid-cols-3 gap-3 pt-2">
                                        {heroStats.map(stat => (
                                            <div key={`${stat.value}-${stat.label}`} className="glass-card rounded-2xl px-4 py-3.5">
                                                <dt className="sr-only">{stat.label}</dt>
                                                <dd className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 tabular-nums"><CountUp value={stat.value} /></dd>
                                                <dd className="mt-0.5 text-[11px] sm:text-xs leading-snug text-zinc-500">{stat.label}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                )}
                            </div>

                            {/* Profile card: a senior "snapshot" built from the site settings, experience, stats, stack and products */}
                            {showHeroProfile && (
                                <div className="lg:col-span-5 relative flex justify-center items-center">
                                    <div className="glass-card terminal-float relative w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]">
                                        {/* Identity */}
                                        <div className="flex items-center gap-4 p-6 pb-5 sm:p-7 sm:pb-5">
                                            <span className="relative shrink-0 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-[2px] shadow-lg">
                                                <span className="theme-fixed flex h-14 w-14 items-center justify-center rounded-[0.9rem] bg-zinc-950 font-display text-2xl font-extrabold text-white">
                                                    {heroName.charAt(0).toUpperCase()}
                                                </span>
                                                {site.show_availability && (
                                                    <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface">
                                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                                    </span>
                                                )}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-display text-xl font-extrabold tracking-tight text-zinc-900">{heroName}</p>
                                                {getSection('banner').subtitle && <p className="truncate text-sm font-medium text-zinc-500">{getSection('banner').subtitle}</p>}
                                            </div>
                                            {site.show_availability && (
                                                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 sm:inline-flex">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </span>
                                                    {site.availability_status}
                                                </span>
                                            )}
                                        </div>

                                        {/* Now */}
                                        {currentJob && (
                                            <div className="mx-6 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-surface/70 p-3.5 sm:mx-7">
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                                    <Briefcase className="h-5 w-5" />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                                        {currentJob.is_current ? `Now · since ${new Date(currentJob.start_date).getFullYear()}` : 'Most recently'}
                                                    </p>
                                                    <p className="truncate text-sm font-bold text-zinc-900">{currentJob.job_title}</p>
                                                    <p className="truncate text-xs text-zinc-500">{currentJob.company}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Impact */}
                                        {heroStats.length > 0 && (
                                            <dl className="mx-6 mt-3 grid grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-surface/70 py-3.5 sm:mx-7">
                                                {heroStats.slice(0, 3).map(stat => (
                                                    <div key={`${stat.value}-${stat.label}`} className="px-3 text-center">
                                                        <dt className="sr-only">{stat.label}</dt>
                                                        <dd className="text-aurora font-display text-2xl font-extrabold tracking-tight tabular-nums"><CountUp value={stat.value} /></dd>
                                                        <dd className="mt-0.5 text-[10px] leading-tight font-medium text-zinc-500">{stat.label}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        )}

                                        {/* Stack */}
                                        {heroSkills.length > 0 && (
                                            <div className="px-6 pt-5 sm:px-7">
                                                <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Core expertise</p>
                                                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                                                    {heroSkills.map(item => (
                                                        <li key={item} className="rounded-lg border border-zinc-200 bg-surface px-2.5 py-1 text-xs font-semibold text-zinc-700">{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {showProducts && productItems[0] && (
                                            <a href="#products" className="group mx-6 mt-5 flex items-center gap-3 rounded-2xl bg-zinc-950 p-3 text-white transition-transform hover:-translate-y-0.5 sm:mx-7 theme-fixed">
                                                {assetUrl(productItems[0].logo) ? (
                                                    <img src={assetUrl(productItems[0].logo)!} alt="" className="h-10 w-10 shrink-0 rounded-xl" />
                                                ) : (
                                                    <Sparkles className="h-5 w-5 shrink-0 text-amber-400" />
                                                )}
                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Built &amp; shipped solo</span>
                                                    <span className="block truncate text-sm font-bold">{productItems[0].name}</span>
                                                </span>
                                                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                                            </a>
                                        )}

                                        {/* Where to find me */}
                                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50/60 px-6 py-4 sm:px-7">
                                            {site.contact.location ? (
                                                <span className="flex min-w-0 items-center gap-1.5 text-xs text-zinc-500">
                                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                                                    <span className="truncate">{site.contact.location}</span>
                                                </span>
                                            ) : <span />}
                                            <div className="flex shrink-0 items-center gap-1.5">
                                                {[
                                                    { url: contactSocial.linkedin, label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
                                                    { url: contactSocial.github, label: 'GitHub', icon: <Github className="h-4 w-4" /> },
                                                    { url: contactSocial.medium, label: 'Medium', icon: <MediumIcon className="h-4 w-4" /> },
                                                    { url: contactSocial.twitter, label: 'X', icon: <XIcon className="h-4 w-4" /> },
                                                    { url: site.contact.email ? `mailto:${site.contact.email}` : null, label: 'Email', icon: <Mail className="h-4 w-4" /> },
                                                ].filter(link => link.url).map(link => (
                                                    <a
                                                        key={link.label}
                                                        href={link.url!}
                                                        target={link.label === 'Email' ? undefined : '_blank'}
                                                        rel="noopener noreferrer"
                                                        aria-label={link.label}
                                                        title={link.label}
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-surface text-zinc-500 transition-colors hover:border-amber-300 hover:text-amber-600"
                                                    >
                                                        {link.icon}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Terminal panel (rows are edited in the admin: Sections → Hero) */}
                            {showHeroTerminal && (
                                <div className="lg:col-span-5 relative flex justify-center items-center">
                                    <div className="terminal-float theme-fixed relative w-full max-w-md bg-zinc-950 rounded-3xl p-5 sm:p-6 shadow-2xl border border-zinc-800 font-mono text-xs overflow-hidden">
                                        <div className="flex items-center space-x-1.5 mb-5">
                                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                            <span className="ml-3 text-zinc-400 text-[10px] font-mono truncate">{hero.terminal_title || 'terminal'}</span>
                                        </div>

                                        <div className="space-y-3">
                                            {heroTerminalRows.map((row, idx) => {
                                                const tone = terminalTones[row.color || 'green'] || terminalTones.green;

                                                return (
                                                    <div key={`${row.label}-${idx}`} style={{ '--line': idx } as React.CSSProperties} className="terminal-line flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                                                        <div className="flex items-center space-x-2 min-w-0">
                                                            <span className={`w-2 h-2 shrink-0 rounded-full ${tone.dot}`}></span>
                                                            <span className={`truncate ${tone.text}`}>{row.label}</span>
                                                        </div>
                                                        <span className="text-zinc-300 text-right">{row.value}</span>
                                                    </div>
                                                );
                                            })}

                                            {heroTerminalLog.length > 0 && (
                                                <div className="space-y-1 pt-1">
                                                    {heroTerminalLog.map((line, idx) => (
                                                        <div
                                                            key={line}
                                                            style={{ '--line': heroTerminalRows.length + idx } as React.CSSProperties}
                                                            className={`terminal-line ${line.trim().startsWith('✓') ? 'text-green-400' : 'text-amber-500'}`}
                                                        >
                                                            {line}
                                                            {idx === heroTerminalLog.length - 1 && (
                                                                <span className="terminal-cursor ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-zinc-300" aria-hidden="true" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* My Products (Sections → My Products) */}
                {showProducts && (
                    <section id="products" style={sectionStyle('products')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('products')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['products']} title={getSection('products').title} subtitle={getSection('products').subtitle} />

                            <div className="space-y-8">
                                {productItems.map(product => {
                                    const logo = assetUrl(product.logo);
                                    const features = product.features || [];
                                    const featureIcon = (name: string | null | undefined, fallback: React.ElementType) =>
                                        (name && (LucideIcons as any)[name]) || fallback;
                                    const ButtonIcon = featureIcon(features[0]?.icon, Sparkles);

                                    return (
                                        <article key={product.name} className="theme-fixed relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-xl">
                                            <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-amber-500/25 blur-3xl" aria-hidden="true" />
                                            <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" aria-hidden="true" />

                                            <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
                                                <div className="lg:col-span-7">
                                                    <div className="flex items-center gap-4">
                                                        {logo ? (
                                                            <img src={logo} alt="" className="h-14 w-14 rounded-2xl object-cover shadow-lg ring-1 ring-white/10" />
                                                        ) : (
                                                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-xl font-extrabold">{product.name.charAt(0)}</span>
                                                        )}
                                                        <div>
                                                            <h3 className="text-2xl font-extrabold tracking-tight">{product.name}</h3>
                                                            {product.status && (
                                                                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-emerald-300 uppercase ring-1 ring-emerald-400/30">
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                                    {product.status}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <p className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-balance sm:text-3xl">{product.tagline}</p>
                                                    {product.description && (
                                                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{product.description}</p>
                                                    )}

                                                    {features.length > 0 && (
                                                        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                            {features.map(feature => {
                                                                const Icon = featureIcon(feature.icon, Check);

                                                                return (
                                                                    <li key={feature.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                                                                            <Icon className="h-5 w-5" />
                                                                        </span>
                                                                        <div>
                                                                            <p className="text-sm font-bold">{feature.title}</p>
                                                                            <p className="mt-1 text-sm leading-relaxed text-zinc-400">{feature.body}</p>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )}

                                                    {(product.tech_stack?.length ?? 0) > 0 && (
                                                        <div className="mt-8">
                                                            <p className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">Built with</p>
                                                            <ul className="mt-3 flex flex-wrap gap-2">
                                                                {product.tech_stack!.map(tech => (
                                                                    <li key={tech} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">{tech}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {(product.primary_url || product.secondary_url) && (
                                                        <div className="mt-8 flex flex-wrap gap-3">
                                                            {product.primary_url && (
                                                                <a
                                                                    href={product.primary_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="button-shine group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
                                                                >
                                                                    {product.primary_label || 'Try it'}
                                                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                                </a>
                                                            )}
                                                            {product.secondary_url && (
                                                                <a
                                                                    href={product.secondary_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                                                                >
                                                                    {product.secondary_label || 'Learn more'}
                                                                    <ExternalLink className="h-4 w-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* A phone showing the product, drawn from its own features */}
                                                <div className="hidden items-center justify-center md:flex lg:col-span-5" aria-hidden="true">
                                                    <div className="relative w-[270px] rounded-[2.75rem] border-[10px] border-zinc-800 bg-zinc-900 p-4 pt-8 shadow-2xl ring-1 ring-white/10 lg:rotate-2">
                                                        <div className="absolute top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-950" />
                                                        <div className="flex items-center gap-2.5">
                                                            {logo && <img src={logo} alt="" className="h-8 w-8 rounded-xl" />}
                                                            <div>
                                                                <p className="text-[10px] font-semibold text-zinc-500">Good morning</p>
                                                                <p className="text-sm font-extrabold">{product.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 rounded-2xl bg-amber-500 p-3.5 text-white">
                                                            <p className="text-[9px] font-extrabold tracking-[0.12em] opacity-80">TODAY</p>
                                                            <p className="mt-1 text-sm leading-snug font-bold">{product.tagline}</p>
                                                        </div>
                                                        <div className="mt-3 space-y-2">
                                                            {features.slice(0, 4).map(feature => {
                                                                const Icon = featureIcon(feature.icon, Check);

                                                                return (
                                                                    <div key={feature.title} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
                                                                        <Icon className="h-4 w-4 shrink-0 text-amber-400" />
                                                                        <span className="truncate text-[11px] font-semibold text-zinc-200">{feature.title}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="mt-6 mb-2 flex justify-center">
                                                            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 shadow-[0_10px_30px_-8px] shadow-amber-500">
                                                                <span className="absolute inset-0 animate-ping rounded-full bg-amber-500/40 motion-reduce:animate-none" />
                                                                <ButtonIcon className="relative h-6 w-6" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Core Stack and Tools: ticker + skills grouped by category, in one place */}
                {showMarquee && (
                    <section id={showSkillsSection ? 'stack' : 'skills'} style={sectionStyle('tech_marquee')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('tech_marquee')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['tech_marquee']} title={getSection('tech_marquee').title} subtitle={getSection('tech_marquee').subtitle} />
                        </div>

                        {stackShowsTicker && (
                            <div className="group/ticker mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                                <div
                                    className="flex items-center gap-3 whitespace-nowrap pr-3 group-hover/ticker:[animation-play-state:paused]"
                                    style={{ width: 'max-content', animation: `portfolio-marquee ${stackTickerSpeed}s linear infinite` }}
                                >
                                    {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                                        <span
                                            key={`${item}-${idx}`}
                                            aria-hidden={idx >= marqueeItems.length}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 bg-surface text-sm font-semibold text-zinc-700 shadow-sm shrink-0"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {stackShowsCards && (
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
                                {(() => {
                                    const cards = skillGroups.map(([category, items]) => (
                                        <div key={category} className="w-full rounded-3xl border border-zinc-200 bg-surface p-6 shadow-sm sm:p-7">
                                            <div className="flex items-center gap-3">
                                                <h3 className="flex-1 text-lg font-extrabold tracking-tight text-zinc-900">{category}</h3>
                                                <span className="rounded-full bg-amber-50 px-2.5 py-1 font-display text-xs font-extrabold text-amber-600 tabular-nums">
                                                    {items.length}
                                                </span>
                                            </div>
                                            <ul className="mt-4 flex flex-wrap gap-2">
                                                {items.map(skill => (
                                                    <li key={skill.id} className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700">
                                                        {skill.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ));

                                    return (
                                        <>
                                            <div className="md:hidden">
                                                <Slider label="Skills by category">{cards}</Slider>
                                            </div>
                                            <div className="hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3">{cards}</div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </section>
                )}
                {/* Featured Projects Showcase */}
                {showProjects && (
                    <section id="projects" style={sectionStyle('projects')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('projects')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['projects']} title={getSection('projects').title} subtitle={getSection('projects').subtitle} />

                            {projectCategories.length > 2 && (
                                <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
                                    {projectCategories.map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setSelectedProjectCategory(cat)}
                                            aria-pressed={selectedProjectCategory === cat}
                                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${selectedProjectCategory === cat
                                                ? 'border-zinc-900 bg-zinc-900 text-surface shadow-sm'
                                                : 'border-zinc-200 bg-surface text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {(() => {
                                const active = filteredProjects.find(proj => proj.id === spotlightId) ?? filteredProjects[0];

                                if (!active) {
                                    return null;
                                }

                                const openProject = (event: React.MouseEvent, proj: Project) => {
                                    // Phones get the details in a drawer; larger screens open the full page
                                    if (window.matchMedia('(max-width: 1023px)').matches) {
                                        event.preventDefault();
                                        setActiveProject(proj);
                                    }
                                };
                                const activeTech = active.tech_stack || [];
                                const activeStory = plainText(active.content);

                                return (
                                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                                        {/* Index */}
                                        <ol className="lg:col-span-7">
                                            {filteredProjects.map((proj, idx) => {
                                                const selected = proj.id === active.id;
                                                const tech = proj.tech_stack || [];

                                                return (
                                                    <li key={proj.id} className="border-b border-zinc-200 first:border-t">
                                                        <Link
                                                            href={`/projects/${proj.slug}`}
                                                            onMouseEnter={() => setSpotlightId(proj.id)}
                                                            onFocus={() => setSpotlightId(proj.id)}
                                                            onClick={(event) => openProject(event, proj)}
                                                            className={`group relative flex items-center gap-4 py-5 pr-2 pl-1 transition-colors sm:gap-6 sm:py-6 ${selected ? 'lg:bg-zinc-50/80' : ''}`}
                                                        >
                                                            <span
                                                                className={`absolute inset-y-0 left-0 hidden w-[3px] rounded-full bg-gradient-to-b from-amber-400 to-amber-600 transition-opacity lg:block ${selected ? 'opacity-100' : 'opacity-0'}`}
                                                                aria-hidden="true"
                                                            />
                                                            <span className={`w-10 shrink-0 pl-3 font-display text-sm font-extrabold tabular-nums transition-colors ${selected ? 'text-amber-500' : 'text-zinc-400'}`}>
                                                                {String(idx + 1).padStart(2, '0')}
                                                            </span>
                                                            <span className="min-w-0 flex-1">
                                                                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold text-zinc-500">
                                                                    {proj.category && <span className="tracking-wider text-amber-600 uppercase">{proj.category}</span>}
                                                                    {proj.client_name && <span className="truncate">· {proj.client_name}</span>}
                                                                    {proj.is_featured && (
                                                                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                                                            <Star className="h-2.5 w-2.5 fill-current" />
                                                                            Featured
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                <span className={`mt-1.5 block text-xl leading-snug font-extrabold tracking-tight transition-colors sm:text-2xl ${selected ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'}`}>
                                                                    {proj.title}
                                                                </span>
                                                                {tech.length > 0 && (
                                                                    <span className="mt-2 block truncate font-mono text-xs text-zinc-500">{tech.join(' · ')}</span>
                                                                )}
                                                            </span>
                                                            <span
                                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${selected ? 'border-transparent bg-gradient-to-br from-amber-500 to-amber-600 text-white lg:-rotate-45' : 'border-zinc-200 text-zinc-400 group-hover:border-zinc-400 group-hover:text-zinc-700'}`}
                                                            >
                                                                <ArrowRight className="h-4 w-4" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ol>

                                        {/* Spotlight */}
                                        <aside className="hidden lg:col-span-5 lg:block">
                                            <div key={active.id} className="theme-fixed spotlight-in sticky top-28 overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                                                <div className="hero-orb pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full" aria-hidden="true" />
                                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" aria-hidden="true" />

                                                <div className="relative p-7 xl:p-8">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="font-display text-6xl leading-none font-extrabold tracking-tighter text-white/10 tabular-nums">
                                                            {String(filteredProjects.indexOf(active) + 1).padStart(2, '0')}
                                                        </span>
                                                        {active.is_proprietary && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                                                                <Lock className="h-3 w-3" />
                                                                NDA client work
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight xl:text-3xl">{active.title}</h3>
                                                    {active.client_name && <p className="mt-1.5 text-sm text-zinc-400">for {active.client_name}</p>}

                                                    <p className="mt-5 text-[15px] leading-relaxed text-zinc-300">{plainText(active.description)}</p>

                                                    {(active.challenge || active.outcome) ? (
                                                        <dl className="mt-6 grid grid-cols-1 gap-3">
                                                            {active.challenge && (
                                                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                                    <dt className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Challenge</dt>
                                                                    <dd className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-300">{plainText(active.challenge)}</dd>
                                                                </div>
                                                            )}
                                                            {active.outcome && (
                                                                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                                                                    <dt className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">Outcome</dt>
                                                                    <dd className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-200">{plainText(active.outcome)}</dd>
                                                                </div>
                                                            )}
                                                        </dl>
                                                    ) : activeStory && (
                                                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">What I built</p>
                                                            <p className="mt-1.5 line-clamp-5 text-sm leading-relaxed text-zinc-300">{activeStory}</p>
                                                        </div>
                                                    )}

                                                    {activeTech.length > 0 && (
                                                        <ul className="mt-6 flex flex-wrap gap-1.5">
                                                            {activeTech.map(item => (
                                                                <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200">{item}</li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-6">
                                                        <Link
                                                            href={`/projects/${active.slug}`}
                                                            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white"
                                                        >
                                                            View case study
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                        {active.live_url && (
                                                            <a href={active.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                                                                Live
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                        {!active.is_proprietary && active.github_url && (
                                                            <a href={active.github_url} target="_blank" rel="noopener noreferrer" aria-label="Source code" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10">
                                                                <Github className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                );
                            })()}
                        </div>
                    </section>
                )}
                {/* Case Studies */}
                {showCaseStudies && (
                    <section id="case-studies" style={sectionStyle('case_studies')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('case_studies')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['case_studies']} title={getSection('case_studies').title} subtitle={getSection('case_studies').subtitle} />

                            {(() => {
                                const cards = caseStudies.map((cs, idx) => {
                                    const image = firstImage(cs.image_url);
                                    const showImage = image !== null && !brokenCaseImages[cs.id];
                                    const stack = cs.tech_stack || [];

                                    return (
                                        <button
                                            type="button"
                                            key={cs.id}
                                            onClick={() => setActiveCaseStudy(cs)}
                                            className="group flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-surface text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                                        >
                                            {showImage ? (
                                                <img
                                                    src={image ?? undefined}
                                                    alt=""
                                                    loading="lazy"
                                                    className="aspect-[16/9] w-full border-b border-zinc-200 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                                                    onError={() => setBrokenCaseImages(prev => ({ ...prev, [cs.id]: true }))}
                                                />
                                            ) : (
                                                <div
                                                    className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border-b border-zinc-200 bg-zinc-100 p-5"
                                                    style={{ backgroundImage: 'radial-gradient(var(--color-zinc-300) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                                                >
                                                    {/* Default cover: a small diagram of the system, built from its tech stack */}
                                                    <div className="w-full max-w-[19rem] rounded-xl border border-zinc-200 bg-surface shadow-md">
                                                        <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2">
                                                            <span className="h-2 w-2 rounded-full bg-zinc-300"></span>
                                                            <span className="h-2 w-2 rounded-full bg-zinc-300"></span>
                                                            <span className="h-2 w-2 rounded-full bg-zinc-300"></span>
                                                            <span className="ml-2 truncate text-[10px] font-semibold text-zinc-400">case-study-{String(idx + 1).padStart(2, '0')}</span>
                                                        </div>
                                                        <div className="space-y-1.5 p-3">
                                                            {(stack.length > 0 ? stack.slice(0, 3) : ['Plan', 'Build', 'Ship']).map((step, stepIndex) => (
                                                                <div key={step} className="flex items-center gap-2">
                                                                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] font-bold ${stepIndex === 0 ? 'bg-amber-500 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                                                                        {stepIndex + 1}
                                                                    </span>
                                                                    <span className="truncate rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-semibold text-zinc-700">{step}</span>
                                                                    <span className="h-px flex-1 bg-zinc-200"></span>
                                                                    <Check className="h-3 w-3 shrink-0 text-amber-500" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold tracking-wider uppercase">
                                                    <span className="text-amber-600">Case study {String(idx + 1).padStart(2, '0')}</span>
                                                    {cs.duration && <span className="text-zinc-400">&bull; {cs.duration}</span>}
                                                </div>

                                                <h3 className="mt-2 text-lg font-extrabold leading-snug text-zinc-900 transition-colors group-hover:text-amber-600">{cs.title}</h3>
                                                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">{plainText(cs.summary)}</p>

                                                {cs.client_name && (
                                                    <p className="mt-4 text-xs text-zinc-500">
                                                        <span className="font-semibold text-zinc-700">Client:</span> {cs.client_name}
                                                    </p>
                                                )}

                                                {stack.length > 0 && (
                                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                                        {stack.slice(0, 4).map(tech => (
                                                            <span key={tech} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600">{tech}</span>
                                                        ))}
                                                        {stack.length > 4 && (
                                                            <span className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-zinc-400">+{stack.length - 4}</span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="min-h-5 flex-1"></div>
                                                <span className="flex items-center gap-1 border-t border-zinc-100 pt-4 text-xs font-bold text-amber-600">
                                                    <span>Read case study</span>
                                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </button>
                                    );
                                });

                                return (
                                    <>
                                        <div className="md:hidden">
                                            <Slider label={getSection('case_studies').title || 'Case studies'}>{cards}</Slider>
                                        </div>
                                        <div className="hidden grid-cols-2 gap-6 lg:grid-cols-3 md:grid">{cards}</div>
                                    </>
                                );
                            })()}
                        </div>
                    </section>
                )}

                {/* Professional Experience */}
                {showExperience && (
                    <section id="experience" style={sectionStyle('experience')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('experience')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['experience']} title={getSection('experience').title || 'Professional Experience'} subtitle={getSection('experience').subtitle} />

                            <ol className="relative space-y-6 md:space-y-8 md:before:absolute md:before:top-3 md:before:bottom-3 md:before:left-[11.5rem] md:before:w-px md:before:bg-gradient-to-b md:before:from-amber-400 md:before:via-zinc-300 md:before:to-transparent">
                                {experiences.map(exp => {
                                    const startYear = new Date(exp.start_date).getFullYear();
                                    const endDate = exp.is_current || !exp.end_date ? new Date() : new Date(exp.end_date);
                                    const months = Math.max(1, (endDate.getFullYear() - startYear) * 12 + endDate.getMonth() - new Date(exp.start_date).getMonth());
                                    const tenure = months >= 12 ? `${Math.floor(months / 12)} yr${months >= 24 ? 's' : ''}${months % 12 ? ` ${months % 12} mo` : ''}` : `${months} mo`;

                                    return (
                                        <li key={exp.id} className="relative md:grid md:grid-cols-[11.5rem_minmax(0,1fr)] md:gap-10">
                                            {/* When */}
                                            <div className="mb-3 flex items-center gap-3 md:mb-0 md:block md:pt-6 md:pr-8 md:text-right">
                                                <p className="font-display text-sm font-bold text-zinc-900">
                                                    {formatMonth(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatMonth(exp.end_date) : ''}
                                                </p>
                                                <p className="text-xs text-zinc-500 md:mt-1">{tenure}</p>
                                                <span className={`absolute top-7 left-[11.5rem] hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-surface md:block ${exp.is_current ? 'bg-amber-500 shadow-[0_0_0_4px_var(--aurora-glow)]' : 'bg-zinc-300'}`} aria-hidden="true" />
                                            </div>

                                            {/* Role */}
                                            <article className="rounded-3xl border border-zinc-200 bg-surface p-6 shadow-sm sm:p-8">
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h3 className="text-xl font-extrabold leading-snug tracking-tight text-zinc-900 sm:text-2xl">{exp.job_title}</h3>
                                                        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
                                                            <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-800">
                                                                <Briefcase className="h-4 w-4 text-amber-600" />
                                                                {exp.company}
                                                            </span>
                                                            {exp.location && (
                                                                <span className="inline-flex items-center gap-1.5">
                                                                    <MapPin className="h-4 w-4 text-zinc-400" />
                                                                    {exp.location}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {exp.is_current && (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                                                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                                            Current role
                                                        </span>
                                                    )}
                                                </div>

                                                {exp.description && (
                                                    <div className="mt-5 text-sm leading-relaxed sm:text-base">
                                                        {renderExpandableCardText(`experience-${exp.id}-description`, exp.description, 'text-zinc-600')}
                                                    </div>
                                                )}

                                                {exp.achievements && exp.achievements.length > 0 && (
                                                    <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-zinc-100 pt-6 lg:grid-cols-2">
                                                        {exp.achievements.map(achievement => (
                                                            <li key={achievement} className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
                                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                                                                    <Check className="h-3 w-3" />
                                                                </span>
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </article>
                                        </li>
                                    );
                                })}

                                {educations.map(edu => (
                                    <li key={`education-${edu.id}`} className="relative md:grid md:grid-cols-[11.5rem_minmax(0,1fr)] md:gap-10">
                                        <div className="mb-3 md:mb-0 md:pt-6 md:pr-8 md:text-right">
                                            <p className="font-display text-sm font-bold text-zinc-900">
                                                {new Date(edu.start_date).getFullYear()} — {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                                            </p>
                                            <p className="text-xs text-zinc-500 md:mt-1">Education</p>
                                            <span className="absolute top-7 left-[11.5rem] hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-surface bg-zinc-300 md:block" aria-hidden="true" />
                                        </div>
                                        <article className="flex items-center gap-4 rounded-3xl border border-zinc-200 bg-surface p-6 shadow-sm sm:p-7">
                                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                                <Award className="h-6 w-6" />
                                            </span>
                                            <div className="min-w-0">
                                                <h3 className="text-lg font-extrabold leading-snug text-zinc-900">
                                                    {edu.degree}
                                                    {edu.field_of_study ? `, ${edu.field_of_study}` : ''}
                                                </h3>
                                                <p className="mt-0.5 text-sm text-zinc-600">{edu.institution}</p>
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>
                )}

                {/* Strengths (self-assessment) */}
                {showExperienceMatrix && (
                    <section id="matrix" style={sectionStyle('experience_matrix')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('experience_matrix')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['experience_matrix']} title={getSection('experience_matrix').title} subtitle={getSection('experience_matrix').subtitle} />

                            <div className={`grid grid-cols-1 gap-5 ${strengthLevels.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
                                {strengthLevels.map((group, groupIndex) => (
                                    <div
                                        key={group.level}
                                        className={`rounded-3xl border p-6 sm:p-8 ${groupIndex === 0 ? 'theme-fixed border-zinc-800 bg-zinc-950 [&_h3]:text-white [&_li]:border-white/10 [&_li]:bg-white/5 [&_li]:text-zinc-100 [&_li]:shadow-none' : 'border-zinc-200 bg-surface'}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-extrabold text-zinc-900 sm:text-2xl">{group.level}</h3>
                                                <p className="mt-0.5 text-sm text-zinc-500">
                                                    {group.areas.length} {group.areas.length === 1 ? 'area' : 'areas'}
                                                </p>
                                            </div>
                                            <span className="relative h-2 w-24 overflow-hidden rounded-full bg-zinc-200" role="img" aria-label={`${group.stars} out of 5`}>
                                                <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${(group.stars / 5) * 100}%` }} />
                                            </span>
                                        </div>

                                        <ul className="mt-5 flex flex-wrap gap-2">
                                            {group.areas.map(area => (
                                                <li key={area} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-surface px-3.5 py-2 text-sm font-semibold text-zinc-800 shadow-sm">
                                                    <Check className={`h-4 w-4 shrink-0 ${groupIndex === 0 ? 'text-amber-400' : 'text-amber-600'}`} />
                                                    {area}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}


                {/* Production Experience Checklist */}
                {showProductionExperience && (
                    <section id="production" style={sectionStyle('production_experience')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('production_experience')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['production_experience']} title={getSection('production_experience').title} subtitle={getSection('production_experience').subtitle} />

                            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
                                {productionExperienceItems.map((item, idx) => (
                                    <div key={item} className="group flex items-start gap-4 bg-surface p-6 transition-colors hover:bg-amber-50/60 sm:p-7">
                                        <span className="font-display text-sm font-extrabold text-amber-600 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                                        <span className="text-[15px] leading-relaxed font-semibold text-zinc-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* API Integrations */}
                {showApiIntegrations && (
                    <section id="api" style={sectionStyle('api_integrations')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('api_integrations')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['api_integrations']} title={getSection('api_integrations').title} subtitle={getSection('api_integrations').subtitle} />

                            <Slider label={getSection('api_integrations').title || 'API integrations'}>
                                {apiShowcaseItems.map(api => {
                                    const slug = api.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    const parts = api.endpoint.trim().split(/\s+/);
                                    const hasMethod = parts.length > 1 && /^[A-Z]+$/.test(parts[0]);
                                    const method = hasMethod ? parts[0] : '';
                                    const path = hasMethod ? parts.slice(1).join(' ') : api.endpoint;
                                    const IconComponent = (LucideIcons as any)[api.icon] || LucideIcons.Plug;
                                    const hasDetails = Boolean(api.detailed_content);
                                    const Card: any = hasDetails ? Link : 'div';

                                    return (
                                        <Card
                                            key={api.name}
                                            {...(hasDetails ? { href: `/showcase/${slug}` } : {})}
                                            className="group flex w-full flex-col rounded-2xl border border-zinc-200 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* The service's own logo, drawn in one colour so every card matches */}
                                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-surface">
                                                    {api.image ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="h-7 w-7 bg-surface"
                                                            style={{
                                                                maskImage: `url(/storage/${api.image})`,
                                                                WebkitMaskImage: `url(/storage/${api.image})`,
                                                                maskSize: 'contain',
                                                                WebkitMaskSize: 'contain',
                                                                maskRepeat: 'no-repeat',
                                                                WebkitMaskRepeat: 'no-repeat',
                                                                maskPosition: 'center',
                                                                WebkitMaskPosition: 'center',
                                                            }}
                                                        ></span>
                                                    ) : (
                                                        <IconComponent className="h-7 w-7" />
                                                    )}
                                                </span>
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-lg font-bold text-zinc-900 transition-colors group-hover:text-amber-600">{api.name}</h3>
                                                    {method && <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">{method} request</span>}
                                                </div>
                                            </div>

                                            <p className="mt-5 text-sm leading-relaxed text-zinc-600">{plainText(api.description)}</p>

                                            <div className="min-h-5 flex-1"></div>
                                            <code className="block truncate rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[11px] text-zinc-600">
                                                {path.replace(/^https?:\/\//, '')}
                                            </code>

                                            {hasDetails && (
                                                <span className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600">
                                                    How to use it
                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </Card>
                                    );
                                })}
                            </Slider>
                        </div>
                    </section>
                )}



                {/* Technology Timeline */}
                {showTimeline && !showSpecializations && (
                    <Timeline
                        timelineItems={timelineItems}
                        title={getSection('timeline').title || 'Technology Timeline'}
                        subtitle={getSection('timeline').subtitle}
                        className={getSectionVisibilityClasses('timeline')}
                        style={sectionStyle('timeline')}
                    />
                )}

                {/* What I Build, with the stack timeline beside it */}
                {showSpecializations && (
                    <section id="specializations" style={sectionStyle('specializations')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('specializations')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['specializations']} title={getSection('specializations').title} subtitle={getSection('specializations').subtitle} />

                            <div className={`grid grid-cols-1 gap-6 ${showTimeline ? 'lg:grid-cols-12 lg:gap-8' : ''}`}>
                                <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${showTimeline ? 'lg:col-span-7' : 'lg:grid-cols-3'}`}>
                                    {specializationItems.map((item, idx) => {
                                        const fallbackIcons = [Activity, LinkIcon, Server, Sparkles];
                                        const IconComponent = (item.icon && (LucideIcons as any)[item.icon]) || fallbackIcons[idx % fallbackIcons.length];

                                        return (
                                            <article key={item.title} className="group flex flex-col rounded-3xl border border-zinc-200 bg-surface p-6 shadow-sm sm:p-7">
                                                <div className="flex items-center justify-between">
                                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-[0_10px_24px_-10px_var(--color-amber-600)] transition-transform duration-300 group-hover:-rotate-6">
                                                        <IconComponent className="h-6 w-6" />
                                                    </span>
                                                    <span className="font-display text-sm font-extrabold text-zinc-300 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                                                </div>
                                                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-zinc-900">{item.title}</h3>
                                                <ul className="mt-3 space-y-2">
                                                    {item.points.map(point => (
                                                        <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600">
                                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </article>
                                        );
                                    })}
                                </div>

                                {showTimeline && (
                                    <div id="timeline" className="theme-fixed relative self-start overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 lg:sticky lg:top-28 lg:col-span-5 [&_h3]:text-white [&_h4]:text-white [&_p]:text-zinc-400">
                                        <h3 className="text-lg font-extrabold text-zinc-900">{getSection('timeline').title || 'How my stack has grown'}</h3>
                                        {getSection('timeline').subtitle && <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{getSection('timeline').subtitle}</p>}

                                        <ol className="relative mt-6 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[1.4rem] before:w-px before:bg-gradient-to-b before:from-amber-500 before:to-zinc-800">
                                            {timelineItems.map(step => (
                                                <li key={`${step.year}-${step.title}`} className="relative flex gap-4">
                                                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-500/50 bg-zinc-900 text-xs font-extrabold text-amber-400">
                                                        {step.year}
                                                    </span>
                                                    <div className="min-w-0 pt-0.5">
                                                        <h4 className="text-sm font-bold text-zinc-900 sm:text-base">{step.title}</h4>
                                                        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.description}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Skills & Tech Stack (only when Core Stack is not already listing them) */}
                {showSkillsSection && (
                    <section id="skills" style={sectionStyle('skills')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('skills')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['skills']} title={getSection('skills').title} subtitle={getSection('skills').subtitle} />

                            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
                                {skillGroups.map(([cat, catSkills]) => {
                                    return (
                                        <div key={cat} className="w-11/12 shrink-0 snap-center md:w-full border border-zinc-200 p-6 rounded-2xl bg-zinc-50 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                            <h3 className="font-bold text-lg mb-4 border-b border-zinc-200 pb-3 text-amber-600">{cat}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {catSkills.map(skill => (
                                                    <div
                                                        key={skill.id}
                                                        className="bg-surface border border-zinc-200 py-1.5 px-3 rounded-lg text-[11px] font-bold text-zinc-700 flex items-center space-x-2 shadow-sm hover:shadow-md hover:border-amber-200 hover:text-amber-600 transition-all cursor-default"
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

                {/* Code Snippets */}
                {showSnippets && (
                    <section id="snippets" style={sectionStyle('snippets')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('snippets')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['snippets']} title={getSection('snippets').title} subtitle={getSection('snippets').subtitle} />

                            <SnippetExplorer snippets={codeSnippets} options={snippetOptions} />
                        </div>
                    </section>
                )}

                {/* Developer Toolkit */}
                {showResources && (
                    <section id="toolkit" style={sectionStyle('resources')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('resources')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['resources']} title={getSection('resources').title || 'Developer Toolkit'} subtitle={getSection('resources').subtitle} />

                            <div className="mb-8 flex gap-2 overflow-x-auto pb-1 hide-scrollbar sm:flex-wrap sm:overflow-visible">
                                {resourceCategories.map(cat => (
                                    <button
                                        type="button"
                                        key={cat}
                                        onClick={() => setSelectedResourceCategory(cat)}
                                        className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${selectedResourceCategory === cat
                                            ? 'border-zinc-900 bg-zinc-900 text-surface shadow-sm'
                                            : 'border-zinc-200 bg-surface text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <Slider key={selectedResourceCategory} label={getSection('resources').title || 'Developer toolkit'}>
                                {filteredResources.map(res => {
                                    let host = res.url;

                                    try {
                                        host = new URL(res.url).hostname.replace(/^www\./, '');
                                    } catch {
                                        // keep the raw value if it is not a full URL
                                    }

                                    return (
                                        <article key={res.id} className="flex w-full flex-col rounded-3xl border border-zinc-200 bg-surface p-6 shadow-sm sm:p-7">
                                            <div className="flex items-center gap-4">
                                                {res.image_url ? (
                                                    <img src={res.image_url} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-xl border border-zinc-200 object-cover" />
                                                ) : (
                                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 font-display text-xl font-extrabold text-amber-600">
                                                        {res.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                                <div className="min-w-0">
                                                    <span className="block text-[10px] font-bold tracking-wider text-amber-600 uppercase">{res.category}</span>
                                                    <h3 className="truncate text-lg font-bold text-zinc-900">{res.name}</h3>
                                                </div>
                                            </div>

                                            <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-zinc-600">{plainText(res.description)}</p>

                                            <div className="min-h-5 flex-1"></div>
                                            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 pt-4">
                                                <a
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold text-amber-600 hover:underline"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">{host}</span>
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveResource(res)}
                                                    className="shrink-0 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:border-amber-300 hover:text-amber-600"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </Slider>
                        </div>
                    </section>
                )}

                {/* Articles */}
                {showBlog && (
                    <section id="blog" style={sectionStyle('blog')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('blog')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['blog']} title={getSection('blog').title} subtitle={getSection('blog').subtitle} />

                            {(() => {
                                const renderPost = (post: BlogPost) => (
                                    <Link
                                        key={post.id}
                                        href={`/insights/${post.slug}`}
                                        className={`group flex w-full flex-col overflow-hidden rounded-2xl border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isNewPost(post) ? 'border-amber-300 ring-2 ring-amber-400/30' : 'border-zinc-200 hover:border-amber-300'}`}
                                    >
                                        <div className="relative overflow-hidden">
                                            {post.cover_image_url ? (
                                                <img src={post.cover_image_url} alt="" loading="lazy" className="aspect-[1200/630] w-full border-b border-zinc-200 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none" />
                                            ) : (
                                                <div className="flex aspect-[1200/630] w-full items-center justify-center border-b border-zinc-200 bg-gradient-to-br from-amber-50 via-zinc-50 to-zinc-100">
                                                    <FileText className="h-10 w-10 text-amber-300" />
                                                </div>
                                            )}
                                            {isNewPost(post) && <span className="absolute top-3 right-3">{newBadge}</span>}
                                        </div>

                                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                                            <p className="text-xs text-zinc-400">
                                                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                                {' '}&bull; {postReadTime(post)} min read
                                                {site.show_view_counts !== false && (post.views_count ?? 0) > 0 && (
                                                    <> &bull; {new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(post.views_count ?? 0)} views</>
                                                )}
                                            </p>
                                            <h3 className="mt-2 text-lg font-extrabold leading-snug text-zinc-900 transition-colors group-hover:text-amber-600">{post.title}</h3>
                                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">{post.summary}</p>

                                            <div className="min-h-4 flex-1"></div>
                                            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 pt-4">
                                                <div className="flex min-w-0 flex-wrap gap-1.5">
                                                    {post.medium_url && (
                                                        <span className="rounded-md bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-white">On Medium</span>
                                                    )}
                                                    {post.tags?.slice(0, post.medium_url ? 1 : 2).map(tag => (
                                                        <span key={tag} className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">{tag}</span>
                                                    ))}
                                                </div>
                                                <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-600">
                                                    Read
                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );

                                if (blogPosts.length === 0) {
                                    return null;
                                }

                                return (
                                    <>
                                        <div className="md:hidden">
                                            <Slider label={getSection('blog').title || 'Articles'}>{blogPosts.map(renderPost)}</Slider>
                                        </div>
                                        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
                                            {(showAllPosts ? blogPosts : blogPosts.slice(0, 3)).map(renderPost)}
                                        </div>
                                    </>
                                );
                            })()}

                            {blogPosts.length > 3 && (
                                <div className="mt-8 hidden justify-center md:flex">
                                    <button
                                        type="button"
                                        onClick={() => setShowAllPosts(!showAllPosts)}
                                        className="rounded-xl border border-zinc-300 bg-surface px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-amber-300 hover:text-amber-600"
                                    >
                                        {showAllPosts ? 'Show fewer' : `Show all ${blogPosts.length} articles`}
                                    </button>
                                </div>
                            )}

                            {/* No Medium stories yet: still invite visitors to follow */}
                            {mediumPosts.length === 0 && site.contact.medium && (
                                <div className="mt-10 flex justify-center">
                                    <a
                                        href={site.contact.medium}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                    >
                                        <MediumIcon className="h-4 w-4" />
                                        Follow me on Medium
                                    </a>
                                </div>
                            )}

                            {/* Latest stories from Medium (fetched from the public RSS feed) */}
                            {mediumPosts.length > 0 && (
                                <div className={blogPosts.length > 0 ? 'mt-12 border-t border-zinc-200 pt-10 md:mt-14' : ''}>
                                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-extrabold tracking-tight text-zinc-900 sm:text-xl">More on Medium</h3>
                                            <p className="mt-1 text-sm text-zinc-500">Stories I have published on Medium.</p>
                                        </div>
                                        {site.contact.medium && (
                                            <a
                                                href={site.contact.medium}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                            >
                                                Follow on Medium
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {mediumPosts.slice(0, 5).map((post) => (
                                            <a
                                                key={post.url}
                                                href={post.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`group relative flex gap-4 rounded-2xl border bg-surface p-4 shadow-sm transition-colors hover:border-amber-300 ${post.is_new ? 'border-amber-300 ring-2 ring-amber-400/30' : 'border-zinc-200'}`}
                                            >
                                                {post.is_new && <span className="absolute -top-2.5 right-3">{newBadge}</span>}
                                                {post.image && (
                                                    <img src={post.image} alt="" loading="lazy" className="h-20 w-20 shrink-0 rounded-xl border border-zinc-200 object-cover" />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs text-zinc-400">
                                                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Medium'}
                                                    </p>
                                                    <h4 className="mt-1 line-clamp-2 text-sm font-extrabold leading-snug text-zinc-900 transition-colors group-hover:text-amber-600">{post.title}</h4>
                                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                                                        Read on Medium
                                                        <ExternalLink className="h-3 w-3" />
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* GitHub repositories (live from the GitHub API) */}
                {showGithub && (
                    <section id="github" style={sectionStyle('github')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('github')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['github']} title={getSection('github').title || 'GitHub Repositories'} subtitle={getSection('github').subtitle} />

                            <Slider label={getSection('github').title || 'GitHub repositories'}>
                                {githubRepos.map(repo => (
                                    <a
                                        key={repo.name}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex w-full flex-col rounded-2xl border border-zinc-200 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-surface">
                                                <Github className="h-5 w-5" />
                                            </span>
                                            <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3.5 w-3.5" />
                                                    {repo.stars}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <GitBranch className="h-3.5 w-3.5" />
                                                    {repo.forks}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="mt-5 break-words text-lg font-bold text-zinc-900 transition-colors group-hover:text-amber-600">{repo.name}</h3>
                                        {repo.description && <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-zinc-600">{repo.description}</p>}

                                        <div className="min-h-5 flex-1"></div>
                                        <div className="flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 text-xs">
                                            <span className="flex items-center gap-2 text-zinc-500">
                                                {repo.language && (
                                                    <span className="rounded-md bg-amber-50 px-2 py-0.5 font-bold text-amber-700">{repo.language}</span>
                                                )}
                                                {repo.updated_at && <span>Updated {formatMonth(repo.updated_at)}</span>}
                                            </span>
                                            <span className="flex shrink-0 items-center gap-1 font-bold text-amber-600">
                                                View code
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </Slider>
                        </div>
                    </section>
                )}

                {/* Certifications with credentials validation */}
                {showCertifications && (
                    <section id="certifications" style={sectionStyle('certifications')} className={`py-20 md:py-28 bg-zinc-50 border-y border-zinc-200 ${getSectionVisibilityClasses('certifications')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <SectionHeader eyebrow={SECTION_EYEBROWS['certifications']} title={getSection('certifications').title} subtitle={getSection('certifications').subtitle} />

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
                                                        <span key={sIdx} className="text-[10px] bg-surface border border-zinc-200 text-zinc-600 py-0.5 px-2 rounded-md font-semibold">
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



                {/* Contact */}
                {getSection('contact').is_visible && (
                    <section id="contact" style={sectionStyle('contact')} className={`py-20 md:py-28 bg-surface border-y border-zinc-200 ${getSectionVisibilityClasses('contact')}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className={`grid overflow-hidden rounded-[2rem] border border-zinc-200 bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.3)] ${showContactForm ? 'lg:grid-cols-5' : ''}`}>
                                {/* Who you are writing to */}
                                <div className={`theme-fixed relative overflow-hidden bg-zinc-950 p-7 text-zinc-300 sm:p-10 ${showContactForm ? 'order-2 lg:order-1 lg:col-span-2' : ''}`}>
                                    <div className="hero-orb pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full" aria-hidden="true" />
                                    <div className="relative">
                                    <p className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
                                        <span className="h-px w-8 bg-gradient-to-r from-amber-400 to-transparent" aria-hidden="true" />
                                        Contact
                                    </p>
                                    <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">{getSection('contact').title}</h2>
                                    {getSection('contact').subtitle && (
                                        <p className="mt-4 max-w-md leading-relaxed text-zinc-400">{getSection('contact').subtitle}</p>
                                    )}

                                    <ul className="mt-8 space-y-5 text-sm">
                                        {site.contact.email && (
                                            <li className="flex items-center gap-4">
                                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-400">
                                                    <Mail className="h-5 w-5" />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Email</span>
                                                    <a href={`mailto:${site.contact.email}`} className="block break-all text-base font-semibold text-white hover:text-amber-400">{site.contact.email}</a>
                                                </span>
                                            </li>
                                        )}
                                        {site.contact.phone && (
                                            <li className="flex items-center gap-4">
                                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-400">
                                                    <Phone className="h-5 w-5" />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Phone</span>
                                                    <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`} className="block text-base font-semibold text-white hover:text-amber-400">{site.contact.phone}</a>
                                                </span>
                                            </li>
                                        )}
                                        {site.contact.location && (
                                            <li className="flex items-center gap-4">
                                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-400">
                                                    <MapPin className="h-5 w-5" />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Based in</span>
                                                    <span className="block text-base font-semibold text-white">{site.contact.location}</span>
                                                </span>
                                            </li>
                                        )}
                                    </ul>

                                    {site.show_availability && (
                                        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>
                                            {site.availability_status} &bull; replies in {site.response_time}
                                        </p>
                                    )}

                                    {Object.values(contactSocial).some(Boolean) && (
                                        <div className="mt-8 flex gap-3 border-t border-zinc-800 pt-6">
                                            {contactSocial.github && (
                                                <a href={contactSocial.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white">
                                                    <Github className="h-5 w-5" />
                                                </a>
                                            )}
                                            {contactSocial.linkedin && (
                                                <a href={contactSocial.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white">
                                                    <Linkedin className="h-5 w-5" />
                                                </a>
                                            )}
                                            {contactSocial.twitter && (
                                                <a href={contactSocial.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white">
                                                    <XIcon />
                                                </a>
                                            )}
                                            {contactSocial.instagram && (
                                                <a href={contactSocial.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white">
                                                    <Instagram className="h-5 w-5" />
                                                </a>
                                            )}
                                            {contactSocial.medium && (
                                                <a href={contactSocial.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white">
                                                    <MediumIcon />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                    </div>
                                </div>

                                {/* The form */}
                                {showContactForm && (
                                    <div className="order-1 bg-surface p-6 sm:p-10 lg:order-2 lg:col-span-3">
                                        {contactSuccess ? (
                                            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white">
                                                    <Check className="h-8 w-8" />
                                                </span>
                                                <h3 className="mt-6 text-2xl font-extrabold text-zinc-900">Message sent</h3>
                                                <p className="mt-2 max-w-sm text-zinc-600">Thank you for getting in touch. I will reply to your email as soon as I can.</p>
                                                <button
                                                    type="button"
                                                    onClick={() => setContactSuccess(false)}
                                                    className="mt-6 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-amber-300 hover:text-amber-600"
                                                >
                                                    Send another message
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>
                                                <h3 className="text-xl font-extrabold text-zinc-900">Tell me about your project</h3>

                                                {/* Hidden from people; bots that fill it are ignored */}
                                                <input
                                                    type="text"
                                                    name="website"
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    value={contactForm.website}
                                                    onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
                                                    className="hidden"
                                                    aria-hidden="true"
                                                />

                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <label className="block">
                                                        <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Full name</span>
                                                        <input
                                                            type="text"
                                                            required
                                                            autoComplete="name"
                                                            value={contactForm.name}
                                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                            placeholder="Your name"
                                                            className={contactFieldClass(contactErrors.name)}
                                                        />
                                                        {contactErrors.name && <span className="mt-1 block text-xs text-red-600">{contactErrors.name}</span>}
                                                    </label>
                                                    <label className="block">
                                                        <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Email address</span>
                                                        <input
                                                            type="email"
                                                            required
                                                            autoComplete="email"
                                                            value={contactForm.email}
                                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                            placeholder="you@company.com"
                                                            className={contactFieldClass(contactErrors.email)}
                                                        />
                                                        {contactErrors.email && <span className="mt-1 block text-xs text-red-600">{contactErrors.email}</span>}
                                                    </label>
                                                </div>

                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <label className="block">
                                                        <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Company <span className="font-normal text-zinc-400">(optional)</span></span>
                                                        <input
                                                            type="text"
                                                            autoComplete="organization"
                                                            value={contactForm.company}
                                                            onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                                                            placeholder="Company name"
                                                            className={contactFieldClass(contactErrors.company)}
                                                        />
                                                    </label>
                                                    {contactProjectTypes.length > 0 && (
                                                        <label className="block">
                                                            <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Project type</span>
                                                            <select
                                                                value={contactForm.projectType}
                                                                onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                                                                className={contactFieldClass(contactErrors.project_type)}
                                                            >
                                                                {contactProjectTypes.map(type => (
                                                                    <option key={type}>{type}</option>
                                                                ))}
                                                            </select>
                                                        </label>
                                                    )}
                                                </div>

                                                <label className="block">
                                                    <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Project details</span>
                                                    <textarea
                                                        required
                                                        value={contactForm.message}
                                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                        placeholder="What do you need built, and by when?"
                                                        rows={5}
                                                        className={`${contactFieldClass(contactErrors.message)} resize-none`}
                                                    ></textarea>
                                                    {contactErrors.message && <span className="mt-1 block text-xs text-red-600">{contactErrors.message}</span>}
                                                </label>

                                                <button
                                                    type="submit"
                                                    disabled={contactSending}
                                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    <Send className="h-4 w-4" />
                                                    {contactSending ? 'Sending…' : 'Send message'}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                </main>

                {/* ================= MODALS ================= */}

                {/* Project details drawer (phones) */}
                {activeProject && (
                    <Sheet open onClose={() => setActiveProject(null)} label={activeProject.title}>
                        <div className="space-y-1.5 pr-10">
                            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{activeProject.category}</span>
                            <h3 className="text-xl font-extrabold leading-snug text-zinc-900">{activeProject.title}</h3>
                            {activeProject.client_name && <p className="text-sm font-medium text-zinc-500">Client: {activeProject.client_name}</p>}
                        </div>

                        <ArticleContent html={activeProject.description} className="!text-[0.95rem]" />

                        {activeProject.challenge && (
                            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                <h4 className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-zinc-800 uppercase">
                                    <Target className="h-4 w-4" />
                                    The challenge
                                </h4>
                                <ArticleContent html={activeProject.challenge} className="mt-3 !text-sm" />
                            </div>
                        )}

                        {activeProject.outcome && (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                <h4 className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-amber-700 uppercase">
                                    <Check className="h-4 w-4" />
                                    The outcome
                                </h4>
                                <ArticleContent html={activeProject.outcome} className="mt-3 !text-sm" />
                            </div>
                        )}

                        {activeProject.tech_stack && activeProject.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {activeProject.tech_stack.map(tech => (
                                    <span key={tech} className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700">{tech}</span>
                                ))}
                            </div>
                        )}

                        <Link
                            href={`/projects/${activeProject.slug}`}
                            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm"
                        >
                            Open the full project page
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Sheet>
                )}

                {/* Case Study Detail Modal */}
                {activeCaseStudy && (
                    <Sheet open onClose={() => setActiveCaseStudy(null)} label={activeCaseStudy.title} size="lg">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">CASE STUDY ANALYSIS</span>
                                <h3 className="text-2xl font-extrabold">{activeCaseStudy.title}</h3>
                                <div className="text-sm font-medium text-zinc-500">Client: {activeCaseStudy.client_name} &bull; Duration: {activeCaseStudy.duration}</div>
                            </div>

                            <div className="space-y-6 text-sm">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                            <FileText className="w-4 h-4 text-amber-600" />
                                        </div>
                                        Summary Overview
                                    </h3>
                                    <ArticleContent html={activeCaseStudy.summary} className="!text-[0.95rem]" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                            <Target className="w-4 h-4 text-red-600" />
                                        </div>
                                        The Challenge
                                    </h3>
                                    <ArticleContent html={activeCaseStudy.challenge} className="!text-[0.95rem]" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            <Sparkles className="w-4 h-4 text-blue-600" />
                                        </div>
                                        The Solution
                                    </h3>
                                    <ArticleContent html={activeCaseStudy.solution} className="!text-[0.95rem]" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                            <Activity className="w-4 h-4 text-amber-600" />
                                        </div>
                                        The Results
                                    </h3>
                                    <ArticleContent html={activeCaseStudy.results} className="!text-[0.95rem]" />
                                </div>

                                {activeCaseStudy.tech_stack && (
                                    <div className="space-y-2 pt-2">
                                        <h4 className="font-bold text-xs text-zinc-400 uppercase">Architecture Stack</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeCaseStudy.tech_stack.map((tech, idx) => (
                                                <span key={idx} className="text-xs bg-zinc-200 py-1.5 px-3 rounded-lg font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                    </Sheet>
                )}

                {/* Resource Detail Modal */}
                {activeResource && (
                    <Sheet open onClose={() => setActiveResource(null)} label={activeResource.name} size="md">
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
                    </Sheet>
                )}
            </SiteLayout>
        </>
    );
}
