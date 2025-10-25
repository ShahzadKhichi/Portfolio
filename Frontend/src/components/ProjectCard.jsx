import React from "react";
import { motion } from "framer-motion";
import { FiFrown, FiLock } from "react-icons/fi";

const ProjectCard = ({ title, description, Technologies, image, liveLink, githubLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 20 }}
      viewport={{ once: true }}
      className="group relative bg-gradient-to-br from. from-[#0a0a0af3] via-[#111] to-[#0a0a0af3] backdrop-blur-xl border border-cyan-800/40 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/60 transition-all duration-700 hover:-translate-y-4 w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-[420px]">
        {/* Image Section - Enhanced */}
        <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-black/70 to-black/50">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent blur-xl transform -translate-y-16" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-5 left-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl backdrop-blur-sm border border-white/20 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Featured Project
          </motion.div>

          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/30 to-transparent rounded-full blur-3xl -z-10" />
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-transparent via-[#0f0f0f]/95 to-[#0a0a0a]/95 backdrop-blur-sm">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-500"
            >
              {title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 font-light tracking-wide"
            >
              {description}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {Technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5 + 0.08 * i }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  backgroundColor: "rgba(34, 211, 238, 0.7)",
                  color: "white"
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-cyan-300 text-sm font-semibold rounded-full border border-cyan-700/60 backdrop-blur-sm transition-all duration-300 shadow-md"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-5">
            {liveLink ? (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(34, 211, 238, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold text-sm rounded-2xl shadow-xl hover:shadow-cyan-500/70 transition-all duration-300 group/link"
              >
                <span>Live Demo</span>
                <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 font-medium text-sm rounded-2xl cursor-default shadow-md"
              >
                <FiFrown className="w-5 h-5" />
                <span>Demo Coming Soon</span>
              </motion.div>
            )}
            
            {githubLink ? (
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(156, 163, 175, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 font-bold text-sm rounded-2xl border border-gray-700 hover:border-gray-600 hover:text-white transition-all duration-300 shadow-xl group/link"
              >
                <span>Source Code</span>
                <svg className="w-5 h-5 group-hover/link:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.221-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 font-medium text-sm rounded-2xl cursor-default shadow-md"
              >
                <FiLock className="w-5 h-5" />
                <span>Sorry, Code is Private</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-transparent to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />
    </motion.div>
  );
};

export default ProjectCard;
