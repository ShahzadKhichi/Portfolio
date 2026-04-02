import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaSave, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";

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

  if (loading) return <div className="text-white text-center py-20">Loading account settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage your administrative account details and credentials.</p>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">First Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                required
                value={admin.firstname}
                onChange={(e) => setAdmin({ ...admin, firstname: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Last Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                required
                value={admin.lastname}
                onChange={(e) => setAdmin({ ...admin, lastname: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                value={admin.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={updateLoading}
              className="w-full flex justify-center items-center space-x-2 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-70"
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

      <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <FaLock className="text-red-400 text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Security</h3>
            <p className="text-gray-400 mb-4">To change your password, please use the "Forgot Password" flow on the login page. This ensures high security via OTP verification.</p>
            <button 
              onClick={() => toast.error("Please use 'Forgot Password' on the login screen.")}
              className="text-red-400 font-semibold hover:underline"
            >
              Learn more about security procedures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
