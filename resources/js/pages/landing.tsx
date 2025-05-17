import AppLayout from '@/layouts/landing-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Landing from '@/components/landings/index';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Landing />


        </AppLayout>
    );
}
