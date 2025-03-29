import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

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

export default function Contact({ profile }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                toast.success('Message sent successfully!');
                reset();
            },
            onError: () => {
                toast.error('Failed to send message. Please try again.');
            }
        });
    };

    return (
        <section id="contact" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-white/70 text-lg font-medium tracking-wider uppercase">Get in Touch</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Contact Me</h2>
                        <div className="h-1 w-32 bg-white/90 rounded-full mx-auto"></div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                    <FaEnvelope className="text-white/90 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Email</h3>
                                    <a href={`mailto:${profile.email}`} className="text-white/60 hover:text-white transition-colors duration-300">
                                        {profile.email}
                                    </a>
                                </div>
                            </div>

                            {profile.phone && (
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                        <FaPhone className="text-white/90 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Phone</h3>
                                        <a href={`tel:${profile.phone}`} className="text-white/60 hover:text-white transition-colors duration-300">
                                            {profile.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {profile.location && (
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-white/90 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Location</h3>
                                        <p className="text-white/60">{profile.location}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <h3 className="text-white font-medium text-lg">Social Links</h3>
                            <div className="flex space-x-4">
                                {profile.github && (
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                                    >
                                        <FaGithub className="text-white/90 text-xl" />
                                    </a>
                                )}
                                {profile.linkedin && (
                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                                    >
                                        <FaLinkedin className="text-white/90 text-xl" />
                                    </a>
                                )}
                                {profile.twitter && (
                                    <a
                                        href={profile.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                                    >
                                        <FaTwitter className="text-white/90 text-xl" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20"
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={data.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20"
                                />
                                {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20"
                                ></textarea>
                                {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 