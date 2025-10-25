import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import { Toaster } from "react-hot-toast";

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
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
