import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Profile {
    id: number;
    name: string;
    title: string;
    bio: string;
    about: string | null;
    skills: string[] | null;
    email: string;
    phone: string | null;
    location: string | null;
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    avatar: string | null;
}

interface Props extends PageProps {
    profile: Profile;
    auth: any;
}

export default function Index({ profile, auth }: Props) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-white">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-black">Profile Information</CardTitle>
                                <Button asChild>
                                    <a href={route('admin.profile.edit')}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </a>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-black">Name</h4>
                                    <p className="mt-1 text-black">{profile.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-black">Title</h4>
                                    <p className="mt-1 text-black">{profile.title}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-medium text-black">Bio</h4>
                                    <p className="mt-1 text-black whitespace-pre-wrap">{profile.bio}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-medium text-black">About Me</h4>
                                    <p className="mt-1 text-black whitespace-pre-wrap">{profile.about || 'No about section added yet.'}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-medium text-black">Skills</h4>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {profile.skills && profile.skills.length > 0 ? (
                                            profile.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-white text-black rounded-full text-sm border border-gray-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-black">No skills added yet.</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-black">Email</h4>
                                    <p className="mt-1 text-black">{profile.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-black">Phone</h4>
                                    <p className="mt-1 text-black">{profile.phone || 'Not provided'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-black">Location</h4>
                                    <p className="mt-1 text-black">{profile.location || 'Not provided'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-black">Social Links</h4>
                                    <div className="mt-1 space-y-1">
                                        {profile.github && (
                                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                                                GitHub
                                            </a>
                                        )}
                                        {profile.linkedin && (
                                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                                                LinkedIn
                                            </a>
                                        )}
                                        {profile.twitter && (
                                            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                                                Twitter
                                            </a>
                                        )}
                                        {!profile.github && !profile.linkedin && !profile.twitter && (
                                            <p className="text-black">No social links provided</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
} 