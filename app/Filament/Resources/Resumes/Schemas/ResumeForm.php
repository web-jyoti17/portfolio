<?php

namespace App\Filament\Resources\Resumes\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ResumeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('file_path')
                    ->disk('public')
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/vnd.ms-powerpoint',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    ])
                    ->directory('resumes')
                    ->visibility('public')
                    ->required(),
                TextInput::make('category')
                    ->placeholder('e.g. Laravel Resume, Full Stack Resume')
                    ->required()
                    ->maxLength(255),
                TextInput::make('download_count')
                    ->numeric()
                    ->default(0)
                    ->disabled()
                    ->dehydrated(false),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
