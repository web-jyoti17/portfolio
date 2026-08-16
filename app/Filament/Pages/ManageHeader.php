<?php

namespace App\Filament\Pages;

use App\Models\HeaderSetting;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Schemas\Schema;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class ManageHeader extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedGlobeAlt;

    protected static ?string $navigationLabel = 'Header Settings';
    
    protected static \UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?string $title = 'Manage Header';

    protected string $view = 'filament.pages.manage-header';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = HeaderSetting::first();
        if ($settings) {
            $this->form->fill($settings->toArray());
        } else {
            $this->form->fill([
                'logo_text' => 'Lakshmi.dev',
                'nav_links' => [],
                'show_resume_button' => true,
            ]);
        }
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                TextInput::make('logo_text')
                    ->required()
                    ->maxLength(255),
                Toggle::make('show_resume_button')
                    ->label('Show Resume Dropdown')
                    ->default(true),
                Repeater::make('nav_links')
                    ->label('Desktop Navigation Links')
                    ->schema([
                        TextInput::make('label')->required(),
                        Select::make('url')
                            ->label('Section Link')
                            ->options([
                                '#hero' => 'Hero Section',
                                '#featured' => 'Featured Projects',
                                '#experience' => 'Professional Experience',
                                '#timeline' => 'Technology Timeline',
                                '#matrix' => 'Experience Matrix',
                                '#production' => 'Production Apps',
                                '#case-studies' => 'Case Studies',
                                '#apis' => 'API Integrations',
                                '#skills' => 'Skills & Tech Stack',
                                '#specializations' => 'Specializations',
                                '#snippets' => 'Code Snippets Library',
                                '#toolkit' => 'Developer Toolkit',
                                '#blog' => 'Technical Blog',
                                '#certifications' => 'Certifications',
                                '#testimonials' => 'Testimonials',
                                '#contact' => 'Contact',
                            ])
                            ->searchable()
                            ->required(),
                    ])
                    ->columns(2)
                    ->defaultItems(0)
                    ->addActionLabel('Add Link'),
                Repeater::make('mobile_nav_links')
                    ->label('Mobile Bottom Navigation Links (Max 5 recommended)')
                    ->schema([
                        TextInput::make('label')->required(),
                        Select::make('url')
                            ->label('Section Link')
                            ->options([
                                '#hero' => 'Hero Section',
                                '#featured' => 'Featured Projects',
                                '#experience' => 'Professional Experience',
                                '#timeline' => 'Technology Timeline',
                                '#matrix' => 'Experience Matrix',
                                '#production' => 'Production Apps',
                                '#case-studies' => 'Case Studies',
                                '#apis' => 'API Integrations',
                                '#skills' => 'Skills & Tech Stack',
                                '#specializations' => 'Specializations',
                                '#snippets' => 'Code Snippets Library',
                                '#toolkit' => 'Developer Toolkit',
                                '#blog' => 'Technical Blog',
                                '#certifications' => 'Certifications',
                                '#testimonials' => 'Testimonials',
                                '#contact' => 'Contact',
                            ])
                            ->searchable()
                            ->required(),
                    ])
                    ->columns(2)
                    ->defaultItems(0)
                    ->addActionLabel('Add Mobile Link'),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $settings = HeaderSetting::first();
        if ($settings) {
            $settings->update($data);
        } else {
            HeaderSetting::create($data);
        }

        Notification::make()
            ->title('Header settings saved successfully.')
            ->success()
            ->send();
    }
}
