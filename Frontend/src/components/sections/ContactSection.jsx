import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!BACKEND_URL) return toast.error("Backend URL not set!");
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${BACKEND_URL}public/sendMail`, formData);
      if (res.status === 200) {
        toast.success("Message sent!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-24 lg:py-32 bg-bg-alt">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-extrabold text-text">
            Got a project in <span className="text-accent">mind?</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="liquid-glass rounded-3xl p-8 lg:p-12 transition-colors duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {["name", "email"].map((field, i) => (
              <div key={field}>
                <label className="block text-accent font-semibold mb-3 text-sm tracking-wider">
                  {field === "name" ? "Your name" : "Your email"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-4 bg-surface border border-border rounded-2xl text-text placeholder-text-secondary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder={field === "name" ? "John Doe" : "john@example.com"}
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <label className="block text-accent font-semibold mb-3 text-sm tracking-wider">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              disabled={isSubmitting}
              className="w-full px-5 py-4 bg-surface border border-border rounded-2xl text-text placeholder-text-secondary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={`group px-10 py-4 bg-accent text-white font-bold text-lg rounded-2xl transition-colors flex items-center justify-center gap-3 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-accent-hover"
              }`}
            >
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
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
