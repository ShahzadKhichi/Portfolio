import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function AboutSection({ image, bio }) {
  return (
    <section
      id="about"
      className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] flex flex-col items-center justify-center px-4 py-20 lg:py-0 relative overflow-hidden "
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 blur-3xl animate-pulse" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 md:mt-40">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Glow Ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />

            {/* Image Container */}
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-cyan-500 shadow-2xl shadow-cyan-500/60 group-hover:shadow-cyan-400/80 transition-shadow duration-500">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
                src={image}
                alt="Shahzad Khichi"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
            >
              Available for Hire
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x"
          >
            Shahzad Khichi
          </motion.h1>

          {/* Typewriter Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl lg:text-4xl font-bold text-white flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2"
          >
            <span>I am a</span>
            <span className="text-cyan-400">
              <Typewriter
                options={{
                  strings: [
                    "Web Developer",
                    "Software Engineer",
                    "MERN Stack Developer",
                    "React Developer",
                    "React Native Developer",
                    "Full Stack Developer",
                    "Frontend Developer",
                    "Java Developer",
                    "Backend Developer",
                    "Node.js Developer",
                    "Spring Boot Developer",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 40,
                  typeSpeed: 90,
                  delay: 80,
                  cursor: "_",
                  wrapperClassName: "text-cyan-400 font-bold",
                }}
              />
            </span>
          </motion.h2>

          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#1a1a1a]/80 via-[#0f0f0f]/90 to-[#111]/80 backdrop-blur-xl border border-cyan-700/40 rounded-3xl p-6 lg:p-10 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-500 "
          >
            <p className="text-gray-200 text-base lg:text-lg leading-relaxed font-light ">
              {bio}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <SocialLinks />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Download Resume</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 bg-transparent text-cyan-300 border-2 border-cyan-500 font-bold rounded-full hover:bg-cyan-500/20 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Get in Touch</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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

      {/* Custom CSS for animated gradient */}
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
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
