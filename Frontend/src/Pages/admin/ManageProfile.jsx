import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSave, FaUpload, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { ProfileShimmer } from "../../components/ui/Shimmer";
import { fetchProfile, updateProfile } from "../../store/slices/profileSlice";

export default function ManageProfile() {
  const dispatch = useDispatch();
  const { data: profileData, loading } = useSelector((state) => state.profile);

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setProfile({
        bio: profileData.bio || "",
        image: profileData.image || "",
        socialLinks: {
          github: profileData.socialLinks?.github || "",
          linkedin: profileData.socialLinks?.linkedin || "",
          twitter: profileData.socialLinks?.twitter || "",
          email: profileData.socialLinks?.email || ""
        }
      });
      setPreviewUrl(profileData.profileImage);
    }
  }, [profileData]);

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
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error || "Failed to update profile");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <ProfileShimmer />;

  return (
    <div className="space-y-6 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-text mb-2">Manage Profile</h1>
        <p className="text-text-secondary">Update your hero image and biography details here.</p>
      </header>

      <form onSubmit={handleSave} className="bg-surface border border-border/80 rounded-2xl p-6 md:p-8 space-y-8 shadow-md">
        
        {/* Profile Image Section */}
        <div>
          <h2 className="text-xl font-bold text-text mb-4">Profile Image</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-border shadow-md shrink-0 bg-bg-alt">
                    <img 
                        src={previewUrl || "https://via.placeholder.com/150"} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-3xl">
                    <FaCloudUploadAlt className="text-3xl text-accent" />
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
            </div>
            
            <div className="w-full space-y-4">
              <div className="p-4 bg-bg-alt rounded-xl border border-border/60">
                <h3 className="text-sm font-semibold text-text-secondary mb-1">Image Information</h3>
                <p className="text-xs text-text-secondary line-clamp-1">{selectedFile ? `Selected: ${selectedFile.name}` : `Current: ${profile.image || 'None'}`}</p>
              </div>
              <p className="text-xs text-text-secondary flex items-center gap-2 font-medium">
                <FaUpload className="text-accent/60" />
                Click the image to upload a new profile picture.
              </p>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="pt-6 border-t border-border/60">
          <h2 className="text-xl font-bold text-text mb-4">Biography</h2>
          <div>
            <label className="block text-text-secondary text-sm mb-2 font-semibold">About Me Section Content</label>
            <textarea
              rows={6}
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50 resize-none leading-relaxed"
              placeholder="Write a brief introduction about yourself..."
            />
            <p className="text-xs text-text-secondary mt-2 text-right font-medium">{profile.bio.length} characters</p>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="pt-6 border-t border-border/60">
          <h2 className="text-xl font-bold text-text mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2 font-semibold">GitHub URL</label>
              <input
                type="url"
                value={profile.socialLinks?.github || ""}
                onChange={(e) => setProfile({
                  ...profile, 
                  socialLinks: { ...profile.socialLinks, github: e.target.value }
                })}
                className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2 font-semibold">LinkedIn URL</label>
              <input
                type="url"
                value={profile.socialLinks?.linkedin || ""}
                onChange={(e) => setProfile({
                  ...profile, 
                  socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
                })}
                className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-border/60 flex justify-end">
          <button
            type="submit"
            disabled={saveLoading}
            className="flex items-center space-x-2 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-md shadow-accent/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
