import { useState } from 'react'
import Navbar from './Navbar'
import About from './About'
import Experience from './Experience'
import './App.css'


const dummyDataWork = [
  {
    image: "/public/vite.svg",
    startDate: "Jun. 2021",
    endDate: "Aug. 2022",
    organization: "TechNova Solutions",
    title: "Frontend Developer",
    description:
      "Developed responsive web applications using React and integrated REST APIs to deliver dynamic data-driven features. Collaborated with designers to improve UI/UX consistency across products.",
  },
  {
    image: "/public/vite.svg",
    startDate: "Sep. 2022",
    endDate: "Dec. 2023",
    organization: "CodeWave Labs",
    title: "Full Stack Developer",
    description:
      "Built and maintained full-stack web apps using React, Node.js, and MongoDB. Implemented authentication systems, optimized queries for performance, and led a small team of junior developers.",
  },
  {
    image: "/public/vite.svg",
    startDate: "Jan. 2024",
    endDate: "Present",
    organization: "NextGen AI",
    title: "Software Engineer",
    description:
      "Working on AI-powered tools and scalable backend services. Contributing to system architecture, developing new features, and optimizing cloud infrastructure for reliability and cost efficiency.",
  },
];

const dummyDataEducation = [
  {
    image: "/public/vite.svg", // replace with your school logo if you have one
    startDate: "Aug. 2019",
    endDate: "May 2023",
    organization: "State University",
    title: "Bachelor of Science in Computer Science",
    description:
      "Focused on software engineering, algorithms, and machine learning. Actively participated in hackathons, research projects, and the university coding club. Graduated with honors.",
  },
];

function App() {

  return (
    <>
      <Navbar/>
       <div className="pt-15">
        <About/>
        <Experience workData={dummyDataWork} educationData={dummyDataEducation}/>
      </div>
    </>
  )
}

export default App
