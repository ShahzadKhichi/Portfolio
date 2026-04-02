import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/layout/Preloader";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./layouts/AdminLayout";
import Login from "./Pages/admin/Login";
import ResetPassword from "./Pages/admin/ResetPassword";
import Dashboard from "./Pages/admin/Dashboard";
import Messages from "./Pages/admin/Messages";
import ManageProjects from "./Pages/admin/ManageProjects";
import ManageSkills from "./Pages/admin/ManageSkills";
import ManageProfile from "./Pages/admin/ManageProfile";
import AccountSettings from "./Pages/admin/AccountSettings";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <div
            key="main"
            id="main"
            className="relative bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] min-h-screen"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/reset-password" element={<ResetPassword />} />
              
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="messages" element={<Messages />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="skills" element={<ManageSkills />} />
                <Route path="profile" element={<ManageProfile />} />
                <Route path="settings" element={<AccountSettings />} />
              </Route>
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
