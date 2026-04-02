import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiSpringboot,
  SiKubernetes,
  SiMysql,
  SiCplusplus,
  SiC,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiHibernate,
  SiJenkins,
  SiFlutter,
  SiDart,
  SiPrisma,
  SiTailwindcss,
} from "react-icons/si";

const frontend = [
  { Icon: FaHtml5, name: "HTML", color: "text-orange-500" },
  { Icon: FaCss3Alt, name: "CSS", color: "text-blue-500" },
  { Icon: FaJs, name: "JavaScript", color: "text-yellow-400" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-500" },
  { Icon: FaBootstrap, name: "Bootstrap", color: "text-purple-600" },
  { Icon: FaReact, name: "React.js", color: "text-cyan-500" },
  { Icon: FaReact, name: "React Native", color: "text-cyan-400" },
  { Icon: SiFlutter, name: "Flutter", color: "text-cyan-400" },
  { Icon: SiDart, name: "Dart", color: "text-teal-400" },
  { Icon: SiNextdotjs, name: "Next.js", color: "text-gray-200" },
];

const backend = [
  { Icon: FaNodeJs, name: "Node.js", color: "text-green-400" },
  { Icon: SiNestjs, name: "NestJS", color: "text-red-500" },
  { Icon: FaPython, name: "Python", color: "text-yellow-400" },
  { Icon: SiFastapi, name: "FastAPI", color: "text-teal-500" },
  { Icon: SiMongodb, name: "MongoDB", color: "text-green-600" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-600" },
  { Icon: SiMysql, name: "MySQL", color: "text-orange-500" },
  { Icon: SiPrisma, name: "Prisma", color: "text-indigo-400" },
  { Icon: SiSpringboot, name: "Spring Boot", color: "text-green-500" },
  { Icon: SiHibernate, name: "Hibernate", color: "text-orange-600" },
  { Icon: SiRedis, name: "Redis", color: "text-red-600" },
  { Icon: SiApachekafka, name: "Kafka", color: "text-gray-400" },
  { Icon: SiRabbitmq, name: "RabbitMQ", color: "text-orange-500" },
  { Icon: FaJava, name: "Java", color: "text-red-500" },
  { Icon: SiCplusplus, name: "C++", color: "text-blue-500" },
  { Icon: SiC, name: "C", color: "text-gray-300" },
];

const devops = [
  { Icon: SiKubernetes, name: "Kubernetes", color: "text-blue-500" },
  { Icon: FaDocker, name: "Docker", color: "text-cyan-400" },
  { Icon: SiJenkins, name: "Jenkins", color: "text-red-600" },
  { Icon: FaGitAlt, name: "Git", color: "text-orange-600" },
  { Icon: FaLinux, name: "Linux", color: "text-yellow-500" },
];

const SkillCard = ({ Icon, name, color }) => (
  <motion.div
    whileHover={{ scale: 1.25, y: -12 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className="group relative flex justify-center items-center h-20"
  >
    <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-lg transition-all duration-300 group-hover:border-cyan-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
      <Icon className={`text-4xl ${color} drop-shadow-md`} />
    </div>
    <span
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
    group-active:opacity-100 transition-opacity duration-200 pointer-events-none text-xs font-semibold text-cyan-300 bg-gray-900/95 px-3 py-1.5 rounded-full border border-cyan-600/50 whitespace-nowrap z-10"
    >
      {name}
    </span>
  </motion.div>
);

const SkillGroup = ({ title, skills, gradient }) => (
  <div className="w-full max-w-6xl">
    <motion.h3
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`text-2xl font-bold text-center mb-10 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
    >
      {title}
    </motion.h3>
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-8 sm:gap-10">
      {skills.map((skill, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.015, duration: 0.3 }}
          viewport={{ once: true }}
        >
          <SkillCard {...skill} />
        </motion.div>
      ))}
    </div>
  </div>
);

export default function SkillsSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-4 flex flex-col items-center gap-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-cyan-400"
        >
          Skills
        </motion.h2>
        <SkillGroup
          title="Frontend"
          skills={frontend}
          gradient="from-cyan-400 to-blue-400"
        />
        <SkillGroup
          title="Backend"
          skills={backend}
          gradient="from-green-400 to-emerald-400"
        />
        <SkillGroup
          title="DevOps"
          skills={devops}
          gradient="from-blue-400 to-indigo-400"
        />
      </div>
    </section>
  );
}
