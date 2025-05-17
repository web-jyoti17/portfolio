import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import Heading from '@/components/heading';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function ContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/admin/contacts');
            const data = await response.json();
            setContacts(data.contacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            await fetch(`/admin/contacts/${id}/mark-as-read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            setContacts(contacts.map(contact => 
                contact.id === id ? { ...contact, is_read: true } : contact
            ));
            setSuccessMessage('Message marked as read');
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteContact = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await fetch(`/admin/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            setContacts(contacts.filter(contact => contact.id !== id));
            setSuccessMessage('Message deleted successfully');
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="Contact Messages" />

            <AppContent>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <Heading title="Contact Messages" />
                                </div>

                                {successMessage && (
                                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                        {successMessage}
                                    </div>
                                )}

                                {loading ? (
                                    <div className="text-center py-8">Loading...</div>
                                ) : contacts.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        No contact messages found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Subject
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {contacts.map((contact) => (
                                                    <tr key={contact.id} className={!contact.is_read ? 'bg-blue-50' : ''}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {contact.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {contact.email}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {contact.subject}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {formatDate(contact.created_at)}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                contact.is_read
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {contact.is_read ? 'Read' : 'Unread'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex space-x-3">
                                                                {!contact.is_read && (
                                                                    <button
                                                                        onClick={() => markAsRead(contact.id)}
                                                                        className="text-blue-600 hover:text-blue-900"
                                                                    >
                                                                        Mark as Read
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => deleteContact(contact.id)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AppContent>
        </AppShell>
    );
} 