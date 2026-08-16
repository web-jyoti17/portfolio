<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resume</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0;
        }
        h1 {
            font-size: 16pt;
            font-weight: bold;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        h2 {
            font-size: 12pt;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #000;
            margin-top: 15px;
            margin-bottom: 10px;
            padding-bottom: 2px;
        }
        h3 {
            font-size: 11pt;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 2px;
        }
        .contact-info {
            font-size: 10pt;
            margin-bottom: 15px;
        }
        .date-location {
            font-style: italic;
            font-size: 10pt;
            float: right;
        }
        p {
            margin-top: 0;
            margin-bottom: 5px;
        }
        ul {
            margin-top: 5px;
            margin-bottom: 10px;
            padding-left: 20px;
        }
        li {
            margin-bottom: 3px;
        }
        .skills-category {
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Lakshmi</h1>
        <div class="contact-info">
            {{ $contact['email'] ?? 'laxmi20024@gmail.com' }} | 
            {{ $contact['phone'] ?? '+91 6280788413' }} | 
            Punjab, India | 
            github.com/CodeSproutX
        </div>
    </div>

    @if($bannerTitle || ($banner && isset($banner['hero_subtitle'])))
    <div class="section summary">
        <h2>Professional Summary</h2>
        <p>{{ $bannerTitle }}</p>
        @if($banner && isset($banner['hero_subtitle']))
            <p>{{ $banner['hero_subtitle'] }}</p>
        @endif
    </div>
    @endif

    <div class="section skills">
        <h2>Technical Skills</h2>
        @foreach($groupedSkills as $category => $skillList)
            <p>
                <span class="skills-category">{{ $category ?: 'Core' }}:</span> 
                {{ $skillList->pluck('name')->join(', ') }}
            </p>
        @endforeach
    </div>

    @if(isset($resources) && count($resources) > 0)
    <div class="section resources">
        <h2>Tools & Resources</h2>
        <p>
            {{ $resources->pluck('name')->join(', ') }}
        </p>
    </div>
    @endif

    <div class="section experience">
        <h2>Professional Experience</h2>
        @foreach($experiences as $exp)
            <div class="job">
                <h3>
                    {{ $exp->job_title }} at {{ $exp->company }}
                    <span class="date-location">
                        {{ \Carbon\Carbon::parse($exp->start_date)->format('M Y') }} - 
                        {{ $exp->is_current ? 'Present' : ($exp->end_date ? \Carbon\Carbon::parse($exp->end_date)->format('M Y') : '') }}
                        {{ $exp->location ? ' | ' . $exp->location : '' }}
                    </span>
                </h3>
                @if($exp->description)
                    <p>{!! strip_tags($exp->description) !!}</p>
                @endif
                @if($exp->achievements && count($exp->achievements) > 0)
                    <ul>
                        @foreach($exp->achievements as $achievement)
                            <li>{{ $achievement }}</li>
                        @endforeach
                    </ul>
                @endif
            </div>
        @endforeach
    </div>

    <div class="section projects">
        <h2>Key Projects</h2>
        @foreach($projects as $project)
            <div class="project">
                <h3>
                    {{ $project->title }}
                    <span class="date-location">
                        {{ $project->completion_date ? \Carbon\Carbon::parse($project->completion_date)->format('M Y') : '' }}
                    </span>
                </h3>
                @if($project->tech_stack && count($project->tech_stack) > 0)
                    <p><em>Technologies: {{ implode(', ', $project->tech_stack) }}</em></p>
                @endif
                <p>{!! strip_tags($project->description) !!}</p>
            </div>
        @endforeach
    </div>

    @if(count($educations) > 0)
    <div class="section education">
        <h2>Education</h2>
        @foreach($educations as $edu)
            <div class="school">
                <h3>
                    {{ $edu->degree }} in {{ $edu->field_of_study }}
                    <span class="date-location">
                        {{ \Carbon\Carbon::parse($edu->start_date)->format('Y') }} - 
                        {{ $edu->end_date ? \Carbon\Carbon::parse($edu->end_date)->format('Y') : 'Present' }}
                    </span>
                </h3>
                <p>{{ $edu->institution }}{{ $edu->location ? ', ' . $edu->location : '' }}</p>
            </div>
        @endforeach
    </div>
    @endif

    <script>
        window.onload = function() {
            window.print();
        };
    </script>
</body>
</html>
