import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStore, FaCar, FaUsers, FaHandHoldingHeart, FaCalendarCheck } from "react-icons/fa";

export default function Projects() {
    const projects = [
        {
            title: "Toprow",
            description: "A comprehensive freelance marketplace platform connecting enterprises with top professionals. Features include advanced job posting, intelligent bidding system, secure payment processing, and real-time messaging capabilities.",
            icon: FaStore,
            technologies: ["Laravel", "React.js", "MySQL", "RESTful APIs", "Stripe API", "WebSockets"],
            category: "Marketplace",
            highlights: ["Real-time bidding system", "Secure payment integration", "Advanced search and filtering", "Real-time messaging"],
        },
        {
            title: "Kitchener Limousine & Sapphire Limo",
            description: "Enterprise-level fleet management and booking system with advanced scheduling, real-time vehicle tracking, and automated billing capabilities. Streamlines the entire booking process for luxury transportation services.",
            icon: FaCar,
            technologies: ["Laravel", "React.js", "MySQL", "RESTful APIs", "Google Maps API"],
            category: "Transportation",
            highlights: ["Real-time vehicle tracking", "Automated billing system", "Advanced scheduling", "Customer management"],
        },
        {
            title: "Rydeus",
            description: "Modern ride-hailing platform featuring real-time tracking, seamless driver-rider communication, and intelligent fare calculation. Optimized for performance and user experience.",
            icon: FaCar,
            technologies: ["Laravel", "React.js", "MySQL", "RESTful APIs"],
            category: "Transportation",
            highlights: ["Real-time location tracking", "Dynamic pricing", "Driver-rider chat", "Route optimization"]
        },
        {
            title: "Bunch HRMS",
            description: "Comprehensive Human Resource Management System designed for enterprise-level organizations. Features include employee management, automated payroll processing, performance tracking, and leave management.",
            icon: FaUsers,
            technologies: ["Laravel", "Vue.js", "MySQL", "RESTful APIs"],
            category: "Enterprise",
            highlights: ["Automated payroll", "Performance tracking", "Leave management", "Employee portal"]
        },
        {
            title: "Points4Purpose",
            description: "Advanced donation and volunteer management platform with secure payment processing, campaign tracking, and donor management capabilities. Designed for non-profit organizations.",
            icon: FaHandHoldingHeart,
            technologies: ["Laravel", "jQuery", "MySQL", "Stripe API"],
            category: "Non-Profit",
            highlights: ["Secure donations", "Campaign analytics", "Volunteer management", "Donor tracking"]
        },
        {
            title: "Radha Swami Satsang Attendance",
            description: "Sophisticated attendance tracking system with advanced reporting and analytics capabilities. Optimized for large-scale event management and attendance monitoring.",
            icon: FaCalendarCheck,
            technologies: ["Laravel", "HTML"],
            category: "Management",
            highlights: ["Real-time tracking", "Advanced reporting", "Analytics dashboard", "Event management"]
        }
    ];

    return (
        <section id="projects" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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
                            <span className="text-slate-600 text-lg font-medium tracking-wider uppercase">Portfolio</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6"
                        >
                            My Projects
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-32 bg-slate-400 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * index }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 hover:border-slate-200 transition-all duration-300 group"
                            >
                                {/* Project Icon */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <project.icon className="w-24 h-24 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex space-x-4">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-slate-300 transition-colors duration-300"
                                                >
                                                    <FaGithub className="text-2xl" />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-slate-300 transition-colors duration-300"
                                                >
                                                    <FaExternalLinkAlt className="text-2xl" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 mb-4">{project.description}</p>
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-sm font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.highlights.map((highlight, highlightIndex) => (
                                                <span
                                                    key={highlightIndex}
                                                    className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-sm font-medium"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
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
