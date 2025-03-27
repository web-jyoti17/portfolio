import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaDatabase, FaLaptopCode } from "react-icons/fa";

export default function About() {
    return (
        <section id="about" className="py-32 bg-black relative overflow-hidden">
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
                            <span className="text-white/70 text-lg font-medium tracking-wider uppercase">Get to know me</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-7xl font-bold text-white mb-6"
                        >
                            About Me
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
                    <div className="grid md:grid-cols-2 gap-20 items-center">
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
                                    I am a passionate <span className="text-blue-400 font-semibold">Full Stack Developer</span> with over <span className="text-blue-400 font-semibold">5 years of experience</span> in web development. 
                                    My journey in technology has been driven by a deep curiosity and a commitment to creating 
                                    elegant solutions to complex problems.
                                </p>
                            </motion.div>

                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="relative"
                            >
                                <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                <p className="text-white/80 text-xl leading-relaxed">
                                    My expertise lies in building <span className="text-blue-400 font-semibold">scalable</span> web applications using modern technologies. 
                                    I specialize in <span className="text-blue-400 font-semibold">Laravel</span> for backend development and <span className="text-blue-400 font-semibold">React</span> for frontend, creating 
                                    seamless, high-performance applications that deliver exceptional user experiences.
                                </p>
                            </motion.div>

                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="relative"
                            >
                                <div className="absolute -left-8 top-0 w-1 h-full bg-white/10 rounded-full"></div>
                                <p className="text-white/80 text-xl leading-relaxed">
                                    When I'm not coding, I'm constantly learning and exploring new technologies to stay 
                                    at the forefront of web development. I believe in writing clean, maintainable code 
                                    and following best practices to ensure the long-term success of every project.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="space-y-16"
                        >
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-12">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 mb-6">
                                        <FaCode className="text-4xl text-white/90" />
                                    </div>
                                    <h3 className="text-6xl font-bold text-white mb-3">5+</h3>
                                    <p className="text-white/70 text-xl">Years Experience</p>
                                </motion.div>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 mb-6">
                                        <FaLaptopCode className="text-4xl text-white/90" />
                                    </div>
                                    <h3 className="text-6xl font-bold text-white mb-3">20+</h3>
                                    <p className="text-white/70 text-xl">Projects Completed</p>
                                </motion.div>
                            </div>

                            {/* Skills */}
                            <div className="grid grid-cols-2 gap-12">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
                                        <FaServer className="text-3xl text-white/90" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">Backend</h3>
                                    <p className="text-white/70 text-lg">Laravel & APIs</p>
                                </motion.div>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
                                        <FaDatabase className="text-3xl text-white/90" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">Database</h3>
                                    <p className="text-white/70 text-lg">MySQL & PostgreSQL</p>
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
