import React from "react";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className=" flex flex-col absolute top-[50%] left-[3%]   h-[20%]  w-10 ">
      <Link
        className="h-full"
        to="https://github.com/ShahzadKhichi "
        target="_blank"
      >
        <FaGithub className="text-4xl h-full hover:scale-110 transition-all duration-200  text-gray-500 hover:text-white" />
      </Link>
      <Link
        className="h-full"
        to="https://www.linkedin.com/in/shahzad-khichi-3931372a5/"
        target="_blank"
      >
        {" "}
        <IoLogoLinkedin className="text-4xl h-full hover:scale-110 transition-all duration-300 text-gray-500 hover:text-white" />
      </Link>

      <Link className="h-full" to="mailto:ShahzadKhichi996@gmail.com">
        <MdEmail className="text-4xl h-full hover:scale-110 transition-all duration-300 text-gray-500 hover:text-white" />
      </Link>
    </div>
  );
};

export default SideBar;
