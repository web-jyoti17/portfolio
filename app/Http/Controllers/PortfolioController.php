<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Certification;
use App\Models\CodeSnippet;
use App\Models\Education;
use App\Models\Experience;
use App\Models\HeaderSetting;
use App\Models\Project;
use App\Models\Resource;
use App\Models\Resume;
use App\Models\Section;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Services\BlogViewTracker;
use App\Services\GitHubService;
use App\Services\MediumService;
use App\Support\SiteData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    protected GitHubService $gitHubService;

    public function __construct(GitHubService $gitHubService)
    {
        $this->gitHubService = $gitHubService;
    }

    /**
     * Display the public portfolio page.
     */
    public function index(): Response
    {
        $projects = Project::where('is_visible', true)->orderBy('sort_order')->orderBy('completion_date', 'desc')->get();
        $blogPosts = BlogPost::where('status', 'published')->orderBy('published_at', 'desc')->get();
        $caseStudies = CaseStudy::where('is_visible', true)->orderBy('sort_order')->orderBy('id', 'desc')->get();
        $skills = Skill::where('is_visible', true)->orderBy('sort_order')->orderBy('percentage', 'desc')->get();
        $experiences = Experience::where('is_visible', true)->orderBy('sort_order')->orderBy('start_date', 'desc')->get();
        $educations = Education::orderBy('start_date', 'desc')->get();
        $certifications = Certification::orderBy('issue_date', 'desc')->get();
        $codeSnippets = CodeSnippet::where('is_visible', true)->orderBy('sort_order')->orderBy('id', 'desc')->get();
        $resources = Resource::where('is_visible', true)->orderBy('sort_order')->orderBy('id', 'desc')->get();
        $testimonials = Testimonial::where('is_approved', true)->orderBy('created_at', 'desc')->get();
        $resumes = Resume::where('is_active', true)->get();
        $sections = SiteData::sections();

        // Fetch GitHub repositories
        $settings = HeaderSetting::current();
        $githubRepos = $this->gitHubService->getPublicRepositories($settings->github_username ?: 'CodeSproutX');

        // The 5 newest stories from the connected Medium profile
        $mediumPosts = array_slice(app(MediumService::class)->getLatestPosts($settings->medium_username), 0, 5);

        return Inertia::render('portfolio', [
            'projects' => $projects,
            'blogPosts' => $blogPosts,
            'caseStudies' => $caseStudies,
            'skills' => $skills,
            'experiences' => $experiences,
            'educations' => $educations,
            'certifications' => $certifications,
            'codeSnippets' => $codeSnippets,
            'resources' => $resources,
            'testimonials' => $testimonials,
            'resumes' => $resumes,
            'githubRepos' => $githubRepos,
            'mediumPosts' => $mediumPosts,
            'sections' => $sections,
        ])->withViewData('meta', [
            'title' => $settings->seo_title,
            'description' => $settings->seo_description,
            'url' => route('home'),
            'type' => 'website',
        ]);
    }

    /**
     * Submit a testimonial for approval.
     */
    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000',
        ]);

        Testimonial::create([
            'name' => $validated['name'],
            'company' => $validated['company'],
            'position' => $validated['position'],
            'rating' => $validated['rating'],
            'review' => $validated['review'],
            'is_approved' => false, // Requires admin approval
        ]);

        return back()->with('success', 'Thank you for your review! It will be visible once approved by Lakshmi.');
    }

    /**
     * Track and download a resume.
     */
    public function downloadResume(Resume $resume)
    {
        $resume->increment('download_count');

        $path = $resume->file_path;

        abort_unless(Storage::disk('public')->exists($path), 404);

        return Storage::disk('public')->download($path, basename($path));
    }

    /**
     * Show a single article (blog post).
     */
    public function showArticle(Request $request, BlogViewTracker $tracker, string $slug)
    {
        $article = BlogPost::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        if ($visitor = $tracker->recordView($article, $request)) {
            $tracker->queueCookie($visitor);
        }

        $morePosts = BlogPost::where('status', 'published')
            ->whereKeyNot($article->getKey())
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get(['id', 'title', 'slug', 'summary', 'tags', 'cover_image', 'status', 'published_at', 'views_count']);

        return Inertia::render('article', [
            'article' => $article,
            'morePosts' => $morePosts,
            'shareUrl' => route('article.show', $article->slug),
        ])->withViewData('meta', [
            'title' => $article->title,
            'description' => Str::limit(trim(strip_tags($article->summary)), 200),
            'image' => $article->cover_image_url ? url($article->cover_image_url) : null,
            'url' => route('article.show', $article->slug),
            'type' => 'article',
            'published_at' => $article->published_at?->toIso8601String(),
        ]);
    }

    /**
     * Show a single project with all of its details.
     */
    public function showProject(string $slug)
    {
        $project = Project::where('slug', $slug)->where('is_visible', true)->firstOrFail();

        $moreProjects = Project::where('is_visible', true)
            ->whereKeyNot($project->getKey())
            ->orderBy('sort_order')
            ->orderBy('completion_date', 'desc')
            ->take(3)
            ->get(['id', 'title', 'slug', 'description', 'category', 'tech_stack', 'image_path']);

        return Inertia::render('project', [
            'project' => $project,
            'moreProjects' => $moreProjects,
            'shareUrl' => route('project.show', $project->slug),
        ])->withViewData('meta', [
            'title' => $project->title,
            'description' => Str::limit(trim(strip_tags($project->description)), 200),
            'url' => route('project.show', $project->slug),
            'type' => 'article',
        ]);
    }

    /**
     * Show a single API integration showcase.
     */
    public function showShowcase(string $slug)
    {
        $apiSection = Section::where('key', 'api_integrations')->first();
        if (! $apiSection || ! isset($apiSection->content['items'])) {
            abort(404);
        }

        $items = collect($apiSection->content['items']);

        $item = $items->first(function ($i) use ($slug) {
            return Str::slug($i['name']) === $slug;
        });

        if (! $item) {
            abort(404);
        }

        return Inertia::render('showcase', [
            'item' => $item,
        ])->withViewData('meta', [
            'title' => $item['name'].' - API Integration',
            'description' => Str::limit(trim(strip_tags($item['description'] ?? '')), 200),
            'url' => route('showcase.show', $slug),
            'type' => 'article',
        ]);
    }

    /**
     * The article page reports that a visitor reached the end of the article.
     */
    public function markArticleRead(Request $request, BlogViewTracker $tracker, string $slug): JsonResponse
    {
        $article = BlogPost::where('slug', $slug)->where('status', 'published')->firstOrFail();

        return response()->json(['counted' => $tracker->recordRead($article, $request)]);
    }
}
