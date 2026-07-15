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
  Info
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
}: PortfolioProps) {
  // Theme management
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Sync with HTML class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Project filtering
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');
  const projectCategories = ['All', 'Laravel', 'React', 'Shopify', 'AI', 'WordPress'];

  const filteredProjects = selectedProjectCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedProjectCategory);

  // Snippets filtering and search
  const [snippetSearch, setSnippetSearch] = useState<string>('');
  const [selectedSnippetCategory, setSelectedSnippetCategory] = useState<string>('All');
  const snippetCategories = ['All', 'Backend', 'Frontend', 'CMS', 'Tools', 'Integrations'];

  const filteredSnippets = codeSnippets.filter(s => {
    const matchesCategory = selectedSnippetCategory === 'All' || s.category === selectedSnippetCategory;
    const matchesSearch = s.title.toLowerCase().includes(snippetSearch.toLowerCase()) || 
                          s.description.toLowerCase().includes(snippetSearch.toLowerCase()) ||
                          s.language.toLowerCase().includes(snippetSearch.toLowerCase());
    return matchesCategory && matchesSearch;
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
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState<boolean>(false);

  // Testimonial Form Formik-like Inertia helper
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    company: '',
    position: '',
    rating: 5,
    review: '',
  });

  const submitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    post('/testimonials', {
      onSuccess: () => {
        setIsTestimonialModalOpen(false);
        reset();
        toast.success('Your testimonial has been submitted for approval!');
      },
      onError: () => {
        toast.error('Please fix the errors in the form.');
      }
    });
  };

  // Clipboard copies
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <>
      <Head>
        <title>Lakshmi | Full Stack Web Developer Portfolio</title>
        <meta name="description" content="Professional developer portfolio of Lakshmi, featuring custom SaaS platforms, telemedicine modules, Shopify configurations, and Laravel Filament panels." />
      </Head>
      <Toaster position="top-right" theme={darkMode ? 'dark' : 'light'} />

      <div className="min-h-screen font-sans bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        
        {/* Floating Header */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 border-b border-gray-200 dark:bg-zinc-950/75 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#" className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
              Lakshmi<span className="text-gray-500">.dev</span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
              <a href="#experience" className="hover:text-amber-500 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-amber-500 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-amber-500 transition-colors">Skills</a>
              <a href="#snippets" className="hover:text-amber-500 transition-colors">Snippets</a>
              <a href="#blog" className="hover:text-amber-500 transition-colors">Blog</a>
              <a href="#resources" className="hover:text-amber-500 transition-colors">Resources</a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Resume Download Dropdown */}
              {resumes.length > 0 && (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition-all shadow-md">
                    <Download className="w-3.5 h-3.5" />
                    <span>Get Resume</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-zinc-800 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="py-1">
                      {resumes.map(resume => (
                        <a
                          key={resume.id}
                          href={`/resumes/${resume.id}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-amber-500 dark:hover:text-amber-500"
                        >
                          {resume.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dark mode toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all text-gray-600 dark:text-zinc-400"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="about" className="relative overflow-hidden py-24 lg:py-32">
          {/* Decorative background grid */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-500/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>Open for freelance & full-time roles</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">Lakshmi</span>
              </h1>
              
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-zinc-300">
                Full Stack Web Developer
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-zinc-400 max-w-2xl">
                Full Stack Web Developer with 3+ years of experience building scalable web applications using Laravel, PHP, React.js, Next.js, and modern web technologies. Specialized in developing robust REST APIs, Laravel Filament dashboards, healthcare SaaS, Shopify integrations, and custom booking engines.
              </p>

              {/* Bio Details */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-zinc-400 py-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Ludhiana, Punjab, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <a href="mailto:laxmi20024@gmail.com" className="hover:text-amber-500 underline underline-offset-4">laxmi20024@gmail.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>+91 6280788413</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-amber-500/25"
                >
                  Contact Me
                </a>
                <a 
                  href="https://github.com/CodeSproutX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 dark:border-zinc-800 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium py-3 px-6 rounded-xl transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/lakshmi-backend-developer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 dark:border-zinc-800 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium py-3 px-6 rounded-xl transition-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Visual Grid Element */}
            <div className="lg:col-span-4 hidden lg:flex justify-center relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 opacity-20 blur-3xl absolute"></div>
              <div className="relative border border-gray-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl space-y-6 max-w-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500">EXPERTISE CLOUD</span>
                  <Terminal className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 text-xs py-1.5 px-3 rounded-lg font-medium">Laravel</span>
                  <span className="bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400 text-xs py-1.5 px-3 rounded-lg font-medium">React.js</span>
                  <span className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 text-xs py-1.5 px-3 rounded-lg font-medium">Next.js</span>
                  <span className="bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400 text-xs py-1.5 px-3 rounded-lg font-medium">REST APIs</span>
                  <span className="bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400 text-xs py-1.5 px-3 rounded-lg font-medium">Filament</span>
                  <span className="bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 text-xs py-1.5 px-3 rounded-lg font-medium">Shopify</span>
                  <span className="bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 text-xs py-1.5 px-3 rounded-lg font-medium">GPT API</span>
                </div>
                <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex justify-between items-center text-xs text-gray-500 dark:text-zinc-400">
                  <span>3+ Years Web Experience</span>
                  <span>100% Client Sat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-white/50 dark:bg-zinc-900/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Professional Experience</h2>
              <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative border-l border-gray-200 dark:border-zinc-800 ml-4 md:ml-32 space-y-12">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative pl-8">
                  {/* Circle dot marker */}
                  <span className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 border-4 border-white dark:border-zinc-950"></span>
                  
                  {/* Timeline label (date block) on large screens */}
                  <div className="md:absolute md:-left-[240px] md:top-1.5 md:w-48 md:text-right text-sm font-semibold text-gray-500 dark:text-zinc-400">
                    {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – {' '}
                    {exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100">{exp.job_title}</h3>
                    <div className="text-sm font-semibold text-amber-500 mb-4">{exp.company} &bull; {exp.location}</div>
                    
                    {exp.description && (
                      <p className="text-gray-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">{exp.description}</p>
                    )}

                    {exp.achievements && (
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-zinc-400">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start">
                            <span className="text-amber-500 mr-2 font-bold">&bull;</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Timeline */}
            <div className="mt-20 border-t border-gray-200 dark:border-zinc-900 pt-16">
              <div className="text-center max-w-xl mx-auto mb-12">
                <h3 className="text-2xl font-bold tracking-tight">Education Background</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {educations.map(edu => (
                  <div key={edu.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-900 shadow-sm flex items-start space-x-4">
                    <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{edu.degree} in {edu.field_of_study}</h4>
                      <div className="text-sm font-medium text-rose-500">{edu.institution} &bull; {edu.location}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(edu.start_date).getFullYear()} – {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                      </div>
                      {edu.description && (
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="py-20 bg-gray-50 dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
              <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {projectCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedProjectCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedProjectCategory === cat
                      ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                      : 'border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:border-amber-500 hover:text-amber-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(proj => (
                <div 
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="group relative cursor-pointer flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-900 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="inline-block bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 text-xs font-bold py-1 px-2.5 rounded-lg">
                        {proj.category}
                      </span>
                      {proj.is_proprietary && (
                        <div className="flex items-center space-x-1.5 text-rose-500 dark:text-rose-400 text-xs font-semibold bg-rose-500/10 px-2 py-1 rounded-lg">
                          <Lock className="w-3.5 h-3.5" />
                          <span>NDA</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-900 flex justify-between items-center">
                    {proj.tech_stack && (
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {proj.tech_stack.slice(0, 3).map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-gray-200 dark:bg-zinc-800 py-0.5 px-2 rounded">
                            {tech}
                          </span>
                        ))}
                        {proj.tech_stack.length > 3 && (
                          <span className="text-[10px] text-gray-400">+{proj.tech_stack.length - 3} more</span>
                        )}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-amber-500 group-hover:translate-x-1 transition-transform flex items-center">
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Studies Segment */}
            {caseStudies.length > 0 && (
              <div className="mt-20 border-t border-gray-200 dark:border-zinc-900 pt-16">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <h3 className="text-2xl font-bold tracking-tight">Interactive Case Studies</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {caseStudies.map(cs => (
                    <div 
                      key={cs.id}
                      onClick={() => setActiveCaseStudy(cs)}
                      className="cursor-pointer bg-gradient-to-br from-amber-500/5 to-rose-500/5 hover:from-amber-500/10 hover:to-rose-500/10 border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-amber-500 mb-2">
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>DEEP DIVE REPORT</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3">{cs.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-3 mb-4">{cs.summary}</p>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Duration: {cs.duration}</span>
                        <span className="font-semibold text-amber-500 flex items-center">
                          <span>Read Case Study</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Skills & Tech Stack</h2>
              <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Group skills by category */}
              {['Backend', 'Frontend', 'CMS & E-commerce', 'Tools'].map(cat => {
                const catSkills = skills.filter(s => s.category === cat);
                if (catSkills.length === 0) return null;
                
                return (
                  <div key={cat} className="border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/30">
                    <h3 className="font-bold text-lg mb-6 border-b border-gray-100 dark:border-zinc-800 pb-3 text-amber-500">{cat}</h3>
                    <div className="space-y-6">
                      {catSkills.map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center text-sm font-medium">
                            <span className="flex items-center space-x-2">
                              {skill.color && (
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: skill.color }}></span>
                              )}
                              <span>{skill.name}</span>
                            </span>
                            <span className="text-xs text-gray-400">{skill.percentage}% ({skill.years_of_experience} yrs)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000" 
                              style={{ width: `${skill.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Code Snippets Library */}
        <section id="snippets" className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Code Snippets Library</h2>
              <p className="text-sm text-gray-500 mt-2">Reusable helpers and hook overrides managed directly from the Filament admin.</p>
              <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Filter and Search controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {snippetCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSnippetCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSnippetCategory === cat
                        ? 'bg-amber-500 border-amber-500 text-white shadow'
                        : 'border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={snippetSearch}
                  onChange={(e) => setSnippetSearch(e.target.value)}
                  placeholder="Search code..."
                  className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Snippets code showcase */}
            {filteredSnippets.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredSnippets.map(snip => (
                  <div key={snip.id} className="border border-gray-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-base">{snip.title}</h3>
                        <span className="text-[10px] uppercase font-extrabold bg-amber-500/10 text-amber-500 dark:bg-amber-500/15 py-1 px-2 rounded-md">
                          {snip.language}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">{snip.description}</p>
                      
                      {/* Code Block */}
                      <div className="relative bg-zinc-950 p-4 rounded-xl text-zinc-300 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed">
                        <button 
                          onClick={() => copyToClipboard(snip.code, 'Snippet')}
                          className="absolute right-3 top-3 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <pre>{snip.code}</pre>
                      </div>
                    </div>

                    {snip.tags && (
                      <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                        {snip.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] text-gray-400">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-zinc-500 py-12">
                No code snippets found.
              </div>
            )}
          </div>
        </section>

        {/* Blog / Articles */}
        <section id="blog" className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Articles & Insights</h2>
              <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <article 
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="cursor-pointer group border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {post.published_at && (
                      <div className="text-xs text-gray-400">
                        {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &bull; 5 min read
                      </div>
                    )}
                    <h3 className="font-bold text-lg group-hover:text-amber-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 border-t border-gray-100 dark:border-zinc-900 pt-4">
                    {post.tags && post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-100 dark:bg-zinc-800 py-1 px-2.5 rounded-lg text-gray-500 dark:text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Developer Resources</h2>
              <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {resourceCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedResourceCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedResourceCategory === cat
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(res => (
                <a 
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl bg-white dark:bg-zinc-900 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{res.category}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-base mb-2 group-hover:text-amber-500 transition-colors">{res.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">{res.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Badges */}
        {certifications.length > 0 && (
          <section className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight">Certifications & Credentials</h2>
                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {certifications.map(cert => (
                  <div key={cert.id} className="border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl flex items-start space-x-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-base">{cert.name}</h4>
                      <div className="text-xs font-semibold text-gray-500 dark:text-zinc-400">
                        {cert.issuing_organization} &bull; Issued {new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                      
                      {cert.skills_covered && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cert.skills_covered.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-gray-100 dark:bg-zinc-800 py-0.5 px-2 rounded-md">
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
                          className="inline-flex items-center space-x-1.5 text-xs text-amber-500 hover:underline pt-2 font-medium"
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

        {/* GitHub Open Source repositories */}
        {githubRepos.length > 0 && (
          <section className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight">Open Source Repositories</h2>
                <p className="text-sm text-gray-500 mt-2">Active developer scripts and libraries synced directly from GitHub.</p>
                <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubRepos.map(repo => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl bg-white dark:bg-zinc-900 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-500 py-1 px-2.5 rounded-lg">
                          {repo.language || 'JavaScript'}
                        </span>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500/80 text-amber-500" />
                            <span>{repo.stars}</span>
                          </span>
                        </div>
                      </div>
                      <h4 className="font-bold text-base mb-2 group-hover:text-amber-500 transition-colors truncate">{repo.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">{repo.description || 'No description provided.'}</p>
                    </div>

                    <div className="text-xs text-gray-400 border-t border-gray-100 dark:border-zinc-800 pt-3 flex justify-between items-center">
                      <span>Updated {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : ''}</span>
                      <span className="text-amber-500 font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                        <span>Code</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Client Testimonials */}
        <section className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold tracking-tight">Client Testimonials</h2>
                <div className="h-1.5 w-16 bg-amber-500 mt-4 rounded-full mx-auto sm:mx-0"></div>
              </div>
              <button 
                onClick={() => setIsTestimonialModalOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Leave a Review</span>
              </button>
            </div>

            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(test => (
                  <div key={test.id} className="border border-gray-200 dark:border-zinc-900 p-6 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/30 flex flex-col justify-between">
                    <div>
                      {/* Rating stars */}
                      <div className="flex space-x-1 text-amber-400 mb-4">
                        {Array.from({ length: test.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm italic text-gray-600 dark:text-zinc-400 leading-relaxed mb-6">"{test.review}"</p>
                    </div>
                    
                    <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
                      <h4 className="font-bold text-sm">{test.name}</h4>
                      <div className="text-xs text-gray-400">{test.position}, {test.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-zinc-500 py-12 border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
                No reviews yet. Be the first to leave a testimonial!
              </div>
            )}
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="py-20 border-t border-gray-200 dark:border-zinc-900 bg-gray-50 dark:bg-zinc-950/40">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight">Let's Work Together</h2>
            <p className="text-gray-500 dark:text-zinc-400 max-w-lg mx-auto">
              If you have a telehealth project, customized Shopify integration, complex Filament admin build, or just want to connect, feel free to drop an email or phone query!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 py-4">
              <a 
                href="mailto:laxmi20024@gmail.com" 
                className="flex items-center justify-center space-x-3 bg-white dark:bg-zinc-900 py-4 px-8 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-sm transition-all"
              >
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="font-medium">laxmi20024@gmail.com</span>
              </a>
              <a 
                href="tel:+916280788413" 
                className="flex items-center justify-center space-x-3 bg-white dark:bg-zinc-900 py-4 px-8 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-sm transition-all"
              >
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="font-medium">+91 6280788413</span>
              </a>
            </div>

            <div className="text-xs text-gray-400 dark:text-zinc-500 pt-8">
              &copy; {new Date().getFullYear()} Lakshmi. All rights reserved. Managed with Laravel & <a href="/admin" className="hover:underline font-semibold text-amber-500">Filament Admin</a>.
            </div>
          </div>
        </section>

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
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{activeProject.category} Project</span>
                <h3 className="text-2xl font-extrabold">{activeProject.title}</h3>
                
                {activeProject.client_name && (
                  <div className="text-sm font-semibold text-gray-500">Client: {activeProject.client_name}</div>
                )}
              </div>

              {activeProject.is_proprietary ? (
                <div className="bg-rose-500/10 border border-rose-550/20 p-5 rounded-2xl flex items-start space-x-3.5 text-rose-600 dark:text-rose-400">
                  <Lock className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Proprietary Enterprise Software</h4>
                    <p className="text-xs text-rose-550 dark:text-rose-350 leading-relaxed">
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
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">CASE STUDY ANALYSIS</span>
                <h3 className="text-2xl font-extrabold">{activeCaseStudy.title}</h3>
                <div className="text-sm font-medium text-gray-500">Client: {activeCaseStudy.client_name} &bull; Duration: {activeCaseStudy.duration}</div>
              </div>

              <div className="space-y-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-bold text-amber-500 uppercase tracking-wide text-xs">Summary Overview</h4>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">{activeCaseStudy.summary}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-amber-500 uppercase tracking-wide text-xs">The Challenge</h4>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">{activeCaseStudy.challenge}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-amber-500 uppercase tracking-wide text-xs">The Solution</h4>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">{activeCaseStudy.solution}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-amber-500 uppercase tracking-wide text-xs">Key Results & Outcomes</h4>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">{activeCaseStudy.results}</p>
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

        {/* Leave Testimonial Modal */}
        {isTestimonialModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsTestimonialModalOpen(false)}
                className="absolute right-6 top-6 p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-250 dark:hover:bg-zinc-750 text-gray-500 dark:text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold">Write Client Review</h3>
                <p className="text-xs text-gray-400">Your feedback will be published on approval.</p>
              </div>

              <form onSubmit={submitTestimonial} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
                  <input 
                    type="text" 
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                    className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2.5 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-amber-500" 
                  />
                  {errors.name && <div className="text-xs text-red-500">{errors.name}</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Company</label>
                    <input 
                      type="text" 
                      value={data.company}
                      onChange={e => setData('company', e.target.value)}
                      required
                      className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2.5 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-amber-500" 
                    />
                    {errors.company && <div className="text-xs text-red-500">{errors.company}</div>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Job Position</label>
                    <input 
                      type="text" 
                      value={data.position}
                      onChange={e => setData('position', e.target.value)}
                      required
                      className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2.5 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-amber-500" 
                    />
                    {errors.position && <div className="text-xs text-red-500">{errors.position}</div>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase block">Rating Score</label>
                  <select 
                    value={data.rating}
                    onChange={e => setData('rating', parseInt(e.target.value))}
                    className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2.5 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Unsatisfactory)</option>
                  </select>
                  {errors.rating && <div className="text-xs text-red-500">{errors.rating}</div>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Review Feedback</label>
                  <textarea 
                    value={data.review}
                    onChange={e => setData('review', e.target.value)}
                    required
                    rows={4}
                    className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2.5 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-amber-500"
                  ></textarea>
                  {errors.review && <div className="text-xs text-red-500">{errors.review}</div>}
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-medium py-3 rounded-xl transition-all shadow-md mt-4 disabled:opacity-50"
                >
                  {processing ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
