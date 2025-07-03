import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/me.jpg";

const Navbar = () => {
  return (
    <div className="text-white w-full flex items-center   lg:justify-center justify-around h-[60px] lg:pt-6 pt-4 ">
      <div className="lg:w-[35%] outline-1  outline-blue-400 w-fit p-3 rounded-l-2xl rounded-r-2xl justify-around flex items-center  gap-2 lg:text-lg text-[10px]  bg-[#262627d2] pr-10 ">
        <div className="w-10 h-10 flex justify-center items-center">
          <img
            className="rounded-t-xl rounded-b-xl w-8 h-8 hover:scale-110 active:scale-120 transition-all duration-200 "
            src={image}
            alt=""
          />
        </div>
        <Link
          className="inline-block  text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Shahzad Khichi
        </Link>

        <Link
          className="inline-block text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Projects
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Services
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
