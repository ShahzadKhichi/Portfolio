import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import * as projectApi from "../../api/project.api";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    github: "",
    live: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectApi.getAllProjects();
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    console.log(project);
    
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project?.title,
        description: project?.description,
        tags: project?.tags?.join(", "),
        github: project?.links?.github || "",
        live: project?.links?.live || "",
      });
      setImagePreview(project.image);
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        tags: "",
        github: "",
        live: "",
      });
      setSelectedFile(null);
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setSelectedFile(file);
          setImagePreview(URL.createObjectURL(file));
      }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const response = await projectApi.deleteProject(id);
      if (response.data.success) {
        toast.success("Project deleted");
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
           console.error("Delete project error:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("tags", JSON.stringify(formData.tags.split(",").map(t => t.trim())));
    data.append("github", formData.github);
    data.append("live", formData.live);
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      let response;
      if (editingProject) {
        response = await projectApi.updateProject(editingProject._id, data);
      } else {
        if (!selectedFile) {
            toast.error("Image is required for new projects");
            setFormLoading(false);
            return;
        }
        response = await projectApi.createProject(data);
      }

      if (response.data.success) {
        toast.success(editingProject ? "Project updated" : "Project added");
        setIsModalOpen(false);
        fetchProjects();
      }
    } catch (error) {
      console.error("Save project error:", error);
      toast.error(error.response?.data?.message || "Failed to save project");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
          <p className="text-gray-400">Add, edit, or delete projects from your portfolio.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <FaPlus />
            <span>Add New</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project._id}
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
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/10 text-gray-300 px-2 py-0.5 rounded">
                     {tag}
                   </span>
                ))}
              </div>

              <div className="mt-auto flex justify-end space-x-2 pt-4 border-t border-white/10">
                <button 
                  onClick={() => handleOpenModal(project)}
                  className="px-3 py-1.5 flex items-center space-x-2 text-sm text-cyan-400 bg-cyan-400/10 rounded-lg hover:bg-cyan-400/20 transition-colors"
                >
                   <FaEdit /> <span>Edit</span>
                </button>
                <button 
                   onClick={() => handleDelete(project._id)}
                  className="px-3 py-1.5 flex items-center space-x-2 text-sm text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
               <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold text-white">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Project Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                        placeholder="e.g. Portfolio Website"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-300">Tags (comma separated)</label>
                      <input
                        type="text"
                        required
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                        placeholder="React, Tailwind, Node.js"
                      />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Live Demo URL</label>
                    <input
                      type="url"
                      value={formData.live}
                      onChange={(e) => setFormData({...formData, live: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="https://project.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Project Image</label>
                  <label className="relative flex flex-col items-center justify-center w-full h-48 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 transition-all overflow-hidden">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaCloudUploadAlt className="text-2xl text-cyan-400 mb-2" />
                          <p className="text-xs text-gray-400">
                             Click to upload or drag and drop
                          </p>
                        </div>
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    {imagePreview && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Change Image</span>
                        </div>
                    )}
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                   <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-8 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formLoading ? "Saving..." : (editingProject ? "Update Project" : "Create Project")}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
