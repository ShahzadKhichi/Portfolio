import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import GitHubContributionsGraph from "../components/sections/GitHubContributionsGraph";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import * as projectApi from "../api/project.api";
import * as profileApi from "../api/profile.api";

// const Preloader = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + Math.random() * 15 + 5;
//       });
//     }, 200);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       exit={{ opacity: 0, scale: 0.98 }}
//       transition={{ duration: 0.6, ease: "easeInOut" }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950 overflow-hidden"
//     >
//       {/* Subtle ambient glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-accent/5 rounded-full blur-[150px]" />

//       <div className="relative z-10 flex flex-col items-center gap-10">
//         {/* Animated Logo Ring */}
//         <div className="relative w-28 h-28 flex items-center justify-center">
//           {/* Outer rotating ring */}
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//             className="absolute inset-0"
//           >
//             <svg viewBox="0 0 120 120" className="w-full h-full">
//               <circle
//                 cx="60"
//                 cy="60"
//                 r="54"
//                 fill="none"
//                 stroke="rgba(0, 245, 212, 0.1)"
//                 strokeWidth="2"
//               />
//               <circle
//                 cx="60"
//                 cy="60"
//                 r="54"
//                 fill="none"
//                 stroke="#00f5d4"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//                 strokeDasharray="80 260"
//               />
//             </svg>
//           </motion.div>

//           {/* Inner counter-rotating ring */}
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//             className="absolute inset-3"
//           >
//             <svg viewBox="0 0 100 100" className="w-full h-full">
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="44"
//                 fill="none"
//                 stroke="rgba(0, 245, 212, 0.06)"
//                 strokeWidth="1.5"
//               />
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="44"
//                 fill="none"
//                 stroke="#00f5d4"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeDasharray="40 240"
//               />
//             </svg>
//           </motion.div>

//           {/* Center initials */}
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             className="relative z-10"
//           >
//             <span className="text-3xl font-extrabold text-teal-accent tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
//               SK
//             </span>
//           </motion.div>
//         </div>

//         {/* Name & Tagline */}
//         <div className="text-center space-y-2">
//           <motion.h2
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="text-2xl font-bold text-white tracking-wide"
//             style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//           >
//             Shahzad Khichi
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//             className="text-sm text-gray-400 tracking-[0.25em] uppercase"
//           >
//             Full Stack Developer
//           </motion.p>
//         </div>

//         {/* Progress Bar */}
//         <motion.div
//           initial={{ opacity: 0, width: 0 }}
//           animate={{ opacity: 1, width: "16rem" }}
//           transition={{ delay: 0.4, duration: 0.4 }}
//           className="relative"
//         >
//           <div className="w-64 h-[3px] bg-navy-800 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-teal-accent rounded-full"
//               style={{ width: `${Math.min(progress, 100)}%` }}
//               transition={{ duration: 0.2 }}
//             />
//           </div>
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="block text-center text-xs text-gray-500 mt-3 tracking-wider"
//           >
//             Loading portfolio...
//           </motion.span>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await profileApi.incrementViews();
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };
    incrementViews();

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

  return (
    <>
      {/* <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence> */}

      {!loading && (
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
          />
          <ProjectsSection projects={projects} />
          <SkillsSection />
          <GitHubContributionsGraph />
          <ContactSection />
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default Home;
