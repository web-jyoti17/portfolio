<?php

namespace App\Filament\Resources\CaseStudies\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CaseStudyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                \Filament\Forms\Components\RichEditor::make('summary')
                    ->required(),
                \Filament\Forms\Components\RichEditor::make('challenge')
                    ->required(),
                \Filament\Forms\Components\RichEditor::make('solution')
                    ->required(),
                \Filament\Forms\Components\RichEditor::make('results')
                    ->required(),
                TagsInput::make('tech_stack')
                    ->nullable(),
                FileUpload::make('image_path')
                    ->disk('public')
                    ->directory('casestudies')
                    ->visibility('public')
                    ->nullable(),
                TextInput::make('client_name')
                    ->nullable(),
                TextInput::make('duration')
                    ->nullable(),
            ]);
    }
}
