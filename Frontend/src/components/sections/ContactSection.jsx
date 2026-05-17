import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import SocialLinks from "../ui/SocialLinks";

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
    <section id="contact" className="w-full py-24 lg:py-32 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-extrabold text-white">
            Got a project in <span className="text-gradient-primary">mind?</span>
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
          className="bg-white/[0.02] border border-white/10 hover:border-teal-accent/30 rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-[3px] transition-all duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {["name", "email"].map((field, i) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <label className="block text-teal-accent font-semibold mb-3 text-sm tracking-wider">
                  {field === "name" ? "Your name" : "Your email"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 transition-all"
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
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <label className="block text-teal-accent font-semibold mb-3 text-sm tracking-wider">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              disabled={isSubmitting}
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={`group relative px-10 py-4 bg-teal-accent text-navy-950 font-bold text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-teal-accent/40 hover:bg-teal-dark"
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
                    className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full"
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
    </section>
  );
}
