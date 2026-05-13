import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-navy-950 py-12 border-t border-teal-accent/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-400 text-lg"
        >
          &copy; {new Date().getFullYear()} Shahzad Khichi. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
