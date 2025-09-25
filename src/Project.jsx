import React from "react";
import { FiExternalLink } from "react-icons/fi";
import {
  FaGithub,
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaJava,
  FaPhp,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
//   SiCsharp,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGraphql,
  SiRedux,
} from "react-icons/si";

// Robust tech dictionary
const TECH_ICON_MAP = {
  react: { icon: FaReact, color: "text-sky-400" },
  node: { icon: FaNodeJs, color: "text-green-600" },
  python: { icon: FaPython, color: "text-yellow-500" },
  html: { icon: FaHtml5, color: "text-orange-600" },
  css: { icon: FaCss3Alt, color: "text-blue-500" },
  javascript: { icon: FaJsSquare, color: "text-yellow-400" },
  java: { icon: FaJava, color: "text-red-600" },
  php: { icon: FaPhp, color: "text-purple-600" },
//   csharp: { icon: SiCsharp, color: "text-purple-500" },
  typescript: { icon: SiTypescript, color: "text-sky-600" },
  nextjs: { icon: SiNextdotjs, color: "text-gray-300" },
  mongodb: { icon: SiMongodb, color: "text-green-500" },
  postgresql: { icon: SiPostgresql, color: "text-blue-700" },
  tailwind: { icon: SiTailwindcss, color: "text-sky-400" },
  graphql: { icon: SiGraphql, color: "text-pink-500" },
  redux: { icon: SiRedux, color: "text-purple-500" },
  docker: { icon: FaDocker, color: "text-blue-500" },
  git: { icon: FaGitAlt, color: "text-red-500" },
};

// Component to render tech icon
const TechIcon = ({ tech }) => {
  const mapping = TECH_ICON_MAP[tech.toLowerCase()];
  if (!mapping) return null;
  const IconComponent = mapping.icon;
  return <IconComponent className={`${mapping.color} text-lg`} />;
};

const Project = ({ name, description, link, github, techstack, image }) => {
  return (
    <div
      className="bg-gradient-to-b from-[#14151A] to-[#1C1D23] text-white rounded-2xl shadow-lg overflow-hidden 
                 max-w-[280px] h-[340px] border border-gray-600 pt-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-5/6 h-35 object-cover rounded-md border border-gray-500 mx-auto block
                       filter brightness-70 transition-all duration-500 hover:brightness-120"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col p-4 h-[calc(100%-9rem)] text-left"> 
        {/* subtract image height from total card height */}

        {/* Top: title + links */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold transition-colors duration-300 hover:text-sky-400">
            {name}
          </h2>
          <div className="flex gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaGithub size={18} />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Middle: description */}
        <p className="text-gray-300 text-sm mt-2 mb-12">
          {description}
        </p>

        {/* Bottom: tech icons (absolute at bottom left) */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {techstack?.map((tech, index) => (
            <TechIcon key={index} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
