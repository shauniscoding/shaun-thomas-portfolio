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
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGraphql,
  SiRedux,
} from "react-icons/si";

// TECH_ICON_MAP
const TECH_ICON_MAP = {
  react: { icon: FaReact, color: "text-sky-400" },
  node: { icon: FaNodeJs, color: "text-green-600" },
  python: { icon: FaPython, color: "text-yellow-500" },
  html: { icon: FaHtml5, color: "text-orange-600" },
  css: { icon: FaCss3Alt, color: "text-blue-500" },
  javascript: { icon: FaJsSquare, color: "text-yellow-400" },
  java: { icon: FaJava, color: "text-red-600" },
  php: { icon: FaPhp, color: "text-purple-600" },
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

const TechIcon = ({ tech }) => {
  if (!tech) return null;
  const mapping = TECH_ICON_MAP[tech.toLowerCase()];
  if (!mapping) return null;
  const IconComponent = mapping.icon;
  return <IconComponent className={`${mapping.color} text-lg`} />;
};

const Project = ({ name, description, link, github, techstack, image }) => {
  return (
    <div
      className="relative bg-gradient-to-b from-[#14151A] to-[#1C1D23] text-white rounded-2xl shadow-lg overflow-hidden 
                 max-w-[240px] h-[310px] border border-gray-600 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
    >
      {/* Top: image area*/}
      <div className="px-4 pt-6">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-7/8 h-30 object-cover rounded-md border border-gray-500 mx-auto block
                       filter brightness-70 transition-all duration-500 hover:brightness-110"
          />
        )}
      </div>

      {/* Middle content: flexible, with bottom padding to leave room for the footer */}
      <div className="p-4 pb-14 flex-1 flex flex-col text-left">
        {/* Title + links */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {name}
          </h2>
          <div className="flex gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-300"
                aria-label={`${name} GitHub`}
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
                aria-label={`${name} Live`}
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Description: allow it to grow but not overlap footer */}
        <p className="text-gray-300 text-sm mt-2 overflow-hidden">
          {description}
        </p>

        {/* Spacer (optional) so content flexes nicely) */}
        <div className="flex-grow" />
      </div>

      {/* Footer: absolute bottom-left. Because the content has pb-14, nothing will sit under it */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="flex gap-2 flex-wrap">
          {techstack?.map((tech, index) => (
            <div key={index} className="flex items-center gap-1">
              <TechIcon tech={tech} />
              {/* optional small label, uncomment if you want text next to icon:
              <span className="text-xs text-gray-300">{tech}</span>
              */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
