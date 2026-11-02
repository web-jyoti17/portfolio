<?php

namespace App\Filament\Resources\Sections\Tables;

use App\Filament\Resources\Sections\SectionResource;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class SectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Section')
                    ->weight('bold')
                    ->description(fn ($record) => SectionResource::describe($record->key))
                    ->wrap()
                    ->searchable(),
                ToggleColumn::make('is_visible')
                    ->label('Visible'),
                ToggleColumn::make('show_on_mobile')
                    ->label('Mobile'),
                ToggleColumn::make('show_on_desktop')
                    ->label('Desktop'),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->paginated(false)
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()->label('Manage'),
            ])
            ->toolbarActions([
                // Disable create/bulk actions since list is fixed
            ]);
    }
}
