import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    github_url: string | null;
    live_url: string | null;
    technologies: string[] | null;
    is_featured: boolean;
    order: number;
}

interface Props {
    project: Project;
}

export default function ProjectsEdit({ project }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title,
        description: project.description,
        image: project.image || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        technologies: project.technologies || [],
        is_featured: project.is_featured,
        order: project.order
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.projects.update', project.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Project</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        required
                                    />
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={data.image}
                                        onChange={e => setData('image', e.target.value)}
                                    />
                                    {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={e => setData('github_url', e.target.value)}
                                    />
                                    {errors.github_url && <div className="text-red-500 text-sm mt-1">{errors.github_url}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="live_url">Live URL</Label>
                                    <Input
                                        id="live_url"
                                        type="url"
                                        value={data.live_url}
                                        onChange={e => setData('live_url', e.target.value)}
                                    />
                                    {errors.live_url && <div className="text-red-500 text-sm mt-1">{errors.live_url}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                                    <Input
                                        id="technologies"
                                        value={data.technologies.join(', ')}
                                        onChange={e => setData('technologies', e.target.value.split(',').map(tech => tech.trim()))}
                                    />
                                    {errors.technologies && <div className="text-red-500 text-sm mt-1">{errors.technologies}</div>}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={checked => setData('is_featured', checked)}
                                    />
                                    <Label htmlFor="is_featured">Featured Project</Label>
                                </div>

                                <div>
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={e => setData('order', parseInt(e.target.value))}
                                    />
                                    {errors.order && <div className="text-red-500 text-sm mt-1">{errors.order}</div>}
                                </div>

                                <Button type="submit" disabled={processing}>
                                    Update Project
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
} 