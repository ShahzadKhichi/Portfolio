import React, { useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const techStack = tags || Technologies || [];
  const liveUrl = live || liveLink;
  const githubUrl = github || githubLink;

  const words = (description || "").trim().split(/\s+/);
  const isLongDescription = words.length > 20;
  const displayText = isLongDescription && !isExpanded 
    ? words.slice(0, 20).join(" ") + "..." 
    : description;

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
      className="group bg-white border border-border rounded-3xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-[420px]">
        {/* Image Section */}
        <div className="lg:w-1/2 relative overflow-hidden bg-surface">
          <motion.div
            whileHover={{ scale: 1.05 }}
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

          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-accent text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
            Featured Project
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-between">
          <div>
            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold text-text mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300"
            >
              {title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-7 lg:mb-8"
            >
              {displayText}
              {isLongDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 text-accent hover:text-accent-hover hover:underline font-semibold transition-colors duration-200 focus:outline-none inline-flex items-center"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              )}
            </motion.p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-7 lg:mb-8">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + 0.05 * i }}
                viewport={{ once: true }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-accent-light text-accent font-semibold rounded-full border border-accent/20 transition-colors duration-300 hover:bg-accent hover:text-white"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4 lg:gap-5">
            {liveUrl ? (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-accent text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-accent-hover transition-colors duration-300"
              >
                <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Live Demo</span>
              </motion.a>
            ) : (
              <motion.div
                className="flex-1 flex items-center justify-center gap-2 sm:gap-1 px-2 py-1 sm:px-6 sm:py-3.5 bg-surface text-text-secondary font-medium text-xs sm:text-sm rounded-2xl cursor-default"
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-surface text-text font-bold text-xs sm:text-sm rounded-2xl border border-border hover:border-accent/30 hover:text-accent transition-colors duration-300"
              >
                <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Source Code</span>
              </motion.a>
            ) : (
              <motion.div
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-surface text-text-secondary font-medium text-xs sm:text-sm rounded-2xl cursor-default"
              >
                <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Private</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
