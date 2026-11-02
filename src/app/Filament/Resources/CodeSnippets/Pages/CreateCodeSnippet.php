<?php

namespace App\Filament\Resources\CodeSnippets\Pages;

use App\Filament\Resources\CodeSnippets\CodeSnippetResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCodeSnippet extends CreateRecord
{
    protected static string $resource = CodeSnippetResource::class;
}
