import React from "react";
import { motion } from "framer-motion";
import { FaLaravel, FaReact, FaDatabase, FaServer, FaGitAlt, FaDocker, FaAws } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMysql, SiPostgresql } from "react-icons/si";

export default function Skills() {
    const skillCategories = [
        {
            title: "Backend Development",
            skills: [
                { name: "Laravel", icon: FaLaravel, level: 95 },
                { name: "PHP", icon: FaLaravel, level: 90 },
                { name: "MySQL", icon: SiMysql, level: 85 },
                { name: "PostgreSQL", icon: SiPostgresql, level: 80 }
            ]
        },
        {
            title: "Frontend Development",
            skills: [
                { name: "React", icon: FaReact, level: 90 },
                { name: "TypeScript", icon: SiTypescript, level: 85 },
                { name: "Next JS", icon: SiTailwindcss, level: 60 },
                { name: "Javascript", icon: SiTailwindcss, level: 90z },

            ]
        },
        {
            title: "DevOps & Tools",
            skills: [
                { name: "Git", icon: FaGitAlt, level: 90 },
                { name: "Docker", icon: FaDocker, level: 85 },
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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
                            <span className="text-slate-600 text-lg font-medium tracking-wider uppercase">My Expertise</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6"
                        >
                            Skills & Technologies
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-1 w-32 bg-slate-400 rounded-full mx-auto"
                        ></motion.div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * index }}
                                className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:border-slate-200 transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-slate-900 mb-6">{category.title}</h3>
                                <div className="space-y-6">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skillIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * skillIndex }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <skill.icon className="text-slate-600 text-xl" />
                                                    <span className="text-slate-700 font-medium">{skill.name}</span>
                                                </div>
                                                <span className="text-slate-600 font-medium">{skill.level}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 * skillIndex }}
                                                    className="h-full bg-slate-500 rounded-full"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
