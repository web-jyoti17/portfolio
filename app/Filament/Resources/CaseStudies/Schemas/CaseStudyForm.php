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
                Textarea::make('summary')
                    ->required()
                    ->rows(2),
                Textarea::make('challenge')
                    ->required()
                    ->rows(4),
                Textarea::make('solution')
                    ->required()
                    ->rows(4),
                Textarea::make('results')
                    ->required()
                    ->rows(4),
                TagsInput::make('tech_stack')
                    ->nullable(),
                FileUpload::make('image_path')
                    ->image()
                    ->directory('casestudies')
                    ->nullable(),
                TextInput::make('client_name')
                    ->nullable(),
                TextInput::make('duration')
                    ->nullable(),
            ]);
    }
}
