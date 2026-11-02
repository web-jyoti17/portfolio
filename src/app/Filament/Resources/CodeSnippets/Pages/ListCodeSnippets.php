<?php

namespace App\Filament\Resources\CodeSnippets\Pages;

use App\Filament\Resources\CodeSnippets\CodeSnippetResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCodeSnippets extends ListRecords
{
    protected static string $resource = CodeSnippetResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
