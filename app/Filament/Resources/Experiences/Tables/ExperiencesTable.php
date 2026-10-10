<?php

namespace App\Filament\Resources\Experiences\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ExperiencesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('job_title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('company')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('location')
                    ->sortable(),
                IconColumn::make('is_current')
                    ->boolean()
                    ->sortable(),
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                ToggleColumn::make('is_visible')
                    ->label('Visible'),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
