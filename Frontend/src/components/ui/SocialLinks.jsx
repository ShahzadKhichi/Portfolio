import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function SocialLinks({ links }) {
  if (!links) return null;

  return (
    <div className="flex justify-center lg:justify-start gap-4 mt-6">
      {links.linkedin && (
        <motion.a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="p-3 bg-surface text-accent border border-border rounded-full hover:bg-accent hover:text-white transition-colors duration-300"
        >
          <FaLinkedin size={24} />
        </motion.a>
      )}
      {links.email && (
        <motion.a
          href={`mailto:${links.email}`}
          whileHover={{ scale: 1.05 }}
          className="p-3 bg-surface text-accent border border-border rounded-full hover:bg-accent hover:text-white transition-colors duration-300 flex items-center justify-center"
        >
          {/* Gmail Official SVG Icon */}
          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 5.457v13.928c0 .904-.733 1.615-1.607 1.615H19.5V8.887l-7.5 4.81-7.5-4.81v12.113H1.607C.733 21 0 20.288 0 19.385V5.457c0-.583.312-1.11.815-1.378.502-.268 1.109-.243 1.589.066L12 10.21l9.596-6.065c.479-.31 1.087-.334 1.59-.066.502.268.814.795.814 1.378z" />
          </svg>
        </motion.a>
      )}
      {(links.github || links.github) && (
        <motion.a
          href={`https://github.com/${links.github || links.github}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="p-3 bg-surface text-accent border border-border rounded-full hover:bg-accent hover:text-white transition-colors duration-300"
        >
          <FaGithub size={24} />
        </motion.a>
      )}
    </div>
  );
}
