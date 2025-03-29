import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';

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
}

export default function Edit({ profile, auth }: Props) {
    const [currentSkills, setCurrentSkills] = useState<string[]>(profile.skills || []);
    const [newSkill, setNewSkill] = useState('');

    const { data, setData, put, processing, errors, reset } = useForm({
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        about: profile.about || '',
        skills: profile.skills || [],
        email: profile.email,
        phone: profile.phone || '',
        location: profile.location || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || '',
        avatar: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('admin.profile.update'), {
            onSuccess: () => {
                toast.success('Profile updated successfully');
            },
            onError: () => {
                toast.error('Failed to update profile');
            },
        });
    };

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            e.preventDefault();
            const skill = newSkill.trim();
            if (!currentSkills.includes(skill)) {
                const updatedSkills = [...currentSkills, skill];
                setCurrentSkills(updatedSkills);
                setData('skills', updatedSkills);
                setNewSkill('');
            }
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const updatedSkills = currentSkills.filter(skill => skill !== skillToRemove);
        setCurrentSkills(updatedSkills);
        setData('skills', updatedSkills);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black leading-tight">Edit Profile</h2>}
        >
            <Head title="Edit Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-black">Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-black">Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                            className="text-black"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-black">Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            required
                                            className="text-black"
                                        />
                                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="bio" className="text-black">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            value={data.bio}
                                            onChange={e => setData('bio', e.target.value)}
                                            required
                                            className="text-black bg-white"
                                        />
                                        {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="about" className="text-black">About Me</Label>
                                        <RichTextEditor
                                            value={data.about}
                                            onChange={(value: string) => setData('about', value)}
                                            placeholder="Write something about yourself..."
                                            className="mt-1"
                                        />
                                        {errors.about && <p className="text-sm text-red-500">{errors.about}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="skills" className="text-black">Add Skills</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="skills"
                                                value={newSkill}
                                                onChange={e => setNewSkill(e.target.value)}
                                                onKeyDown={handleAddSkill}
                                                placeholder="Type a skill and press Enter"
                                                className="text-black"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    if (newSkill.trim()) {
                                                        const skill = newSkill.trim();
                                                        if (!currentSkills.includes(skill)) {
                                                            const updatedSkills = [...currentSkills, skill];
                                                            setCurrentSkills(updatedSkills);
                                                            setData('skills', updatedSkills);
                                                            setNewSkill('');
                                                        }
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {currentSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-white text-black rounded-full text-sm border border-gray-200 flex items-center gap-2"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(skill)}
                                                        className="text-gray-500 hover:text-red-500"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-black">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                            className="text-black"
                                        />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-black">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="text-black"
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-black">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                            className="text-black"
                                        />
                                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="github" className="text-black">GitHub URL</Label>
                                        <Input
                                            id="github"
                                            value={data.github}
                                            onChange={e => setData('github', e.target.value)}
                                            className="text-black"
                                        />
                                        {errors.github && <p className="text-sm text-red-500">{errors.github}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin" className="text-black">LinkedIn URL</Label>
                                        <Input
                                            id="linkedin"
                                            value={data.linkedin}
                                            onChange={e => setData('linkedin', e.target.value)}
                                            className="text-black"
                                        />
                                        {errors.linkedin && <p className="text-sm text-red-500">{errors.linkedin}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="twitter" className="text-black">Twitter URL</Label>
                                        <Input
                                            id="twitter"
                                            value={data.twitter}
                                            onChange={e => setData('twitter', e.target.value)}
                                            className="text-black"
                                        />
                                        {errors.twitter && <p className="text-sm text-red-500">{errors.twitter}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="avatar" className="text-black">Avatar</Label>
                                        <Input
                                            id="avatar"
                                            type="file"
                                            onChange={e => setData('avatar', e.target.files?.[0] || null)}
                                            className="text-black"
                                            accept="image/*"
                                        />
                                        {errors.avatar && <p className="text-sm text-red-500">{errors.avatar}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
} 