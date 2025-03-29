import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
    projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
    return (
        <AdminLayout>
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Projects</h2>
                                <Link href={route('admin.projects.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Project
                                    </Button>
                                </Link>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Technologies</TableHead>
                                        <TableHead>Featured</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell>{project.title}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies?.map((tech) => (
                                                        <Badge key={tech} variant="secondary">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {project.is_featured ? (
                                                    <Badge variant="success">Yes</Badge>
                                                ) : (
                                                    <Badge variant="secondary">No</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{project.order}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link href={route('admin.projects.edit', project.id)}>
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route('admin.projects.destroy', project.id)}
                                                        method="delete"
                                                        as="button"
                                                    >
                                                        <Button variant="destructive" size="sm">
                                                            Delete
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 