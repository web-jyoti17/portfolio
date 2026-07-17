import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
  BookOpen,
  Link as LinkIcon,
  Lock,
  Check,
  Copy,
  Plus,
  Star,
  Sun,
  Moon,
  Download,
  Code,
  X,
  Search,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Info,
  Send,
  Play,
  Coffee,
  Sparkles,
  Server,
  Database,
  Settings,
  Shield,
  Users,
  GitBranch,
  MessageSquare,
  Activity,
  Heart,
  CornerDownLeft
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image_path: string | null;
  github_url: string | null;
  live_url: string | null;
  tech_stack: string[] | null;
  is_featured: boolean;
  is_proprietary: boolean;
  category: string;
  client_name: string | null;
  completion_date: string | null;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
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
  image_path: string | null;
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
}

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
}: PortfolioProps) {
  // Theme management - forced light mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Helper to retrieve section configuration safely
  const getSection = (key: string): PortfolioSection => {
    return sections.find(s => s.key === key) || {
      id: 0,
      key,
      title: '',
      subtitle: null,
      is_visible: true,
      content: null,
    };
  };

  // Snippets slider state
  const [snippetSliderIndex, setSnippetSliderIndex] = useState<number>(0);
  const [resourceSliderIndex, setResourceSliderIndex] = useState<number>(0);
  const [blogSliderIndex, setBlogSliderIndex] = useState<number>(0);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Project filtering
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');
  const projectCategories = ['All', 'Laravel', 'React', 'Shopify', 'AI', 'WordPress'];

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

  const snippetCategories = ['All', 'Backend', 'Frontend', 'CMS', 'Tools', 'Integrations'];

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
  const resourceCategories = ['All', 'Laravel Packages', 'VS Code Extensions', 'AI Tools', 'API Testing Tools', 'Deployment Tools', 'Design Resources'];

  const filteredResources = selectedResourceCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedResourceCategory);

  // Detail Modal States
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  // Project detail modal tab state
  const [activeProjectTab, setActiveProjectTab] = useState<'overview' | 'architecture' | 'technical'>('overview');

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
        output = 'Lakshmi - Full Stack Web Developer. Specializes in Laravel, React, Next.js, and Shopify configurations. 3+ years experience, Ludhiana, India.';
        break;
      case 'skills':
        output = 'Backend: Laravel, PHP, REST API, GraphQL, Redis, MySQL, Postgres\nFrontend: React, Next.js, TailwindCSS\nCloud & DevOps: AWS, Google Cloud, Docker, Actions';
        break;
      case 'projects':
        output = 'Featured: CMC Telehealth Platform, DeployMeta Custom ERP, Orvella Studio custom theme, TimeToFurnish Store.';
        break;
      case 'contact':
        output = 'Email: laxmi20024@gmail.com\nPhone: +91 6280788413\nGitHub: github.com/CodeSproutX';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'system':
        output = 'OS: LakshmiOS v1.0.0\nUptime: 3 Years Web Development\nStatus: Available for Freelance';
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
      reply = "Lakshmi has 3+ years of professional full-stack web development experience, working on SaaS applications, telehealth platforms, and e-commerce configurations.";
    } else if (lowercaseQuery.includes('stack') || lowercaseQuery.includes('skill') || lowercaseQuery.includes('technologies')) {
      reply = "Her core stack is PHP/Laravel (including Filament panels) on the backend and React/Next.js/Inertia.js on the frontend, using PostgreSQL/MySQL and Docker/AWS for hosting.";
    } else if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('email') || lowercaseQuery.includes('hire')) {
      reply = "You can email her at laxmi20024@gmail.com, call her at +91 6280788413, or use the contact form at the bottom of this page!";
    } else if (lowercaseQuery.includes('project') || lowercaseQuery.includes('built')) {
      reply = "Some major projects she built include CMC Telehealth Platform, DeployMeta Custom ERP, Orvella Studio custom Shopify theme, and Lisbon Star WordPress portal.";
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
    budget: '$1,000 - $5,000',
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

  return (
    <>
      <Head>
        <title>Lakshmi | Enterprise Web & Systems Developer</title>
        <meta name="description" content="Senior Full Stack Developer portfolio of Lakshmi — specializing in Laravel, Docker VPS, Cloudflare, API integrations (Stripe, Google, Whereby, Bokun), and production-grade deployment." />
      </Head>
      <Toaster position="top-right" theme="light" />

      <div className="min-h-screen font-sans bg-white text-zinc-800 transition-colors duration-300">

        {/* Header */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#" className="text-xl font-bold tracking-tight text-amber-600">
              Lakshmi<span className="text-zinc-400">.dev</span>
            </a>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-650">
              {getSection('banner').is_visible && <a href="#about" className="hover:text-amber-600 transition-colors">About</a>}
              {getSection('experience').is_visible && <a href="#experience" className="hover:text-amber-600 transition-colors">Experience</a>}
              {getSection('projects').is_visible && <a href="#projects" className="hover:text-amber-600 transition-colors">Projects</a>}
              {getSection('skills').is_visible && <a href="#skills" className="hover:text-amber-600 transition-colors">Skills</a>}
              {getSection('snippets').is_visible && <a href="#snippets" className="hover:text-amber-600 transition-colors">Snippets</a>}
              {getSection('blog').is_visible && <a href="#blog" className="hover:text-amber-600 transition-colors">Blog</a>}
              {getSection('resources').is_visible && <a href="#toolkit" className="hover:text-amber-600 transition-colors">Toolkit</a>}
            </nav>

            <div className="flex items-center space-x-4">
              {resumes.length > 0 && (
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

        {/* Hero Section */}
        {getSection('banner').is_visible && (
          <section id="about" className="relative py-24 lg:py-32 bg-white">
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
                  {getSection('banner').title || "Full Stack Web Developer"}
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-amber-600">
                  {getSection('banner').subtitle || "Laravel • React • Docker • Cloudflare • Stripe"}
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-2xl">
                  {getSection('banner').content?.hero_subtitle || "I build scalable web applications, production-ready VPS setups, custom admin panels, and webhook-driven integrations — from planning to live deployment."}
                </p>

                {/* Hero Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 max-w-xl border-y border-zinc-100">
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">3+</div>
                    <div className="text-xs text-zinc-500">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">20+</div>
                    <div className="text-xs text-zinc-500">Projects Shipped</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">10+</div>
                    <div className="text-xs text-zinc-500">APIs Integrated</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#projects"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-sm flex items-center space-x-2 text-sm"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="border border-zinc-200 hover:border-amber-200 hover:bg-amber-50 font-medium py-3 px-6 rounded-xl transition-all text-sm text-zinc-700"
                  >
                    Hire Me / Book a Call
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

              {/* Social Proof (Featured Companies) */}
              <section className="py-12 bg-zinc-50 border-y border-zinc-200">
                <div className="max-w-7xl mx-auto px-6">
                  <h3 className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">TRUSTED BY INNOVATIVE COMPANIES</h3>
                  <div className="flex flex-wrap items-center justify-center gap-12 opacity-75">
                    <div className="flex items-center space-x-2 text-zinc-500 font-bold text-lg">
                      <Code className="w-5 h-5 text-amber-600" />
                      <span>QuickCoderX</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500 font-bold text-lg">
                      <Server className="w-5 h-5 text-amber-600" />
                      <span>DeployMeta</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500 font-bold text-lg">
                      <Activity className="w-5 h-5 text-amber-600" />
                      <span>CMC Telehealth</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500 font-bold text-lg">
                      <Heart className="w-5 h-5 text-amber-600" />
                      <span>TimeToFurnish</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500 font-bold text-lg">
                      <Star className="w-5 h-5 text-amber-600" />
                      <span>Lisbon Star</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500 font-bold text-lg">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span>Orvella Studio</span>
                    </div>
                  </div>
                </div>
              </section>
              {/* Featured Projects Showcase */}
              {getSection('projects').is_visible && (
                <section id="projects" className="py-24 bg-white">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('projects').title}</h2>
                      {getSection('projects').subtitle && (
                        <p className="text-sm text-zinc-500 mt-2">{getSection('projects').subtitle}</p>
                      )}
                      <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                      {projectCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedProjectCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${selectedProjectCategory === cat
                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                            : 'border-zinc-200 bg-white text-zinc-650 hover:border-amber-200 hover:text-amber-600'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="space-y-16">
                      {filteredProjects.map(proj => (
                        <div
                          key={proj.id}
                          className="border border-zinc-200 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 p-8"
                        >
                          {/* Mock visual preview */}
                          <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex flex-col justify-between min-h-[300px]">
                            <div>
                              <div className="flex justify-between items-center mb-4">
                                <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold py-1 px-2.5 rounded-lg border border-amber-200">
                                  {proj.category}
                                </span>
                                {proj.is_proprietary ? (
                                  <div className="flex items-center space-x-1.5 text-zinc-450 text-xs font-semibold">
                                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                                    <span>NDA Client Work</span>
                                  </div>
                                ) : (
                                  <span className="text-amber-600 text-xs font-semibold">Open Source Code</span>
                                )}
                              </div>

                              {/* Mock App UI Frame */}
                              <div className="bg-zinc-900 text-zinc-300 p-6 rounded-2xl font-mono text-xs space-y-3 border border-zinc-800 mt-4">
                                <div className="text-amber-400 font-bold">// Contact Details</div>
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
                              <h3 className="text-2xl font-extrabold text-zinc-900">{proj.title}</h3>
                              <p className="text-sm text-zinc-600 leading-relaxed">{proj.description}</p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-150 text-xs">
                                <div>
                                  <span className="font-bold text-zinc-700 block mb-1">🏥 THE CHALLENGE</span>
                                  <span className="text-zinc-550">Implement highly performant and secure business rules while preserving fast client response latency under heavy queue loading.</span>
                                </div>
                                <div>
                                  <span className="font-bold text-amber-600 block mb-1">✔ THE OUTCOME</span>
                                  <span className="text-zinc-550">Delivered a unified portal dashboard showcasing clean state syncs, reducing manual administration load and API latency.</span>
                                </div>
                              </div>

                              {/* Tech stack badges */}
                              {proj.tech_stack && (
                                <div className="flex flex-wrap gap-1.5 pt-2">
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
                                  className="border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center space-x-1"
                                >
                                  <Github className="w-4 h-4 text-zinc-650" />
                                  <span>Source Code</span>
                                </a>
                              )}
                              {proj.live_url && (
                                <a
                                  href={proj.live_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center space-x-1"
                                >
                                  <ExternalLink className="w-4 h-4 text-zinc-650" />
                                  <span>Live Preview</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Detailed Case Studies deep dive reports */}
              {getSection('case_studies').is_visible && caseStudies.length > 0 && (
                <section className="py-24 bg-zinc-50 border-y border-zinc-200">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('case_studies').title}</h2>
                      {getSection('case_studies').subtitle && (
                        <p className="text-sm text-zinc-500 mt-2">{getSection('case_studies').subtitle}</p>
                      )}
                      <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {caseStudies.map(cs => (
                        <div
                          key={cs.id}
                          onClick={() => setActiveCaseStudy(cs)}
                          className="cursor-pointer bg-white hover:border-amber-200/50 border border-zinc-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1"
                        >
                          <div>
                            <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 mb-4">
                              <Bookmark className="w-3.5 h-3.5 fill-amber-500" />
                              <span>DEEP DIVE REPORT</span>
                            </div>
                            <h4 className="text-xl font-extrabold text-zinc-900 mb-3">{cs.title}</h4>
                            <p className="text-sm text-zinc-650 leading-relaxed mb-6">{cs.summary}</p>

                            <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-150 text-xs text-zinc-500 mb-6">
                              <div className="flex justify-between">
                                <span className="font-semibold text-zinc-700">Client / Industry:</span>
                                <span>{cs.client_name || 'Healthcare Platform'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold text-zinc-700">Duration:</span>
                                <span>{cs.duration || '3 Months'}</span>
                              </div>
                              {cs.tech_stack && (
                                <div className="flex justify-between">
                                  <span className="font-semibold text-zinc-700">Tech Stack:</span>
                                  <span className="truncate max-w-[240px]">{cs.tech_stack.join(' • ')}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-xs border-t border-zinc-100 pt-4">
                            <span className="text-zinc-400">Deep Dive Report</span>
                            <span className="font-semibold text-amber-600 flex items-center space-x-1">
                              <span>Read Case Study</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Professional Experience — Modern Cards */}
              {getSection('experience').is_visible && (
                <section id="experience" className="py-24 bg-zinc-950">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                      <h2 className="text-3xl font-extrabold tracking-tight text-white">Professional Experience</h2>
                      {getSection('experience').subtitle && (
                        <p className="text-sm text-zinc-400 mt-2">{getSection('experience').subtitle}</p>
                      )}
                      <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                      {experiences.map((exp, idx) => (
                        <div key={exp.id} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm hover:border-amber-500/50 hover:shadow-amber-500/10 hover:shadow-lg transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex items-start space-x-4">
                              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 shrink-0">
                                <Briefcase className="w-5 h-5 text-amber-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{exp.job_title}</h3>
                                <div className="text-sm font-semibold text-zinc-400 mt-0.5">{exp.company}{exp.location && <span className="font-normal"> · {exp.location}</span>}</div>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                exp.is_current
                                  ? 'bg-amber-500 text-white border-amber-500'
                                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                              }`}>
                                {exp.is_current && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>}
                                {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                              </span>
                            </div>
                          </div>

                          {exp.description && (
                            <p className="text-sm text-zinc-400 leading-relaxed mt-4 pl-0 sm:pl-14">{exp.description}</p>
                          )}

                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mt-4 pl-0 sm:pl-14 flex flex-wrap gap-1.5">
                              {exp.achievements.map((ach, aIdx) => (
                                <span key={aIdx} className="text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-300 py-0.5 px-2.5 rounded-md font-semibold">
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

              {/* Engineering Experience */}
              <section id="engineering" className="py-24 bg-zinc-50 border-y border-zinc-200">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">Engineering Experience</h2>
                    <p className="text-sm text-zinc-500 mt-2">Real production technologies I've worked with — from infrastructure to deployment.</p>
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Infrastructure */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg border border-amber-200"><Server className="w-4 h-4 text-amber-600" /></div>
                        <h4 className="font-bold text-sm text-zinc-900">Infrastructure</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {['Cloudflare', 'Cloudflare Tunnel', 'DNS Management', 'SSL Certs', 'Subdomains', 'VPS', 'Docker', 'Docker Compose', 'Plesk', 'Shared Hosting', 'Linux'].map(t => (
                          <li key={t} className="flex items-center space-x-1.5 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deployment */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg border border-blue-100"><GitBranch className="w-4 h-4 text-blue-600" /></div>
                        <h4 className="font-bold text-sm text-zinc-900">Deployment</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {['Laravel Deploy', 'React Deploy', 'Git & GitHub', 'Queue Workers', 'Cron Jobs', 'Supervisor', 'Env Management', 'Hostinger VPS', 'Plesk Panel', 'CI/CD Basics'].map(t => (
                          <li key={t} className="flex items-center space-x-1.5 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* API Integrations */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg border border-amber-200"><Activity className="w-4 h-4 text-amber-600" /></div>
                        <h4 className="font-bold text-sm text-zinc-900">API Integrations</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {['Stripe', 'Razorpay', 'Whereby', 'Google People API', 'Google OAuth', 'Bokun API', 'SendOwl', 'OpenAI', 'REST APIs', 'Webhooks'].map(t => (
                          <li key={t} className="flex items-center space-x-1.5 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optimization */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg border border-amber-100"><Sparkles className="w-4 h-4 text-amber-600" /></div>
                        <h4 className="font-bold text-sm text-zinc-900">Optimization</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {['Google Lighthouse', 'PageSpeed LCP', 'Caching', 'Lazy Loading', 'SEO', 'Performance', 'MCP Tooling', 'Postman API', 'Code Review'].map(t => (
                          <li key={t} className="flex items-center space-x-1.5 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Database */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 bg-rose-50 rounded-lg border border-rose-100"><Database className="w-4 h-4 text-rose-600" /></div>
                        <h4 className="font-bold text-sm text-zinc-900">Database</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {['MySQL', 'MariaDB', 'Schema Design', 'Indexing', 'Optimization', 'DB Backups', 'dbdiagram.io', 'Miro ERD'].map(t => (
                          <li key={t} className="flex items-center space-x-1.5 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* API Integration Showcase */}
              <section id="api-integrations" className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">API Integration Showcase</h2>
                    <p className="text-sm text-zinc-400 mt-2">Real third-party integrations built and shipped to production systems.</p>
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Stripe', description: 'Payment gateway integration with subscriptions.', endpoint: 'stripe/v1/checkout', color: 'bg-zinc-900 border-zinc-800', badge: 'text-indigo-400', icon: '💳' },
                      { name: 'Google People API', description: 'Contact sync and OAuth flow implementation.', endpoint: 'google/contacts/sync', color: 'bg-zinc-900 border-zinc-800', badge: 'text-blue-400', icon: '👥' },
                      { name: 'Whereby', description: 'Telehealth video consultation meeting rooms.', endpoint: 'whereby/meetings/embed', color: 'bg-zinc-900 border-zinc-800', badge: 'text-amber-400', icon: '📹' },
                      { name: 'Bókun API', description: 'Booking sync engine and webhook driver.', endpoint: 'bokun/webhook/listener', color: 'bg-zinc-900 border-zinc-800', badge: 'text-amber-400', icon: '📅' },
                      { name: 'SendOwl', description: 'Digital product delivery and license handling.', endpoint: 'sendowl/webhook/event', color: 'bg-zinc-900 border-zinc-800', badge: 'text-emerald-400', icon: '📦' },
                      { name: 'OpenAI', description: 'AI-driven content and image generation.', endpoint: 'openai/chat/completions', color: 'bg-zinc-900 border-zinc-800', badge: 'text-amber-400', icon: '🤖' },
                    ].map(api => (
                      <div key={api.name} className={`border rounded-2xl p-6 space-y-3 ${api.color}`}>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{api.icon}</span>
                          <h4 className={`font-bold text-base text-white`}>{api.name}</h4>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{api.description}</p>
                        <code className="text-[10px] bg-zinc-800 text-amber-400 px-2 py-1 rounded-md font-mono block truncate">{api.endpoint}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Production Experience Checklist */}
              <section className="py-24 bg-zinc-50 border-y border-zinc-200">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">Production Experience</h2>
                    <p className="text-sm text-zinc-500 mt-2">Real-world capabilities proven in live, user-facing applications.</p>
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {[
                      'Managed VPS (Hostinger)', 'Production Deployment', 'DNS & Domain Configuration', 'SSL Certificate Setup',
                      'Database Migration (Live)', 'Docker Deployment', 'Queue Workers & Cron Jobs', 'Third-party API Integration',
                      'Payment Gateway (Stripe/Razorpay)', 'Google Cloud APIs', 'Performance Optimization', 'Multi-tenant SaaS Systems',
                      'Cloudflare Tunnel Setup', 'Webhook Automation', 'Admin Panel (Filament)', 'AI Integration (OpenAI)',
                      'Video Consultation (Whereby)', 'Shopify Theme Dev', 'WordPress Portal', 'Contact Sync (Google People API)'
                    ].map(item => (
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

              {/* Experience Matrix */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">Experience Matrix</h2>
                    <p className="text-sm text-zinc-500 mt-2">A clear picture of my depth and breadth across engineering disciplines.</p>
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="max-w-3xl mx-auto border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200">
                          <th className="text-left text-xs font-bold text-zinc-500 uppercase px-6 py-3">Area</th>
                          <th className="text-left text-xs font-bold text-zinc-500 uppercase px-6 py-3">Proficiency</th>
                          <th className="text-right text-xs font-bold text-zinc-500 uppercase px-6 py-3">Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {[
                          { area: 'Backend Development', stars: 5, level: 'Expert' },
                          { area: 'API Integrations', stars: 5, level: 'Expert' },
                          { area: 'Problem Solving', stars: 5, level: 'Expert' },
                          { area: 'Frontend Development', stars: 4, level: 'Advanced' },
                          { area: 'Database Design', stars: 4, level: 'Advanced' },
                          { area: 'Server Deployment', stars: 4, level: 'Advanced' },
                          { area: 'Docker', stars: 4, level: 'Advanced' },
                          { area: 'Performance Optimization', stars: 4, level: 'Advanced' },
                          { area: 'AI Integrations', stars: 4, level: 'Advanced' },
                          { area: 'Architecture Planning', stars: 4, level: 'Advanced' },
                        ].map(row => (
                          <tr key={row.area} className="hover:bg-amber-50/40 transition-colors">
                            <td className="px-6 py-3.5 text-sm font-semibold text-zinc-800">{row.area}</td>
                            <td className="px-6 py-3.5">
                              <div className="flex space-x-0.5">
                                {[1,2,3,4,5].map(s => (
                                  <Star key={s} className={`w-4 h-4 ${s <= row.stars ? 'text-amber-600 fill-amber-500' : 'text-zinc-200 fill-zinc-200'}`} />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-3.5 text-right">
                              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                row.stars === 5 ? 'bg-amber-50 text-amber-600' : 'bg-zinc-100 text-zinc-600'
                              }`}>{row.level}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Technology Timeline */}
              <section className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">Technology Timeline</h2>
                    <p className="text-sm text-zinc-400 mt-2">My engineering journey from first PHP line to enterprise cloud architecture.</p>
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="relative max-w-3xl mx-auto">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800"></div>
                    <div className="space-y-6">
                      {[
                        { year: '2022', title: 'PHP & MySQL', description: 'Started with core PHP, procedural programming, MySQL basics.' },
                        { year: '2023', title: 'Laravel & Cloud', description: 'Built first admin panels and deployed on VPS with Docker.' },
                        { year: '2024', title: 'SaaS & AI', description: 'Integrated Stripe, OpenAI, and multi-tenant architectures.' },
                        { year: '2025', title: 'Enterprise Healthcare', description: 'Architected CMC Telehealth and enterprise ERP systems.' },
                      ].map((item, idx) => (
                        <div key={idx} className="relative flex items-start space-x-6 pl-14">
                          <div className="absolute left-3.5 -translate-x-1/2 w-5 h-5 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center z-10">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          </div>
                          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex-1 shadow-sm">
                            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">{item.year}</div>
                            <h4 className="font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* What I Build (Specializations) */}
              <section className="py-24 bg-zinc-50 border-y border-zinc-200">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">What I Build</h2>
                    <p className="text-sm text-zinc-500 mt-2">Specialized capabilities and system architectures engineered for scale.</p>
                    <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit border border-amber-200">
                        <Activity className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg text-zinc-900">Healthcare</h4>
                      <ul className="text-sm text-zinc-500 space-y-2">
                        <li>&bull; Telemedicine Portals</li>
                        <li>&bull; Voice Prescription Translation</li>
                        <li>&bull; Doctor / Clinic Schedules</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit border border-amber-200">
                        <LinkIcon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg text-zinc-900">E-commerce</h4>
                      <ul className="text-sm text-zinc-500 space-y-2">
                        <li>&bull; Custom Shopify App integration</li>
                        <li>&bull; WooCommerce Custom Plugins</li>
                        <li>&bull; Stripe & Razorpay Checkouts</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit border border-amber-200">
                        <Server className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg text-zinc-900">SaaS Products</h4>
                      <ul className="text-sm text-zinc-500 space-y-2">
                        <li>&bull; Custom Filament Admin Panels</li>
                        <li>&bull; Real-time Dashboards</li>
                        <li>&bull; Inventory & CRM Software</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit border border-amber-200">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg text-zinc-900">AI Integration</h4>
                      <ul className="text-sm text-zinc-500 space-y-2">
                        <li>&bull; Speech-to-Text translation</li>
                        <li>&bull; OpenAI GPT API integrations</li>
                        <li>&bull; Automated image generators</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills & Technologies badges */}
              {getSection('skills').is_visible && (
                <section id="skills" className="py-24 bg-white">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">{getSection('skills').title}</h2>
                      {getSection('skills').subtitle && (
                        <p className="text-sm text-zinc-500 mt-2">{getSection('skills').subtitle}</p>
                      )}
                      <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {['Backend', 'Frontend', 'CMS & E-commerce', 'Tools'].map(cat => {
                        const catSkills = skills.filter(s => s.category === cat);
                        if (catSkills.length === 0) return null;

                        return (
                          <div key={cat} className="border border-zinc-200 p-6 rounded-2xl bg-zinc-50 shadow-sm">
                            <h3 className="font-bold text-lg mb-6 border-b border-zinc-250 pb-3 text-amber-600">{cat}</h3>
                            <div className="flex flex-wrap gap-2">
                              {catSkills.map(skill => (
                                <div
                                  key={skill.id}
                                  className="bg-white border border-zinc-200 py-2.5 px-4 rounded-xl text-xs font-bold text-zinc-700 flex items-center space-x-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200 hover:text-amber-600 transition-all duration-300 select-none cursor-default"
                                >
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0 animate-pulse"
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
                <section id="snippets" className="py-24 bg-zinc-50 border-y border-zinc-200">
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
                          <div className="flex justify-between items-center gap-2 mb-4">
                            <span className="text-xs text-zinc-500">
                              Showing {snippetSliderIndex + 1}–{Math.min(snippetSliderIndex + 3, filteredSnippets.length)} of {filteredSnippets.length}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSnippetSliderIndex(prev => Math.max(0, prev - 3))}
                                disabled={snippetSliderIndex === 0}
                                className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setSnippetSliderIndex(prev => Math.min(filteredSnippets.length - 1, prev + 3))}
                                disabled={snippetSliderIndex + 3 >= filteredSnippets.length}
                                className="p-2.5 rounded-xl border border-zinc-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-200 hover:text-amber-600 transition-colors shadow-sm"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* 3 snippets side by side */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredSnippets.slice(snippetSliderIndex, snippetSliderIndex + 3).map(snip => (
                              <div key={snip.id} className="border border-zinc-200 bg-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
                                <div className="p-5 space-y-4 flex-1">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                      <h3 className="font-bold text-sm text-zinc-900 truncate">{snip.title}</h3>
                                      <button
                                        onClick={() => toggleBookmark(snip.id)}
                                        className={`p-1 rounded hover:bg-zinc-50 transition-colors ${bookmarks.includes(snip.id) ? 'text-amber-600' : 'text-zinc-400'}`}
                                        title={bookmarks.includes(snip.id) ? 'Remove Bookmark' : 'Bookmark Snippet'}
                                      >
                                        <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(snip.id) ? 'fill-amber-500 text-amber-600' : ''}`} />
                                      </button>
                                    </div>
                                    <span className="text-[10px] uppercase font-extrabold bg-amber-50 text-amber-600 py-0.5 px-2 rounded-md border border-amber-200 shrink-0">
                                      {snip.language}
                                    </span>
                                  </div>

                                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{snip.description}</p>

                                  {/* Code Block */}
                                  <div className="relative bg-zinc-950 p-4 rounded-xl text-zinc-300 font-mono text-xs overflow-x-auto max-h-48 leading-relaxed">
                                    <div className="absolute right-3 top-3 flex items-center space-x-1.5">
                                      <button
                                        onClick={() => downloadSnippet(snip.title, snip.code, snip.language)}
                                        className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                                        title="Download Snippet"
                                      >
                                        <Download className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => handleCopySnippet(snip.code, snip.id)}
                                        className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                                        title="Copy Snippet"
                                      >
                                        {copiedSnippetId === snip.id ? (
                                          <Check className="w-3 h-3 text-green-500" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </button>
                                    </div>
                                    <pre className="pr-14">{snip.code}</pre>
                                  </div>
                                </div>

                                {snip.tags && (
                                  <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex flex-wrap gap-1.5">
                                    {snip.tags.map((tag, idx) => (
                                      <span key={idx} className="text-[10px] text-zinc-400">#{tag}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {filteredSnippets.map(snip => (
                            <div key={snip.id} className="border border-zinc-200 bg-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
                              <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-bold text-base text-zinc-900">{snip.title}</h3>
                                    <button
                                      onClick={() => toggleBookmark(snip.id)}
                                      className={`p-1 rounded hover:bg-zinc-50 transition-colors ${bookmarks.includes(snip.id) ? 'text-amber-600' : 'text-zinc-400'
                                        }`}
                                      title={bookmarks.includes(snip.id) ? 'Remove Bookmark' : 'Bookmark Snippet'}
                                    >
                                      <Bookmark className={`w-4 h-4 ${bookmarks.includes(snip.id) ? 'fill-amber-500 text-amber-600' : ''}`} />
                                    </button>
                                  </div>
                                  <span className="text-[10px] uppercase font-extrabold bg-amber-50 text-amber-600 py-1 px-2 rounded-md border border-amber-200">
                                    {snip.language}
                                  </span>
                                </div>

                                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-150 text-[10px] text-zinc-500">
                                  <span className="font-bold text-zinc-700 block mb-0.5">PROBLEM SOLVED:</span>
                                  <p>Eliminates boilerplate configurations, creating high performance reusable classes.</p>
                                </div>

                                <p className="text-xs text-zinc-500 leading-relaxed">{snip.description}</p>

                                {/* Code Block */}
                                <div className="relative bg-zinc-950 p-4 rounded-xl text-zinc-300 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed">
                                  <div className="absolute right-3 top-3 flex items-center space-x-2">
                                    <button
                                      onClick={() => downloadSnippet(snip.title, snip.code, snip.language)}
                                      className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                                      title="Download Snippet"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleCopySnippet(snip.code, snip.id)}
                                      className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                                      title="Copy Snippet"
                                    >
                                      {copiedSnippetId === snip.id ? (
                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                  <pre>{snip.code}</pre>
                                </div>
                              </div>

                              {snip.tags && (
                                <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex flex-wrap gap-1.5">
                                  {snip.tags.map((tag, idx) => (
                                    <span key={idx} className="text-[10px] text-zinc-400">#{tag}</span>
                                  ))}
                                </div>
                              )}
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
                <section id="toolkit" className="py-24 bg-white">
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
                          onClick={() => setSelectedResourceCategory(cat)}
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

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredResources.slice(resourceSliderIndex, resourceSliderIndex + 3).map(res => (
                              <a
                                key={res.id}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all shadow-sm"
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{res.category}</span>
                                  <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 transition-colors" />
                                </div>
                                <h4 className="font-bold text-base mb-2 group-hover:text-amber-600 transition-colors text-zinc-900">{res.name}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">{res.description}</p>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredResources.map(res => (
                            <a
                              key={res.id}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all shadow-sm"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{res.category}</span>
                                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 transition-colors" />
                              </div>
                              <h4 className="font-bold text-base mb-2 group-hover:text-amber-600 transition-colors text-zinc-900">{res.name}</h4>
                              <p className="text-xs text-zinc-505 leading-relaxed">{res.description}</p>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                </section>
              )}

              {/* Medium-style Articles & Insights */}
              {getSection('blog').is_visible && (
                <section id="blog" className="py-24 bg-zinc-50 border-y border-zinc-200">
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {blogPosts.slice(blogSliderIndex, blogSliderIndex + 3).map(post => (
                            <article
                              key={post.id}
                              onClick={() => setActivePost(post)}
                              className="cursor-pointer group border border-zinc-250 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all shadow-sm space-y-4 flex flex-col"
                            >
                              <div className="flex justify-between items-center text-xs text-zinc-400">
                                <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                                <span className="bg-zinc-100 text-zinc-600 py-0.5 px-2 rounded-md text-[10px] font-bold uppercase tracking-wider">ARTICLE</span>
                              </div>
                              <h3 className="font-extrabold text-base group-hover:text-amber-600 transition-colors text-zinc-900 flex-1">
                                {post.title}
                              </h3>
                              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                                {post.summary || post.excerpt}
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
                            </article>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map(post => (
                          <article
                            key={post.id}
                            onClick={() => setActivePost(post)}
                        className="cursor-pointer group border border-zinc-200 p-6 rounded-2xl bg-white hover:border-amber-200/50 transition-all flex flex-col justify-between shadow-sm"
                          >
                            <div className="space-y-4">
                              <div className="flex justify-between items-center text-xs text-zinc-400">
                                <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                                <span>&bull; 5 min read</span>
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
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* GitHub Repo List & Commit Activity Feed */}
                    {getSection('github').is_visible && (
                      <section className="py-24 bg-white border-b border-zinc-200">
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
                                  <div className="text-[10px] text-zinc-450">Repository: cmc-telehealth &bull; 1 hour ago</div>
                                </div>
                                <div className="border-l-2 border-amber-200 pl-3">
                                  <div className="font-semibold text-zinc-800">fix: optimized stripe webhooks queues</div>
                                  <div className="text-[10px] text-zinc-450">Repository: shopify-connector &bull; 1 day ago</div>
                                </div>
                                <div className="border-l-2 border-amber-200 pl-3">
                                  <div className="font-semibold text-zinc-800">refactor: custom json encryption casts</div>
                                  <div className="text-[10px] text-zinc-450">Repository: deploymeta-erp &bull; 2 days ago</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Certifications with credentials validation */}
                    {getSection('certifications').is_visible && certifications.length > 0 && (
                      <section className="py-24 bg-white">
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
                      <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-800">
                        <div className="max-w-4xl mx-auto px-6">
                          <div className="text-center max-w-xl mx-auto mb-16">
                            <h2 className="text-3xl font-extrabold text-white">{getSection('contact').title}</h2>
                            {getSection('contact').subtitle && (
                              <p className="text-sm text-zinc-400 mt-2">{getSection('contact').subtitle}</p>
                            )}
                            <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                          </div>

                          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
                            {contactSuccess ? (
                              <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full border border-amber-200 mx-auto flex items-center justify-center">
                                  <Check className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-zinc-900">Message Received!</h3>
                                <p className="text-sm text-zinc-505 max-w-md mx-auto">
                                  Thank you for reaching out! Lakshmi will evaluate your query and send a response within 12 business hours.
                                </p>
                                <button
                                  onClick={() => setContactSuccess(false)}
                                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-sm text-xs"
                                >
                                  Send Another Message
                                </button>
                              </div>
                            ) : (
                              <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="text-xs font-bold text-zinc-450 block mb-2">FULL NAME</label>
                                    <input
                                      type="text"
                                      required
                                      value={contactForm.name}
                                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                      placeholder="John Doe"
                                      className="w-full text-sm border border-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-200 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-bold text-zinc-450 block mb-2">EMAIL ADDRESS</label>
                                    <input
                                      type="email"
                                      required
                                      value={contactForm.email}
                                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                      placeholder="johndoe@company.com"
                                      className="w-full text-sm border border-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-200 bg-white"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div>
                                    <label className="text-xs font-bold text-zinc-450 block mb-2">COMPANY</label>
                                    <input
                                      type="text"
                                      value={contactForm.company}
                                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                                      placeholder="Orvella Inc."
                                      className="w-full text-sm border border-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-200 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-bold text-zinc-450 block mb-2">ESTIMATED BUDGET</label>
                                    <input
                                      type="text"
                                      value={contactForm.budget}
                                      onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                                      placeholder="e.g. $5,000"
                                      className="w-full text-sm border border-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-200 bg-white font-semibold text-zinc-700"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-bold text-zinc-450 block mb-2">PROJECT TYPE</label>
                                    <select
                                      value={contactForm.projectType}
                                      onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                                      className="w-full text-sm border border-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-200 bg-white font-semibold text-zinc-700"
                                    >
                                      <option>Laravel Development</option>
                                      <option>React / Next.js Development</option>
                                      <option>Shopify Theme / Integration</option>
                                      <option>Healthcare Consulting</option>
                                    </select>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs font-bold text-zinc-455 block mb-2">PROJECT DETAILS</label>
                                  <textarea
                                    required
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    placeholder="Describe the scope, objectives, and integrations needed..."
                                    rows={5}
                                    className="w-full text-sm border border-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-200 bg-white"
                                  ></textarea>
                                </div>

                                <button
                                  type="submit"
                                  disabled={contactSending}
                                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5"
                                >
                                  <Send className="w-4 h-4" />
                                  <span>{contactSending ? 'Sending Inquiry...' : 'Submit Project Inquiry'}</span>
                                </button>
                              </form>
                            )}
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Footer */}
                    <footer className="bg-white border-t border-zinc-200 py-12">
                      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-lg font-bold text-zinc-950">Lakshmi.dev</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            Premium full-stack architecture development optimized for SaaS, healthcare, and enterprise Shopify setups.
                          </p>
                        </div>

                        <div className="space-y-3 text-xs text-zinc-550">
                          <h5 className="font-extrabold text-zinc-300 tracking-widest uppercase">CONTACT</h5>
                          <div className="text-zinc-400">Email: <a href="mailto:laxmi20024@gmail.com" className="hover:underline text-amber-400 font-semibold">laxmi20024@gmail.com</a></div>
                          <div className="text-zinc-400">Phone: <span className="text-amber-400 font-semibold">+91 6280788413</span></div>
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
                      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
                        <span>&copy; {new Date().getFullYear()} Lakshmi. All rights reserved.</span>
                        <span>Built with Laravel + Inertia React.</span>
                      </div>
                    </footer>

                    {/* ================= MODALS ================= */}

                    {/* Project Detail Modal */}
                    {activeProject && (
                      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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

                          <div className="space-y-4">
                            <h4 className="font-bold text-sm text-gray-400">PROJECT SUMMARY</h4>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400">{activeProject.description}</p>

                            {activeProject.content && (
                              <div className="pt-2 space-y-2">
                                <h4 className="font-bold text-sm text-gray-400">KEY CONTRIBUTIONS & DETAILS</h4>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400 whitespace-pre-line">{activeProject.content}</p>
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
                      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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
                            <div className="space-y-2">
                              <h4 className="font-bold text-amber-600 uppercase tracking-wide text-xs">Summary Overview</h4>
                              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{activeCaseStudy.summary}</p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-bold text-amber-600 uppercase tracking-wide text-xs">The Challenge</h4>
                              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{activeCaseStudy.challenge}</p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-bold text-amber-600 uppercase tracking-wide text-xs">The Solution</h4>
                              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{activeCaseStudy.solution}</p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-bold text-amber-600 uppercase tracking-wide text-xs">Key Results & Outcomes</h4>
                              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{activeCaseStudy.results}</p>
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
                      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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



                  </div>
                </>
              );
}
