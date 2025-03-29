import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { 
    User, 
    Briefcase, 
    GraduationCap, 
    Mail, 
    LayoutDashboard,
    LogOut
} from 'lucide-react';

interface Props extends PageProps {}

export default function Dashboard({ auth }: Props) {
    const menuItems = [
        {
            title: 'Dashboard',
            href: route('admin.dashboard'),
            icon: LayoutDashboard,
            isActive: true
        },
        {
            title: 'Profile',
            href: route('admin.profile.index'),
            icon: User
        },
        {
            title: 'Experiences',
            href: route('admin.experiences.index'),
            icon: Briefcase
        },
        {
            title: 'Education',
            href: route('admin.educations.index'),
            icon: GraduationCap
        },
        {
            title: 'Messages',
            href: route('admin.contacts.index'),
            icon: Mail
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Admin Dashboard" />

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 min-h-screen bg-white shadow-lg">
                    <div className="p-4">
                        <h1 className="text-xl font-bold text-gray-800">Portfolio Admin</h1>
                    </div>
                    <nav className="mt-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                                        item.isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="absolute bottom-0 w-64 p-4">
                        <Link href={route('logout')} method="post" as="button">
                            <Button variant="outline" className="w-full">
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Welcome, {auth.user.name}
                            </h2>
                        </div>
                    </header>

                    <main className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-blue-50 p-6 rounded-lg">
                                            <h4 className="text-sm font-medium text-blue-700">Total Messages</h4>
                                            <p className="text-2xl font-bold text-blue-900 mt-2">0</p>
                                        </div>
                                        <div className="bg-green-50 p-6 rounded-lg">
                                            <h4 className="text-sm font-medium text-green-700">Experiences</h4>
                                            <p className="text-2xl font-bold text-green-900 mt-2">0</p>
                                        </div>
                                        <div className="bg-purple-50 p-6 rounded-lg">
                                            <h4 className="text-sm font-medium text-purple-700">Education</h4>
                                            <p className="text-2xl font-bold text-purple-900 mt-2">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
} 