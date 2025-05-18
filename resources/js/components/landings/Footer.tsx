import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-slate-200/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* About Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">About Me</h3>
                            <p className="text-slate-600">
                                A passionate full-stack developer with expertise in Laravel and React, creating scalable and efficient web applications.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#experience" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                                        Experience
                                    </a>
                                </li>
                                <li>
                                    <a href="#projects" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Connect</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.linkedin.com/in/jyoti-839863189/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors duration-300"
                                >
                                    <FaLinkedin className="text-xl" />
                                </a>
                                
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <p className="text-center text-slate-600">
                            © {new Date().getFullYear()} Jyoti. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
} 