import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import ContactsLayout from '@/layouts/contacts/layout';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    contacts: {
        data: Contact[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        from: number;
        to: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contact Messages',
        href: '/admin/contacts',
    },
];

export default function ContactsIndex({ contacts }: Props) {
    const [currentContacts, setCurrentContacts] = useState<Contact[]>(contacts.data);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const markAsRead = async (id: number) => {
        try {
            setLoading(true);
            await fetch(`/admin/contacts/${id}/mark-as-read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            setCurrentContacts(currentContacts.map(contact => 
                contact.id === id ? { ...contact, is_read: true } : contact
            ));
            setSuccessMessage('Message marked as read');
        } catch (error) {
            console.error('Error marking message as read:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteContact = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            setLoading(true);
            await fetch(`/admin/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            setCurrentContacts(currentContacts.filter(contact => contact.id !== id));
            setSuccessMessage('Message deleted successfully');
        } catch (error) {
            console.error('Error deleting message:', error);
        } finally {
            setLoading(false);
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />

            <ContactsLayout>
                <div className="w-full space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <HeadingSmall 
                            title="Contact Messages" 
                            description={`Showing ${contacts.from} to ${contacts.to} of ${contacts.total} messages`}
                        />
                    </div>

                    {successMessage && (
                        <div className="p-4 bg-green-900 text-green-100 rounded-lg">
                            {successMessage}
                        </div>
                    )}

                    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                        {currentContacts.length === 0 ? (
                            <div className="p-6 text-center text-gray-400">
                                No contact messages found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Subject
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                                        {currentContacts.map((contact) => (
                                            <tr key={contact.id} className={!contact.is_read ? 'bg-blue-900/50' : 'hover:bg-gray-700'}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-white">
                                                        {contact.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300">
                                                        {contact.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-300 line-clamp-2">
                                                        {contact.subject}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300">
                                                        {formatDate(contact.created_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        contact.is_read
                                                            ? 'bg-green-900 text-green-100'
                                                            : 'bg-yellow-900 text-yellow-100'
                                                    }`}>
                                                        {contact.is_read ? 'Read' : 'Unread'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-3">
                                                        {!contact.is_read && (
                                                            <button
                                                                onClick={() => markAsRead(contact.id)}
                                                                disabled={loading}
                                                                className="text-blue-400 hover:text-blue-300 disabled:opacity-50"
                                                            >
                                                                Mark as Read
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteContact(contact.id)}
                                                            disabled={loading}
                                                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
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

                        {contacts.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
                                <nav className="flex justify-center">
                                    <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {Array.from({ length: contacts.last_page }, (_, i) => i + 1).map((page) => (
                                            <a
                                                key={page}
                                                href={`/admin/contacts?page=${page}`}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    page === contacts.current_page
                                                        ? 'z-10 bg-blue-900 border-blue-500 text-blue-100'
                                                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                                                }`}
                                            >
                                                {page}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </ContactsLayout>
        </AppLayout>
    );
} 