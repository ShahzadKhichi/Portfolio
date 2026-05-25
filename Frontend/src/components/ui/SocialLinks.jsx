import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SocialLinks({ links }) {
  if (!links) return null;

  return (
    <div className="flex justify-center lg:justify-start gap-4 mt-6">
      {links.linkedin && (
        <motion.a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-surface text-accent border border-border rounded-full hover:bg-accent hover:text-white transition-colors duration-300"
        >
          <FaLinkedin size={24} />
        </motion.a>
      )}
      {(links.whatsapp || links.phone) && (
        <motion.a
          href={`https://wa.me/${links.whatsapp || links.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-surface text-accent border border-border rounded-full hover:bg-accent hover:text-white transition-colors duration-300"
        >
          <FaWhatsapp size={24} />
        </motion.a>
      )}
      {links.email && (
        <motion.a
          href={`mailto:${links.email}`}
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-surface text-accent border border-border rounded-full hover:bg-accent hover:text-white transition-colors duration-300"
        >
          <MdEmail size={24} />
        </motion.a>
      )}
    </div>
  );
}
