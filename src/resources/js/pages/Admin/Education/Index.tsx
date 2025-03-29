import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Education {
    id: number;
    institution: string;
    degree: string;
    field_of_study: string;
    description: string | null;
    start_date: string;
    end_date: string | null;
    location: string | null;
}

interface Props extends PageProps {
    educations: Education[];
}

export default function Index({ educations, auth }: Props) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Education</h2>}
        >
            <Head title="Education" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Educational Background</h3>
                                <Link href={route('admin.educations.create')}>
                                    <Button>Add Education</Button>
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {educations.map((education) => (
                                    <div key={education.id} className="border rounded-lg p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-medium">{education.degree}</h4>
                                                <p className="text-gray-600">{education.institution}</p>
                                                <p className="text-sm text-gray-500">{education.field_of_study}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(education.start_date).toLocaleDateString()} - 
                                                    {education.end_date 
                                                        ? new Date(education.end_date).toLocaleDateString() 
                                                        : ' Present'}
                                                </p>
                                                {education.location && (
                                                    <p className="text-sm text-gray-500">{education.location}</p>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.educations.edit', education.id)}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                                <Link
                                                    href={route('admin.educations.destroy', education.id)}
                                                    method="delete"
                                                    as="button"
                                                >
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </Link>
                                            </div>
                                        </div>
                                        {education.description && (
                                            <div className="mt-4">
                                                <p className="text-gray-700 whitespace-pre-wrap">{education.description}</p>
                                            </div>
                                        )}
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