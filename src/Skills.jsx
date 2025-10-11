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
  FaAws,
  FaGithub,
  FaGitlab,
  FaBitbucket, 
  FaLinux,
  FaFigma      
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGraphql,
  SiRedux,
  SiFlask,
  SiFastapi,
  SiSelenium,
  SiMysql,
  SiFirebase,
  SiNetlify,
  SiPostman,
  SiJetbrains     
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiVisualstudio } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa6"; // ✅ Default fallback icon

// Lowercase lookup map
const TECH_ICON_MAP = {
  // --- Frameworks ---
  react: { icon: FaReact, color: "#61DAFB" },
  node: { icon: FaNodeJs, color: "#339933" },
  tailwind: { icon: SiTailwindcss, color: "#38B2AC" },
  flask: { icon: SiFlask, color: "#000000" },
  fastapi: { icon: SiFastapi, color: "#009688" },
  selenium: { icon: SiSelenium, color: "#9ca79aff" },

  // --- Languages ---
  python: { icon: FaPython, color: "#FFD43B" },
  java: { icon: FaJava, color: "#007396" },
  php: { icon: FaPhp, color: "#777BB4" },
  javascript: { icon: FaJsSquare, color: "#F7DF1E" },
  html: { icon: FaHtml5, color: "#E34F26" },
  css: { icon: FaCss3Alt, color: "#1572B6" },
  typescript: { icon: SiTypescript, color: "#3178C6" },

  // --- Platforms / Databases ---
  mongodb: { icon: SiMongodb, color: "#47A248" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  mysql: { icon: GrMysql, color: "#4479A1" },
  firebase: { icon: SiFirebase, color: "#ee4a0eff" },
  netlify: { icon: SiNetlify, color: "#00C7B7" },
  docker: { icon: FaDocker, color: "#2496ED" },
  aws: { icon: FaAws, color: "#FF9900" },
  azure: { icon: VscAzure, color: "#0089D6" },

  // --- Tools ---
  postman: { icon: SiPostman, color: "#FF6C37" },
  git: { icon: FaGitAlt, color: "#F1502F" },
  github: { icon: FaGithub, color: "#ffffff" },
  gitlab: { icon: FaGitlab, color: "#FC6D26" },
  bitbucket: { icon: FaBitbucket, color: "#2684FF" },
  linux: { icon: FaLinux, color: "#000000" },
  figma: { icon: FaFigma, color: "#f21e93ff" },
  "visualstudio": { icon: DiVisualstudio, color: "#5C2D91" },
  "vscode": { icon: BiLogoVisualStudio, color: "#007ACC" },
  jetbrains: { icon: SiJetbrains, color: "#000000" },

  // --- Misc / Extras ---
  nextjs: { icon: SiNextdotjs, color: "#000000" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  redux: { icon: SiRedux, color: "#764ABC" },

  // --- Default fallback ---
  default: { icon: FaLaptopCode, color: "#A0AEC0" },
};

const Skills = ({ skillsData }) => {
  // Track which categories are selected (empty array = show all)
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Normalize skills array (regardless of key name)
  const getSkillsArray = (categoryObj) => {
    const keys = Object.keys(categoryObj).filter((k) => k !== "id");
    return categoryObj[keys[0]] || [];
  };

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(categoryId);
      
      if (isSelected) {
        // Don't allow deselecting if it's the only one selected
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Get all skills to display based on selection
  const getDisplayedSkills = () => {
    // If no categories selected, show all
    if (selectedCategories.length === 0) {
      return skillsData.flatMap((category) => 
        getSkillsArray(category).map(skill => ({ skill, categoryId: category.id }))
      );
    }
    
    // Otherwise show only selected categories
    return skillsData
      .filter((category) => selectedCategories.includes(category.id))
      .flatMap((category) => 
        getSkillsArray(category).map(skill => ({ skill, categoryId: category.id }))
      );
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-white"
      id="skills"
    >
      {/* Category Buttons */}
      <div className="flex w-full max-w-3xl h-12 mb-6 gap-4">
        {skillsData.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const isOnlySelected = selectedCategories.length === 1 && isSelected;
          
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              disabled={isOnlySelected}
              className={`cursor-pointer flex-1 py-2 rounded-lg transition font-medium
                ${
                  isSelected
                    ? "bg-gradient-to-b from-[#323440] to-[#1C1D23]"
                    : selectedCategories.length === 0
                    ? "bg-gradient-to-b from-[#323440] to-[#1C1D23] opacity-70"
                    : "bg-[#1C1D23]/60 hover:bg-[#323440]/60"
                }
                ${isOnlySelected ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
            </button>
          );
        })}
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
          {getDisplayedSkills().map(({ skill, categoryId }, index) => {
            const key = skill.toLowerCase().replace(/\s|[().#+]/g, "");
            const tech = TECH_ICON_MAP[key] || {
              icon: FaLaptopCode, // ✅ fallback
              color: "#9CA3AF",
            };
            const Icon = tech.icon;

            return (
              <div
                key={`${categoryId}-${skill}-${index}`}
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