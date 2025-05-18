import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import ContactForm from './ContactForm';

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-3"
                        >
                            <span className="text-slate-600 text-lg font-medium tracking-wider uppercase">Get in Touch</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6"
                        >
                            Contact Me
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-32 bg-slate-400 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="space-y-8"
                        >
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Let's Connect</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaEnvelope className="text-xl text-slate-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-slate-900">Email</h4>
                                            <a href="mailto:jyotika0617@gmail.com" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                                                jyotika0617@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    
                </div>

                                {/* Social Links */}
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Follow Me</h4>
                                    <div className="flex space-x-4">
                                        <a
                                            href="https://www.linkedin.com/in/jyoti-839863189"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors duration-300"
                                        >
                                            <FaLinkedin className="text-xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-slate-100"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Message</h3>
                            <ContactForm />
                        </motion.div>
                </div>
                </motion.div>
            </div>
        </section>
    );
} 