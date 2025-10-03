import React from "react";
import logo from '../src/assets/logo.png'
import shaun from '../src/assets/shaun-placeholder.jpg'
import DonutHead from "./DonutHead";
import { FaLocationDot, FaLinkedin } from "react-icons/fa6";
import { FaFileDownload, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const shaun_name = "<Shaun Thomas/>";

const About = () => {
  return (
    <div className="flex flex-col justify-center w-full px-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        {/* Left: Image + Location */}
        <div className="flex flex-col items-center">
          <img
            src={shaun}
            alt="Shaun Thomas"
            className="w-36 h-36 rounded-full object-cover"
          />
          <div className="flex items-center gap-2 mt-2">
            <FaLocationDot className="text-yellow-200 text-sm" />
            <h3 className="text-sm text-yellow-200">Placeholder, CA</h3>
          </div>
        </div>

        {/* Right: Greeting */}
<div className="flex flex-col justify-center text-left">
  {/* Hello There with hover meme */}
  <div className="relative group inline-block">
    <h1 className="text-4xl font-bold text-white cursor-pointer">
      Hello There, I'm 👋
    </h1>

    {/* Meme Image */}
    <img
      src="/" 
      alt="Meme"
      className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-64 h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg rounded-lg z-50"
    />
  </div>

  {/* Name */}
  <h1 className="font-bold mt-1">
    <span className="text-5xl text-white">I'm </span>
    <span className="text-7xl text-green-500">{shaun_name}</span>
  </h1>

  <h3 className="mt-1 text-sm text-gray-400">
    <span className="text-blue-300">Software Engineer</span> ·{" "}
    <span className="text-red-400">Fullstack Developer</span>
  </h3>
</div>

      </div>

      {/* About Paragraph */}
      <p className="mt-6 text-center max-w-2xl mx-auto text-white leading-relaxed inconsolata-light text-xl">
        I’m a software engineer who enjoys solving complex problems and building innovative projects that make a real impact.
      </p>

      {/* Social / Links */}
      <div className="flex justify-center gap-6 mt-6">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/shaunthomas2025"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          <FaLinkedin size={24} />
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition">
            LinkedIn
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/shauniscoding"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3 bg-gray-800 text-white rounded-full shadow hover:bg-gray-900 transition"
        >
          <FaGithub size={24} />
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition">
            GitHub
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:your.email@example.com"
          className="relative group p-3 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
        >
          <MdEmail size={24} />
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition">
            Email
          </span>
        </a>

        {/* Resume */}
        <a
          href="/shaun_thomas_resume_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
        >
          <FaFileDownload size={24} />
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition">
            Resume
          </span>
        </a>
      </div>

      <DonutHead />
    </div>
  );
};

export default About;
