import React from "react";

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

interface Props {
    profile: Profile;
}

export default function About({ profile }: Props) {
    // Function to sanitize HTML content
    const sanitizeHtml = (html: string) => {
        return html
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
    };

    return (
        <section id="about" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-white/70 text-lg font-medium tracking-wider uppercase">Get to know me</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">About Me</h2>
                        <div className="h-1 w-32 bg-white/90 rounded-full mx-auto"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        <div 
                            className="prose prose-lg prose-invert max-w-none text-white/80 leading-relaxed [&>p]:text-white/80 [&>p]:mb-4 [&>p:last-child]:mb-0 [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>ul]:text-white/80 [&>ol]:text-white/80 [&>blockquote]:text-white/80 [&>pre]:bg-gray-800 [&>pre]:text-white/80"
                            dangerouslySetInnerHTML={{ 
                                __html: sanitizeHtml(profile.about || profile.bio)
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
