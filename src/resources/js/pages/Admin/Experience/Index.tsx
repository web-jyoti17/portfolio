import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Experience {
    id: number;
    company: string;
    position: string;
    description: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    location: string | null;
}

interface Props extends PageProps {
    experiences: Experience[];
}

export default function Index({ experiences, auth }: Props) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Experiences</h2>}
        >
            <Head title="Experiences" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Work Experience</h3>
                                <Link href={route('admin.experiences.create')}>
                                    <Button>Add Experience</Button>
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {experiences.map((experience) => (
                                    <div key={experience.id} className="border rounded-lg p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-medium">{experience.position}</h4>
                                                <p className="text-gray-600">{experience.company}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(experience.start_date).toLocaleDateString()} - 
                                                    {experience.is_current 
                                                        ? ' Present' 
                                                        : experience.end_date 
                                                            ? new Date(experience.end_date).toLocaleDateString() 
                                                            : ' Present'}
                                                </p>
                                                {experience.location && (
                                                    <p className="text-sm text-gray-500">{experience.location}</p>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.experiences.edit', experience.id)}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                                <Link
                                                    href={route('admin.experiences.destroy', experience.id)}
                                                    method="delete"
                                                    as="button"
                                                >
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-gray-700 whitespace-pre-wrap">{experience.description}</p>
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