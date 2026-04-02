import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManageSkills() {
  const [skills, setSkills] = useState([
    { name: "ReactJS", level: "Expert" },
    { name: "Node.js", level: "Advanced" },
    { name: "MongoDB", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("Intermediate");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill) return;
    setSkills([...skills, { name: newSkill, level: newLevel }]);
    setNewSkill("");
    setNewLevel("Intermediate");
    toast.success(`${newSkill} added!`);
  };

  const handleDelete = (name) => {
    setSkills(skills.filter((s) => s.name !== name));
    toast.success(`${name} removed.`);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Skills</h1>
        <p className="text-gray-400">Update the technical skills displayed on your portfolio.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-8">
            <h2 className="text-xl font-bold text-white mb-4">Add New Skill</h2>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Skill Name</label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-500"
                  placeholder="e.g. Next.js"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Proficiency Level</label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20"
              >
                <FaPlus />
                <span>Add Skill</span>
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Current Skills</h2>
              <button 
                onClick={() => toast.success("Skills saved globally!")}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <FaSave /> <span>Save Changes</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                    <p className="text-sm text-cyan-400">{skill.level}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(skill.name)}
                    className="p-2 text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
