<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use App\Models\HeaderSetting;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Throwable;

class ContactController extends Controller
{
    /**
     * Save a contact form message and email it to the site owner.
     */
    public function store(Request $request): RedirectResponse
    {
        // Bots fill every field, including this hidden one. Pretend it worked.
        if ($request->filled('website')) {
            return back();
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'company' => ['nullable', 'string', 'max:160'],
            'project_type' => ['nullable', 'string', 'max:160'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        $message = ContactMessage::create($validated + ['ip_address' => $request->ip()]);

        // The message is already saved, so a mail problem never loses an inquiry
        try {
            Mail::to($this->recipient())->send(new ContactMessageReceived($message));
            $message->update(['email_sent' => true]);
        } catch (Throwable $exception) {
            Log::error('Contact form email could not be sent: '.$exception->getMessage(), ['contact_message_id' => $message->id]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Message sent. I will reply soon.']);

        return back();
    }

    /**
     * Where notifications go: the address in Site Settings, else the contact email shown on the site.
     */
    private function recipient(): string
    {
        return HeaderSetting::current()->contact_notification_email
            ?: (Section::where('key', 'contact')->first()?->content['email'] ?? null)
            ?: config('mail.from.address');
    }
}
