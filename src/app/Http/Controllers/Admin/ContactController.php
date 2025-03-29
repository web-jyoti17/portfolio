<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Contact/Index', [
            'contacts' => $contacts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        $contact->update(['is_read' => true]);
        return Inertia::render('Admin/Contact/Show', [
            'contact' => $contact
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact message deleted successfully');
    }

    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);
        return redirect()->route('admin.contacts.index')
            ->with('success', 'Message marked as read');
    }

    public function markAsUnread(Contact $contact)
    {
        $contact->update(['is_read' => false]);
        return redirect()->route('admin.contacts.index')
            ->with('success', 'Message marked as unread');
    }
}
