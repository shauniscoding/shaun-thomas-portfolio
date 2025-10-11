import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import shaun from '../src/assets/shaun-placeholder.jpg';
import shaun from '../src/assets/shaun.jpg';
import DonutHead from "./DonutHead";
import { FaLocationDot, FaLinkedin } from "react-icons/fa6";
import { FaFileDownload, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const shaun_name = "<Shaun Thomas/>";

const roles = [
  { text: "Software Engineer", color: "text-blue-300" },
  { text: "Fullstack Developer", color: "text-red-400" },
  { text: "UFC Enthusiast", color: "text-red-400" },
];

const About = () => {
  const [showRoles, setShowRoles] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    // Animate roles one by one
    roles.forEach((role, idx) => {
      setTimeout(() => {
        setShowRoles(prev => [...prev, role]);
      }, 800 * (idx + 1));
    });
    // Show about paragraph after all roles finish
    setTimeout(() => setShowAbout(true), 800 * (roles.length + 1));
  }, []);

  // Ensure a space between Shaun and Thomas
  const formattedName = shaun_name.replace("ShaunThomas", "Shaun Thomas");

  return (
    <div className="flex flex-col justify-center w-full px-4 mt-20 sm:mt-6 md:mt-10 lg:mt-0">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-10 justify-center text-center md:text-left">
      {/* Left: Image + Location */}
      <div className="flex flex-col items-center md:items-start">
        <div className="flex flex-col items-center md:items-start">
          {/* Wrapper so we can control layout better */}
          <div className="flex flex-col items-center md:items-center">
            <img
              src={shaun}
              alt="Shaun Thomas"
              className="w-28 h-28 rounded-full object-cover"
            />
            {/* Location section: image centered above this text/icon */}
            <div className="flex items-center justify-center md:justify-start mt-2">
              <FaLocationDot className="text-yellow-200 text-sm mr-2" />
              <span className="text-yellow-200 text-lg">Sacramento, CA</span>
            </div>
          </div>
        </div>
      </div>


        {/* Right: Greeting */}
        <div className="flex flex-col justify-end">
          {/* Hello There */}
          <h1 className="text-3xl md:text-4xl font-bold text-white cursor-pointer mb-1">
            Hello There, 👋
          </h1>

          {/* Name Animation */}
          <h1 className="font-bold mt-1 whitespace-nowrap flex flex-wrap text-3xl md:text-6xl">
            <span className="text-white mr-2">I'm</span>
            {shaun_name.split("").map((char, idx) => (
              <motion.span
                key={idx}
                className={char === " " ? "mx-1" : "text-green-500"}
                initial={{ rotateY: 360, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

         {/* Roles Animation (same line, tighter spacing) */}
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-1 text-[12px] sm:text-base md:text-lg text-gray-400">
            {showRoles.map((role, idx) => (
              <motion.span
                key={role.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <span className={`${role.color}`}>{role.text}</span>
                {idx < showRoles.length - 1 && <span className="mx-1">·</span>}
              </motion.span>
            ))}
          </div>

        </div>
      </div>

      {/* Reserve space for About paragraph to prevent layout shift */}
      <div className="min-h-[100px] mt-6 flex flex-col justify-center items-center">
        {showAbout && (
          <motion.p
            className="text-center max-w-4xl text-white leading-relaxed inconsolata-light text-lg sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            I’m a software engineer who enjoys solving complex problems and building
            innovative projects that make a real impact.
          </motion.p>
        )}
      </div>

      {/* Social / Links */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <a
          href="https://www.linkedin.com/in/shaunthomas2025"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/shauniscoding"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3 bg-gray-800 text-white rounded-full shadow hover:bg-gray-900 transition"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="mailto:your.email@example.com"
          className="relative group p-3 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
        >
          <MdEmail size={24} />
        </a>
        <a
          href="/shaun_thomas_resume_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
        >
          <FaFileDownload size={24} />
        </a>
      </div>

      {/* Centered DonutHead */}
      <div className="flex justify-center mt-8">
        <DonutHead />
      </div>
    </div>
  );
};

export default About;
