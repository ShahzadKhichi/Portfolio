import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaProjectDiagram, FaCode, FaEye } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    { title: "Total Views", value: "1,245", icon: <FaEye />, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Messages", value: "24", icon: <FaEnvelope />, color: "text-green-400", bg: "bg-green-500/10" },
    { title: "Active Projects", value: "8", icon: <FaProjectDiagram />, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Skills", value: "15", icon: <FaCode />, color: "text-pink-400", bg: "bg-pink-500/10" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Admin. Here is a quick summary of your portfolio.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm h-80 flex items-center justify-center">
          <p className="text-gray-500">Analytics Chart Placeholder</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm h-80 flex items-center justify-center">
          <p className="text-gray-500">Recent Activity Placeholder</p>
        </div>
      </div>
    </div>
  );
}
