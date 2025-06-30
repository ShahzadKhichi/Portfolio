import React from "react";
import { useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = ({ setIsAboutOpen, isAboutOpen }) => {
  const panelRef = useRef(null);

  useGSAP(() => {
    if (isAboutOpen) {
      gsap.to(panelRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
      });
    }
  }, [isAboutOpen]);
  return (
    <div
      ref={panelRef}
      className={`border-2 duration-100 rounded-t-xl  top-[10%] left-[20%] rounded-b-xl w-[60vw] h-[80vh] bg-gray-700 fixed inset-0   z-40 ${
        isAboutOpen ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col  relative items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-white">
          Hello! I'm Shahzad Khichi, a passionate web developer with a love for
          creating dynamic and responsive web applications. I specialize in
          front-end development, focusing on user experience and performance.
        </p>
        <p className="text-lg text-white mt-4">
          In my free time, I enjoy exploring new technologies, contributing to
          open-source projects, and learning about the latest trends in web
          development.
        </p>
      </div>
      <button
        className=" absolute top-0 p-1 right-1    rounded-full scale-105 transition-colors"
        onClick={() => setIsAboutOpen(false)}
      >
        <RxCrossCircled className="font-extrabold text-4xl hover:animate-ping  delay-20" />
      </button>
    </div>
  );
};

export default About;
