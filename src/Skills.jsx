import React, { useState } from "react";
import {
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

const TECH_ICON_MAP = {
  react: { icon: FaReact, color: "#61DAFB" },
  node: { icon: FaNodeJs, color: "#339933" },
  python: { icon: FaPython, color: "#FFD43B" },
  html: { icon: FaHtml5, color: "#E34F26" },
  css: { icon: FaCss3Alt, color: "#1572B6" },
  javascript: { icon: FaJsSquare, color: "#F7DF1E" },
  java: { icon: FaJava, color: "#007396" },
  php: { icon: FaPhp, color: "#777BB4" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  nextjs: { icon: SiNextdotjs, color: "#000000" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  tailwind: { icon: SiTailwindcss, color: "#38B2AC" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  redux: { icon: SiRedux, color: "#764ABC" },
  docker: { icon: FaDocker, color: "#2496ED" },
  git: { icon: FaGitAlt, color: "#F1502F" },
};

const Skills = ({ skillsData }) => {
  const [selected, setSelected] = useState("Frontend");
  const [selectedData, setSelectedData] = useState(skillsData["Frontend"]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4" id="skills">
      {/* Top Buttons */}
      <div className="flex w-full max-w-3xl h-12 mb-6 gap-4">
        {["Frontend", "Backend", "Database/Cloud", "WorkFlow"].map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelected(category);
              setSelectedData(skillsData[category]);
            }}
            className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition
              ${
                selected === category
                  ? "border-2 border-white bg-gray-800"
                  : "border border-transparent hover:bg-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills section */}
      <div className="relative w-full max-w-5xl h-[400px] border-2 border-white rounded-lg py-8 px-4 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-wrap gap-4">
        {selectedData.map((skill, index) => {
          const tech = TECH_ICON_MAP[skill.key];
          if (!tech) return null;
          const Icon = tech.icon;

          return (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-gray-800/60 shadow-md hover:scale-105 transform transition-all duration-300 cursor-pointer flex-shrink-0"
              style={{
                color: tech.color,
                boxShadow: "0 0 6px 0 transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 12px 2px ${tech.color}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 6px 0 transparent";
              }}
            >
              {/* Icon colored, text white by default */}
              <Icon
                size={40}
                className="mb-1 transition-transform duration-300 group-hover:scale-110"
                style={{ color: tech.color }}
              />
              <span className="text-xs font-medium text-center text-white">
                {skill.name}
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Skills;