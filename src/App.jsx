import { useState } from 'react'
import Navbar from './Navbar'
import About from './About'
import Experience from './Experience'
import Skills from './Skills'
import Project from './Project'
import StarWars from './Starwars'
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

const dummySkills = {
  "Frontend": [
    { "name": "React", "icon": "FaReact", "color": "#61DAFB" },
    { "name": "Vue.js", "icon": "FaReact", "color": "#42B883" },
    { "name": "Next.js", "icon": "FaReact", "color": "#000000" },
    { "name": "TypeScript", "icon": "FaReact", "color": "#3178C6" },
    { "name": "JavaScript (ES6+)", "icon": "FaReact", "color": "#F7DF1E" },
    { "name": "HTML5", "icon": "FaReact", "color": "#E34F26" },
    { "name": "CSS3 / SCSS", "icon": "FaReact", "color": "#1572B6" },
    { "name": "TailwindCSS", "icon": "FaReact", "color": "#38B2AC" },
    { "name": "Bootstrap", "icon": "FaReact", "color": "#7952B3" }
  ],
  "Backend": [
    { "name": "Node.js", "icon": "FaReact", "color": "#339933" },
    { "name": "Express.js", "icon": "FaReact", "color": "#000000" },
    { "name": "Django", "icon": "FaReact", "color": "#092E20" },
    { "name": "Flask", "icon": "FaReact", "color": "#000000" },
    { "name": "Java (Spring Boot)", "icon": "FaReact", "color": "#6DB33F" },
    { "name": "C# (.NET Core)", "icon": "FaReact", "color": "#239120" },
    { "name": "GraphQL", "icon": "FaReact", "color": "#E10098" },
    { "name": "REST API design", "icon": "FaReact", "color": "#333333" }
  ],
  "Database/Cloud": [
    { "name": "PostgreSQL", "icon": "FaReact", "color": "#336791" },
    { "name": "MySQL", "icon": "FaReact", "color": "#4479A1" },
    { "name": "MongoDB", "icon": "FaReact", "color": "#47A248" },
    { "name": "SQLite", "icon": "FaReact", "color": "#003B57" },
    { "name": "Redis", "icon": "FaReact", "color": "#DC382D" },
    { "name": "Firebase", "icon": "FaReact", "color": "#FFCA28" },
    { "name": "Supabase", "icon": "FaReact", "color": "#3ECF8E" },
    { "name": "AWS (EC2, S3, Lambda)", "icon": "FaReact", "color": "#FF9900" },
    { "name": "Google Cloud", "icon": "FaReact", "color": "#4285F4" },
    { "name": "Docker", "icon": "FaReact", "color": "#2496ED" }
  ],
  "WorkFlow": [
    { "name": "Git / GitHub", "icon": "FaReact", "color": "#181717" },
    { "name": "CI/CD (GitHub Actions, Jenkins)", "icon": "FaReact", "color": "#D24939" },
    { "name": "Agile / Scrum", "icon": "FaReact", "color": "#0052CC" },
    { "name": "Jira", "icon": "FaReact", "color": "#0052CC" },
    { "name": "Trello", "icon": "FaReact", "color": "#0079BF" },
    { "name": "Figma (UI/UX collaboration)", "icon": "FaReact", "color": "#F24E1E" },
    { "name": "Notion", "icon": "FaReact", "color": "#000000" },
    { "name": "Slack / Discord", "icon": "FaReact", "color": "#4A154B" }
  ]
};

const dummyProjects = [
  {
    "name": "Portfolio Website",
    "description": "A modern portfolio website showcasing my projects and skills. fvsdf vsdfv sdfvsd fvsdfv sdfvs dfvsdfvs dfvsdv sdfv",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/vite.svg",
    "techstack": ["React", "CSS", "JavaScript"]
  },
  {
    "name": "E-commerce App",
    "description": "An online store with shopping cart and payment integration.",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/vite.svg",
    "techstack": ["React", "Node", "MongoDB"]
  },
  {
    "name": "Blog Platform",
    "description": "A blogging platform with user authentication and rich-text editing.",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/vite.svg",
    "techstack": ["NextJS", "Tailwind", "GraphQL"]
  },
  {
    "name": "Chat App",
    "description": "Real-time chat application with WebSocket support.",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/vite.svg",
    "techstack": ["React", "Node", "Socket.io"]
  }
]


function App() {

  return (
    <>
      <Navbar/>
       <div className="pt-15 max-w-[800px] mx-auto px-4 bg-gray-800">
          <About />
          <Experience workData={dummyDataWork} educationData={dummyDataEducation} />
          <Skills skillsData={dummySkills} />

          {/* Projects Section */}
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>

            <div className="flex flex-wrap gap-6 justify-center">
              {dummyProjects.map((project, index) => (
                <Project
                  key={index}
                  name={project.name}
                  description={project.description}
                  link={project.link}
                  github={project.github}
                  image={project.image}
                  techstack={project.techstack}
                />
              ))}
            </div>
          </div>
        </div>

    {/* <StarWars 
        width={1500} 
        height={1000} 
        xwingModelPath="/models/xwing.glb" 
        tieFighterModelPath='/models/tiefighter.glb'
      /> */}
    </>
  )
}

export default App
