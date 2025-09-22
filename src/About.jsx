import React from "react";
import logo from '../src/assets/logo.png'
import shaun from '../src/assets/shaun-placeholder.jpg'
import { FaLocationDot, FaLinkedin  } from "react-icons/fa6";
import { FaFileDownload, FaGithub  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const shaun_name = "<Shaun Thomas/>"

const About = () =>  {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-8 justify-center">
              {/* Left: Img + Location */}
              <div className="flex flex-col items-center">
                <img
                  src={shaun}
                  alt="Logo"
                  className="w-29 h-29 rounded-full object-cover"
                />
                <div className="flex items-center gap-2 mt-2">
                  <FaLocationDot className="text-yellow-200 text-sm" />
                  <h3 className="text-sm text-yellow-200">Placeholder, CA</h3>
                </div>
              </div>

              {/* Right: Hello Section */}
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-white-800 text-left">Hello,👋</h1>
                <h1 className="text-5xl font-bold text-white-800 text-left">
                  I'm <span className="text-green-500">{shaun_name}</span>
                </h1>
                <h3 className="text-sm text-white-600 text-left">
                  <span className="text-blue-300">Software Engineer </span>
                 · 
                  <span className="text-red-400"> Fullstack Developer</span>
                 </h3>
              </div>
            </div>


            {/* about paragraph */}
            <p className="mt-6 text-center max-w-2xl mx-auto text-white-700 leading-relaxed">
              I enjoy creating innovative solutions through programming and problem-solving. 
              I thrive on tackling complex challenges, learning new technologies, 
              and building projects that combine creativity with functionality
            </p>

          {/* links */}
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

            {/* Resume Download */}
            <a
               href="/shaun_thomas_resume_2025.pdf"
               download="Shaun_Thomas_Resume_2025.pdf"
              className="relative group p-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
            >
              <FaFileDownload size={24} />
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition">
                Resume
              </span>
            </a>
          </div>

        </div>
    )

}

export default About;