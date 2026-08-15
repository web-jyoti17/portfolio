<?php

namespace App\Filament\Resources\Sections\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class SectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->disabled()
                    ->required()
                    ->maxLength(255),
                Toggle::make('is_visible')
                    ->label('Section Visible on Frontend')
                    ->default(true),
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Textarea::make('subtitle')
                    ->rows(3)
                    ->nullable(),

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
                    ->visible(fn ($record) => in_array($record?->key, ['projects', 'snippets', 'resources', 'blog']))
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

                // Dynamic Fields based on section key
                Grid::make(1)
                    ->schema(function (?\Illuminate\Database\Eloquent\Model $record) {
                        // Workaround to not hardcode the model name, just in case
                        if (!$record) return [];
                        
                        return match ($record->key) {
                            'api_integrations' => [
                                \Filament\Forms\Components\Repeater::make('content.items')
                                    ->label('API Integrations')
                                    ->schema([
                                        TextInput::make('name')->required(),
                                        TextInput::make('endpoint')->required(),
                                        \Filament\Forms\Components\RichEditor::make('description')->required(),
                                        \Filament\Forms\Components\Textarea::make('code')->label('Code / Implementation')->nullable()->rows(5),
                                        TextInput::make('icon')->label('Lucide Icon Name')->required(),
                                        \Filament\Forms\Components\MarkdownEditor::make('detailed_content')
                                            ->label('Detailed Content (Shown on Read More)')
                                            ->nullable(),
                                    ])
                            ],
                            'timeline' => [
                                \Filament\Forms\Components\Repeater::make('content.items')
                                    ->label('Timeline Events')
                                    ->schema([
                                        TextInput::make('year')->required(),
                                        TextInput::make('title')->required(),
                                        Textarea::make('description')->required()->rows(3),
                                    ])
                            ],
                            'specializations' => [
                                \Filament\Forms\Components\Repeater::make('content.items')
                                    ->label('Specializations (What I Build)')
                                    ->schema([
                                        TextInput::make('title')->required(),
                                        \Filament\Forms\Components\TagsInput::make('points')->label('Bullet Points')->required(),
                                    ])
                            ],
                            'tech_marquee', 'production_experience' => [
                                \Filament\Forms\Components\TagsInput::make('content.items')
                                    ->label('Skills / Technologies')
                            ],
                            'engineering' => [
                                \Filament\Forms\Components\Repeater::make('content.groups')
                                    ->label('Engineering Experience Groups')
                                    ->schema([
                                        TextInput::make('title')->required(),
                                        \Filament\Forms\Components\TagsInput::make('items')->label('Skills/Technologies')->required(),
                                    ])
                            ],
                            'experience_matrix' => [
                                \Filament\Forms\Components\Repeater::make('content.rows')
                                    ->label('Experience Matrix')
                                    ->schema([
                                        TextInput::make('area')->required(),
                                        TextInput::make('stars')->numeric()->minValue(1)->maxValue(5)->required(),
                                        TextInput::make('level')->required(),
                                    ])
                            ],
                            default => [],
                        };
                    }),
            ]);
    }
}
