import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaTachometerAlt, FaEnvelope, FaProjectDiagram, FaCode, FaUserEdit, FaSignOutAlt, FaCog, FaKeyboard } from "react-icons/fa";
import toast from "react-hot-toast";
import { logout } from "../store/slices/authSlice";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  if (!isAuthenticated) return null;

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
    { name: "Projects", path: "/admin/projects", icon: <FaProjectDiagram /> },
    { name: "Skills", path: "/admin/skills", icon: <FaCode /> },
    { name: "Typewriter", path: "/admin/typewriter", icon: <FaKeyboard /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUserEdit /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen bg-bg text-text overflow-hidden relative z-10">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 flex-shrink-0 bg-surface/80 backdrop-blur-2xl border-r border-border flex flex-col justify-between"
      >
        <div>
          <div className="p-6 border-b border-border/60">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              Admin Portal
            </h2>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                       ? "bg-gradient-to-r from-accent/10 to-accent-hover/10 text-accent border border-accent/20"
                       : "text-text-secondary hover:text-text hover:bg-black/5"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/10 text-red-600 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all font-semibold"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-hover/5 blur-3xl -z-10" />
        <Outlet />
      </main>
    </div>
  );
}
