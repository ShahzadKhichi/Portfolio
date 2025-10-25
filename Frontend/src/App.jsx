import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import React from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import profileImage from "./assets/me.jpg";

function App() {
  return (
    <div
      id="main"
      className="relative bg-gradient-to-b from-black via-[#0a0a0a] to-[#111]"
    >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
