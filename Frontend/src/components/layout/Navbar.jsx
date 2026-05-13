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
        className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-navy-950/95 backdrop-blur-2xl shadow-2xl shadow-teal-accent/10 border-b border-teal-accent/15"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with Glow */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-teal-accent/40 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-11 h-11 lg:w-13 lg:h-13 rounded-full overflow-hidden border-3 border-teal-accent shadow-2xl shadow-teal-accent/40">
                <img
                  src={profileImage}
                  alt="Shahzad Khichi"
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
                    className="group relative px-1 lg:px-5 py-3 text-sm lg:text-base font-semibold text-gray-300 hover:text-teal-accent transition-all duration-300 flex items-center gap-2.5 rounded-xl overflow-hidden"
                  >
                    <Icon className="text-lg text-teal-accent/70 group-hover:text-teal-accent transition-colors" />
                    <span>{link.name}</span>

                    {/* Animated Underline */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    {/* Hover Glow */}
                    <span className="absolute inset-0 bg-teal-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-xl -z-10" />
                  </motion.a>
                );
              })}
            </div>

            {/* Hire Me Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 30px rgba(0, 245, 212, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-7 py-3 bg-teal-accent text-navy-950 font-bold text-sm rounded-full shadow-xl shadow-teal-accent/20 transition-all duration-700 border border-teal-accent/50 hover:bg-teal-dark"
            >
              Hire Me
            </motion.a>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative p-2 text-teal-accent hover:text-teal-dark transition-colors"
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
            className="md:hidden absolute top-full left-0 right-0 bg-navy-950/98 backdrop-blur-2xl border-t border-teal-accent/20 shadow-2xl overflow-hidden"
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
                    className="flex items-center gap-4 py-4 px-5 text-xl font-semibold text-gray-300 hover:text-teal-accent transition-all duration-300 rounded-2xl hover:bg-teal-accent/5 group"
                  >
                    <Icon className="text-2xl text-teal-accent/70 group-hover:text-teal-accent transition-colors" />
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full text-center py-4 mt-6 bg-teal-accent text-navy-950 font-bold text-lg rounded-2xl shadow-xl hover:shadow-teal-accent/30 transition-all duration-300"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Anchor for smooth scroll */}
      <div id="home" className="h-0" />

      {/* Custom CSS */}
      <style jsx={"true"}>{`
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .bg-pos-0 {
          background-position: 0% 50%;
        }
        .bg-pos-100 {
          background-position: 100% 50%;
        }
      `}</style>
    </>
  );
}
