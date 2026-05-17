import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import * as skillApi from "../../api/skill.api";

const categoryGradients = {
  "Frontend": "from-teal-accent to-emerald-400",
  "Backend": "from-emerald-400 to-green-400",
  "DevOps": "from-sky-400 to-teal-accent",
  "default": "from-teal-accent to-emerald-400"
};

const SkillCard = ({ skill }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group relative flex flex-col justify-center items-center p-4"
    >
      <div className="relative flex items-center justify-center w-[100px] h-[100px] rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-[3px] shadow-xl hover:border-teal-accent/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,245,212,0.2)]">
        
        {/* SVG Circular Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(0, 245, 212, 0.05)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" />
              <stop offset="100%" stopColor="#00c4a7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow behind icon */}
        <div className="absolute inset-0 bg-teal-accent/0 group-hover:bg-teal-accent/10 rounded-full transition-all duration-300 blur-md" />

        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-11 h-11 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl z-10"
          />
        ) : (
          <FaCode className="text-3xl text-teal-accent drop-shadow-md z-10" />
        )}
      </div>

      <div className="mt-5 text-center flex flex-col items-center gap-1">
        <h4 className="text-[15px] font-bold text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-accent group-hover:to-emerald-400 transition-all">
          {skill.name}
        </h4>
        <span className="text-xs text-teal-accent/80 font-mono font-medium tracking-wider bg-teal-accent/10 px-2 py-0.5 rounded-full border border-teal-accent/20">
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
};

const SkillGroup = ({ title, skills, gradient }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div className="w-full max-w-6xl mb-20 bg-white/[0.02] border border-white/10 backdrop-blur-[3px] rounded-3xl p-8 lg:p-12 shadow-2xl hover:border-teal-accent/30 transition-all duration-500 relative overflow-hidden">
      {/* Decorative background glow for group */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-accent/5 rounded-full blur-[80px] pointer-events-none" />
      
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className={`text-3xl font-extrabold text-center mb-12 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
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

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillApi.getAllSkills();
        if (response.data.success) {
          // Filter unique skills by name (keep the one with higher level or just the first one)
          const uniqueSkillsMap = new Map();
          response.data.skills.forEach(skill => {
            if (!uniqueSkillsMap.has(skill.name) || skill.level > uniqueSkillsMap.get(skill.name).level) {
              uniqueSkillsMap.set(skill.name, skill);
            }
          });

          const uniqueSkills = Array.from(uniqueSkillsMap.values());
          // Sort by level (desc) then name (asc)
          uniqueSkills.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));

          setSkills(uniqueSkills);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

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
    <section className="w-full py-24 bg-transparent relative z-10" id="skills">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            Technical <span className="text-gradient-primary">Stack</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            className="h-1 bg-teal-accent rounded-full"
          />
        </div>

        {sortedCategories.map(cat => (
          <SkillGroup
            key={cat}
            title={cat}
            skills={skills.filter(s => s.category === cat)}
            gradient={categoryGradients[cat] || categoryGradients.default}
          />
        ))}
      </div>
    </section>
  );
}
