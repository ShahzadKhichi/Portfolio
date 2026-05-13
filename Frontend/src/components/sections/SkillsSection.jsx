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
  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="group relative flex flex-col justify-center items-center"
    >
      <div className="relative p-5 rounded-2xl bg-navy-800/70 backdrop-blur-md border border-navy-600/50 shadow-2xl transition-all duration-300 group-hover:border-teal-accent/50 group-hover:shadow-teal-accent/10 overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-teal-accent/0 group-hover:bg-teal-accent/5 transition-all duration-300" />

        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-12 h-12 object-contain group-hover:grayscale-0 transition-all duration-300 drop-shadow-xl"
          />
        ) : (
          <FaCode className="text-4xl text-teal-accent drop-shadow-md" />
        )}
      </div>

      {/* Skill Level Ring/Bar */}
      <div className="absolute -bottom-4 w-12 h-1 bg-navy-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          className="h-full bg-teal-accent"
        />
      </div>

      <span
        className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
      transition-all duration-300 pointer-events-none text-[10px] font-bold text-navy-950 bg-teal-accent px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap z-10 uppercase tracking-wider"
      >
        {skill.name} • {skill.level}%
      </span>
    </motion.div>
  );
};

const SkillGroup = ({ title, skills, gradient }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div className="w-full max-w-6xl mb-16">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className={`text-2xl font-bold text-center mb-10 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {title}
      </motion.h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8">
        {skills.map((skill, i) => (
          <motion.div
            key={skill._id || i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.015, duration: 0.3 }}
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
    <section className="w-full py-24 bg-navy-950" id="skills">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            Technical <span className="text-teal-accent">Stack</span>
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
