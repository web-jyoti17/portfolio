<?php

namespace App\Filament\Resources\CodeSnippets\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CodeSnippetForm
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
                Textarea::make('description')
                    ->required()
                    ->rows(2),
                TextInput::make('language')
                    ->placeholder('e.g. PHP, TypeScript, Liquid')
                    ->required()
                    ->maxLength(255),
                Textarea::make('code')
                    ->required()
                    ->rows(10)
                    ->extraAttributes(['style' => 'font-family: monospace;']),
                Select::make('category')
                    ->options([
                        'Backend' => 'Backend',
                        'Frontend' => 'Frontend',
                        'CMS & E-commerce' => 'CMS & E-commerce',
                        'Tools' => 'Tools',
                        'Integrations' => 'Integrations',
                    ])
                    ->required(),
                TagsInput::make('tags')
                    ->nullable(),
                Toggle::make('is_visible')
                    ->label('Show on the site')
                    ->default(true),
            ]);
    }
}
