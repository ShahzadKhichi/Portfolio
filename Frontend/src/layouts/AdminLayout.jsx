import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTachometerAlt, FaEnvelope, FaProjectDiagram, FaCode, FaUserEdit, FaSignOutAlt, FaCog, FaKeyboard } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

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
    <div className="flex h-screen bg-transparent text-white overflow-hidden relative z-10">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 flex-shrink-0 bg-navy-950/80 backdrop-blur-2xl border-r border-teal-accent/15 flex flex-col justify-between"
      >
        <div>
          <div className="p-6 border-b border-teal-accent/15">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-accent to-emerald-400 bg-clip-text text-transparent">
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
                      ? "bg-gradient-to-r from-teal-accent/10 to-teal-dark/10 text-teal-accent border border-teal-accent/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-teal-accent/15">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all font-semibold"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-accent/5 via-transparent to-teal-dark/5 blur-3xl -z-10" />
        <Outlet />
      </main>
    </div>
  );
}
