import AppLayout from '@/layouts/landing-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Landing from '@/components/landings/index';

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
    experiences: {
        id: number;
        company: string;
        position: string;
        description: string;
        start_date: string;
        end_date: string | null;
        is_current: boolean;
        location: string;
    }[];
}

interface Props {
    profile: Profile;
}

export default function LandingPage({ profile }: Props) {
    return (
        <AppLayout>
            <Head title="Portfolio" />
            <Landing profile={profile} />
        </AppLayout>
    );
}
