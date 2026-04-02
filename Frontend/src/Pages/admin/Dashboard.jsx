import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaProjectDiagram, FaCode, FaEye, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as projectApi from "../../api/project.api";
import * as skillApi from "../../api/skill.api";
import * as messageApi from "../../api/message.api";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Total Views", value: "---", icon: <FaEye />, color: "text-blue-400", bg: "bg-blue-500/10", link: "#" },
    { title: "Messages", value: "0", icon: <FaEnvelope />, color: "text-green-400", bg: "bg-green-500/10", link: "/admin/messages" },
    { title: "Active Projects", value: "0", icon: <FaProjectDiagram />, color: "text-purple-400", bg: "bg-purple-500/10", link: "/admin/projects" },
    { title: "Skills", value: "0", icon: <FaCode />, color: "text-pink-400", bg: "bg-pink-500/10", link: "/admin/skills" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projRes, skillRes, msgRes] = await Promise.all([
          projectApi.getAllProjects(),
          skillApi.getAllSkills(),
          messageApi.getAllMessages()
        ]);

        const newStats = [...stats];
        if (projRes.data.success) newStats[2].value = projRes.data.projects.length;
        if (skillRes.data.success) newStats[3].value = skillRes.data.skills.length;
        if (msgRes.data.success) newStats[1].value = msgRes.data.messages.length;
        
        // Mock views for now as backend doesn't have analytics yet
        newStats[0].value = "1,245"; 

        setStats(newStats);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all shadow-xl shadow-black/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white">
                  {loading ? <span className="opacity-20 animate-pulse">---</span> : stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} text-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
            
            {stat.link !== "#" && (
                <Link to={stat.link} className="flex items-center text-xs font-semibold text-gray-500 hover:text-cyan-400 transition-colors">
                    MANAGE {stat.title.toUpperCase()} <FaArrowRight className="ml-2" />
                </Link>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
          <FaProjectDiagram className="text-5xl text-gray-800 mb-4" />
          <p className="text-gray-500 font-medium">Project Analytics Chart coming soon</p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-8 bg-white/5 rounded-t-lg" style={{ height: `${i * 20}px` }} />
            ))}
          </div>
        </div>
        
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
                { label: "Update Bio", path: "/admin/profile" },
                { label: "Post New Project", path: "/admin/projects" },
                { label: "Add New Skill", path: "/admin/skills" },
            ].map(action => (
                <Link 
                    key={action.label} 
                    to={action.path}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all font-medium text-gray-300"
                >
                    {action.label}
                    <FaArrowRight className="text-xs text-gray-600" />
                </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
