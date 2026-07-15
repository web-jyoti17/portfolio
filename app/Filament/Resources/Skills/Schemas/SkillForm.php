<?php

namespace App\Filament\Resources\Skills\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\ColorPicker;

class SkillForm
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
                        'Backend' => 'Backend',
                        'Frontend' => 'Frontend',
                        'CMS & E-commerce' => 'CMS & E-commerce',
                        'Tools' => 'Tools',
                        'Integrations' => 'Integrations',
                    ])
                    ->required(),
                Select::make('level')
                    ->options([
                        'beginner' => 'Beginner',
                        'intermediate' => 'Intermediate',
                        'advanced' => 'Advanced',
                        'expert' => 'Expert',
                    ])
                    ->required(),
                Slider::make('percentage')
                    ->min(0)
                    ->max(100)
                    ->default(100)
                    ->required(),
                TextInput::make('icon_class')
                    ->placeholder('fab fa-laravel or fas fa-code')
                    ->nullable(),
                ColorPicker::make('color')
                    ->nullable(),
                TextInput::make('years_of_experience')
                    ->numeric()
                    ->default(0)
                    ->required(),
            ]);
    }
}
