import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div id="main" className="relative  bg-[#000000f3]">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
