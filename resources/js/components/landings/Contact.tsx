import React from 'react';
import ContactForm from './ContactForm';

export default function Contact() {
    return (
        <section id="contact" className="py-16 bg-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                    <p className="text-gray-400 mb-8">
                        Have a question or want to work together? Feel free to reach out through the contact form below or email me directly at{' '}
                        <a 
                            href="mailto:jyotika0617@gmail.com" 
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            jyotika0617@gmail.com
                        </a>
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
} 