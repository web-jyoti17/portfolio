<?php

namespace App\Filament\Resources\ContactMessages\Pages;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use App\Models\HeaderSetting;
use App\Models\Section;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ListContactMessages extends ListRecords
{
    protected static string $resource = ContactMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('testEmail')
                ->label('Send test email')
                ->icon(Heroicon::OutlinedPaperAirplane)
                ->color('gray')
                ->action(function (): void {
                    $recipient = HeaderSetting::current()->contact_notification_email
                        ?: (Section::where('key', 'contact')->first()?->content['email'] ?? null)
                        ?: config('mail.from.address');

                    $sample = new ContactMessage([
                        'name' => 'Test Visitor',
                        'email' => 'visitor@example.com',
                        'company' => 'Example Company',
                        'project_type' => 'Test message',
                        'message' => 'This is a test from your portfolio admin. If you can read it, contact form emails are working.',
                    ]);
                    $sample->created_at = now();

                    try {
                        Mail::to($recipient)->send(new ContactMessageReceived($sample));
                    } catch (Throwable $exception) {
                        Notification::make()
                            ->title('The email could not be sent')
                            ->body('Mail server "'.config('mail.mailers.'.config('mail.default').'.host').'" said: '.$exception->getMessage().' Check the MAIL_ settings in the .env file.')
                            ->danger()
                            ->persistent()
                            ->send();

                        return;
                    }

                    Notification::make()
                        ->title('Test email sent to '.$recipient)
                        ->body('If it does not arrive within a minute, check the spam folder.')
                        ->success()
                        ->send();
                }),
        ];
    }
}
