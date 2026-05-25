import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaCode,
  FaTools,
  FaEnvelope,
  FaGithub,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "About", href: "#about", icon: FaUser },
  { name: "Projects", href: "#projects", icon: FaCode },
  { name: "Skills", href: "#skills", icon: FaTools },
  { name: "GitHub", href: "#github", icon: FaGithub },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
];

export default function Navbar({ profileImage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-full overflow-hidden border-2 border-accent">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={i}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.08,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="group relative px-1 lg:px-5 py-3 text-sm lg:text-base font-semibold text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2.5 rounded-xl"
                  >
                    <Icon className="text-lg text-accent/60 group-hover:text-accent transition-colors" />
                    <span>{link.name}</span>

                    {/* Underline */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.a>
                );
              })}
            </div>

            {/* Hire Me Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-7 py-3 bg-accent text-white font-bold text-sm rounded-full transition-colors duration-300 hover:bg-accent-hover"
            >
              Hire Me
            </motion.a>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-accent hover:text-accent-hover transition-colors"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileOpen ? (
                  <FaTimes className="w-7 h-7" />
                ) : (
                  <FaBars className="w-7 h-7" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={i}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 120,
                    }}
                    className="flex items-center gap-4 py-4 px-5 text-xl font-semibold text-text-secondary hover:text-accent transition-colors duration-300 rounded-2xl hover:bg-accent-light group"
                  >
                    <Icon className="text-2xl text-accent/60 group-hover:text-accent transition-colors" />
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                whileTap={{ scale: 0.95 }}
                className="block w-full text-center py-4 mt-6 bg-accent text-white font-bold text-lg rounded-2xl transition-colors duration-300 hover:bg-accent-hover"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Anchor for smooth scroll */}
      <div id="home" className="h-0" />
    </>
  );
}
