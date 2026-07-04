import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaSave, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";
import { SettingsShimmer } from "../../components/ui/Shimmer";

export default function AccountSettings() {
  const [admin, setAdmin] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await apiClient.get("/user/me");
      if (response.data.success) {
        const { name, email } = response.data.admin;
        setAdmin({
          firstname: name.firstname,
          lastname: name.lastname,
          email: email,
        });
      }
    } catch (error) {
      console.error("Fetch admin error:", error);
      toast.error("Failed to load account details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const response = await apiClient.put("/user/profile", admin);
      if (response.data.success) {
        toast.success("Account updated successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update account");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <SettingsShimmer />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-text mb-2">Account Settings</h1>
        <p className="text-text-secondary">Manage your administrative account details and credentials.</p>
      </header>

      <div className="bg-surface border border-border/80 rounded-2xl p-8 shadow-md">
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-semibold">First Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/60" />
              <input
                type="text"
                required
                value={admin.firstname}
                onChange={(e) => setAdmin({ ...admin, firstname: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-bg-alt border border-border rounded-xl text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-semibold">Last Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/60" />
              <input
                type="text"
                required
                value={admin.lastname}
                onChange={(e) => setAdmin({ ...admin, lastname: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-bg-alt border border-border rounded-xl text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-text-secondary text-sm font-semibold">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/60" />
              <input
                type="email"
                required
                value={admin.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-bg-alt border border-border rounded-xl text-text focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/50"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={updateLoading}
              className="w-full flex justify-center items-center space-x-2 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold transition-all shadow-md shadow-accent/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {updateLoading ? <span>Updating...</span> : (
                <>
                  <FaSave />
                  <span>Update Account</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <FaLock className="text-red-600 text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text mb-2">Security</h3>
            <p className="text-text-secondary mb-4">To change your password, please use the "Forgot Password" flow on the login page. This ensures high security via OTP verification.</p>
            <button 
              onClick={() => toast.error("Please use 'Forgot Password' on the login screen.")}
              className="text-red-600 font-semibold hover:underline cursor-pointer"
            >
              Learn more about security procedures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
