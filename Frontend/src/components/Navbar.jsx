import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import image from "../assets/me.jpg";

const Navbar = () => {
  return (
    <div className="text-white w-full flex items-center top-0 sticky z-10  bg-[#000000f3]   lg:justify-center justify-around  lg:pt-6 pt-4 ">
      <div className="lg:w-[35%] outline-1  outline-blue-400 w-fit p-3 rounded-l-2xl rounded-r-2xl justify-around flex items-center  gap-2 lg:text-lg text-[10px]  bg-[#262627d2] pr-10 ">
        <Link
          to="/#main"
          className="w-10 h-10 flex justify-center items-center"
        >
          <img
            className="rounded-t-xl rounded-b-xl w-8 h-8 hover:scale-110 active:scale-120 transition-all duration-200 "
            src={image}
            alt=""
          />
        </Link>
        <Link
          className="inline-block  text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/#main"
        >
          Shahzad Khichi
        </Link>

        <Link
          className="inline-block text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/#project"
        >
          Projects
        </Link>

        <Link
          className="inline-block text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/#contact"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
