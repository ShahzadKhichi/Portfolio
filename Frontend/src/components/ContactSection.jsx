import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!BACKEND_URL) {
      toast.error("Backend URL is not configured!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}public/sendMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Network error. Try again later.");
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
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
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
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#1a1a1a]/80 via-[#0f0f0f]/90 to-[#111]/80 backdrop-blur-2xl border border-cyan-700/40 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {["name", "email"].map((field, i) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <label className="block text-cyan-300 font-semibold mb-3 text-sm tracking-wider">
                  {field === "name" ? "Full Name" : "Email Address"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-4 bg-[#101010]/80 border border-cyan-600/40 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                  placeholder={
                    field === "name" ? "John Doe" : "john@example.com"
                  }
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
              className="w-full px-5 py-4 bg-[#101010]/80 border border-cyan-600/40 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={`group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-500 flex items-center justify-center gap-3 ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-cyan-500/60"
              }`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
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
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
