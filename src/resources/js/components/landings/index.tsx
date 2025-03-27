import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLaravel, FaReact, FaDatabase, FaServer } from "react-icons/fa";
import About from "./about";
import Experience from "./experience";
import Skills from "./skills";
import Projects from "./projects";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Landing() {
    const words = ["Laravel Expert", "Full Stack Developer", "Senior Developer"];
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDisplayText(words[index]);
    }, [index]);

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-12">
                        {/* Left Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-white"
                        >
                            {/* Experience Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full mb-8 border border-white/10"
                            >
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                <span className="text-white/90">5+ Years of Experience</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-4"
                            >
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                    Hi, I'm <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-gradient">Jyoti</span>
                                </h1>
                                <div className="h-1 w-24 bg-white/90 rounded-full"></div>
                            </motion.div>

                            <motion.h4 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-bold text-4xl md:text-5xl text-white/90 mb-6"
                            >
                                {displayText}
                            </motion.h4>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-white/70 text-lg max-w-xl leading-relaxed mb-8"
                            >
                                With over 5 years of expertise in Laravel development, I specialize in creating scalable, 
                                secure, and high-performance web applications. My experience spans across complex enterprise 
                                solutions, RESTful APIs, and modern frontend integrations.
                            </motion.p>

                            {/* Tech Stack */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-4 mb-8"
                            >
                                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                                    <FaLaravel className="text-white/90 text-xl" />
                                    <span className="text-white/90">Laravel</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                                    <FaReact className="text-white/90 text-xl" />
                                    <span className="text-white/90">React</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                                    <FaDatabase className="text-white/90 text-xl" />
                                    <span className="text-white/90">MySQL</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                                    <FaServer className="text-white/90 text-xl" />
                                    <span className="text-white/90">REST APIs</span>
                                </div>
                            </motion.div>
                            
                            {/* CTA Button */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex space-x-4"
                            >
                                <a 
                                    href="#projects" 
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 border border-white/10 hover:border-white/20"
                                >
                                    <span className="relative z-10 flex items-center">
                                        View Projects
                                        <svg 
                                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M13 7l5 5m0 0l-5 5m5-5H6" 
                                            />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative group">
                                <div className="absolute  rounded-2xl transition-all duration-300"></div>
                                <img 
                                    src="/images/banner/2.png" 
                                    alt="Profile" 
                                    className="rounded-2xl shadow-2xl w-full relative z-10 object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <About />

            {/* Experience Section */}
            <Experience />

            {/* Skills Section */}
            <Skills />

            {/* Projects Section */}
            <Projects />

            {/* Contact Section */}
            <Contact />

            {/* Footer */}
            <Footer />
        </div>
    );
}
