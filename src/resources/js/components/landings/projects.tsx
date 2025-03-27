import { motion } from "framer-motion";
import { FaLaravel, FaReact, FaVuejs, FaDatabase, FaCode, FaServer, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Projects() {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 2;

    const projects = [
        {
            title: "Toprow",
            description: "A comprehensive freelance marketplace platform connecting enterprises with top professionals. Features include advanced job posting, intelligent bidding system, secure payment processing, and real-time messaging capabilities.",
            technologies: ["Laravel", "React.js", "MySQL", "RESTful APIs", "Stripe API", "WebSockets"],
            icon: <FaCode className="text-2xl" />,
            category: "Marketplace",
            highlights: ["Real-time bidding system", "Secure payment integration", "Advanced search and filtering", "Real-time messaging"],
            image: "/images/projects/toprow.png",
            github: "https://github.com/yourusername/toprow",
            demo: "https://toprow.com"
        },
        {
            title: "Kitchener Limousine & Sapphire Limo",
            description: "Enterprise-level fleet management and booking system with advanced scheduling, real-time vehicle tracking, and automated billing capabilities. Streamlines the entire booking process for luxury transportation services.",
            technologies: ["Laravel", "React.js", "MySQL", "RESTful APIs", "Google Maps API"],
            icon: <FaServer className="text-2xl" />,
            category: "Transportation",
            highlights: ["Real-time vehicle tracking", "Automated billing system", "Advanced scheduling", "Customer management"],
            image: "/images/projects/limo.png",
            github: "https://github.com/yourusername/limo",
            demo: "https://limo.com"
        },
        {
            title: "Rydeus",
            description: "Modern ride-hailing platform featuring real-time tracking, seamless driver-rider communication, and intelligent fare calculation. Optimized for performance and user experience.",
            technologies: ["Laravel", "React.js", "MySQL", "RESTful APIs"],
            icon: <FaServer className="text-2xl" />,
            category: "Transportation",
            highlights: ["Real-time location tracking", "Dynamic pricing", "Driver-rider chat", "Route optimization"]
        },
        {
            title: "Bunch HRMS",
            description: "Comprehensive Human Resource Management System designed for enterprise-level organizations. Features include employee management, automated payroll processing, performance tracking, and leave management.",
            technologies: ["Laravel", "Vue.js", "MySQL", "RESTful APIs"],
            icon: <FaCode className="text-2xl" />,
            category: "Enterprise",
            highlights: ["Automated payroll", "Performance tracking", "Leave management", "Employee portal"]
        },
        {
            title: "Points4Purpose",
            description: "Advanced donation and volunteer management platform with secure payment processing, campaign tracking, and donor management capabilities. Designed for non-profit organizations.",
            technologies: ["Laravel", "jQuery", "MySQL", "Stripe API"],
            icon: <FaCode className="text-2xl" />,
            category: "Non-Profit",
            highlights: ["Secure donations", "Campaign analytics", "Volunteer management", "Donor tracking"]
        },
        {
            title: "Radha Swami Satsang Attendance",
            description: "Sophisticated attendance tracking system with advanced reporting and analytics capabilities. Optimized for large-scale event management and attendance monitoring.",
            technologies: ["Laravel", "HTML"],
            icon: <FaDatabase className="text-2xl" />,
            category: "Management",
            highlights: ["Real-time tracking", "Advanced reporting", "Analytics dashboard", "Event management"]
        }
    ];

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const currentProjects = projects.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    return (
        <section className="py-32 bg-black relative overflow-hidden" id="projects">
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
                            <span className="text-white/70 text-lg font-medium tracking-wider uppercase">My Work</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-7xl font-bold text-white mb-6"
                        >
                            Featured Projects
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-40 bg-white/90 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Projects Grid */}
                    <div className="space-y-24">
                        {currentProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="flex flex-col lg:flex-row gap-12 items-start">
                                    {/* Project Icon and Category */}
                                    <div className="relative lg:w-1/4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-white/5 rounded-full blur-xl"></div>
                                            <div className="relative w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                                                <span className="text-4xl text-white/90">
                                                    {project.icon}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-bold text-white mb-6">
                                            <span className="text-blue-400 relative">
                                                {project.title}
                                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400/20"></span>
                                            </span>
                                        </h3>

                                        <p className="text-white/70 text-lg mb-8">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            {/* Highlights */}
                                            <div>
                                                <h4 className="text-white/80 font-medium mb-4">Key Features</h4>
                                                <div className="space-y-3">
                                                    {project.highlights.map((highlight, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-center space-x-3 group"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors duration-300"></div>
                                                            <span className="text-white/60">
                                                                {highlight.split(/(\d+%|\d+\+)/).map((part, i) => 
                                                                    /\d+%|\d+\+/.test(part) 
                                                                        ? <span key={i} className="text-blue-400 font-semibold">{part}</span>
                                                                        : part
                                                                )}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Technologies */}
                                            <div>
                                                <h4 className="text-white/80 font-medium mb-4">Technologies</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, idx) => (
                                                        <motion.span
                                                            key={idx}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="px-4 py-2 bg-white/5 text-white/60 rounded-full text-sm"
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Links */}
                                        {(project.github || project.demo) && (
                                            <div className="flex items-center space-x-6">
                                                {project.github && (
                                                    <motion.a
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300"
                                                    >
                                                        <FaGithub className="text-xl" />
                                                        <span>View Code</span>
                                                    </motion.a>
                                                )}
                                                {project.demo && (
                                                    <motion.a
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300"
                                                    >
                                                        <FaExternalLinkAlt className="text-xl" />
                                                        <span>Live Demo</span>
                                                    </motion.a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-16">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-full transition-all duration-300 ${
                                    currentPage === 1
                                        ? 'text-white/30 cursor-not-allowed'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <FaChevronLeft />
                            </motion.button>

                            <div className="flex space-x-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            currentPage === index + 1
                                                ? 'bg-white/10 text-white'
                                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {index + 1}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-full transition-all duration-300 ${
                                    currentPage === totalPages
                                        ? 'text-white/30 cursor-not-allowed'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <FaChevronRight />
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
