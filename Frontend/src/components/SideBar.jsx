import React from "react";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className=" flex  flex-col absolute top-[30%]  left-[3%] lg:-left-[20%] xl:-left-[40%] xl:h-[70%] xl:top-[20%]  lg:h-[50%]  sm:h-[55%]  h-[40%]  w-10 ">
      <Link
        className="h-full"
        to="https://github.com/ShahzadKhichi "
        target="_blank"
      >
        <FaGithub className="xl:text-4xl md:text-2xl  lg:text-3xl text-xl  h-full hover:scale-110 transition-all duration-200  text-gray-500  active:text-white hover:text-white" />
      </Link>
      <Link
        className="h-full"
        to="https://www.linkedin.com/in/shahzad-khichi-3931372a5/"
        target="_blank"
      >
        {" "}
        <IoLogoLinkedin className="xl:text-4xl md:text-2xl lg:text-3xl text-xl h-full hover:scale-110 transition-all duration-300 text-gray-500  active:text-white hover:text-white" />
      </Link>

      <Link className="h-full" to="mailto:ShahzadKhichi996@gmail.com">
        <MdEmail className="xl:text-4xl md:text-2xl lg:text-3xl text-xl h-full hover:scale-110 transition-all duration-300 text-gray-500  active:text-white hover:text-white" />
      </Link>
    </div>
  );
};

export default SideBar;
