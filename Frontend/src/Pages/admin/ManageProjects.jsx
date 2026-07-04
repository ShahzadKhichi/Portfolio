import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { ProjectsShimmer } from "../../components/ui/Shimmer";
import { fetchProjects, createProject, updateProject, deleteProject } from "../../store/slices/projectSlice";

export default function ManageProjects() {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector((state) => state.projects);

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
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project?.title || "",
        description: project?.description || "",
        tags: project?.tags?.join(", ") || "",
        github: project?.github || "",
        live: project?.live || "",
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
      await dispatch(deleteProject(id)).unwrap();
      toast.success("Project deleted");
    } catch (error) {
      console.error("Delete project error:", error);
      toast.error(error || "Failed to delete project");
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
      if (editingProject) {
        await dispatch(updateProject({ id: editingProject._id, formData: data })).unwrap();
        toast.success("Project updated");
      } else {
        if (!selectedFile) {
          toast.error("Image is required for new projects");
          setFormLoading(false);
          return;
        }
        await dispatch(createProject(data)).unwrap();
        toast.success("Project added");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save project error:", error);
      toast.error(error || "Failed to save project");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <ProjectsShimmer />;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Manage Projects</h1>
          <p className="text-text-secondary">Add, edit, or delete projects from your portfolio.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer"
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
            className="group bg-surface border border-border/80 rounded-2xl overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-all"
          >
            <div className="aspect-video relative overflow-hidden bg-bg-alt">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider bg-bg-alt text-text-secondary px-2 py-0.5 rounded font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex justify-end space-x-2 pt-4 border-t border-border/40">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="px-3 py-1.5 flex items-center space-x-2 text-sm text-accent bg-accent-light rounded-lg hover:bg-accent/20 transition-colors cursor-pointer font-semibold"
                >
                  <FaEdit /> <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-3 py-1.5 flex items-center space-x-2 text-sm text-red-600 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer font-semibold"
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-bg-alt text-text">
                <h2 className="text-xl font-bold">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text transition-colors cursor-pointer">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">Project Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                      placeholder="e.g. Portfolio Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">Tags (comma separated)</label>
                    <input
                      type="text"
                      required
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                      placeholder="React, Tailwind, Node.js"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">Live Demo URL</label>
                    <input
                      type="url"
                      value={formData.live}
                      onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                      placeholder="https://project.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Project Image</label>
                  <label className="relative flex flex-col items-center justify-center w-full h-48 bg-bg-alt border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-black/5 hover:border-accent transition-all overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaCloudUploadAlt className="text-2xl text-accent mb-2" />
                        <p className="text-xs text-text-secondary">
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
                    className="px-6 py-2.5 rounded-lg text-text-secondary hover:text-text transition-colors cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-8 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-bold hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
