import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/me.jpg";

const Navbar = () => {
  return (
    <div className="text-white flex items-center  gap-2 justify-center h-[60px] pt-6 ">
      <div className="w-[35%] p-3 rounded-l-2xl rounded-r-2xl justify-around flex items-center  gap-2  bg-[#262627d2] pr-10 ">
        <div className="w-10 h-10 flex justify-center items-center">
          <img
            className="rounded-t-xl rounded-b-xl w-8 h-8 hover:scale-110 transition-all duration-200 "
            src={image}
            alt=""
          />
        </div>
        <Link
          className="inline-block  text-gray-500 hover:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Shahzad Khichi
        </Link>

        <Link
          className="inline-block text-gray-500 hover:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Projects
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Services
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
          to="/"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
