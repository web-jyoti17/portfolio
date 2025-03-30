import React from 'react';

interface ContactsLayoutProps {
    children: React.ReactNode;
}

export default function ContactsLayout({ children }: ContactsLayoutProps) {
    return (
        <div className="w-full h-full space-y-6">
            {children}
        </div>
    );
}