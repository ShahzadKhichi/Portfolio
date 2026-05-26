import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaSearch, FaEdit, FaTimes, FaKeyboard } from "react-icons/fa";
import toast from "react-hot-toast";
import * as typewriterApi from "../../api/typewriter.api";

export default function ManageTypewriter() {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingText, setEditingText] = useState(null);
  const [newText, setNewText] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await typewriterApi.getAllTypewriters();
      if (response.data.success) {
        setTexts(response.data.typewriters);
      }
    } catch (error) {
      console.error("Fetch typewriter texts error:", error);
      toast.error("Failed to load typewriter texts");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewText("");
    setEditingText(null);
  };

  const handleAddOrUpdateText = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    setFormLoading(true);
    try {
      let response;
      if (editingText) {
        response = await typewriterApi.updateTypewriter(editingText._id, { text: newText });
        if (response.data.success) {
          toast.success("Text updated!");
        }
      } else {
        response = await typewriterApi.createTypewriter({ text: newText });
        if (response.data.success) {
          toast.success("Text added!");
        }
      }
      resetForm();
      fetchTexts();
    } catch (error) {
      console.error("Submit typewriter text error:", error);
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await typewriterApi.deleteTypewriter(id);
      if (response.data.success) {
        toast.success("Text removed.");
        setTexts(texts.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Delete typewriter text error:", error);
      toast.error("Failed to remove text");
    }
  };

  const startEdit = (text) => {
    setEditingText(text);
    setNewText(text.text);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTexts = texts.filter(t =>
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-text text-center py-20 font-semibold">Loading...</div>;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Manage Typewriter</h1>
          <p className="text-text-secondary">Update the scrolling text displayed in your hero section.</p>
        </div>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60" />
          <input
            type="text"
            placeholder="Search texts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border/80 rounded-2xl p-6 sticky top-8 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text">{editingText ? "Edit Text" : "Add New Text"}</h2>
              {editingText && (
                <button onClick={resetForm} className="text-text-secondary hover:text-text transition-colors cursor-pointer">
                  <FaTimes />
                </button>
              )}
            </div>
            <form onSubmit={handleAddOrUpdateText} className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-2 font-semibold">Display Text</label>
                <input
                  type="text"
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                  placeholder="e.g. MERN Stack Developer"
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-md shadow-accent/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formLoading ? <span>Processing...</span> : (
                  <>
                    {editingText ? <FaEdit /> : <FaPlus />}
                    <span>{editingText ? "Update Text" : "Add Text"}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border/80 rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text">Current Phrases</h2>
              <div className="text-text-secondary text-sm font-semibold">{filteredTexts.length} items found</div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredTexts.map((text, idx) => (
                  <motion.div
                    key={text._id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 bg-bg-alt/40 border border-border/40 rounded-xl hover:border-accent/40 hover:bg-bg-alt transition-all group"
                  >
                    <div className="flex items-center space-x-4 cursor-pointer flex-1" onClick={() => startEdit(text)}>
                      <div className="w-10 h-10 flex items-center justify-center bg-surface rounded-lg border border-border group-hover:border-accent/30 transition-colors">
                        <FaKeyboard className="text-accent" />
                      </div>
                      <h3 className="font-semibold text-text truncate">{text.text}</h3>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(text)}
                        className="p-2 text-accent bg-accent-light hover:bg-accent/20 rounded-lg transition-colors cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(text._id)}
                        className="p-2 text-red-600 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredTexts.length === 0 && (
                <div className="text-center py-10 text-text-secondary font-medium">
                  No typewriter phrases found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
