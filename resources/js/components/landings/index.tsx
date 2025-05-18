import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLaravel, FaReact, FaDatabase, FaServer, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Code2, Terminal, Cpu, Database, Server, GitBranch } from "lucide-react";
import Header from "./Header";
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
        <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50">

            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px),
                                            linear-gradient(to bottom, #000000 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-100/30 to-slate-50"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-12">
                        {/* Left Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-slate-800"
                        >
                            {/* Experience Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full mb-8 border border-slate-200"
                            >
                                <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></div>
                                <span className="text-slate-700">6+ Years of Experience</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-4"
                            >
                                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4">
                                    Hi, I'm <span className="text-slate-600 relative">
                                        Jyoti
                                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200"></span>
                                    </span>
                                </h1>
                                <div className="h-1 w-24 bg-slate-400 rounded-full"></div>
                            </motion.div>

                            <motion.h4 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-bold text-4xl md:text-5xl text-slate-600 mb-6"
                            >
                                {displayText}
                            </motion.h4>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-slate-600 text-lg max-w-xl leading-relaxed mb-8"
                            >
                                With over <span className="text-slate-600 font-semibold">6 years</span> of expertise in <span className="text-slate-600 font-semibold">Laravel</span> development, I specialize in creating <span className="text-slate-600 font-semibold">scalable</span>, 
                                <span className="text-slate-600 font-semibold">secure</span>, and <span className="text-slate-600 font-semibold">high-performance</span> web applications. My experience spans across complex enterprise 
                                solutions, RESTful APIs, and modern frontend integrations.
                            </motion.p>

                            {/* Tech Stack */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-4 mb-8"
                            >
                                <div className="flex items-center space-x-2 bg-slate-50 px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:bg-slate-100">
                                    <FaLaravel className="text-slate-600 text-xl" />
                                    <span className="text-slate-700">Laravel</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-slate-50 px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:bg-slate-100">
                                    <FaReact className="text-slate-600 text-xl" />
                                    <span className="text-slate-700">React</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-slate-50 px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:bg-slate-100">
                                    <FaDatabase className="text-slate-600 text-xl" />
                                    <span className="text-slate-700">MySQL</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-slate-50 px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:bg-slate-100">
                                    <FaServer className="text-slate-600 text-xl" />
                                    <span className="text-slate-700">REST APIs</span>
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
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-slate-700"
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
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative flex items-center justify-center"
                        >
                            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-16">
                                    <motion.div
                                        animate={{
                                            y: [0, -20, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="flex flex-col items-center space-y-12"
                                    >
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
                                            <Code2 className="w-12 h-12 text-slate-600" />
                                        </div>
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
                                            <Terminal className="w-12 h-12 text-slate-600" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            y: [0, 20, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                        className="flex flex-col items-center space-y-12"
                                    >
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
                                            <Database className="w-12 h-12 text-slate-600" />
                                        </div>
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
                                            <Server className="w-12 h-12 text-slate-600" />
                                        </div>
                                    </motion.div>
                                </div>
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
