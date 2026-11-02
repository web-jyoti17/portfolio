<?php

namespace App\Filament\Resources\CodeSnippets;

use App\Filament\Resources\CodeSnippets\Pages\CreateCodeSnippet;
use App\Filament\Resources\CodeSnippets\Pages\EditCodeSnippet;
use App\Filament\Resources\CodeSnippets\Pages\ListCodeSnippets;
use App\Filament\Resources\CodeSnippets\Schemas\CodeSnippetForm;
use App\Filament\Resources\CodeSnippets\Tables\CodeSnippetsTable;
use App\Models\CodeSnippet;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CodeSnippetResource extends Resource
{
    protected static ?string $model = CodeSnippet::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static bool $shouldRegisterNavigation = false;

    public static function form(Schema $schema): Schema
    {
        return CodeSnippetForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CodeSnippetsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCodeSnippets::route('/'),
            'create' => CreateCodeSnippet::route('/create'),
            'edit' => EditCodeSnippet::route('/{record}/edit'),
        ];
    }
}
