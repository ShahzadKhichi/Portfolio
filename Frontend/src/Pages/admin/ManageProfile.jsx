import React, { useState, useEffect } from "react";
import { FaSave, FaUpload, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import * as profileApi from "../../api/profile.api";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    bio: "",
    image: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      email: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileApi.getProfile();
      if (response.data.success) {
        setProfile(response.data.profile);
        setPreviewUrl(response.data.profile.image);
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    const formData = new FormData();
    formData.append("bio", profile.bio);
    formData.append("socialLinks", JSON.stringify(profile.socialLinks));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await profileApi.updateProfile(formData);
      if (response.data.success) {
        toast.success("Profile updated successfully!");
        fetchProfile();
        setSelectedFile(null);
      }
    } catch (error) {
           console.error("Update profile error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center py-20">Loading profile...</div>;

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
            <div className="relative group">
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shrink-0 bg-black/50">
                    <img 
                        src={previewUrl || "https://via.placeholder.com/150"} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-3xl">
                    <FaCloudUploadAlt className="text-3xl text-cyan-400" />
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
            </div>
            
            <div className="w-full space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-sm font-medium text-gray-300 mb-1">Image Information</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{selectedFile ? `Selected: ${selectedFile.name}` : `Current: ${profile.image || 'None'}`}</p>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <FaUpload className="text-cyan-500/50" />
                Click the image to upload a new profile picture.
              </p>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="pt-6 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Biography</h2>
          <div>
            <label className="block text-gray-300 text-sm mb-2">About Me Section Content</label>
            <textarea
              rows={6}
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-500 resize-none leading-relaxed"
              placeholder="Write a brief introduction about yourself..."
            />
            <p className="text-xs text-gray-500 mt-2 text-right">{profile.bio.length} characters</p>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="pt-6 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">GitHub URL</label>
              <input
                type="url"
                value={profile.socialLinks?.github || ""}
                onChange={(e) => setProfile({
                  ...profile, 
                  socialLinks: { ...profile.socialLinks, github: e.target.value }
                })}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={profile.socialLinks?.linkedin || ""}
                onChange={(e) => setProfile({
                  ...profile, 
                  socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
                })}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saveLoading}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-70"
          >
            {saveLoading ? <span>Saving...</span> : (
              <>
                <FaSave />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
