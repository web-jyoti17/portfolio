import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, Check, ExternalLink, Github, Lock, Target, User } from 'lucide-react';
import { ArticleContent } from '@/components/site/article-content';
import { ShareButtons } from '@/components/site/share-buttons';
import { SiteLayout, useSite } from '@/components/site/site-layout';

interface ProjectSummary {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    tech_stack: string[] | null;
    image_url: string | string[] | null;
}

interface ProjectProps {
    project: ProjectSummary & {
        content: string | null;
        github_url: string | null;
        live_url: string | null;
        is_featured: boolean;
        is_proprietary: boolean;
        client_name: string | null;
        challenge: string | null;
        outcome: string | null;
        completion_date: string | null;
    };
    moreProjects: ProjectSummary[];
    shareUrl: string;
}

/** Image fields arrive as an array, a JSON string or a single URL. */
const imageList = (value: string | string[] | null | undefined): string[] => {
    let images: unknown = value;

    if (typeof value === 'string') {
        try {
            images = JSON.parse(value);
        } catch {
            images = value;
        }
    }

    const list = Array.isArray(images) ? images : images ? [images] : [];

    return list.filter((image): image is string => typeof image === 'string' && image.trim() !== '' && image !== '[]');
};

const plainText = (html: string | null | undefined): string =>
    (html || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

export default function Project({ project, moreProjects = [], shareUrl }: ProjectProps) {
    const site = useSite();
    const images = imageList(project.image_url);
    const stack = project.tech_stack || [];

    return (
        <SiteLayout>
            <Head title={project.title} />

            <main className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 md:pt-10 md:pb-24">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:border-amber-200 hover:text-amber-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All projects
                </Link>

                <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10">
                <article className="min-w-0">
                    <header>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-700 uppercase">
                                {project.category}
                            </span>
                            {project.is_proprietary && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-bold tracking-wider text-zinc-600 uppercase">
                                    <Lock className="h-3 w-3" />
                                    NDA client work
                                </span>
                            )}
                        </div>

                        <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-zinc-900 sm:text-4xl lg:text-[2.75rem]">
                            {project.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-500">
                            {project.client_name && (
                                <span className="inline-flex items-center gap-2">
                                    <User className="h-4 w-4 text-zinc-400" />
                                    {project.client_name}
                                </span>
                            )}
                            {project.completion_date && (
                                <span className="inline-flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-zinc-400" />
                                    Completed {new Date(project.completion_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            )}
                        </div>

                        {(!project.is_proprietary && (project.live_url || project.github_url)) && (
                            <div className="mt-6 flex flex-wrap gap-3">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Live site
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-amber-300 hover:text-amber-600"
                                    >
                                        <Github className="h-4 w-4" />
                                        Source code
                                    </a>
                                )}
                            </div>
                        )}
                    </header>

                    {images.length > 0 && (
                        <div className={`mt-8 grid gap-4 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                            {images.map((image, index) => (
                                <img
                                    key={image}
                                    src={image}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    className={`w-full rounded-2xl border border-zinc-200 object-cover ${images.length > 1 && index === 0 ? 'sm:col-span-2' : ''}`}
                                />
                            ))}
                        </div>
                    )}

                    <section className="mt-10">
                        <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">Overview</h2>
                        <ArticleContent html={project.description} className="mt-3" />
                    </section>

                    {(project.challenge || project.outcome) && (
                        <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                            {project.challenge && (
                                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
                                    <h2 className="flex items-center gap-2.5 text-sm font-extrabold tracking-wide text-zinc-900 uppercase">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-surface text-zinc-600">
                                            <Target className="h-4 w-4" />
                                        </span>
                                        The challenge
                                    </h2>
                                    <ArticleContent html={project.challenge} className="mt-4 !text-[0.95rem]" />
                                </div>
                            )}
                            {project.outcome && (
                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                                    <h2 className="flex items-center gap-2.5 text-sm font-extrabold tracking-wide text-zinc-900 uppercase">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                                            <Check className="h-4 w-4" />
                                        </span>
                                        The outcome
                                    </h2>
                                    <ArticleContent html={project.outcome} className="mt-4 !text-[0.95rem]" />
                                </div>
                            )}
                        </section>
                    )}

                    {project.content && (
                        <section className="mt-10">
                            <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">What I built</h2>
                            <ArticleContent html={project.content} className="mt-3" />
                        </section>
                    )}

                    {project.is_proprietary && (
                        <p className="mt-10 flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-600">
                            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                            This is client work under a confidentiality agreement, so the code and live system are not public. I can walk through the
                            architecture and my part in it during an interview.
                        </p>
                    )}

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-6">
                        {site.show_share_buttons && <ShareButtons url={shareUrl} title={project.title} summary={plainText(project.description)} />}
                    </div>
                </article>

                {/* Facts at a glance */}
                <aside className="mt-10 lg:mt-0">
                    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 lg:sticky lg:top-24">
                        <dl className="space-y-4 text-sm">
                            <div>
                                <dt className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">Category</dt>
                                <dd className="mt-1 font-semibold text-zinc-800">{project.category}</dd>
                            </div>
                            {project.client_name && (
                                <div>
                                    <dt className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">Client</dt>
                                    <dd className="mt-1 font-semibold text-zinc-800">{project.client_name}</dd>
                                </div>
                            )}
                            {project.completion_date && (
                                <div>
                                    <dt className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">Completed</dt>
                                    <dd className="mt-1 font-semibold text-zinc-800">
                                        {new Date(project.completion_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </dd>
                                </div>
                            )}
                        </dl>

                        {stack.length > 0 && (
                            <div>
                                <h2 className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">Technology</h2>
                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                    {stack.map((tech) => (
                                        <span key={tech} className="rounded-lg border border-zinc-200 bg-surface px-2.5 py-1 text-xs font-medium text-zinc-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Link
                            href="/#contact"
                            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
                        >
                            Discuss a similar project
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </aside>
                </div>

                {moreProjects.length > 0 && (
                    <section className="mt-16 border-t border-zinc-200 pt-10 md:mt-20">
                        <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">More projects</h2>
                        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                            {moreProjects.map((other) => (
                                <Link
                                    key={other.id}
                                    href={`/projects/${other.slug}`}
                                    className="group flex flex-col rounded-2xl border border-zinc-200 bg-surface p-5 shadow-sm transition-colors hover:border-amber-200"
                                >
                                    <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">{other.category}</span>
                                    <h3 className="mt-2 flex-1 text-base font-extrabold text-zinc-900 transition-colors group-hover:text-amber-600">{other.title}</h3>
                                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">{plainText(other.description)}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                                        View project
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </SiteLayout>
    );
}

Project.layout = (page: any) => page;
