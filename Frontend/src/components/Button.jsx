import React from "react";

const Button = ({ text, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="lg:mx-13 h-fit  w-fit hover:scale-105 transition-all duration-200 flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
    >
      <span className="flex items-center gap-2  font-extrabold p  font-mono hover:scale-105  px-10 py-3.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        {text}
        {children}
      </span>
    </button>
  );
};

export default Button;
