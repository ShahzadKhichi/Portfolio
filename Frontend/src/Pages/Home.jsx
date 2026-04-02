import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import GitHubContributionsGraph from "../components/sections/GitHubContributionsGraph";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import * as projectApi from "../api/project.api";
import * as profileApi from "../api/profile.api";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, profRes] = await Promise.all([
          projectApi.getAllProjects(),
          profileApi.getProfile()
        ]);
        
        if (projRes.data.success) {
          setProjects(projRes.data.projects);
        }
        if (profRes.data.success) {
          setProfile(profRes.data.profile);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  return (
    <>
      <Navbar profileImage={profile?.profileImage} />
      <AboutSection 
        image={profile?.profileImage} 
        bio={profile?.bio} 
        socialLinks={profile?.socialLinks}
      />
      <ProjectsSection projects={projects} />
      <SkillsSection />
      <GitHubContributionsGraph />

      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
