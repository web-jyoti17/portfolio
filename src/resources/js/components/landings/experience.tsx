import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaCheckCircle } from "react-icons/fa";

export default function Experience() {
    const experiences = [
        {
            year: "2023 - Present",
            title: "Senior Full Stack Developer",
            company: "Tech Solutions Inc.",
            description: "Leading development of enterprise-level applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
            achievements: [
                "Led a team of 5 developers in building a scalable microservices architecture",
                "Implemented CI/CD pipelines reducing deployment time by 60%",
                "Developed real-time analytics dashboard processing 1M+ events daily"
            ]
        },
        {
            year: "2021 - 2023",
            title: "Full Stack Developer",
            company: "Digital Innovations",
            description: "Developed and maintained multiple web applications using modern technologies. Improved application performance by 40% through optimization techniques.",
            achievements: [
                "Implemented automated testing increasing coverage to 85%",
                "Developed RESTful APIs serving 100K+ daily requests"
            ]
        },
        {
            year: "2019 - 2021",
            title: "Frontend Developer",
            company: "Web Solutions",
            description: "Created responsive and interactive user interfaces using React and modern CSS frameworks. Collaborated with design team to implement pixel-perfect designs.",
            achievements: [
                "Built responsive UI components used across 10+ projects",
                "Reduced bundle size by 30% through code optimization",
                "Implemented PWA features increasing user engagement by 25%"
            ]
        }
    ];

    return (
        <section className="py-20 bg-black relative overflow-hidden" id="experience">
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
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-3"
                        >
                            <span className="text-white/70 text-base font-medium tracking-wider uppercase">My Journey</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-3"
                        >
                            Experience
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-24 bg-white/90 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Experience Timeline */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-white/20"></div>

                        <div className="space-y-16">
                            {experiences.map((experience, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-1/2 -translate-x-1/2">
                                        <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white/50"></div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`w-[calc(50%-1rem)] ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
                                        {/* Year Badge */}
                                        <div className={`flex items-center space-x-2 mb-3 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                            <div className="flex items-center space-x-1.5 text-white/70">
                                                <FaCalendarAlt className="text-sm" />
                                                <span className="text-sm">{experience.year}</span>
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className="relative group">
                                            {/* Background Glow */}
                                            <div className="absolute inset-0 bg-white/5 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Content */}
                                            <div className="relative p-5 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                                                {/* Header */}
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                                                        <FaBriefcase className="text-xl text-white/90" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-0.5">{experience.title}</h3>
                                                        <div className="flex items-center space-x-1.5 text-white/70">
                                                            <FaBuilding className="text-sm" />
                                                            <span className="text-sm">{experience.company}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/80 text-sm leading-relaxed mb-4">{experience.description}</p>

                                                {/* Achievements */}
                                                <div className="space-y-3">
                                                    {experience.achievements.map((achievement, achievementIndex) => (
                                                        <motion.div
                                                            key={achievementIndex}
                                                            whileHover={{ x: index % 2 === 0 ? 6 : -6 }}
                                                            className="flex items-start space-x-2 group/achievement"
                                                        >
                                                            <div className="w-0.5 h-full bg-gradient-to-b from-white/20 to-white/10 rounded-full mt-1 group-hover/achievement:from-white/30 group-hover/achievement:to-white/20 transition-colors duration-300"></div>
                                                            <div className="flex-1">
                                                                <span className="text-white/70 text-sm block mb-0.5">{achievement}</span>
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    whileHover={{ width: "100%" }}
                                                                    className="h-0.5 bg-white/10 rounded-full"
                                                                ></motion.div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
