import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import GitHubContributionsGraph from "../components/sections/GitHubContributionsGraph";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import { PublicShimmer } from "../components/ui/Shimmer";
import { fetchProjects } from "../store/slices/projectSlice";
import { fetchProfile, incrementViews } from "../store/slices/profileSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { items: projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { data: profile, loading: profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(incrementViews());
    dispatch(fetchProjects());
    dispatch(fetchProfile());
  }, [dispatch]);

  const loading = projectsLoading || profileLoading;

  if (loading) {
    return <PublicShimmer />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar profileImage={profile?.profileImage} />
      <AboutSection
        image={profile?.profileImage}
        bio={profile?.bio}
        socialLinks={profile?.socialLinks}
        name={profile?.name}
      />
      <ProjectsSection projects={projects} />
      <SkillsSection />
      <GitHubContributionsGraph />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
