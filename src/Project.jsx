import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub, FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";

// Map tech names to icons
const techIcons = {
  react: <FaReact className="text-sky-400 text-lg" />,
  node: <FaNodeJs className="text-green-600 text-lg" />,
  python: <FaPython className="text-yellow-500 text-lg" />,
  html: <FaHtml5 className="text-orange-600 text-lg" />,
  css: <FaCss3Alt className="text-blue-500 text-lg" />,
  javascript: <FaJsSquare className="text-yellow-400 text-lg" />,
};

const Project = ({ name, description, link, github, techstack, image }) => {
  return (
    <div className="bg-gradient-to-b from-[#14151A] to-[#1C1D23] text-white rounded-2xl shadow-lg overflow-hidden max-w-xs hover:shadow-xl transition-shadow pt-6 border border-gray-600">
      {/* Image */}
      <div className="relative">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-5/6 h-45 object-cover rounded-lg border border-gray-500 mx-auto block"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="flex gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition"
              >
                <FaGithub size={18} />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-300 text-sm mt-2">{description}</p>

        {/* Tech stack */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {techstack?.map((tech, index) => (
            <div key={index}>{techIcons[tech.toLowerCase()] || null}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
