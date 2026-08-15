<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Certification;
use App\Models\CodeSnippet;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\HeaderSetting;
use App\Models\Resource;
use App\Models\Resume;
use App\Models\Section;
use Illuminate\Support\Str;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Services\GitHubService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $projects = Project::orderBy('completion_date', 'desc')->get();
        $blogPosts = BlogPost::where('status', 'published')->orderBy('published_at', 'desc')->get();
        $caseStudies = CaseStudy::orderBy('id', 'desc')->get();
        $skills = Skill::orderBy('percentage', 'desc')->get();
        $experiences = Experience::orderBy('start_date', 'desc')->get();
        $educations = Education::orderBy('start_date', 'desc')->get();
        $certifications = Certification::orderBy('issue_date', 'desc')->get();
        $codeSnippets = CodeSnippet::orderBy('id', 'desc')->get();
        $resources = Resource::orderBy('id', 'desc')->get();
        $testimonials = Testimonial::where('is_approved', true)->orderBy('created_at', 'desc')->get();
        $resumes = Resume::where('is_active', true)->get();
        $sections = Section::all();

        // Fetch GitHub repositories
        $githubRepos = $this->gitHubService->getPublicRepositories('CodeSproutX');

        $headerSetting = HeaderSetting::first();

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
            'sections' => $sections,
            'headerSetting' => $headerSetting,
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

        // If file doesn't exist, we will create a mock PDF/Text file so the download doesn't fail
        if (! Storage::disk('public')->exists($path)) {
            $contents = "Lakshmi - Full Stack Web Developer Resume\n".
                        "Email: laxmi20024@gmail.com\n".
                        "Phone: +91 6280788413\n".
                        'Role: '.$resume->category."\n\n".
                        'This is a placeholder for the PDF resume. In production, upload the actual PDF in the Filament admin panel.';
            Storage::disk('public')->put($path, $contents);
        }

        return Storage::disk('public')->download($path, basename($path));
    }

    /**
     * Show a single article (blog post).
     */
    public function showArticle(string $slug)
    {
        $article = BlogPost::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $resumes = Resume::where('is_active', true)->get();
        $sections = Section::all();
        $headerSetting = HeaderSetting::first();

        return Inertia::render('article', [
            'article' => $article,
            'resumes' => $resumes,
            'sections' => $sections,
            'headerSetting' => $headerSetting,
        ]);
    }

    /**
     * Show a single API integration showcase.
     */
    public function showShowcase(string $slug)
    {
        $apiSection = Section::where('key', 'api_integrations')->first();
        if (!$apiSection || !isset($apiSection->content['items'])) {
            abort(404);
        }

        $items = collect($apiSection->content['items']);
        
        $item = $items->first(function ($i) use ($slug) {
            return Str::slug($i['name']) === $slug;
        });

        if (!$item) {
            abort(404);
        }

        $resumes = Resume::where('is_active', true)->get();
        $sections = Section::all();
        $headerSetting = HeaderSetting::first();

        return Inertia::render('showcase', [
            'item' => $item,
            'resumes' => $resumes,
            'sections' => $sections,
            'headerSetting' => $headerSetting,
        ]);
    }
}
