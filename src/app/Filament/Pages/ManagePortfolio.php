<?php

namespace App\Filament\Pages;

use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class ManagePortfolio extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static bool $shouldRegisterNavigation = false;

    protected string $view = 'filament.pages.manage-portfolio';

    protected static ?string $navigationLabel = 'Manage Portfolio';

    protected static ?string $title = 'Manage Portfolio';
}
