import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="py-16 bg-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
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
                                I am a passionate Full Stack Developer with expertise in creating modern web applications. 
                                My focus is on building scalable solutions that deliver exceptional user experiences.
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
                                        <a href="mailto:jyotika0617@gmail.com" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                            jyotika0617@gmail.com
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                            {/* Copyright */}
                            <p className="text-white/40 text-lg">
                                © {new Date().getFullYear()} Jyoti. All rights reserved.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-6">
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <FaGithub className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    href="https://linkedin.com/in/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <FaLinkedin className="w-6 h-6" />
                                </motion.a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 