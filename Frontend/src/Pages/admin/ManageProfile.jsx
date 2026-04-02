import React, { useState } from "react";
import { bio as initialBio, profileImage as initialImage } from "../../data/projects";
import { FaSave, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManageProfile() {
  const [bio, setBio] = useState(initialBio);
  const [image, setImage] = useState(initialImage);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Profile information updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Profile</h1>
        <p className="text-gray-400">Update your hero image and biography details here.</p>
      </header>

      <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm space-y-8">
        
        {/* Profile Image Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Profile Image</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-xl shadow-cyan-500/20 shrink-0 bg-black/50">
              <img src={image} alt="Profile preview" className="w-full h-full object-cover" />
            </div>
            
            <div className="w-full space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-500"
                />
              </div>
              <div className="flex gap-4">
                <p className="text-xs text-gray-500">Provide an absolute URL, or upload to storage.</p>
                <button type="button" className="flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors cursor-not-allowed opacity-50">
                  <FaUpload /> <span>Upload File (WIP)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="pt-6 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Biography</h2>
          <div>
            <label className="block text-gray-300 text-sm mb-2">About Me Section Content</label>
            <textarea
              rows={8}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-500 resize-none leading-relaxed"
            />
            <p className="text-xs text-gray-500 mt-2 text-right">{bio.length} characters</p>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20"
          >
            <FaSave />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
