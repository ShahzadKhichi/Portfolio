import React from "react";
import SideBar from "../components/SideBar";
import image from "../assets/me.jpg";
import Navbar from "../components/Navbar";
import { Typewriter } from "react-simple-typewriter";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import { IoIosSend } from "react-icons/io";

import { HashLink as Link } from "react-router-hash-link";

//projects images

import image1 from "../assets/ProjectImages/StudyNotion.png";
import image2 from "../assets/ProjectImages/Uber.png";
import Input from "../components/Input";

const Home = () => {
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

  const projectDetails = [
    {
      image: image1,
      description:
        "Study Notion is a full-featured LMS platform built with the MERN stack, supporting role-based access for Students, Instructors, and Admins. It includes course creation, enrollment, and management features with a responsive UI.",
      Tecnologies: [
        "React",
        "Node",
        "Express",
        "MongoDB",
        "JWT",
        "Tailwind",
        "Axios",
        "Stripe",
      ],
    },
    {
      image: image2,
      description:
        "An Uber clone built with the MERN stack, featuring real-time ride tracking and communication using WebSockets, optimized for mobile devices.",
      Tecnologies: [
        "React",
        "Node",
        "Express",
        "MongoDB",
        "Socket.IO",
        "JWT",
        "Tailwind",
        "Axios",
      ],
    },
  ];

  return (
    <>
      {/* This is about section */}
      <section
        id="about"
        className={`lg:w-full  w-[100vw] h-full bg-[#000000f3]   transition-all duration-300  relative gap-20  lg:pt-42 pb-16 lg:pb-0
          }`}
      >
        <div className="w-[100vw] lg:w-full h-fit lg:h-[74vh]  flex flex-col-reverse items-center sm:flex-col-reverse  lg:flex-row lg:justify-center lg:items-start gap-10 lg:gap-30 pb-8 pl-4   pt-8">
          <div className="flex lg:flex-none  flex-col justify-center h-fit items-center lg:w-[500px] lg:gap-10 lg:h-fit  ">
            <h4 className="text-white font-extrabold text-2xl lg:text-[45px] font-mono inline-flex animate-pulse   ">
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
          </div>

          <img
            className="bg-amber-50 mt-5 w-[120px] h-[120px] lg:w-[300px] lg:h-[300px] hover:scale-110 active:scale-110 transition-all duration-100 rounded-t-xl rounded-b-xl shadow-sm border-blue-500 border-2 shadow-blue-500 transform-stroke animate-pulse "
            src={image}
            alt="image"
          />
        </div>
      </section>

      {/* This is the projects section */}
      <section
        id="project"
        className={`lg:w-full w-[100vw]  flex flex-col justify-center py-4   transition-all duration-300 bg-[#000000f3] relative gap-10 overflow-x-hidden 
          }`}
      >
        <div className="h-fit  flex items-center justify-center   flex-col  gap-4 ">
          <Link
            className="inline-block text-gray-500 hover:text-white active:text-white  hover:scale-105  transition-all duration-200 font-extrabold   font-sans"
            to="/#project"
          >
            <Button text={"Projects"} />
          </Link>
          <HiOutlineArrowNarrowDown className="text-amber-50 font-bold w-17 h-10  " />
        </div>

        <div className="flex flex-col gap-4 items-center lg:px-8 px-2">
          {projectDetails.map((project, id) => (
            <ProjectCard
              key={id}
              image={project.image}
              Technologies={project.Tecnologies}
              description={project.description}
            />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#000000f3] w-full flex flex-col py-16 gap-8 items-center justify-center "
      >
        <Button text={"Contact me"} />

        <div className="lg:w-1/3 w-full px-8 flex flex-col items-center gap-4">
          <div className="w-full flex  flex-col border-2 items-center justify-center lg:flex-row gap-2">
            <Input
              label={"First Name"}
              placeholder={"Enter first name"}
              required={true}
            />
            <Input
              label={"Last Name"}
              placeholder={"Enter Last name"}
              required={true}
            />
          </div>
          <div className="w-full">
            <Input
              label={"Email Address"}
              placeholder={"Enter email address"}
              required={true}
            />
          </div>
          <div className="w-full">
            <Input
              type={"text-area"}
              rows={"8"}
              label={"Message"}
              placeholder={"Enter your message"}
              required={true}
            />
          </div>
          <div className="mt-8 text-white ">
            <Button text={"Send Message"}>
              <IoIosSend size={20} />
            </Button>
          </div>
        </div>
      </section>

      <footer className="flex flex-col bg-[#000000f3] gap-10 items-center justify-center py-8 text-amber-50">
        <div className="lg:text-4xl font-semibold">Shahzad Khichi © 2025</div>
        <div className="text-4xl font-semibold flex gap-4">
          {" "}
          <Link
            className="h-full"
            to="https://github.com/ShahzadKhichi "
            target="_blank"
          >
            <FaGithub className="xl:text-4xl md:text-2xl  lg:text-3xl text-3xl  h-full hover:scale-110 transition-all duration-200  text-gray-500  active:text-white hover:text-white" />
          </Link>
          <Link
            className="h-full"
            to="https://www.linkedin.com/in/shahzad-khichi-3931372a5/"
            target="_blank"
          >
            {" "}
            <IoLogoLinkedin className="xl:text-4xl md:text-2xl lg:text-3xl text-3xl h-full hover:scale-110 transition-all duration-300 text-gray-500  active:text-white hover:text-white" />
          </Link>
          <Link className="h-full" to="mailto:ShahzadKhichi996@gmail.com">
            <MdEmail className="xl:text-4xl md:text-2xl lg:text-3xl text-3xl h-full hover:scale-110 transition-all duration-300 text-gray-500  active:text-white hover:text-white" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Home;
