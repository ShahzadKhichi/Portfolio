import React from "react";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import GitHubContributionsGraph from "../components/sections/GitHubContributionsGraph";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import { profileImage, bio, projects } from "../data/projects";

const Home = () => {
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
