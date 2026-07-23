<?php

namespace App\Filament\Resources\Certifications\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CertificationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('issuing_organization')
                    ->required()
                    ->maxLength(255),
                DatePicker::make('issue_date')
                    ->required(),
                DatePicker::make('expiration_date')
                    ->nullable(),
                TextInput::make('credential_id')
                    ->nullable()
                    ->maxLength(255),
                TextInput::make('credential_url')
                    ->url()
                    ->nullable(),
                TagsInput::make('skills_covered')
                    ->placeholder('Add a skill and press Enter')
                    ->nullable(),
                FileUpload::make('image_path')
                    ->disk('public')
                    ->directory('certifications')
                    ->visibility('public')
                    ->nullable(),
            ]);
    }
}
