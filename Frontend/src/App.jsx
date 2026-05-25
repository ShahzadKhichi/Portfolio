import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import React from "react";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./layouts/AdminLayout";
import Login from "./Pages/admin/Login";
import ResetPassword from "./Pages/admin/ResetPassword";
import Dashboard from "./Pages/admin/Dashboard";
import Messages from "./Pages/admin/Messages";
import ManageProjects from "./Pages/admin/ManageProjects";
import ManageSkills from "./Pages/admin/ManageSkills";
import ManageProfile from "./Pages/admin/ManageProfile";
import ManageTypewriter from "./Pages/admin/ManageTypewriter";
import AccountSettings from "./Pages/admin/AccountSettings";


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div id="main" className="relative bg-bg min-h-screen overflow-hidden">
        {/* Floating Liquid Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-gradient-to-tr from-teal-200/40 to-emerald-100/30 blur-[80px] animate-blob" />
          <div className="absolute top-[35%] right-[-5%] w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-gradient-to-tr from-sky-200/40 to-teal-100/30 blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-gradient-to-tr from-emerald-100/40 to-sky-100/30 blur-[120px] animate-blob animation-delay-4000" />
        </div>

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
            <Route path="typewriter" element={<ManageTypewriter />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
