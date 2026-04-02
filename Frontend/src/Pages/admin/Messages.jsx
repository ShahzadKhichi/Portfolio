import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaReply } from "react-icons/fa";

export default function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "Love your portfolio design! Are you available for a freelance Next.js project?", date: "2026-04-01" },
    { id: 2, name: "Jane Smith", email: "jane@startup.io", message: "We are looking for a MERN stack developer. Let's schedule a call.", date: "2026-03-30" },
    { id: 3, name: "Alex Johnson", email: "alex@tech.co", message: "Can you share the source code for the OS Simulator?", date: "2026-03-25" },
  ]);

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Customer Messages</h1>
        <p className="text-gray-400">View and respond to inquiries submitted via the contact form.</p>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm font-medium uppercase tracking-wider">
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {messages.map((msg, idx) => (
                <motion.tr
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 align-top">
                    <p className="text-white font-medium">{msg.name}</p>
                    <p className="text-cyan-400 text-sm">{msg.email}</p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <p className="text-gray-300 text-sm line-clamp-2 md:line-clamp-none">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 align-top text-gray-400 text-sm whitespace-nowrap">
                    {msg.date}
                  </td>
                  <td className="px-6 py-4 align-top text-right space-x-3 whitespace-nowrap">
                    <button className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/10 transition-colors" title="Reply">
                      <FaReply />
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors" 
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
