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
          className="p-3 bg-navy-700 text-teal-accent border border-teal-accent/20 rounded-full shadow-lg hover:shadow-teal-accent/20 hover:bg-teal-accent hover:text-navy-950 transition-all duration-300"
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
          className="p-3 bg-navy-700 text-teal-accent border border-teal-accent/20 rounded-full shadow-lg hover:shadow-teal-accent/20 hover:bg-teal-accent hover:text-navy-950 transition-all duration-300"
        >
          <FaWhatsapp size={24} />
        </motion.a>
      )}
      {social.email && (
        <motion.a
          href={`mailto:${social.email}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 bg-navy-700 text-teal-accent border border-teal-accent/20 rounded-full shadow-lg hover:shadow-teal-accent/20 hover:bg-teal-accent hover:text-navy-950 transition-all duration-300"
        >
          <MdEmail size={24} />
        </motion.a>
      )}
    </div>
  );
}
