import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function AboutSection({ image, bio }) {
  return (
    <section
      id="about"
      className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] flex flex-col items-center justify-center px-4 py-16 sm:py-20 lg:py-0 relative overflow-hidden"
    >
      {/* Static Background (No Animation) */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 blur-3xl" />

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
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-4xl overflow-hidden border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50">
              <img
                src={image}
                alt="Shahzad Khichi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
          className="text-center lg:text-left space-y-5"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Shahzad Khichi
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5">
            <span>I am a</span>
            <span className="text-cyan-400 min-h-[2.5rem] sm:min-h-[3rem] flex items-center">
              <Typewriter
                options={{
                  strings: [
                    "Web Developer",
                    "Software Engineer",
                    "MERN Stack Dev",
                    "React Developer",
                    "React Native Dev",
                    "Full Stack Dev",
                    "Frontend Dev",
                    "Java Developer",
                    "Backend Dev",
                    "Node.js Dev",
                    "Spring Boot Dev",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  typeSpeed: 70,
                  delay: 70,
                  cursor: "_",
                }}
              />
            </span>
          </h2>
          {/* image */}
          <div className="bg-gradient-to-br from-[#1a1a1a]/80 via-[#0f0f0f]/90 to-[#111]/80 backdrop-blur-xl border border-cyan-700/40 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-2xl text-sm sm:text-base">
            <span className="text-blue-400 font-mono">{"<>"}</span>
            <p className="text-gray-200 leading-relaxed mt-2 mb-3">{bio}</p>
            <span className="text-blue-400 font-mono">{"</>"}</span>
          </div>

          <div className="flex justify-center lg:justify-start">
            <SocialLinks />
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/40 transition-shadow flex items-center justify-center gap-2 text-sm"
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
              className="px-6 py-3 bg-transparent text-cyan-300 border-2 border-cyan-500 font-bold rounded-full hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2 text-sm"
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
