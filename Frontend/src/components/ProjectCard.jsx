import React from "react";
import { motion } from "framer-motion";
import { FiFrown, FiLock, FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({
  title,
  description,
  Technologies,
  image,
  liveLink,
  githubLink,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 150,
        damping: 18,
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative bg-gradient-to-br from-[#0a0a0af3] via-[#111] to-[#0a0a0af3] backdrop-blur-xl border border-cyan-800/40 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/60 transition-all duration-500 hover:-translate-y-2 w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-[420px]">
        {/* Image Section - Consistent across all devices */}
        <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-black/70 to-black/50">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Featured Badge - Responsive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-sm border border-white/20 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
            Featured Project
          </motion.div>

          {/* Decorative Orb */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-cyan-500/30 to-transparent rounded-full blur-3xl -z-10" />
        </div>

        {/* Content Section - Responsive */}
        <div className="lg:w-1/2 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-between bg-gradient-to-b from-transparent via-[#0f0f0f]/95 to-[#0a0a0a]/95 backdrop-blur-sm">
          <div>
            {/* Title - Responsive */}
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-400"
            >
              {title}
            </motion.h3>

            {/* Description - Responsive */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-7 lg:mb-8 font-light tracking-wide"
            >
              {description}
            </motion.p>
          </div>

          {/* Tech Stack - Responsive */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-7 lg:mb-8">
            {Technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + 0.05 * i }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  backgroundColor: "rgba(34, 211, 238, 0.7)",
                  color: "white",
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-cyan-300 font-semibold rounded-full border border-cyan-700/60 backdrop-blur-sm transition-all duration-300 shadow-md"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex gap-3 sm:gap-4 lg:gap-5">
            {liveLink ? (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl hover:shadow-cyan-500/70 transition-all duration-300 group/link"
              >
                <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Live Demo</span>
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 font-medium text-xs sm:text-sm rounded-2xl cursor-default shadow-md"
              >
                <FiFrown className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Coming Soon</span>
              </motion.div>
            )}

            {githubLink ? (
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(156, 163, 175, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 font-bold text-xs sm:text-sm rounded-2xl border border-gray-700 hover:border-gray-600 hover:text-white transition-all duration-300 shadow-xl group/link"
              >
                <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Source Code</span>
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 font-medium text-xs sm:text-sm rounded-2xl cursor-default shadow-md"
              >
                <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Private</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-transparent to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />
    </motion.div>
  );
};

export default ProjectCard;
