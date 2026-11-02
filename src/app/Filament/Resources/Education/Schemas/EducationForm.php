<?php

namespace App\Filament\Resources\Education\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class EducationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('degree')
                    ->required()
                    ->maxLength(255),
                TextInput::make('field_of_study')
                    ->required()
                    ->maxLength(255),
                TextInput::make('institution')
                    ->required()
                    ->maxLength(255),
                TextInput::make('location')
                    ->nullable()
                    ->maxLength(255),
                DatePicker::make('start_date')
                    ->required(),
                DatePicker::make('end_date')
                    ->nullable(),
                Textarea::make('description')
                    ->rows(3)
                    ->nullable(),
            ]);
    }
}
