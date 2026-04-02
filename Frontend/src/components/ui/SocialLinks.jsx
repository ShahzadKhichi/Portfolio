import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SocialLinks({ links }) {
  const social = links || {
    linkedin: "https://www.linkedin.com/in/shahzad-khichi-3931372a5/",
    whatsapp: "923424478135",
    email: "shahzadkhichi996@gmail.com"
  };

  return (
    <div className="flex justify-center lg:justify-start gap-4 mt-6">
      {social.linkedin && (
        <motion.a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <FaLinkedin size={24} />
        </motion.a>
      )}
      {(social.whatsapp || social.phone) && (
        <motion.a
          href={`https://wa.me/${social.whatsapp || social.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 bg-green-600 text-white rounded-full shadow-lg hover:shadow-green-500/50 transition-all"
        >
          <FaWhatsapp size={24} />
        </motion.a>
      )}
      {social.email && (
        <motion.a
          href={`mailto:${social.email}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 bg-gray-800 text-gray-200 rounded-full shadow-lg hover:shadow-gray-700/50 transition-all"
        >
          <MdEmail size={24} />
        </motion.a>
      )}
    </div>
  );
}
