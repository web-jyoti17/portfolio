import { ReactNode } from 'react';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { 
    User as UserIcon, 
    Briefcase, 
    GraduationCap, 
    Mail, 
    LayoutDashboard,
    LogOut,
    FolderKanban
} from 'lucide-react';

interface Props {
    user: User;
    header: ReactNode;
    children: ReactNode;
}

export default function AdminLayout({ user, header, children }: Props) {
    const menuItems = [
        {
            title: 'Dashboard',
            href: route('admin.dashboard'),
            icon: LayoutDashboard
        },
        {
            title: 'Profile',
            href: route('admin.profile.index'),
            icon: UserIcon
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
            title: 'Projects',
            href: route('admin.projects.index'),
            icon: FolderKanban
        },
        {
            title: 'Messages',
            href: route('admin.contacts.index'),
            icon: Mail
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 min-h-screen bg-white border-r border-gray-200">
                    <div className="p-4">
                        <h1 className="text-xl font-bold text-black">Portfolio Admin</h1>
                    </div>
                    <nav className="mt-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = window.location.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-black hover:bg-gray-100 ${
                                        isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
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
                    {header && (
                        <header className="bg-white border-b border-gray-200">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main className="bg-white">{children}</main>
                </div>
            </div>
        </div>
    );
} 