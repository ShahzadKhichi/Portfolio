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
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 blur-3xl animate-pulse" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 lg:mt-30 mb-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-end order-1 lg:order-none"
        >
          <div className="relative group">
            {/* Glow Ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500" />

            {/* Image Container */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-cyan-500 shadow-2xl shadow-cyan-500/60 group-hover:shadow-cyan-400/80 transition-shadow duration-300">
              <motion.img
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5 }}
                src={image}
                alt="Shahzad Khichi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
            </div>

            {/* Floating Badge - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap"
            >
              Available for Hire
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-none"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x"
          >
            Shahzad Khichi
          </motion.h1>

          {/* Typewriter Title - Responsive */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-2"
          >
            <span className="whitespace-nowrap">I am a</span>
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
                  wrapperClassName: "text-cyan-400 font-bold inline-block",
                }}
              />
            </span>
          </motion.h2>

          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a1a1a]/80 via-[#0f0f0f]/90 to-[#111]/80 backdrop-blur-xl border border-cyan-700/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-500 text-sm sm:text-base lg:text-lg"
          >
            <span className="text-blue-400 font-mono text-lg sm:text-xl">
              {"<>"}
            </span>
            <p className="text-gray-200 leading-relaxed font-light mt-2 mb-3">
              {bio}
            </p>
            <span className="text-blue-400 font-mono text-lg sm:text-xl">
              {"</>"}
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <SocialLinks />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <motion.a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, rotate: 1.5 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              <span>Download Resume</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform"
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
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, rotate: -1.5 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-transparent text-cyan-300 border-2 border-cyan-500 font-bold rounded-full hover:bg-cyan-500/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              <span>Get in Touch</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform"
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
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </section>
  );
}
