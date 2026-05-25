import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import SocialLinks from "../ui/SocialLinks";
import * as typewriterApi from "../../api/typewriter.api";

export default function AboutSection({ image, bio, socialLinks, name }) {
  const [typewriterStrings, setTypewriterStrings] = useState([]);

  useEffect(() => {
    const fetchTypewriterStrings = async () => {
      try {
        const response = await typewriterApi.getAllTypewriters();
        if (response.data.success && response.data.typewriters.length > 0) {
          setTypewriterStrings(response.data.typewriters.map(t => t.text));
        }
      } catch (error) {
        console.error("Error fetching typewriter strings:", error);
      }
    };
    fetchTypewriterStrings();
  }, []);

  const displayName = name || "Shahzad Khichi";
  const [firstName, ...rest] = displayName.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-bg flex flex-col items-center justify-center px-4 xl:pr-50 py-16 sm:py-20 lg:py-0"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-border">
              <img
                src={image || "/profile.png"}
                alt={displayName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
              Available for Hire
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center lg:text-left pt-15 space-y-5"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text">
            {firstName} <span className="text-accent">{lastName}</span>
          </h1>

          {typewriterStrings.length > 0 && (
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5">
              <span>I am a</span>
              <span className="typewriter-text min-h-[2.5rem] sm:min-h-[3rem] flex items-center">
                <Typewriter
                  key={typewriterStrings.join(",")}
                  options={{
                    strings: typewriterStrings,
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    typeSpeed: 60,
                    delay: 70,
                    cursor: "_",
                  }}
                />
              </span>
            </h2>
          )}

          {/* Bio Card */}
          {bio && (
            <div className="liquid-glass rounded-2xl p-5 sm:p-7 lg:p-8 text-sm sm:text-base">
              <span className="text-accent font-mono">{"<>"}</span>
              <p className="text-text-secondary leading-relaxed mt-2 mb-3">
                {bio}
              </p>
              <span className="text-accent font-mono">{"</>"}</span>
            </div>
          )}

          <div className="flex justify-center lg:justify-start">
            <SocialLinks links={socialLinks} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-white font-bold rounded-full transition-colors duration-300 hover:bg-accent-hover flex items-center justify-center gap-2 text-sm"
            >
              <span>Download Resume</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>

            <a
              href="#contact"
              className="px-6 py-3 bg-transparent text-accent border-2 border-accent/40 font-bold rounded-full hover:bg-accent-light transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <span>Get in Touch</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
