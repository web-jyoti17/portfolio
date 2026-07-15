<?php

namespace App\Filament\Resources\Experiences\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\TagsInput;

class ExperienceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('job_title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('company')
                    ->required()
                    ->maxLength(255),
                TextInput::make('location')
                    ->nullable()
                    ->maxLength(255),
                DatePicker::make('start_date')
                    ->required(),
                DatePicker::make('end_date')
                    ->nullable(),
                Toggle::make('is_current')
                    ->default(false),
                Textarea::make('description')
                    ->rows(3)
                    ->nullable(),
                TagsInput::make('achievements')
                    ->placeholder('Add an achievement and press Enter')
                    ->nullable(),
            ]);
    }
}
