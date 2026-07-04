import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";

const SkillCard = ({ skill }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group flex flex-col justify-center items-center p-4"
    >
      <div className="relative flex items-center justify-center w-[100px] h-[100px] rounded-full bg-white/40 backdrop-blur-md border border-white/40 hover:border-accent/40 transition-colors duration-300">
        
        {/* SVG Circular Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#0d9488"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </svg>

        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-11 h-11 object-contain group-hover:scale-110 transition-transform duration-300 z-10"
          />
        ) : (
          <FaCode className="text-3xl text-accent z-10" />
        )}
      </div>

      <div className="mt-5 text-center flex flex-col items-center gap-1">
        <h4 className="text-[15px] font-bold text-text group-hover:text-accent transition-colors">
          {skill.name}
        </h4>
        <span className="text-xs text-accent font-mono font-medium tracking-wider bg-accent-light px-2 py-0.5 rounded-full border border-accent/20">
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
};

const SkillGroup = ({ title, skills }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div className="w-full max-w-6xl mb-20 liquid-glass rounded-3xl p-8 lg:p-12 hover:border-accent/30 transition-colors duration-300">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-3xl font-extrabold text-center mb-12 text-accent"
      >
        {title}
      </motion.h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
        {skills.map((skill, i) => (
          <motion.div
            key={skill._id || i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../../store/slices/skillSlice";

export default function SkillsSection() {
  const dispatch = useDispatch();
  const { items: skills, loading } = useSelector((state) => state.skills);

  useEffect(() => {
    if (skills.length === 0) {
      dispatch(fetchSkills());
    }
  }, [dispatch, skills.length]);

  if (loading) return null;

  // Dynamically group skills by category
  const categories = [...new Set(skills.map(s => s.category))];

  // Custom sort order for categories
  const categoryOrder = ["Frontend", "Backend", "DevOps", "Database", "Mobile"];
  const sortedCategories = categories.sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA === -1 && idxB === -1) return a.localeCompare(b);
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });

  return (
    <section className="w-full py-24 bg-bg" id="skills">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-text mb-4"
          >
            Technical <span className="text-accent">Stack</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            className="h-1 bg-accent rounded-full"
          />
        </div>

        {sortedCategories.map(cat => (
          <SkillGroup
            key={cat}
            title={cat}
            skills={skills.filter(s => s.category === cat)}
          />
        ))}
      </div>
    </section>
  );
}
