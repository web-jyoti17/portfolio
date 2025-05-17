<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
class ContactController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'subject' => 'required|string|max:255',
                'message' => 'required|string'
            ]);

            // Store in database
            $contact = Contact::create($validated);

            // Send email
            try {
                Mail::raw(
                    "New contact form submission:\n\n" .
                    "Name: {$validated['name']}\n" .
                    "Subject: {$validated['subject']}\n\n" .
                    "Message:\n{$validated['message']}",
                    function ($message) use ($validated) {
                        $message->to(config('mail.from.address'))
                            ->subject("New Contact Form Submission: {$validated['subject']}");
                    }
                );
            } catch (\Exception $e) {
                Log::error('Failed to send contact form email: ' . $e->getMessage());
                // Continue even if email fails
            }

            return response()->json([
                    'success' => true,
                'message' => 'Message sent successfully'
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Contact form submission failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while sending your message'
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $contacts = Contact::latest()->paginate(10);
        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);
        return back()->with('success', 'Message marked as read');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return back()->with('success', 'Message deleted successfully');
    }
} 