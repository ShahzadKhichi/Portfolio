import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import SocialLinks from "../ui/SocialLinks";
import * as typewriterApi from "../../api/typewriter.api";

export default function AboutSection({ image, bio, socialLinks }) {
  const [typewriterStrings, setTypewriterStrings] = useState([
    "Web Developer",
    "Software Engineer",
    "MERN Stack Specialist",
    "Full Stack Developer"
  ]);

  useEffect(() => {
    const fetchTypewriterStrings = async () => {
      try {
        const response = await typewriterApi.getAllTypewriters();
        if (response.data.success && response.data.typewriters.length > 0) {
          setTypewriterStrings(response.data.typewriters.map(t => t.text));
        }
      } catch (error) {
        console.error("Error fetching typewriter strings:", error);
      }
    };
    fetchTypewriterStrings();
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center px-4  py-16 sm:py-20 lg:py-0 relative overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-accent/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-teal-accent/30 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-4xl overflow-hidden border-4 border-teal-accent/60 shadow-2xl shadow-teal-accent/20">
              <img
                src={image || "/profile.png"}
                alt="Shahzad Khichi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal-accent text-navy-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Available for Hire
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center lg:text-left pt-15 space-y-5"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Shahzad <span className="text-gradient-primary">Khichi</span>
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5">
            <span>I am a</span>
            <span className="text-gradient-primary min-h-[2.5rem] sm:min-h-[3rem] flex items-center">
              <Typewriter
                key={typewriterStrings.join(",")}
                options={{
                  strings: typewriterStrings,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  typeSpeed: 60,
                  delay: 70,
                  cursor: "_",
                }}
              />
            </span>
          </h2>
          {/* Bio Card */}
          <div className="bg-white/[0.02] border border-white/10 backdrop-blur-[3px] rounded-2xl p-5 sm:p-7 lg:p-8 shadow-2xl text-sm sm:text-base">
            <span className="text-teal-accent font-mono">{"<>"}</span>
            <p className="text-gray-100 leading-relaxed mt-2 mb-3">
              {bio || "I am a passionate Full Stack Developer and MERN Stack Specialist specializing in building robust, high-performance web applications. With strong expertise in React.js, Node.js, Express, MongoDB, and modern UI/UX design, I craft clean, scalable, and search engine-optimized digital solutions tailored to user needs."}
            </p>
            <span className="text-teal-accent font-mono">{"</>"}</span>
          </div>

          <div className="flex justify-center lg:justify-start">
            <SocialLinks links={socialLinks} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-teal-accent text-navy-950 font-bold rounded-full shadow-lg hover:shadow-teal-accent/40 transition-all duration-300 hover:bg-teal-dark flex items-center justify-center gap-2 text-sm"
            >
              <span>Download Resume</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>

            <a
              href="#contact"
              className="px-6 py-3 bg-transparent text-teal-accent border-2 border-teal-accent/50 font-bold rounded-full hover:bg-teal-accent/10 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <span>Get in Touch</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
