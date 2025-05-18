import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaMobile } from "react-icons/fa";

export default function About() {
    const skills = [
        {
            icon: FaCode,
            title: "Frontend Development",
            description: "Creating responsive and interactive user interfaces using modern frameworks and best practices."
        },
        {
            icon: FaServer,
            title: "Backend Development",
            description: "Building robust and scalable server-side applications with Laravel and other modern technologies."
        },
        {
            icon: FaDatabase,
            title: "Database Design",
            description: "Designing efficient database structures and optimizing queries for better performance."
        },
        {
            icon: FaMobile,
            title: "Mobile Development",
            description: "Developing cross-platform mobile applications with React Native and Flutter."
        }
    ];

    return (
        <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-slate-200/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
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
                            <span className="text-slate-600 text-lg font-medium tracking-wider uppercase">Get to know me</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6"
                        >
                            About Me
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-32 bg-slate-400 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-600 text-lg leading-relaxed"
                        >
                            I am a passionate <span className="text-slate-600 font-semibold">Full Stack Developer</span> with over <span className="text-slate-600 font-semibold">6 years of experience</span> in web development. 
                            My journey in technology has been driven by a deep curiosity and a commitment to creating 
                            elegant solutions to complex problems.
                        </motion.p>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-slate-600 text-lg leading-relaxed"
                        >
                            My expertise lies in building <span className="text-slate-600 font-semibold">scalable</span> web applications using modern technologies. 
                            I specialize in <span className="text-slate-600 font-semibold">Laravel</span> for backend development and <span className="text-slate-600 font-semibold">React</span> for frontend, creating 
                            seamless, high-performance applications that deliver exceptional user experiences.
                        </motion.p>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="text-slate-600 text-lg leading-relaxed"
                        >
                            When I'm not coding, I'm constantly learning and exploring new technologies to stay 
                            at the forefront of web development. I believe in writing clean, maintainable code 
                            and following best practices to ensure the long-term success of every project.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
