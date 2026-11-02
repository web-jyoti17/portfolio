<?php

namespace App\Filament\Resources\BlogPosts\Pages;

use App\Filament\Resources\BlogPosts\BlogPostResource;
use App\Models\BlogPost;
use App\Services\BlogTransferService;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;
use InvalidArgumentException;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ListBlogPosts extends ListRecords
{
    protected static string $resource = BlogPostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('import')
                ->label('Import')
                ->icon(Heroicon::OutlinedArrowUpTray)
                ->color('gray')
                ->modalHeading('Import blog posts')
                ->modalDescription('Upload a file created with the Export button on another copy of this site (for example your local one). Images are included in the file.')
                ->modalSubmitActionLabel('Import')
                ->schema([
                    FileUpload::make('file')
                        ->label('Export file (.json)')
                        ->acceptedFileTypes(['application/json', 'text/plain'])
                        ->maxSize(51200)
                        ->storeFiles(false)
                        ->required(),
                    Toggle::make('overwrite')
                        ->label('Update posts that already exist')
                        ->helperText('Posts are matched by their slug. Switch this off to only add new posts.')
                        ->default(true),
                ])
                ->action(function (array $data, BlogTransferService $transfer): void {
                    $file = $data['file'];
                    $file = is_array($file) ? reset($file) : $file;
                    $json = $file instanceof TemporaryUploadedFile ? $file->get() : null;

                    try {
                        $result = $transfer->import($transfer->parse((string) $json), (bool) $data['overwrite']);
                    } catch (InvalidArgumentException $exception) {
                        Notification::make()
                            ->title('Import failed')
                            ->body($exception->getMessage())
                            ->danger()
                            ->send();

                        return;
                    }

                    Notification::make()
                        ->title('Import finished')
                        ->body(sprintf(
                            '%d created, %d updated, %d skipped.',
                            count($result['created']),
                            count($result['updated']),
                            count($result['skipped']),
                        ))
                        ->success()
                        ->send();
                }),
            Action::make('export')
                ->label('Export all')
                ->icon(Heroicon::OutlinedArrowDownTray)
                ->color('gray')
                ->action(fn (BlogTransferService $transfer) => self::download($transfer, BlogPost::orderBy('published_at')->get())),
            CreateAction::make(),
        ];
    }

    /**
     * @param  iterable<BlogPost>  $posts
     */
    public static function download(BlogTransferService $transfer, iterable $posts, ?string $name = null)
    {
        $json = $transfer->toJson($transfer->export($posts));

        return response()->streamDownload(
            fn () => print ($json),
            ($name ?: 'blog-export-'.now()->format('Y-m-d')).'.json',
            ['Content-Type' => 'application/json'],
        );
    }
}
