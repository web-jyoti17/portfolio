import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props extends PageProps {
    contacts: Contact[];
}

export default function Index({ contacts, auth }: Props) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contact Messages</h2>}
        >
            <Head title="Contact Messages" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="space-y-6">
                                {contacts.map((contact) => (
                                    <div key={contact.id} className={`border rounded-lg p-6 ${!contact.is_read ? 'bg-blue-50' : ''}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-medium">{contact.subject}</h4>
                                                <p className="text-gray-600">{contact.name}</p>
                                                <p className="text-sm text-gray-500">{contact.email}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(contact.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.contacts.show', contact.id)}>
                                                    <Button variant="outline" size="sm">View</Button>
                                                </Link>
                                                {!contact.is_read ? (
                                                    <Link
                                                        href={route('admin.contacts.mark-as-read', contact.id)}
                                                        method="post"
                                                        as="button"
                                                    >
                                                        <Button variant="outline" size="sm">Mark as Read</Button>
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={route('admin.contacts.mark-as-unread', contact.id)}
                                                        method="post"
                                                        as="button"
                                                    >
                                                        <Button variant="outline" size="sm">Mark as Unread</Button>
                                                    </Link>
                                                )}
                                                <Link
                                                    href={route('admin.contacts.destroy', contact.id)}
                                                    method="delete"
                                                    as="button"
                                                >
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 