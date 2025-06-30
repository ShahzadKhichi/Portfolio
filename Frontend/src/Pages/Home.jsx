import React from "react";
import SideBar from "../components/SideBar";
import image from "../assets/me.jpg";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { MdArrowRightAlt } from "react-icons/md";
import About from "../components/About";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
const Home = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const text = Typewriter({
    words: ["Web Developer"],
    loop: 1,
    cursor: true,
    typeSpeed: 60,
    deleteSpeed: 20,
    delaySpeed: 500,
  });
  console.log(isAboutOpen);

  return (
    <>
      {
        <div
          className={`w-[99vw] h-[100vh] flex-wrap  justify-self-center  backdrop-opacity-40 backdrop-blur-3xl   flex md:flex-col   transition-all duration-300 bg-[#000000f3] relative gap-20 ${
            isAboutOpen ? " pointer-events-none  " : ""
          }`}
        >
          <SideBar></SideBar>

          <Navbar></Navbar>

          <div className="w-full h-[60vh]  flex justify-center items-center  gap-10">
            <div className="w-[500px] h-[300px] ">
              <h4 className="text-white font-extrabold text-[45px] font-mono inline-flex animate-pulse">
                Shahzad Khichi
              </h4>
              <h3 className="text-white font-mono font-bold text-[30px]">
                I am <span className="text-blue-400">{text}</span>
              </h3>
              <button
                onClick={() => setIsAboutOpen(true)}
                className=" mt-10 hover:scale-105 transition-all duration-200 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="flex  items-center justify-around gap-1  font-semibold  font-mono hover:scale-105 relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  About Me{" "}
                  <MdArrowRightAlt className="w-6 h-6"></MdArrowRightAlt>
                </span>
              </button>
            </div>
            <img
              className="bg-amber-50 w-[100px] h-[100px] md:w-[300px] md:h-[300px]  rounded-t-xl rounded-b-xl"
              src={image}
              alt="image"
            />
          </div>
          <div className="flex  flex-col absolute left-[50%] bottom-[2%]  items-center">
            {" "}
            <button className="  w-fit hover:scale-105 transition-all duration-200    inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="  font-extrabold p  font-mono hover:scale-105  px-10 py-3.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Projects
              </span>
            </button>
            <HiOutlineArrowNarrowDown className="text-amber-50 font-bold w-8 h-8" />
          </div>
        </div>
      }
      <About setIsAboutOpen={setIsAboutOpen} isAboutOpen={isAboutOpen}></About>

      <div className="bg-red-200 w-[99vw] h-100 overflow-x-hidden"></div>
    </>
  );
};

export default Home;
