import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaReact, FaPhp, FaJs, FaLaravel, FaDatabase, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt, FaBootstrap, FaExchangeAlt } from "react-icons/fa";
import { SiPostman, SiZapier } from "react-icons/si";

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

const skills = [
    { name: "Laravel", icon: <FaLaravel />, category: "Backend" },
    { name: "RESTful API", icon: <SiPostman />, category: "Backend" },
    { name: "PHP", icon: <FaPhp />, category: "Backend" },
    { name: "React", icon: <FaReact />, category: "Frontend" },
    { name: "JavaScript", icon: <FaJs />, category: "Frontend" },
    { name: "Third-Party Integration", icon: <FaExchangeAlt />, category: "Integration" },
    { name: "Bootstrap", icon: <FaBootstrap />, category: "Frontend" },
    { name: "Docker", icon: <FaDocker />, category: "DevOps" },
    { name: "SQL", icon: <FaDatabase />, category: "Database" },
    { name: "Git", icon: <FaGitAlt />, category: "DevOps" },
    { name: "HTML", icon: <FaHtml5 />, category: "Frontend" },
    { name: "CSS", icon: <FaCss3Alt />, category: "Frontend" },
];

const SkillsGrid = ({ profile }: Props) => {
    const categories = [...new Set(skills.map(skill => skill.category))];

    return (
        <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden" id="skills">
            {/* Animated Background */}
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
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"
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
                    className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-3"
                    >
                        <span className="text-white/70 text-base font-medium tracking-wider uppercase">My Expertise</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-3"
                    >
                        Skills & Technologies
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="h-1 w-24 bg-white/90 rounded-full mx-auto"
                    ></motion.div>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {profile.skills?.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">{skill}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <FaArrowUp />
            </motion.button>
        </section>
    );
}

export default SkillsGrid;
