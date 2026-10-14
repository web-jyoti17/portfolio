<?php

namespace App\Filament\Resources\BlogPosts\Tables;

use App\Filament\Resources\BlogPosts\Pages\ListBlogPosts;
use App\Models\BlogPost;
use App\Services\BlogTransferService;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

class BlogPostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->disk('public')
                    ->label('Cover'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        default => 'primary',
                    })
                    ->sortable(),
                TextColumn::make('views_count')
                    ->label('Views')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('reads_count')
                    ->label('Read to the end')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->defaultSort('published_at', 'desc')
            ->recordActions([
                Action::make('export')
                    ->label('Export')
                    ->icon(Heroicon::OutlinedArrowDownTray)
                    ->color('gray')
                    ->action(fn (BlogPost $record, BlogTransferService $transfer) => ListBlogPosts::download($transfer, [$record], $record->slug)),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('export')
                        ->label('Export selected')
                        ->icon(Heroicon::OutlinedArrowDownTray)
                        ->action(fn (Collection $records, BlogTransferService $transfer) => ListBlogPosts::download($transfer, $records)),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
