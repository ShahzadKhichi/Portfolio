import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-slate-950 to-slate-900 py-12 border-t border-blue-800/30">
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
