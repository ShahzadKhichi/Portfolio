import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects as initialProjects } from "../../data/projects";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManageProjects() {
  const [projects, setProjects] = useState(initialProjects);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
          <p className="text-gray-400">Add, edit, or delete projects from your portfolio.</p>
        </div>
        <button
          onClick={() => toast("Add New Project modal coming soon!", { icon: "👋" })}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
        >
          <FaPlus />
          <span>Add Project</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden bg-white/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="mt-auto flex justify-end space-x-2 pt-4 border-t border-white/10">
                <button 
                  onClick={() => toast("Edit mode enabled for " + project.title)}
                  className="px-3 py-1.5 flex items-center space-x-2 text-sm text-cyan-400 bg-cyan-400/10 rounded-lg hover:bg-cyan-400/20 transition-colors"
                >
                  <FaEdit /> <span>Edit</span>
                </button>
                <button 
                  onClick={() => setProjects(projects.filter(p => p.title !== project.title))}
                  className="px-3 py-1.5 flex items-center space-x-2 text-sm text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
