<?php

namespace App\Filament\Resources\Sections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Model;

class SectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Heading and visibility')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('subtitle')
                            ->rows(2)
                            ->nullable(),
                        Toggle::make('is_visible')
                            ->label('Show this section')
                            ->helperText('Off hides it everywhere.')
                            ->default(true),
                        Toggle::make('show_on_mobile')
                            ->label('Show on phones')
                            ->default(true),
                        Toggle::make('show_on_desktop')
                            ->label('Show on larger screens')
                            ->default(true),
                    ])
                    ->columns(3)
                    ->columnSpanFull(),

                // Banner specific fields
                Textarea::make('content.hero_subtitle')
                    ->label('Hero Subtitle')
                    ->rows(4)
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->nullable(),
                TextInput::make('content.button_text_1')
                    ->label('Button 1 Text (Contact)')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->nullable(),
                TextInput::make('content.button_text_2')
                    ->label('Button 2 Text (GitHub)')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->nullable(),

                // Slider specific fields
                Toggle::make('content.use_slider')
                    ->label('Use Slider/Carousel Layout')
                    ->visible(fn ($record) => in_array($record?->key, ['projects']))
                    ->default(false),

                // Contact specific fields
                TextInput::make('content.email')
                    ->label('Contact Email')
                    ->email()
                    ->visible(fn ($record) => $record?->key === 'contact')
                    ->nullable(),
                TextInput::make('content.phone')
                    ->label('Contact Phone')
                    ->visible(fn ($record) => $record?->key === 'contact')
                    ->nullable(),

                TagsInput::make('content.project_types')
                    ->label('Contact form: project type options')
                    ->helperText('Shown in the "Project type" dropdown of the contact form.')
                    ->visible(fn ($record) => $record?->key === 'contact')
                    ->nullable(),
                Toggle::make('content.show_form')
                    ->label('Show the contact form')
                    ->visible(fn ($record) => $record?->key === 'contact')
                    ->default(true),

                // Hero
                Toggle::make('content.show_badge')
                    ->label('Show the availability badge')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->default(true),
                TextInput::make('content.badge_text')
                    ->label('Availability badge text')
                    ->placeholder('Available for Freelance / Full-time')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->nullable(),
                Repeater::make('content.stats')
                    ->label('Hero numbers')
                    ->helperText('For example "3+" and "Years Experience". Leave empty to hide the row.')
                    ->schema([
                        TextInput::make('value')->required(),
                        TextInput::make('label')->required(),
                    ])
                    ->columns(2)
                    ->maxItems(4)
                    ->defaultItems(0)
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->columnSpanFull(),
                Toggle::make('content.show_terminal')
                    ->label('Show a panel next to the intro')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->default(true),
                Select::make('content.hero_visual')
                    ->label('Panel next to the intro')
                    ->options([
                        'profile' => 'Profile card (name, current role, stack, product, links)',
                        'terminal' => 'Terminal (the rows below)',
                    ])
                    ->default('profile')
                    ->selectablePlaceholder(false)
                    ->visible(fn ($record) => $record?->key === 'banner'),
                TextInput::make('content.terminal_title')
                    ->label('Terminal panel title')
                    ->placeholder('production-monitor — bash')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->nullable(),
                Repeater::make('content.terminal_rows')
                    ->label('Terminal panel rows')
                    ->schema([
                        TextInput::make('label')->required(),
                        TextInput::make('value')->required(),
                        Select::make('color')
                            ->options(['green' => 'Green', 'accent' => 'Accent', 'blue' => 'Blue', 'yellow' => 'Yellow'])
                            ->default('green')
                            ->selectablePlaceholder(false),
                    ])
                    ->columns(3)
                    ->defaultItems(0)
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->columnSpanFull(),
                TagsInput::make('content.terminal_log')
                    ->label('Terminal panel footer lines')
                    ->visible(fn ($record) => $record?->key === 'banner')
                    ->nullable(),

                // Core stack
                Select::make('content.layout')
                    ->label('Layout')
                    ->options([
                        'both' => 'Moving ticker + skills grouped by category',
                        'ticker' => 'Moving ticker only',
                        'cards' => 'Skills grouped by category only',
                    ])
                    ->helperText('The grouped skills come from the Skills list. While they are shown here, the separate "Skills & Tech Stack" section is not repeated further down the page.')
                    ->default('both')
                    ->selectablePlaceholder(false)
                    ->visible(fn ($record) => $record?->key === 'tech_marquee'),
                TextInput::make('content.speed')
                    ->label('Ticker speed (seconds for one loop)')
                    ->numeric()
                    ->minValue(8)
                    ->maxValue(120)
                    ->placeholder('32')
                    ->visible(fn ($record) => $record?->key === 'tech_marquee'),

                // Code snippets
                Toggle::make('content.show_filters')
                    ->label('Show category filters')
                    ->visible(fn ($record) => $record?->key === 'snippets')
                    ->default(true),
                Toggle::make('content.show_search')
                    ->label('Show the search box')
                    ->visible(fn ($record) => $record?->key === 'snippets')
                    ->default(true),
                Toggle::make('content.show_bookmarks')
                    ->label('Allow bookmarking')
                    ->visible(fn ($record) => $record?->key === 'snippets')
                    ->default(true),
                Toggle::make('content.show_download')
                    ->label('Show the download button')
                    ->visible(fn ($record) => $record?->key === 'snippets')
                    ->default(true),
                Toggle::make('content.show_description')
                    ->label('Show each snippet\'s description')
                    ->visible(fn ($record) => $record?->key === 'snippets')
                    ->default(true),

                // How many items a section lists
                TextInput::make('content.limit')
                    ->label('Maximum items to show')
                    ->helperText('Leave empty to show all. Choose which items appear, and their order, in that item\'s own list.')
                    ->numeric()
                    ->minValue(1)
                    ->visible(fn ($record) => in_array($record?->key, ['snippets', 'blog', 'resources', 'case_studies', 'github', 'projects']))
                    ->nullable(),

                // Dynamic Fields based on section key
                Grid::make(1)
                    ->schema(function (?Model $record) {
                        // Workaround to not hardcode the model name, just in case
                        if (! $record) {
                            return [];
                        }

                        return match ($record->key) {
                            'products' => [
                                Repeater::make('content.items')
                                    ->label('Products')
                                    ->schema([
                                        TextInput::make('name')->required(),
                                        TextInput::make('status')
                                            ->label('Status badge')
                                            ->placeholder('Live, Beta, Coming soon')
                                            ->nullable(),
                                        TextInput::make('tagline')->required()->columnSpanFull(),
                                        Textarea::make('description')->rows(3)->columnSpanFull()->nullable(),
                                        FileUpload::make('logo')
                                            ->label('Logo')
                                            ->disk('public')
                                            ->directory('products')
                                            ->visibility('public')
                                            ->image()
                                            ->nullable(),
                                        TagsInput::make('tech_stack')->label('Built with')->nullable(),
                                        Repeater::make('features')
                                            ->label('Key features')
                                            ->schema([
                                                TextInput::make('icon')
                                                    ->label('Lucide icon name')
                                                    ->helperText('For example Mic, BellRing or CalendarDays. See lucide.dev/icons.')
                                                    ->nullable(),
                                                TextInput::make('title')->required(),
                                                Textarea::make('body')->rows(2)->required(),
                                            ])
                                            ->columns(3)
                                            ->maxItems(6)
                                            ->defaultItems(0)
                                            ->columnSpanFull(),
                                        TextInput::make('primary_label')->label('Main button text')->placeholder('Try it free')->nullable(),
                                        TextInput::make('primary_url')->label('Main button link')->url()->nullable(),
                                        TextInput::make('secondary_label')->label('Second button text')->placeholder('Visit website')->nullable(),
                                        TextInput::make('secondary_url')->label('Second button link')->url()->nullable(),
                                        Toggle::make('show_in_hero')
                                            ->label('Mention it at the top of the page')
                                            ->default(false),
                                    ])
                                    ->columns(2),
                            ],
                            'api_integrations' => [
                                Repeater::make('content.items')
                                    ->label('API Integrations')
                                    ->schema([
                                        TextInput::make('name')->required(),
                                        TextInput::make('endpoint')->required(),
                                        RichEditor::make('description')->required(),
                                        Textarea::make('code')->label('Code / Implementation')->nullable()->rows(5),
                                        TextInput::make('icon')->label('Lucide Icon Name')->required(),
                                        FileUpload::make('image')
                                            ->label('Card image')
                                            ->disk('public')
                                            ->directory('api')
                                            ->visibility('public')
                                            ->image()
                                            ->nullable(),
                                        MarkdownEditor::make('detailed_content')
                                            ->label('Detailed Content (Shown on Read More)')
                                            ->nullable(),
                                    ]),
                            ],
                            'timeline' => [
                                Repeater::make('content.items')
                                    ->label('Timeline Events')
                                    ->schema([
                                        TextInput::make('year')->required(),
                                        TextInput::make('title')->required(),
                                        Textarea::make('description')->required()->rows(3),
                                    ]),
                            ],
                            'specializations' => [
                                Repeater::make('content.items')
                                    ->label('Specializations (What I Build)')
                                    ->schema([
                                        TextInput::make('title')->required(),
                                        TextInput::make('icon')
                                            ->label('Lucide icon name')
                                            ->helperText('For example HeartPulse, ShoppingBag or Smartphone. See lucide.dev/icons.')
                                            ->nullable(),
                                        TagsInput::make('points')->label('Bullet Points')->required(),
                                    ]),
                            ],
                            'tech_marquee', 'production_experience' => [
                                TagsInput::make('content.items')
                                    ->label('Skills / Technologies'),
                            ],
                            'engineering' => [
                                Repeater::make('content.groups')
                                    ->label('Engineering Experience Groups')
                                    ->schema([
                                        TextInput::make('title')->required(),
                                        TagsInput::make('items')->label('Skills/Technologies')->required(),
                                    ]),
                            ],
                            'experience_matrix' => [
                                Repeater::make('content.rows')
                                    ->label('Experience Matrix')
                                    ->schema([
                                        TextInput::make('area')->required(),
                                        TextInput::make('stars')->numeric()->minValue(1)->maxValue(5)->required(),
                                        TextInput::make('level')->required(),
                                    ]),
                            ],
                            default => [],
                        };
                    }),
            ]);
    }
}
