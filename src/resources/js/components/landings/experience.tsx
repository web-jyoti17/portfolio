import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaCheckCircle } from "react-icons/fa";

interface Experience {
    id: number;
    company: string;
    position: string;
    description: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    location: string;
}

interface Props {
    experiences: Experience[];
}

export default function Experience({ experiences }: Props) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    return (
        <section id="experience" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-gray-600 text-lg font-medium tracking-wider uppercase">My Journey</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Work Experience</h2>
                        <div className="h-1 w-32 bg-gray-900/90 rounded-full mx-auto"></div>
                    </div>

                    {/* Experience Timeline */}
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative bg-white p-6 rounded-lg shadow-md border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-600 mt-1">{exp.company}</p>
                                    </div>
                                    <div className="text-gray-500 mt-2 md:mt-0">
                                        <span>{formatDate(exp.start_date)} - </span>
                                        <span>{exp.is_current ? 'Present' : formatDate(exp.end_date!)}</span>
                                        <p className="text-gray-400 text-sm">{exp.location}</p>
                                    </div>
                                </div>
                                <div 
                                    className="prose prose-gray max-w-none text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
