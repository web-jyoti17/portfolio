import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

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

export default function Footer({ profile }: Props) {
    return (
        <footer className="bg-black border-t border-white/5">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        {/* About Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-white">About Me</h3>
                            <p className="text-white/60 text-lg leading-relaxed">
                                {profile.bio}
                            </p>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-white">Quick Links</h3>
                            <ul className="space-y-4">
                                <motion.li
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-6 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <a href="#about" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                        About
                                    </a>
                                </motion.li>
                                <motion.li
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-6 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <a href="#experience" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                        Experience
                                    </a>
                                </motion.li>
                                <motion.li
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-6 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <a href="#skills" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                        Skills
                                    </a>
                                </motion.li>
                                <motion.li
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-6 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <a href="#projects" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                        Projects
                                    </a>
                                </motion.li>
                                <motion.li
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-6 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <a href="#contact" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                        Contact
                                    </a>
                                </motion.li>
                            </ul>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-white">Contact Info</h3>
                            <div className="space-y-4">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-6 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <div className="flex items-center space-x-4">
                                        <FaEnvelope className="text-xl text-white/60" />
                                        <a href={`mailto:${profile.email}`} className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                            {profile.email}
                                        </a>
                                    </div>
                                </motion.div>
                                {profile.location && (
                                    <p className="text-white/60 text-lg">
                                        {profile.location}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/5">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-white/40 text-sm">
                                © {new Date().getFullYear()} {profile.name}. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                {profile.github && (
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/40 hover:text-white transition-colors duration-300"
                                    >
                                        <FaGithub className="w-6 h-6" />
                                    </a>
                                )}
                                {profile.linkedin && (
                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/40 hover:text-white transition-colors duration-300"
                                    >
                                        <FaLinkedin className="w-6 h-6" />
                                    </a>
                                )}
                                {profile.twitter && (
                                    <a
                                        href={profile.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/40 hover:text-white transition-colors duration-300"
                                    >
                                        <FaTwitter className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 