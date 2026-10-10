<?php

namespace App\Filament\Resources\ContactMessages;

use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Models\ContactMessage;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedEnvelope;

    protected static ?string $navigationLabel = 'Contact Messages';

    protected static ?string $modelLabel = 'message';

    public static function getNavigationBadge(): ?string
    {
        $unread = ContactMessage::whereNull('read_at')->count();

        return $unread > 0 ? (string) $unread : null;
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                IconColumn::make('read_at')
                    ->label('Read')
                    ->boolean()
                    ->getStateUsing(fn (ContactMessage $record) => $record->read_at !== null),
                TextColumn::make('name')
                    ->description(fn (ContactMessage $record) => $record->email)
                    ->searchable(['name', 'email']),
                TextColumn::make('project_type')
                    ->label('Project type')
                    ->toggleable(),
                TextColumn::make('message')
                    ->limit(70)
                    ->wrap(),
                IconColumn::make('email_sent')
                    ->label('Emailed')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->since()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                Action::make('view')
                    ->label('Read')
                    ->icon(Heroicon::OutlinedEye)
                    ->modalHeading(fn (ContactMessage $record) => 'Message from '.$record->name)
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close')
                    ->mountUsing(fn (ContactMessage $record) => $record->read_at ?? $record->update(['read_at' => now()]))
                    ->schema([
                        TextEntry::make('email')->state(fn (ContactMessage $record) => $record->email)->copyable(),
                        TextEntry::make('company')->state(fn (ContactMessage $record) => $record->company ?: 'Not given'),
                        TextEntry::make('project_type')->label('Project type')->state(fn (ContactMessage $record) => $record->project_type ?: 'Not given'),
                        TextEntry::make('created_at')->label('Received')->state(fn (ContactMessage $record) => $record->created_at->format('j M Y, g:i A')),
                        TextEntry::make('message')->state(fn (ContactMessage $record) => $record->message)->columnSpanFull(),
                    ]),
                Action::make('reply')
                    ->label('Reply')
                    ->icon(Heroicon::OutlinedPaperAirplane)
                    ->url(fn (ContactMessage $record) => 'mailto:'.$record->email.'?subject='.rawurlencode('Re: your project inquiry')),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListContactMessages::route('/'),
        ];
    }
}
