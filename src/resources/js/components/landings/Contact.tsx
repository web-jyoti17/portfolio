import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
    return (
        <section className="py-32 bg-black relative overflow-hidden" id="contact">
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
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <span className="text-white/70 text-lg font-medium tracking-wider uppercase">Get in Touch</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-7xl font-bold text-white mb-6"
                        >
                            Contact Me
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-40 bg-white/90 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Content */}
                    <div className="grid md:grid-cols-2 gap-20 items-start">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="space-y-12"
                        >
                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="relative"
                            >
                                <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                <p className="text-white/80 text-xl leading-relaxed">
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                                    Feel free to reach out through any of the contact methods below.
                                </p>
                            </motion.div>

                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="relative"
                            >
                                <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                <p className="text-white/80 text-xl leading-relaxed">
                                    Whether you have a question or just want to say hello, I'll try my best to get back to you as soon as possible.
                                </p>
                            </motion.div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                                            <FaEnvelope className="text-2xl text-white/90" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-white mb-2">Email</h3>
                                            <a href="mailto:your.email@example.com" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                                your.email@example.com
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                                            <FaPhone className="text-2xl text-white/90" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-white mb-2">Phone</h3>
                                            <a href="tel:+1234567890" className="text-white/60 hover:text-white transition-colors duration-300 text-lg">
                                                +1 (234) 567-890
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                                            <FaMapMarkerAlt className="text-2xl text-white/90" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-white mb-2">Location</h3>
                                            <p className="text-white/60 text-lg">
                                                Kitchener, Ontario, Canada
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Social Links */}
                            <div className="text-center">
                                <h3 className="text-3xl font-semibold text-white mb-8">Connect With Me</h3>
                                <div className="flex justify-center space-x-8">
                                    <motion.a
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        href="https://github.com/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        <FaGithub className="w-10 h-10" />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        href="https://linkedin.com/in/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        <FaLinkedin className="w-10 h-10" />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        href="https://twitter.com/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        <FaTwitter className="w-10 h-10" />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Content - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl"></div>
                            <div className="relative p-8 rounded-2xl border border-white/10">
                                <form className="space-y-8">
                                    <div>
                                        <label htmlFor="name" className="block text-white/80 text-lg font-medium mb-3">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors duration-300 text-lg"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-white/80 text-lg font-medium mb-3">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors duration-300 text-lg"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-white/80 text-lg font-medium mb-3">Message</label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors duration-300 text-lg"
                                            placeholder="Your message"
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 px-8 bg-white/5 text-white rounded-lg font-medium text-lg hover:bg-white/10 transition-all duration-300"
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 