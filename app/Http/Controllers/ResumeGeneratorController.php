<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Section;
use App\Models\Skill;
use App\Models\Resource;
use Illuminate\Http\Request;

class ResumeGeneratorController extends Controller
{
    public function generate(Request $request)
    {
        $experiences = Experience::orderBy('start_date', 'desc')->get();
        $educations = Education::orderBy('start_date', 'desc')->get();
        $projects = Project::where('is_featured', true)->orderBy('completion_date', 'desc')->take(5)->get();
        
        // Group skills by category
        $skills = Skill::orderBy('percentage', 'desc')->get();
        $groupedSkills = $skills->groupBy('category');

        $resources = Resource::orderBy('name')->get();

        $contactSection = Section::where('key', 'contact')->first();
        $bannerSection = Section::where('key', 'banner')->first();

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
