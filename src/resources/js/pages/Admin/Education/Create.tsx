import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        institution: '',
        degree: '',
        field_of_study: '',
        description: '',
        start_date: '',
        end_date: '',
        location: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.educations.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Education</h2>}
        >
            <Head title="Add Education" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="institution">Institution</Label>
                                        <Input
                                            id="institution"
                                            value={data.institution}
                                            onChange={e => setData('institution', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.institution && <div className="text-red-500 text-sm mt-1">{errors.institution}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="degree">Degree</Label>
                                        <Input
                                            id="degree"
                                            value={data.degree}
                                            onChange={e => setData('degree', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.degree && <div className="text-red-500 text-sm mt-1">{errors.degree}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="field_of_study">Field of Study</Label>
                                        <Input
                                            id="field_of_study"
                                            value={data.field_of_study}
                                            onChange={e => setData('field_of_study', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.field_of_study && <div className="text-red-500 text-sm mt-1">{errors.field_of_study}</div>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="mt-1 block w-full"
                                            rows={4}
                                        />
                                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={e => setData('start_date', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.start_date && <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={e => setData('end_date', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button type="submit" disabled={processing}>
                                        Create Education
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 