<?php

namespace App\Filament\Pages;

use App\Services\SiteTransferService;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use InvalidArgumentException;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ManageTransfer extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedArrowsRightLeft;

    protected static ?string $navigationLabel = 'Import / Export';

    protected static \UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?string $title = 'Import / Export';

    protected string $view = 'filament.pages.manage-transfer';

    /**
     * @return array<string, mixed>
     */
    protected function getViewData(): array
    {
        return [
            'uploadLimit' => ini_get('upload_max_filesize') ?: 'unknown',
        ];
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('import')
                ->label('Import a site export')
                ->icon(Heroicon::OutlinedArrowUpTray)
                ->color('gray')
                ->modalHeading('Replace this site\'s content')
                ->modalDescription('Everything in the portfolio (sections, projects, case studies, articles, skills, settings and uploaded images) is replaced with the contents of the file. Admin logins are kept. This cannot be undone, so export this site first if you might want it back.')
                ->modalSubmitActionLabel('Replace content')
                ->schema([
                    FileUpload::make('file')
                        ->label('Export file (.zip)')
                        ->acceptedFileTypes(['application/zip', 'application/x-zip-compressed', 'application/octet-stream'])
                        ->maxSize(204800)
                        ->storeFiles(false)
                        ->required(),
                ])
                ->action(function (array $data, SiteTransferService $transfer): void {
                    $file = is_array($data['file']) ? reset($data['file']) : $data['file'];

                    try {
                        if (! $file instanceof TemporaryUploadedFile) {
                            throw new InvalidArgumentException('The upload did not arrive. The file may be larger than this server allows.');
                        }

                        $summary = $transfer->import($file->getRealPath());
                    } catch (InvalidArgumentException $exception) {
                        Notification::make()->title('Import failed')->body($exception->getMessage())->danger()->send();

                        return;
                    }

                    Notification::make()
                        ->title('Import finished')
                        ->body(array_sum($summary['rows']).' records and '.$summary['files'].' files restored.')
                        ->success()
                        ->send();
                }),
            Action::make('export')
                ->label('Export everything')
                ->icon(Heroicon::OutlinedArrowDownTray)
                ->action(fn (SiteTransferService $transfer) => response()->download($transfer->export())->deleteFileAfterSend()),
        ];
    }
}
