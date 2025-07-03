import React from "react";
import SideBar from "../components/SideBar";
import image from "../assets/me.jpg";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
const Home = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const text = Typewriter({
    words: [
      "Web Developer",
      "Software Engineer",
      "MERN Stack Developer",
      "React Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Java Developer",
      "Backend Developer",
      "Node.js Developer",
      "Spring Boot Developer",
      "JavaScript Developer",
    ],
    loop: 0,
    cursor: true,
    typeSpeed: 60,
    deleteSpeed: 20,
    delaySpeed: 500,
  });
  console.log(isAboutOpen);

  return (
    <>
      {/* This is the main container for the home page */}
      <div
        className={`lg:w-[100vw]  w-[100vw] h-[100vh]   transition-all duration-300 bg-[#000000f3] relative gap-20 overflow-x-hidden 
          }`}
      >
        <Navbar></Navbar>
        <div className="w-[100vw] lg:w-full h-fit lg:h-[70vh]  flex flex-col-reverse items-center sm:flex-col-reverse  lg:flex-row lg:justify-center lg:items-start gap-10 lg:gap-30 pb-8 pl-4  lg:mt-40 mt-10">
          <div className="flex lg:flex-none flex-col justify-center h-fit items-center lg:w-[500px] lg:gap-10 lg:h-fit ">
            <h4 className="text-white font-extrabold text-2xl lg:text-[45px] font-mono inline-flex animate-pulse">
              Shahzad Khichi
            </h4>
            <h3 className="text-white m font-mono font-bold lg:text-[30px] lg:w-full w-[80%] py-4">
              I am <span className="text-blue-400">{text}</span>
            </h3>
            <h6 className="xl:pl-0 pl-16 pr-4  relative ">
              <span className="text-blue-300">{"<>"}</span>
              <p className="text-gray-500 font-mono md:text-xl lg:text-[16px] text-sm ">
                I am a passionate developer with a keen interest in developing
                web applications and software solutions.
                <br />I help business owners and busy web developers by
                designing and developing creative, high-performing websites that
                align with their vision and keep visitors engaged. I use modern
                technologies and tools to build visually appealing and
                user-friendly web experiences.
              </p>
              <span className="text-blue-300">{"</>"}</span>
              <SideBar></SideBar>
            </h6>
            <div className="h-fit lg:w-[50%] w-[40%] flex items-center  lg:mt-30 mt-20 flex-col  gap-4 ">
              <button className="lg:mx-13  w-fit hover:scale-105 transition-all duration-200 flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="  font-extrabold p  font-mono hover:scale-105  px-10 py-3.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Projects
                </span>
              </button>
              <HiOutlineArrowNarrowDown className="text-amber-50 font-bold w-10 h-8  " />
            </div>
          </div>

          <img
            className="bg-amber-50 w-[120px] h-[120px] lg:w-[300px] lg:h-[300px] hover:scale-110 active:scale-110 transition-all duration-500 rounded-t-xl rounded-b-xl"
            src={image}
            alt="image"
          />
        </div>
      </div>

      {/* This is the projects section */}
      <div
        className={`lg:w-[100vw]  w-[100vw] h-[100vh]    transition-all duration-300 bg-[#000000f3] relative gap-20 overflow-x-hidden 
          }`}
      ></div>
    </>
  );
};

export default Home;
