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
    contact: Contact;
}

export default function Show({ contact, auth }: Props) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Message</h2>}
        >
            <Head title="View Message" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="space-y-6">
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
                                    <h5 className="text-sm font-medium text-gray-700">Message</h5>
                                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                                </div>

                                <div className="flex justify-end">
                                    <Link href={route('admin.contacts.index')}>
                                        <Button variant="outline">Back to Messages</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 