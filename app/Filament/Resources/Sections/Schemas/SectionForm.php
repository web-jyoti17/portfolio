<?php

namespace App\Filament\Resources\Sections\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
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
                    ->visible(fn ($record) => in_array($record?->key, ['snippets', 'resources', 'blog']))
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
            ]);
    }
}
