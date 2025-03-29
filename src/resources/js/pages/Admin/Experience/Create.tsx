import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        company: '',
        position: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        location: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.experiences.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Experience</h2>}
        >
            <Head title="Add Experience" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            value={data.company}
                                            onChange={e => setData('company', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.company && <div className="text-red-500 text-sm mt-1">{errors.company}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="position">Position</Label>
                                        <Input
                                            id="position"
                                            value={data.position}
                                            onChange={e => setData('position', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.position && <div className="text-red-500 text-sm mt-1">{errors.position}</div>}
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
                                            disabled={data.is_current}
                                        />
                                        {errors.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_current"
                                            checked={data.is_current}
                                            onCheckedChange={(checked) => {
                                                setData('is_current', checked as boolean);
                                                if (checked) {
                                                    setData('end_date', '');
                                                }
                                            }}
                                        />
                                        <Label htmlFor="is_current">Current Position</Label>
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
                                        Create Experience
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