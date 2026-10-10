<?php

namespace App\Filament\Resources\Sections;

use App\Filament\Resources\Sections\Pages\EditSection;
use App\Filament\Resources\Sections\Pages\ListSections;
use App\Filament\Resources\Sections\Schemas\SectionForm;
use App\Filament\Resources\Sections\Tables\SectionsTable;
use App\Models\Section;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class SectionResource extends Resource
{
    protected static ?string $model = Section::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Page Sections';

    protected static \UnitEnum|string|null $navigationGroup = 'Portfolio';

    protected static ?int $navigationSort = 1;

    protected static ?string $modelLabel = 'section';

    /**
     * What each section's screen controls, in plain words.
     */
    private const DESCRIPTIONS = [
        'banner' => 'The intro at the top: heading, text, buttons, the three numbers and the terminal panel.',
        'tech_marquee' => 'The moving ticker of technologies and, below it, your skills grouped by category.',
        'projects' => 'The Featured Projects slider and every project in it.',
        'case_studies' => 'The case study cards and their detail drawers.',
        'experience' => 'Your roles, their key contributions, and your education.',
        'experience_matrix' => 'Where I Am Strongest: each area and its level.',
        'production_experience' => 'A checklist of production and deployment work.',
        'api_integrations' => 'The API integration cards and their "How to use it" pages.',
        'timeline' => 'How your stack has grown, year by year. Shown beside What I Build.',
        'specializations' => 'What I Build: the kinds of systems, each with bullet points.',
        'skills' => 'A separate skills section. Hidden automatically while Core Stack and Tools lists the skills.',
        'snippets' => 'The code snippet library and its options.',
        'resources' => 'The Developer Toolkit slider and every tool in it.',
        'blog' => 'The Articles section and the articles in it.',
        'github' => 'Repositories loaded live from GitHub. The username is in Site Settings.',
        'certifications' => 'Certificate cards.',
        'contact' => 'The contact form, its project-type options and the contact details beside it.',
        'engineering' => 'Not shown on the site at the moment.',
    ];

    public static function describe(?string $key): ?string
    {
        return self::DESCRIPTIONS[$key] ?? null;
    }

    public static function form(Schema $schema): Schema
    {
        return SectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SectionsTable::configure($table);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSections::route('/'),
            'edit' => EditSection::route('/{record}/edit'),
        ];
    }
}
