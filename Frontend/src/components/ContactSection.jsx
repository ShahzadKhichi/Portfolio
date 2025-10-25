import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 lg:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#111] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 blur-3xl" />
      <div className="!absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="!absolute bottom-20 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
            Let's Connect
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#1a1a1a]/80 via-[#0f0f0f]/90 to-[#111]/80 backdrop-blur-2xl border border-cyan-700/40 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-cyan-300 font-semibold mb-3 text-sm tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-5 py-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-cyan-600/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 shadow-inner"
                placeholder="John Doe"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-cyan-300 font-semibold mb-3 text-sm tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-5 py-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-cyan-600/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 shadow-inner"
                placeholder="john@example.com"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <label className="block text-cyan-300 font-semibold mb-3 text-sm tracking-wider">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              disabled={isSubmitting}
              className="w-full px-5 py-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-cyan-600/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 resize-none shadow-inner"
              placeholder="Tell me about your project..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-cyan-500/60"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </motion.button>
          </motion.div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              {status === "success" ? (
                <>
                  <FiCheckCircle className="w-6 h-6 text-green-400" />
                  <p className="text-green-400 font-medium">Message sent successfully!</p>
                </>
              ) : status === "error" ? (
                <>
                  <FiXCircle className="w-6 h-6 text-red-400" />
                  <p className="text-red-400 font-medium">Failed to send. Please try again.</p>
                </>
              ) : null}
            </motion.div>
          )}
        </motion.form>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-cyan-500/20 to-transparent blur-3xl -z-10" />
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
