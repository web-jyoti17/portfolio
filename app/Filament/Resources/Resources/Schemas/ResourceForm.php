<?php

namespace App\Filament\Resources\Resources\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;

class ResourceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Select::make('category')
                    ->options([
                        'Laravel Packages' => 'Laravel Packages',
                        'VS Code Extensions' => 'VS Code Extensions',
                        'AI Tools' => 'AI Tools',
                        'API Testing Tools' => 'API Testing Tools',
                        'Deployment Tools' => 'Deployment Tools',
                        'Design Resources' => 'Design Resources',
                    ])
                    ->required(),
                TextInput::make('url')
                    ->url()
                    ->required()
                    ->maxLength(255),
                Textarea::make('description')
                    ->required()
                    ->rows(2),
                FileUpload::make('image_path')
                    ->image()
                    ->directory('resources')
                    ->nullable(),
                TagsInput::make('tags')
                    ->nullable(),
                Toggle::make('is_featured')
                    ->default(false),
            ]);
    }
}
