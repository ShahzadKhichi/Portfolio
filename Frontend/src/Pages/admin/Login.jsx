import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import * as authApi from "../../api/auth.api";
import { setCredentials } from "../../store/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(email, password);
      if (response.data.success) {
        dispatch(setCredentials(response.data.accessToken));
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        toast.success("Login successful!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-hover/5 blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-text-secondary text-sm">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-secondary/50"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-text-secondary text-sm font-medium">Password</label>
              <Link to="/admin/reset-password" className="text-sm border-b border-transparent text-accent hover:border-accent transition-colors font-semibold">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-secondary/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-md shadow-accent/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
