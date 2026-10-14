<?php

namespace App\Http\Controllers\Admin;

use App\Filament\Pages\ManageDriveBackups;
use App\Http\Controllers\Controller;
use App\Services\GoogleDriveService;
use Filament\Notifications\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Throwable;

class GoogleDriveCallbackController extends Controller
{
    public function __invoke(Request $request, GoogleDriveService $drive): RedirectResponse
    {
        $expectedState = $request->session()->pull('google_drive_state');

        if ($request->filled('error')) {
            Notification::make()->title('Google Drive was not connected')->body('Google said: '.$request->string('error'))->warning()->send();
        } elseif (! $expectedState || ! hash_equals($expectedState, (string) $request->query('state'))) {
            Notification::make()->title('Google Drive was not connected')->body('The sign-in link expired. Please try again.')->danger()->send();
        } else {
            try {
                $connection = $drive->connect((string) $request->query('code'));
                Notification::make()->title('Google Drive connected')->body('Backups will be saved to '.($connection->email ?? 'your Google Drive').'.')->success()->send();
            } catch (Throwable $exception) {
                report($exception);
                Notification::make()->title('Google Drive was not connected')->body($exception->getMessage())->danger()->send();
            }
        }

        return redirect(ManageDriveBackups::getUrl());
    }
}
