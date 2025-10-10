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
import { FaLaptopCode } from "react-icons/fa6"; // ✅ Default fallback icon

// Lowercase lookup map
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
  // Default to the first category
  const [selected, setSelected] = useState(skillsData[0].id);
  const [selectedData, setSelectedData] = useState(skillsData[0]);

  // Normalize skills array (regardless of key name)
  const getSkillsArray = (categoryObj) => {
    const keys = Object.keys(categoryObj).filter((k) => k !== "id");
    return categoryObj[keys[0]] || [];
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-white"
      id="skills"
    >
      {/* Category Buttons */}
      <div className="flex w-full max-w-3xl h-12 mb-6 gap-4">
        {skillsData.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelected(category.id);
              setSelectedData(category);
            }}
            className={`cursor-pointer flex-1 py-2 rounded-lg transition font-medium
              ${
                selected === category.id
                  ? "bg-gradient-to-b from-[#323440] to-[#1C1D23]"
                  : "bg-[#1C1D23]/60 hover:bg-[#323440]/60"
              }`}
          >
            {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills Section */}
      <div className="relative w-full max-w-5xl h-[400px] rounded-2xl py-8 px-4 overflow-y-auto overflow-x-hidden 
                      bg-gradient-to-b from-[#323440] to-[#1C1D23] shadow-lg backdrop-blur-sm">
        <div
          className="grid gap-4 justify-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, 6rem)",
            justifyContent: "center",
          }}
        >
          {getSkillsArray(selectedData).map((skill, index) => {
            const key = skill.toLowerCase().replace(/\s|[().#+]/g, "");
            const tech = TECH_ICON_MAP[key] || {
              icon: FaLaptopCode, // ✅ fallback
              color: "#9CA3AF",
            };
            const Icon = tech.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-xl 
                           bg-gradient-to-b from-[#2C2E38] to-[#1C1D23] shadow-md
                           hover:scale-105 transform transition-all duration-300 cursor-pointer flex-shrink-0"
                style={{
                  color: tech.color,
                  boxShadow: "0 0 6px 0 transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 14px 2px ${tech.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 6px 0 transparent";
                }}
              >
                <Icon
                  size={40}
                  className="mb-1 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="text-xs font-medium text-center text-white">
                  {skill}
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
