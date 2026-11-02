<x-filament-panels::page>
    <style>
        .custom-tabs-container {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .custom-tabs-wrapper nav {
            background-color: #f3f4f6 !important;
            padding: 0.375rem !important;
            border-radius: 0.75rem !important;
        }
        .dark .custom-tabs-wrapper nav {
            background-color: #1f2937 !important;
        }
        .custom-tab {
            transition: all 0.2s !important;
        }
        .custom-tab.custom-tab-active {
            background-color: var(--primary-500, #ea580c) !important;
            color: white !important;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
        }
        .custom-tab:not(.custom-tab-active):hover {
            background-color: #e5e7eb !important;
        }
        .dark .custom-tab:not(.custom-tab-active):hover {
            background-color: #374151 !important;
        }
    </style>

    <div x-data="{ activeTab: 'projects' }" class="space-y-6">
        <!-- Tabs Nav -->
        <div class="custom-tabs-container custom-tabs-wrapper">
            <x-filament::tabs label="Portfolio Sections">
                <x-filament::tabs.item
                    alpine-active="activeTab === 'projects'"
                    x-on:click="activeTab = 'projects'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'projects' }"
                >
                    Projects
                </x-filament::tabs.item>
                
                <x-filament::tabs.item
                    alpine-active="activeTab === 'case_studies'"
                    x-on:click="activeTab = 'case_studies'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'case_studies' }"
                >
                    Case Studies
                </x-filament::tabs.item>

                <x-filament::tabs.item
                    alpine-active="activeTab === 'skills'"
                    x-on:click="activeTab = 'skills'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'skills' }"
                >
                    Skills
                </x-filament::tabs.item>
                
                <x-filament::tabs.item
                    alpine-active="activeTab === 'experiences'"
                    x-on:click="activeTab = 'experiences'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'experiences' }"
                >
                    Experiences
                </x-filament::tabs.item>

                <x-filament::tabs.item
                    alpine-active="activeTab === 'educations'"
                    x-on:click="activeTab = 'educations'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'educations' }"
                >
                    Education
                </x-filament::tabs.item>

                <x-filament::tabs.item
                    alpine-active="activeTab === 'certifications'"
                    x-on:click="activeTab = 'certifications'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'certifications' }"
                >
                    Certifications
                </x-filament::tabs.item>

                <x-filament::tabs.item
                    alpine-active="activeTab === 'resumes'"
                    x-on:click="activeTab = 'resumes'"
                    class="custom-tab"
                    x-bind:class="{ 'custom-tab-active': activeTab === 'resumes' }"
                >
                    Resumes
                </x-filament::tabs.item>
            </x-filament::tabs>
        </div>

        <!-- Tab Panels -->
        <div x-show="activeTab === 'projects'" class="space-y-4">
            <livewire:portfolio-table 
                model="App\Models\Project"
                config-class="App\Filament\Resources\Projects\Tables\ProjectsTable"
                form-class="App\Filament\Resources\Projects\Schemas\ProjectForm"
                identifier="projects"
            />
        </div>
        
        <div x-show="activeTab === 'case_studies'" class="space-y-4" x-cloak>
            <livewire:portfolio-table 
                model="App\Models\CaseStudy"
                config-class="App\Filament\Resources\CaseStudies\Tables\CaseStudiesTable"
                form-class="App\Filament\Resources\CaseStudies\Schemas\CaseStudyForm"
                identifier="caseStudies"
            />
        </div>
        
        <div x-show="activeTab === 'skills'" class="space-y-4" x-cloak>
            <livewire:portfolio-table 
                model="App\Models\Skill"
                config-class="App\Filament\Resources\Skills\Tables\SkillsTable"
                form-class="App\Filament\Resources\Skills\Schemas\SkillForm"
                identifier="skills"
            />
        </div>
        
        <div x-show="activeTab === 'experiences'" class="space-y-4" x-cloak>
            <livewire:portfolio-table 
                model="App\Models\Experience"
                config-class="App\Filament\Resources\Experiences\Tables\ExperiencesTable"
                form-class="App\Filament\Resources\Experiences\Schemas\ExperienceForm"
                identifier="experiences"
            />
        </div>
        
        <div x-show="activeTab === 'educations'" class="space-y-4" x-cloak>
            <livewire:portfolio-table 
                model="App\Models\Education"
                config-class="App\Filament\Resources\Education\Tables\EducationTable"
                form-class="App\Filament\Resources\Education\Schemas\EducationForm"
                identifier="educations"
            />
        </div>
        
        <div x-show="activeTab === 'certifications'" class="space-y-4" x-cloak>
            <livewire:portfolio-table 
                model="App\Models\Certification"
                config-class="App\Filament\Resources\Certifications\Tables\CertificationsTable"
                form-class="App\Filament\Resources\Certifications\Schemas\CertificationForm"
                identifier="certifications"
            />
        </div>
        
        <div x-show="activeTab === 'resumes'" class="space-y-4" x-cloak>
            <livewire:portfolio-table 
                model="App\Models\Resume"
                config-class="App\Filament\Resources\Resumes\Tables\ResumesTable"
                form-class="App\Filament\Resources\Resumes\Schemas\ResumeForm"
                identifier="resumes"
            />
        </div>
    </div>
</x-filament-panels::page>
