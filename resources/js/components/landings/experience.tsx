import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Experience() {
    const experiences = [
        {
            title: "Senior Full Stack Developer",
            company: "LN Webworks Pvt Ltd",
            period: "2023 - Present",
            location: "Ludhiana, Punjab",
            description: "Leading development of enterprise-level applications using Laravel and React. Implementing microservices architecture and optimizing database performance.",
            technologies: ["Laravel", "React", "MySQL", "Docker", "AWS"]
        },
        {
            title: "Laravel Developer",
            company: "Infino",
            period: "2019 - 2021",
            location: "Ludhiana, Punjab",
            description: "Developed and maintained multiple web applications, focusing on scalability and user experience. Implemented RESTful APIs and integrated third-party services.",
            technologies: ["Laravel", "React Js", "MongoDB", "Next Js", "Git"]
        },
        {
            title: "Web Developer",
            company: "Logiciel Solutions",
            period: "2017 - 2019",
            location: "Ludhiana, Punjab",
            description: "Started my IT journey at Logiciel Solutions, where I gained hands-on experience in Laravel development. Worked extensively on building RESTful APIs and integrating third-party services.",
            technologies: ["Laravel", "PHP", "JavaScript", "MySQL", "HTML/CSS", "jQuery", "REST APIs", "Third-party Integrations"]
        
        }
    ];

    return (
        <section id="experience" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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
                            <span className="text-slate-600 text-lg font-medium tracking-wider uppercase">My Journey</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6"
                        >
                            Work Experience
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-32 bg-slate-400 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Experience Timeline */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * index }}
                                className="relative pl-8 sm:pl-32 py-6 group"
                            >
                                {/* Timeline Line */}
                                <div className="absolute left-0 sm:left-16 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                                
                                {/* Timeline Dot */}
                                <div className="absolute left-0 sm:left-16 top-8 w-4 h-4 rounded-full bg-slate-400 border-4 border-slate-50 transform -translate-x-1/2"></div>

                                {/* Content */}
                                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:border-slate-200 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                                        <div className="flex items-center space-x-2 text-slate-600 mt-2 sm:mt-0">
                                            <FaCalendarAlt />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 text-slate-600 mb-4">
                                        <FaBriefcase />
                                        <span className="font-medium">{exp.company}</span>
                                        <span className="mx-2">•</span>
                                        <FaMapMarkerAlt />
                                        <span>{exp.location}</span>
                                    </div>

                                    <p className="text-slate-600 mb-4">{exp.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
