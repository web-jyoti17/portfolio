<?php

namespace App\Filament\Resources\Sections\Pages;

use App\Filament\Resources\BlogPosts\Schemas\BlogPostForm;
use App\Filament\Resources\BlogPosts\Tables\BlogPostsTable;
use App\Filament\Resources\CaseStudies\Schemas\CaseStudyForm;
use App\Filament\Resources\CaseStudies\Tables\CaseStudiesTable;
use App\Filament\Resources\Certifications\Schemas\CertificationForm;
use App\Filament\Resources\Certifications\Tables\CertificationsTable;
use App\Filament\Resources\CodeSnippets\Schemas\CodeSnippetForm;
use App\Filament\Resources\CodeSnippets\Tables\CodeSnippetsTable;
use App\Filament\Resources\Education\Schemas\EducationForm;
use App\Filament\Resources\Education\Tables\EducationTable;
use App\Filament\Resources\Experiences\Schemas\ExperienceForm;
use App\Filament\Resources\Experiences\Tables\ExperiencesTable;
use App\Filament\Resources\Projects\Schemas\ProjectForm;
use App\Filament\Resources\Projects\Tables\ProjectsTable;
use App\Filament\Resources\Resources\Schemas\ResourceForm;
use App\Filament\Resources\Resources\Tables\ResourcesTable;
use App\Filament\Resources\Sections\SectionResource;
use App\Filament\Resources\Skills\Schemas\SkillForm;
use App\Filament\Resources\Skills\Tables\SkillsTable;
use App\Livewire\PortfolioTable;
use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Certification;
use App\Models\CodeSnippet;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Resource;
use App\Models\Skill;
use Filament\Actions\Action;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Livewire;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

/**
 * One screen per page section: its heading, visibility and options at the top,
 * and the items it shows (projects, skills, articles and so on) underneath.
 */
class EditSection extends EditRecord
{
    protected static string $resource = SectionResource::class;

    /**
     * The item lists each section shows: [heading, help text, model, table, form].
     */
    private const LISTS = [
        'projects' => [
            ['Projects', 'Every project in this section. Drag to reorder, switch Visible off to hide one.', Project::class, ProjectsTable::class, ProjectForm::class],
        ],
        'case_studies' => [
            ['Case studies', 'Each card in this section. Upload an image to replace the default cover.', CaseStudy::class, CaseStudiesTable::class, CaseStudyForm::class],
        ],
        'tech_marquee' => [
            ['Skills', 'Shown under the ticker, grouped by their category.', Skill::class, SkillsTable::class, SkillForm::class],
        ],
        'skills' => [
            ['Skills', 'Grouped by their category. This section only appears when Core Stack and Tools is not already listing the skills.', Skill::class, SkillsTable::class, SkillForm::class],
        ],
        'experience' => [
            ['Roles', 'Each job or contract, newest first unless you reorder them.', Experience::class, ExperiencesTable::class, ExperienceForm::class],
            ['Education', 'Shown below the roles.', Education::class, EducationTable::class, EducationForm::class],
        ],
        'snippets' => [
            ['Code snippets', 'Every snippet in the library.', CodeSnippet::class, CodeSnippetsTable::class, CodeSnippetForm::class],
        ],
        'resources' => [
            ['Tools', 'Every tool in the toolkit slider.', Resource::class, ResourcesTable::class, ResourceForm::class],
        ],
        'blog' => [
            ['Articles', 'Published articles appear in this section. Import and export live on the Blog Posts page.', BlogPost::class, BlogPostsTable::class, BlogPostForm::class],
        ],
        'certifications' => [
            ['Certifications', 'Each certificate card.', Certification::class, CertificationsTable::class, CertificationForm::class],
        ],
    ];

    /**
     * Where each section sits on the portfolio page.
     */
    private const ANCHORS = [
        'banner' => 'about',
        'tech_marquee' => 'skills',
        'projects' => 'projects',
        'case_studies' => 'case-studies',
        'experience' => 'experience',
        'experience_matrix' => 'matrix',
        'production_experience' => 'production',
        'api_integrations' => 'api',
        'timeline' => 'timeline',
        'specializations' => 'specializations',
        'skills' => 'skills',
        'snippets' => 'snippets',
        'resources' => 'toolkit',
        'blog' => 'blog',
        'github' => 'github',
        'certifications' => 'certifications',
        'contact' => 'contact',
    ];

    public function getTitle(): string
    {
        return $this->getRecord()->title ?: 'Section';
    }

    public function getSubheading(): ?string
    {
        return SectionResource::describe($this->getRecord()->key);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('viewOnSite')
                ->label('View on site')
                ->icon(Heroicon::OutlinedArrowTopRightOnSquare)
                ->color('gray')
                ->url(fn () => url('/#'.(self::ANCHORS[$this->getRecord()->key] ?? '')))
                ->openUrlInNewTab(),
        ];
    }

    public function content(Schema $schema): Schema
    {
        $components = [$this->getFormContentComponent()];

        foreach (self::LISTS[$this->getRecord()->key] ?? [] as $index => [$heading, $help, $model, $table, $form]) {
            $components[] = Section::make($heading)
                ->description($help)
                ->schema([
                    Livewire::make(PortfolioTable::class, [
                        'model' => $model,
                        'configClass' => $table,
                        'formClass' => $form,
                        'identifier' => $this->getRecord()->key.'-'.$index,
                    ])->key('section-list-'.$this->getRecord()->key.'-'.$index),
                ]);
        }

        return $schema->components($components);
    }
}
