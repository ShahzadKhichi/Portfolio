import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-bg py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-text-secondary text-lg"
        >
          &copy; {new Date().getFullYear()} Shahzad Khichi. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
