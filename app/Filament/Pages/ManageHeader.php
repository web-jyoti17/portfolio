<?php

namespace App\Filament\Pages;

use App\Models\HeaderSetting;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ManageHeader extends Page implements HasForms
{
    use InteractsWithForms;

    /**
     * Anchors that exist on the portfolio page.
     */
    private const SECTION_LINKS = [
        '#about' => 'About / Hero',
        '#projects' => 'Featured Projects',
        '#case-studies' => 'Case Studies',
        '#experience' => 'Professional Experience',
        '#matrix' => 'Experience Matrix',
        '#production' => 'Production Experience',
        '#api' => 'API Integrations',
        '#timeline' => 'Technology Timeline',
        '#specializations' => 'What I Build',
        '#skills' => 'Skills & Tech Stack',
        '#snippets' => 'Code Snippets Library',
        '#toolkit' => 'Developer Toolkit',
        '#blog' => 'Articles & Insights',
        '#github' => 'GitHub Repositories',
        '#certifications' => 'Certifications',
        '#contact' => 'Contact',
    ];

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedGlobeAlt;

    protected static ?string $navigationLabel = 'Site Settings';

    protected static \UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?string $title = 'Site Settings';

    protected string $view = 'filament.pages.manage-header';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(HeaderSetting::current()->attributesToArray());
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Theme')
                    ->description('Changes the look of the whole site: portfolio, articles and showcase pages.')
                    ->schema([
                        Select::make('accent_color')
                            ->label('Accent colour')
                            ->helperText('Buttons, links, badges and highlights.')
                            ->options([
                                'amber' => 'Amber (original)',
                                'orange' => 'Orange',
                                'rose' => 'Rose',
                                'violet' => 'Violet',
                                'indigo' => 'Indigo',
                                'blue' => 'Blue',
                                'teal' => 'Teal',
                                'emerald' => 'Emerald',
                            ])
                            ->default('amber')
                            ->selectablePlaceholder(false)
                            ->required(),
                        Select::make('font_pair')
                            ->label('Fonts')
                            ->helperText('The first name is used for headings, the second for body text.')
                            ->options(collect(HeaderSetting::FONTS)->map(fn (array $font) => $font[0])->all())
                            ->default('outfit-inter')
                            ->selectablePlaceholder(false)
                            ->required(),
                        Select::make('neutral_color')
                            ->label('Grey tone')
                            ->helperText('Text, borders and backgrounds.')
                            ->options([
                                'zinc' => 'Neutral grey (original)',
                                'slate' => 'Cool blue-grey',
                                'stone' => 'Warm grey',
                            ])
                            ->default('zinc')
                            ->selectablePlaceholder(false)
                            ->required(),
                        Toggle::make('show_theme_toggle')
                            ->label('Show the light / dark switch')
                            ->default(true),
                        Select::make('default_theme')
                            ->label('Theme for first-time visitors')
                            ->options([
                                'light' => 'Light',
                                'dark' => 'Dark',
                                'system' => 'Follow the visitor\'s device',
                            ])
                            ->default('light')
                            ->selectablePlaceholder(false)
                            ->required(),
                        FileUpload::make('favicon')
                            ->label('Favicon (browser tab icon)')
                            ->helperText('Square PNG, SVG or ICO. Leave empty to use the built-in "L." icon.')
                            ->disk('public')
                            ->directory('branding')
                            ->visibility('public')
                            ->acceptedFileTypes(['image/png', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'])
                            ->maxSize(512)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Search engines and link previews')
                    ->schema([
                        TextInput::make('seo_title')
                            ->label('Home page title')
                            ->maxLength(255),
                        Textarea::make('seo_description')
                            ->label('Home page description')
                            ->rows(2)
                            ->maxLength(500),
                    ]),

                Section::make('Header')
                    ->description('The same header is used on the portfolio, every article and every showcase page.')
                    ->schema([
                        TextInput::make('logo_text')
                            ->label('Site name')
                            ->helperText('Shown next to the logo mark. Text after the first dot is drawn in the accent colour.')
                            ->required()
                            ->maxLength(255),
                        FileUpload::make('logo_image')
                            ->label('Logo image (optional)')
                            ->helperText('Replaces the built-in logo mark and site name in the header. Use a wide transparent PNG or SVG.')
                            ->disk('public')
                            ->directory('branding')
                            ->visibility('public')
                            ->acceptedFileTypes(['image/png', 'image/svg+xml', 'image/webp'])
                            ->maxSize(1024),
                        Toggle::make('show_resume_button')
                            ->label('Show the Resume button')
                            ->helperText('Shown in the header on desktop and in the mobile menu.')
                            ->default(true),
                        FileUpload::make('resume_file')
                            ->label('Resume PDF')
                            ->helperText('The Resume button opens this file. Leave it empty to use the newest active entry under Resumes, or the auto-generated resume.')
                            ->disk('public')
                            ->directory('resumes')
                            ->visibility('public')
                            ->acceptedFileTypes(['application/pdf'])
                            ->maxSize(10240)
                            ->downloadable()
                            ->openable()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Contact details')
                    ->description('Switch off anything you do not want visitors to see. Hidden details are not sent to the browser at all. The email and phone values are edited under Sections → Contact.')
                    ->schema([
                        Toggle::make('show_email')
                            ->label('Show email address')
                            ->default(true),
                        Toggle::make('show_phone')
                            ->label('Show phone number')
                            ->helperText('Applies to the contact section, the footer and the generated resume.')
                            ->default(false),
                        Toggle::make('show_location')
                            ->label('Show location')
                            ->default(true),
                        TextInput::make('location')
                            ->maxLength(255),
                        Toggle::make('show_social_links')
                            ->label('Show social link icons')
                            ->helperText('Turns all social icons on or off. Choose where each one appears below.')
                            ->live()
                            ->default(true),
                        CheckboxList::make('contact_social_links')
                            ->label('Icons in the contact section')
                            ->options(HeaderSetting::SOCIAL_NETWORKS)
                            ->default(array_keys(HeaderSetting::SOCIAL_NETWORKS))
                            ->helperText('An icon only appears if its link is filled in.')
                            ->visible(fn ($get) => (bool) $get('show_social_links'))
                            ->columns(3),
                        CheckboxList::make('footer_social_links')
                            ->label('Icons in the footer and phone menu')
                            ->options(HeaderSetting::SOCIAL_NETWORKS)
                            ->default(array_keys(HeaderSetting::SOCIAL_NETWORKS))
                            ->helperText('An icon only appears if its link is filled in.')
                            ->visible(fn ($get) => (bool) $get('show_social_links'))
                            ->columns(3),
                        Toggle::make('show_availability')
                            ->label('Show the availability box in the footer')
                            ->default(true),
                        TextInput::make('availability_status')
                            ->label('Availability status text')
                            ->placeholder('Available')
                            ->maxLength(255),
                        TextInput::make('response_time')
                            ->label('Response time text')
                            ->placeholder('< 12 hours')
                            ->maxLength(255),
                        TextInput::make('github_username')
                            ->label('GitHub username (for the repositories section)')
                            ->maxLength(255),
                        TextInput::make('github_url')
                            ->label('GitHub URL')
                            ->url()
                            ->maxLength(255),
                        TextInput::make('linkedin_url')
                            ->label('LinkedIn URL')
                            ->url()
                            ->maxLength(255),
                        TextInput::make('twitter_url')
                            ->label('X / Twitter URL')
                            ->url()
                            ->maxLength(255),
                        TextInput::make('instagram_url')
                            ->label('Instagram URL')
                            ->url()
                            ->maxLength(255),
                        TextInput::make('contact_notification_email')
                            ->label('Send contact form messages to')
                            ->helperText('Leave empty to use the contact email shown on the site.')
                            ->email()
                            ->maxLength(255),
                        Textarea::make('tagline')
                            ->label('Footer description')
                            ->rows(2)
                            ->maxLength(500)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Blog')
                    ->schema([
                        Toggle::make('show_share_buttons')
                            ->label('Show share buttons on articles')
                            ->helperText('LinkedIn, X, WhatsApp, Facebook, Instagram and copy link.')
                            ->default(true),
                        Toggle::make('show_view_counts')
                            ->label('Show how many people viewed and read each article')
                            ->helperText('Each visitor is counted once per article. Bots and your own visits while logged in are not counted.')
                            ->default(true),
                        Toggle::make('show_new_badge')
                            ->label('Mark recent articles as "New"')
                            ->default(true),
                        TextInput::make('new_badge_days')
                            ->label('An article counts as new for (days)')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(365)
                            ->default(14)
                            ->required(),
                        TextInput::make('medium_username')
                            ->label('Medium username')
                            ->placeholder('@yourname')
                            ->helperText('Your latest Medium stories are listed under your articles, with a "Follow on Medium" link. Stories you also published here are not shown twice. Updates every 6 hours.')
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Section::make('Navigation')
                    ->description('Leave a list empty to use the default links.')
                    ->schema([
                        Repeater::make('nav_links')
                            ->label('Header links')
                            ->schema([
                                TextInput::make('label')->required(),
                                Select::make('url')
                                    ->label('Section')
                                    ->options(self::SECTION_LINKS)
                                    ->searchable()
                                    ->required(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->addActionLabel('Add link'),
                        Repeater::make('mobile_nav_links')
                            ->label('Mobile bottom bar links (up to 5)')
                            ->schema([
                                TextInput::make('label')->required(),
                                Select::make('url')
                                    ->label('Section')
                                    ->options(self::SECTION_LINKS)
                                    ->searchable()
                                    ->required(),
                            ])
                            ->columns(2)
                            ->maxItems(5)
                            ->defaultItems(0)
                            ->addActionLabel('Add mobile link'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $settings = HeaderSetting::query()->first();

        if ($settings) {
            $settings->update($data);
        } else {
            HeaderSetting::create($data);
        }

        Notification::make()
            ->title('Site settings saved.')
            ->success()
            ->send();
    }
}
