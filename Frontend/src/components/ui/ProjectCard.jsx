import React from "react";
import { motion } from "framer-motion";
import { FiFrown, FiLock, FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({
  title,
  description,
  tags,
  Technologies,
  image,
  live,
  liveLink,
  github,
  githubLink,
}) => {
  const techStack = tags || Technologies || [];
  const liveUrl = live || liveLink;
  const githubUrl = github || githubLink;
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
      className="group relative bg-white/[0.02] backdrop-blur-[3px] border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-teal-accent/30 transition-all duration-500 hover:-translate-y-2 w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-[420px]">
        {/* Image Section - Consistent across all devices */}
        <div className="lg:w-1/2 relative overflow-hidden bg-white/5">
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
            className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-teal-accent text-navy-950 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-2xl border border-teal-accent/50 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-navy-950 rounded-full animate-pulse" />
            Featured Project
          </motion.div>

          {/* Decorative Orb */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-teal-accent/15 rounded-full blur-3xl -z-10" />
        </div>

        {/* Content Section - Responsive */}
        <div className="lg:w-1/2 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-between bg-white/[0.02] backdrop-blur-[3px]">
          <div>
            {/* Title - Responsive */}
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-3 sm:mb-4 group-hover:text-teal-accent transition-all duration-400"
            >
              {title}
            </motion.h3>

            {/* Description - Responsive */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-7 lg:mb-8 font-light tracking-wide"
            >
              {description}
            </motion.p>
          </div>

          {/* Tech Stack - Responsive */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-7 lg:mb-8">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + 0.05 * i }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  backgroundColor: "rgba(0, 245, 212, 0.7)",
                  color: "#0a1128",
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/10 text-teal-accent font-semibold rounded-full border border-teal-accent/20 backdrop-blur-sm transition-all duration-300 shadow-md"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex gap-3 sm:gap-4 lg:gap-5">
            {liveUrl ? (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(0, 245, 212, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-teal-accent text-navy-950 font-bold text-xs sm:text-sm rounded-2xl shadow-xl hover:bg-teal-dark transition-all duration-300 group/link"
              >
                <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Live Demo</span>
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-1 px-2 py-1 sm:px-6 sm:py-3.5 bg-white/5 text-gray-400 font-medium text-xs sm:text-sm rounded-2xl cursor-default shadow-md"
              >
                <FiFrown className="w-5 h-4 sm:w-5 sm:h-5" />
                <span>Coming Soon</span>
              </motion.div>
            )}

            {githubUrl ? (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(156, 163, 175, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-white/5 text-gray-200 font-bold text-xs sm:text-sm rounded-2xl border border-white/10 hover:border-teal-accent/30 hover:text-white transition-all duration-300 shadow-xl group/link"
              >
                <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Source Code</span>
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-white/5 text-gray-400 font-medium text-xs sm:text-sm rounded-2xl cursor-default shadow-md"
              >
                <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Private</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-teal-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />
    </motion.div>
  );
};

export default ProjectCard;
