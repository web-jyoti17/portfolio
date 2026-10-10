<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Experience;
use App\Models\HeaderSetting;
use App\Models\Project;
use App\Models\Resource;
use App\Models\Resume;
use App\Models\Section;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResumeGeneratorController extends Controller
{
    /**
     * Serve the resume linked from the site header.
     *
     * Order: the PDF uploaded in Site Settings, then the newest active entry
     * under Resumes, then the resume generated from the portfolio data.
     */
    public function generate(Request $request)
    {
        $settings = HeaderSetting::current();
        $disk = Storage::disk('public');

        if ($path = $settings->resumePath()) {
            return $disk->response($path, 'Lakshmi-Resume.pdf', ['Content-Type' => 'application/pdf']);
        }

        $uploaded = Resume::where('is_active', true)
            ->latest('id')
            ->get()
            ->first(fn (Resume $resume) => $resume->file_path && $disk->exists($resume->file_path));

        if ($uploaded) {
            $uploaded->increment('download_count');

            return $disk->response($uploaded->file_path, basename($uploaded->file_path));
        }

        $experiences = Experience::orderBy('start_date', 'desc')->get();
        $educations = Education::orderBy('start_date', 'desc')->get();
        $projects = Project::where('is_featured', true)->orderBy('completion_date', 'desc')->take(5)->get();

        // Group skills by category
        $skills = Skill::orderBy('percentage', 'desc')->get();
        $groupedSkills = $skills->groupBy('category');

        $resources = Resource::orderBy('name')->get();

        $contactSection = Section::where('key', 'contact')->first();
        $bannerSection = Section::where('key', 'banner')->first();

        if (is_array($contactSection?->content) && ! $settings->show_phone) {
            $contactSection->content = array_diff_key($contactSection->content, ['phone' => true]);
        }

        $data = [
            'experiences' => $experiences,
            'educations' => $educations,
            'projects' => $projects,
            'groupedSkills' => $groupedSkills,
            'resources' => $resources,
            'contact' => $contactSection ? $contactSection->content : null,
            'banner' => $bannerSection ? $bannerSection->content : null,
            'bannerTitle' => $bannerSection ? $bannerSection->title : 'Full Stack Developer',
        ];

        // For testing/previewing in browser as HTML, uncomment the next line:
        // if ($request->has('html')) return view('resume.ats', $data);

        return view('resume.ats', $data);
    }
}
