import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaCode, FaServer, FaDatabase, FaTools, FaCloudUploadAlt, FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import * as skillApi from "../../api/skill.api";

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Database", "Mobile", "Other"];

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: 80,
    category: "Frontend"
  });
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillApi.getAllSkills();
      if (response.data.success) {
        setSkills(response.data.skills);
      }
    } catch (error) {
      console.error("Fetch skills error:", error);
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setNewSkill({ name: "", level: 80, category: "Frontend" });
    setIconFile(null);
    setIconPreview(null);
    setEditingSkill(null);
  };

  const handleAddOrUpdateSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;

    setFormLoading(true);
    const formData = new FormData();
    formData.append("name", newSkill.name);
    formData.append("level", newSkill.level);
    formData.append("category", newSkill.category);
    formData.append("icon", iconFile);

    try {
      let response;
      if (editingSkill) {
        response = await skillApi.updateSkill(editingSkill._id, formData);
        if (response.data.success) {
          toast.success(`${newSkill.name} updated!`);
        }
      } else {
        response = await skillApi.createSkill(formData);
        if (response.data.success) {
          toast.success(`${newSkill.name} added!`);
        }
      }
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error("Submit skill error:", error);
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await skillApi.deleteSkill(id);
      if (response.data.success) {
        toast.success("Skill removed.");
        setSkills(skills.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error("Delete skill error:", error);
      toast.error("Failed to remove skill");
    }
  };

  const startEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkill({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });
    setIconPreview(skill.icon);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSkillIcon = (skill) => {
    if (skill.icon) {
      return <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />;
    }
    switch (skill.category) {
      case "Frontend": return <FaCode className="text-cyan-400" />;
      case "Backend": return <FaServer className="text-purple-400" />;
      case "Database": return <FaDatabase className="text-yellow-400" />;
      default: return <FaTools className="text-gray-400" />;
    }
  };

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-white text-center py-20">Loading skills...</div>;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Skills</h1>
          <p className="text-gray-400">Update the technical skills displayed on your portfolio.</p>
        </div>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-8 shadow-xl shadow-black/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{editingSkill ? "Edit Skill" : "Add New Skill"}</h2>
              {editingSkill && (
                <button onClick={resetForm} className="text-gray-500 hover:text-white transition-colors">
                  <FaTimes />
                </button>
              )}
            </div>
            <form onSubmit={handleAddOrUpdateSkill} className="space-y-4">
              
              <div className="flex justify-center mb-4">
                <div className="relative group">
                    <div className="w-20 h-20 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden">
                        {iconPreview ? (
                            <img src={iconPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <FaCloudUploadAlt className="text-3xl text-gray-700" />
                        )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-[10px] text-white font-bold uppercase">Upload</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2 font-medium">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-500"
                  placeholder="e.g. Next.js"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2 font-medium">Category</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2 font-medium">Level ({newSkill.level}%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={formLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-70"
              >
                {formLoading ? <span>Processing...</span> : (
                  <>
                    {editingSkill ? <FaEdit /> : <FaPlus />}
                    <span>{editingSkill ? "Update Skill" : "Add Skill"}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Current Skills</h2>
              <div className="text-gray-500 text-sm">{filteredSkills.length} skills found</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    key={skill._id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-colors group"
                  >
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={() => startEdit(skill)}>
                      <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                        {getSkillIcon(skill)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <div className="flex items-center space-x-2">
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                                />
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase font-medium">{skill.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(skill)}
                        className="p-2 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-2 text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
