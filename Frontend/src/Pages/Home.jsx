import React from "react";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import GitHubContributionsGraph from "../components/GitHubContributionsGraph";

import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Home = () => {
  const profileImage = "/assets/me.jpg";
  const bio =
    "Shahzad Khichi is a passionate and innovative Full Stack Developer skilled in MERN Stack, React Native and Flutter for native mobile development, Next.js, Nest.js, Python, and FastAPI, with a strong understanding of system design (LLD/HLD), DevOps, and Generative AI. He is currently pursuing a BS in Software Engineering at FAST NUCES and has hands-on experience in developing scalable, high-performance web and mobile applications. With expertise in both frontend and backend technologies, he combines creativity and technical precision to build user-centric, efficient solutions. Driven by curiosity and continuous learning, he strives to craft impactful software that bridges functionality with seamless user experiences.";

  const projects = [
    {
      title: "StudyNotion",
      description:
        "An ed-tech platform enabling students and instructors to create, consume, and rate educational content with real-time collaboration.",
      Technologies: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Express",
        "JWT",
        "Cloudinary",
      ],
      image: "/assets/ProjectImages/StudyNotion.png",
      liveLink: "https://skstudynotion.netlify.app",
      githubLink:
        "https://github.com/ShahzadKhichi/MERN_PROJECTS/tree/main/LMS_Site_Babbar",
    },
    {
      title: "Uber Clone",
      description:
        "A ride-hailing app with real-time tracking using socket.io and location using google api, driver-passenger matching, ",
      Technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "Socket.io",
        "MongoDB",
        "Geolocation API",
      ],
      image: "/assets/ProjectImages/Uber.png",
      liveLink: "",
      githubLink: "https://github.com/ShahzadKhichi/UBER-Clone",
    },
    {
      title: "OS Simulator",
      description:
        "Interactive operating system simulator demonstrating CPU scheduling, memory management, and deadlock avoidance algorithms.",
      Technologies: [
        "C",
        "C++",
        "Raylib",
        "Mutexes",
        "Threads",
        "Semaphores",
        "Multithreading",
        "Synchronization",
        "Scheduling Algorithms",
      ],
      image: "/assets/ProjectImages/OS.png",
      liveLink: "",
      githubLink: "https://github.com/ShahzadKhichi/OS_Project",
    },
  ];

  return (
    <>
      <Navbar profileImage={profileImage} />
      <AboutSection image={profileImage} bio={bio} />
      <ProjectsSection projects={projects} />
      <SkillsSection />
      <GitHubContributionsGraph />

      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
