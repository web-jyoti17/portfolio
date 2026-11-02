<?php

namespace App\Filament\Pages;

use App\Models\GoogleDriveConnection;
use App\Services\DriveBackupService;
use App\Services\GoogleDriveService;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Str;
use Throwable;

class ManageDriveBackups extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedCloudArrowUp;

    protected static ?string $navigationLabel = 'Google Drive Backups';

    protected static \UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?string $title = 'Google Drive Backups';

    protected string $view = 'filament.pages.manage-drive-backups';

    /**
     * @return array<string, mixed>
     */
    protected function getViewData(): array
    {
        $drive = app(GoogleDriveService::class);
        $connection = GoogleDriveConnection::current();
        $files = [];
        $filesError = null;

        if ($connection) {
            try {
                $files = $drive->files($connection);
            } catch (Throwable $exception) {
                $filesError = $exception->getMessage();
            }
        }

        return [
            'configured' => $drive->isConfigured(),
            'redirectUri' => config('services.google_drive.redirect'),
            'connection' => $connection,
            'folderUrl' => $connection ? $drive->folderUrl($connection) : null,
            'files' => $files,
            'filesError' => $filesError,
            'keep' => config('services.google_drive.keep'),
        ];
    }

    protected function getHeaderActions(): array
    {
        $drive = app(GoogleDriveService::class);
        $connected = GoogleDriveConnection::query()->exists();

        return [
            Action::make('backup')
                ->label('Back up now')
                ->icon(Heroicon::OutlinedCloudArrowUp)
                ->visible($connected)
                ->action(function (DriveBackupService $backup): void {
                    try {
                        $names = $backup->run();
                        Notification::make()->title('Backup saved to Google Drive')->body(implode(', ', $names))->success()->send();
                    } catch (Throwable $exception) {
                        report($exception);
                        Notification::make()->title('Backup failed')->body($exception->getMessage())->danger()->persistent()->send();
                    }
                }),
            Action::make('connect')
                ->label($connected ? 'Connect a different account' : 'Connect Google Drive')
                ->icon(Heroicon::OutlinedLink)
                ->color($connected ? 'gray' : 'primary')
                ->visible($drive->isConfigured())
                ->action(function () use ($drive): void {
                    $state = Str::random(40);
                    session()->put('google_drive_state', $state);
                    $this->redirect($drive->authorizationUrl($state));
                }),
            Action::make('disconnect')
                ->label('Disconnect')
                ->color('danger')
                ->visible($connected)
                ->requiresConfirmation()
                ->modalDescription('Automatic backups stop. Backups already in Google Drive are kept.')
                ->action(function () use ($drive): void {
                    if ($connection = GoogleDriveConnection::current()) {
                        $drive->disconnect($connection);
                    }
                    Notification::make()->title('Google Drive disconnected')->success()->send();
                }),
        ];
    }
}
