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
import Background3D from "./components/layout/Background3D";
import CustomCursor from "./components/ui/CustomCursor";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <CustomCursor />

      <div id="main" className="relative bg-transparent min-h-screen">
        <Background3D />
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
