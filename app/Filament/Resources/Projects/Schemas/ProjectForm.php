<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Textarea::make('description')
                    ->required()
                    ->rows(3),
                RichEditor::make('content')
                    ->nullable(),
                FileUpload::make('image_path')
                    ->image()
                    ->directory('projects')
                    ->nullable(),
                TextInput::make('github_url')
                    ->url()
                    ->nullable(),
                TextInput::make('live_url')
                    ->url()
                    ->nullable(),
                TagsInput::make('tech_stack')
                    ->nullable(),
                Select::make('category')
                    ->options([
                        'Laravel' => 'Laravel',
                        'React' => 'React',
                        'Shopify' => 'Shopify',
                        'AI' => 'AI',
                        'WordPress' => 'WordPress',
                    ])
                    ->required(),
                TextInput::make('client_name')
                    ->nullable(),
                DatePicker::make('completion_date')
                    ->nullable(),
                Toggle::make('is_featured')
                    ->default(false),
                Toggle::make('is_proprietary')
                    ->default(false),
            ]);
    }
}
