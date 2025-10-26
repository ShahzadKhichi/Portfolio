import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaLinux,
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
  SiSpring,
  SiHibernate,
  SiJenkins,
  SiReact,
  SiFlutter,
  SiDart,
  SiPrisma,
} from "react-icons/si";

const skills = [
  { Icon: SiReact, name: "React Native", color: "text-cyan-400" },
  { Icon: SiDart, name: "Dart", color: "text-cyan-500" },
  { Icon: SiFlutter, name: "Flutter", color: "text-cyan-500" },
  { Icon: FaReact, name: "React.js", color: "text-cyan-400" },
  { Icon: SiNextdotjs, name: "Next.js", color: "text-white" },
  { Icon: FaNodeJs, name: "Node.js", color: "text-green-400" },
  { Icon: SiNestjs, name: "Nest.js", color: "text-red-500" },
  { Icon: FaPython, name: "Python", color: "text-yellow-400" },
  { Icon: SiFastapi, name: "FastAPI", color: "text-teal-400" },
  { Icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-400" },
  { Icon: SiMysql, name: "MySQL", color: "text-blue-400" },
  { Icon: SiPrisma, name: "Prisma ORM", color: "text-gray-100" },
  { Icon: SiSpring, name: "Spring", color: "text-green-500" },
  { Icon: SiSpringboot, name: "Spring Boot", color: "text-green-500" },
  { Icon: SiHibernate, name: "Hibernate ORM", color: "text-gray-700" },
  { Icon: SiKubernetes, name: "Kubernetes", color: "text-blue-500" },
  { Icon: FaDocker, name: "Docker", color: "text-blue-400" },
  { Icon: SiApachekafka, name: "Kafka", color: "text-white-400" },
  { Icon: SiRabbitmq, name: "RabbitMQ", color: "text-orange-400" },
  { Icon: SiRedis, name: "Redis", color: "text-red-600" },
  { Icon: SiJenkins, name: "Jenkins", color: "text-gray-200" },
  { Icon: FaGitAlt, name: "Git", color: "text-orange-500" },
  { Icon: FaJava, name: "Java", color: "text-orange-400" },
  { Icon: SiCplusplus, name: "C++", color: "text-blue-400" },
  { Icon: SiC, name: "C", color: "text-blue-400" },
  { Icon: FaLinux, name: "Linux", color: "text-yellow-500" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full py-16 sm:py-20 bg-gradient-to-b from-[#000000f3] to-[#0a0a0af3] flex flex-col items-center gap-10 sm:gap-12 px-4"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-400"
      >
        Skills
      </motion.h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 max-w-6xl w-full">
        {skills.map(({ Icon, name, color }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.02,
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.15 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`bg-[#1a1a1af3] p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg border border-blue-900/30 text-4xl sm:text-5xl lg:text-6xl ${color} transition-all duration-200 group-hover:shadow-xl group-hover:shadow-blue-500/40`}
            >
              <Icon />
            </div>
            <span className="text-xs sm:text-sm font-medium text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
