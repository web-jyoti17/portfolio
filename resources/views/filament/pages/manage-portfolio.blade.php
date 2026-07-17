<x-filament-panels::page>
    <div x-data="{ activeTab: 'projects' }" class="space-y-6">
        <!-- Tabs Nav -->
        <div class="flex space-x-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl max-w-max border border-gray-200 dark:border-zinc-700 shadow-sm">
            <button 
                type="button" 
                @click="activeTab = 'projects'" 
                :class="activeTab === 'projects' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Projects
            </button>
            <button 
                type="button" 
                @click="activeTab = 'case_studies'" 
                :class="activeTab === 'case_studies' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Case Studies
            </button>
            <button 
                type="button" 
                @click="activeTab = 'skills'" 
                :class="activeTab === 'skills' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Skills
            </button>
            <button 
                type="button" 
                @click="activeTab = 'experiences'" 
                :class="activeTab === 'experiences' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Experiences
            </button>
            <button 
                type="button" 
                @click="activeTab = 'educations'" 
                :class="activeTab === 'educations' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Education
            </button>
            <button 
                type="button" 
                @click="activeTab = 'certifications'" 
                :class="activeTab === 'certifications' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Certifications
            </button>
            <button 
                type="button" 
                @click="activeTab = 'resumes'" 
                :class="activeTab === 'resumes' ? 'bg-white dark:bg-zinc-700 shadow-sm text-yellow-600 dark:text-yellow-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'"
                class="px-4 py-2 text-sm rounded-lg transition-all focus:outline-none"
            >
                Resumes
            </button>
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
