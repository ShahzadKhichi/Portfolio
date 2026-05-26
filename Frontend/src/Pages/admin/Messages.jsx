import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaReply, FaEnvelope, FaUser, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import * as messageApi from "../../api/message.api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await messageApi.getAllMessages();
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await messageApi.deleteMessage(id);
      if (response.data.success) {
        toast.success("Message deleted.");
        setMessages(messages.filter((msg) => msg._id !== id));
      }
    } catch (error) {
      console.error("Delete message error:", error);
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="text-text text-center py-20 font-semibold">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-text mb-2">Customer Messages</h1>
        <p className="text-text-secondary">View and respond to inquiries submitted via the contact form.</p>
      </header>

      <div className="bg-surface border border-border/80 rounded-2xl overflow-hidden shadow-md">
        {messages.length === 0 ? (
          <div className="p-20 text-center">
            <FaEnvelope className="text-5xl text-border mx-auto mb-4" />
            <p className="text-text-secondary text-lg font-medium">No messages found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-alt border-b border-border/80 text-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">
                  <th className="px-8 py-5">Sender</th>
                  <th className="px-8 py-5">Message</th>
                  <th className="px-8 py-5 whitespace-nowrap">Date</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.tr
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-bg-alt/30 transition-colors group"
                    >
                      <td className="px-8 py-6 align-top max-w-[200px]">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center shrink-0">
                                <FaUser className="text-accent text-sm" />
                            </div>
                            <div>
                                <p className="text-text font-semibold truncate">{msg.name}</p>
                                <p className="text-text-secondary text-xs truncate">{msg.email}</p>
                            </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 align-top min-w-[300px]">
                        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </td>
                      <td className="px-8 py-6 align-top text-text-secondary text-xs whitespace-nowrap">
                        <div className="flex items-center space-x-2 mt-1">
                            <FaCalendarAlt className="opacity-40" />
                            <span>{formatDate(msg.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 align-top text-right space-x-2 whitespace-nowrap">
                        <a 
                            href={`mailto:${msg.email}`}
                            className="inline-flex items-center justify-center w-9 h-9 text-accent hover:text-white bg-accent-light hover:bg-accent rounded-lg transition-all" 
                            title="Reply"
                        >
                          <FaReply className="text-sm" />
                        </a>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="inline-flex items-center justify-center w-9 h-9 text-red-600 hover:text-white bg-red-500/10 hover:bg-red-600 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
