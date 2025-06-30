import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import React from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
