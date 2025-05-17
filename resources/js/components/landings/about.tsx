import React from "react";

export default function About() {
    return (
        <section id="about" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-white/70 text-lg font-medium tracking-wider uppercase">Get to know me</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">About Me</h2>
                        <div className="h-1 w-32 bg-white/90 rounded-full mx-auto"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        <p className="text-white/80 text-lg leading-relaxed">
                            I am a passionate <span className="text-blue-400 font-semibold">Full Stack Developer</span> with over <span className="text-blue-400 font-semibold">5 years of experience</span> in web development. 
                            My journey in technology has been driven by a deep curiosity and a commitment to creating 
                            elegant solutions to complex problems.
                        </p>

                        <p className="text-white/80 text-lg leading-relaxed">
                            My expertise lies in building <span className="text-blue-400 font-semibold">scalable</span> web applications using modern technologies. 
                            I specialize in <span className="text-blue-400 font-semibold">Laravel</span> for backend development and <span className="text-blue-400 font-semibold">React</span> for frontend, creating 
                            seamless, high-performance applications that deliver exceptional user experiences.
                        </p>

                        <p className="text-white/80 text-lg leading-relaxed">
                            When I'm not coding, I'm constantly learning and exploring new technologies to stay 
                            at the forefront of web development. I believe in writing clean, maintainable code 
                            and following best practices to ensure the long-term success of every project.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
