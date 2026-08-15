<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Textarea::make('summary')
                    ->required()
                    ->rows(2),
                RichEditor::make('content')
                    ->required()
                    ->toolbarButtons([
                        'attachFiles', 'blockquote', 'bold', 'bulletList', 'codeBlock',
                        'h2', 'h3', 'italic', 'link', 'orderedList', 'redo', 'strike', 'undo'
                    ])
                    ->columnSpanFull(),
                TextInput::make('medium_url')
                    ->label('Medium Article URL')
                    ->url()
                    ->nullable()
                    ->maxLength(255),
                TextInput::make('linkedin_url')
                    ->label('LinkedIn Post URL')
                    ->url()
                    ->nullable()
                    ->maxLength(255),
                FileUpload::make('cover_image')
                    ->disk('public')
                    ->image()
                    ->directory('blog')
                    ->visibility('public'),
                TagsInput::make('tags')
                    ->nullable(),
                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->required()
                    ->default('draft'),
                DateTimePicker::make('published_at')
                    ->nullable(),
            ]);
    }
}
