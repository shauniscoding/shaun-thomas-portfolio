import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import About from './About'
import Experience from './Experience'
import Skills from './Skills'
import Project from './Project'
import StarWars from './Starwars'
import DonutHead from './DonutHead'
import './App.css'
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


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
  Frontend: [
    { name: "React", key: "react" },
    { name: "Next.js", key: "nextjs" },
    { name: "TypeScript", key: "typescript" },
    { name: "JavaScript (ES6+)", key: "javascript" },
    { name: "HTML5", key: "html" },
    { name: "CSS3 / SCSS", key: "css" },
    { name: "TailwindCSS", key: "tailwind" },
    { name: "Redux", key: "redux" },
  ],
  Backend: [
    { name: "Node.js", key: "node" },
    { name: "Python (Django / Flask)", key: "python" },
    { name: "Java (Spring Boot)", key: "java" },
    { name: "PHP", key: "php" },
    { name: "GraphQL", key: "graphql" },
  ],
  "Database/Cloud": [
    { name: "PostgreSQL", key: "postgresql" },
    { name: "MongoDB", key: "mongodb" },
    { name: "Docker", key: "docker" },
  ],
  WorkFlow: [
    { name: "Git / GitHub", key: "git" },
    { name: "CI/CD (Jenkins, Actions)", key: "git" },
  ],
};


const dummyProjects = [
  {
    "name": "Portfolio Website",
    "description": "A modern portfolio website showcasing my projects and skills. fvsdf vsdfv sdfvsd fvsdfv sdfvs dfvsdfvs dfvsdv sdfv",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/placholder.jpg",
    "techstack": ["React", "CSS", "JavaScript"]
  },
  {
    "name": "E-commerce App",
    "description": "An online store with shopping cart and payment integration.",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/placholder.jpg",
    "techstack": ["React", "Node", "MongoDB"]
  },
  {
    "name": "Blog Platform",
    "description": "A blogging platform with user authentication and rich-text editing.",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/placholder.jpg",
    "techstack": ["NextJS", "Tailwind", "GraphQL"]
  },
  {
    "name": "Chat App",
    "description": "Real-time chat application with WebSocket support.",
    "link": "https://example.com",
    "github": "https://example.com",
    "image": "/placholder.jpg",
    "techstack": ["React", "Node", "Socket.io"]
  }
]


function App() {
  const [educationData, setEducationData] = useState(null)
  const [workData, setWorkData] = useState(null)
  const [projectData, setProjectData] = useState(null)
  
  
  useEffect(() => {
    async function getData() {
      const educationRef = collection(db, "education");
      const snapshotEducation = await getDocs(educationRef);
      const education = snapshotEducation.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEducationData(education)

      const workRef = collection(db, "work");
      const snapshotWork = await getDocs(workRef);
      const work = snapshotWork.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkData(work)

      const projectRef = collection(db, "projects");
      const snapshotProject = await getDocs(projectRef);
      const project = snapshotProject.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjectData(project)
    }

    getData();
 
  }, []);


    // Optional: handle loading state
  if (!educationData || !workData || !projectData) {
    return <div>Loading data...</div>;
  }


  return (
    <div className="relative w-full min-h-screen">
      {/* StarWars Fullscreen Background */}
      {/* 
      <div className="fixed inset-0 -z-10">
        <StarWars 
          width={window.innerWidth} 
          height={window.innerHeight} 
          xwingModelPath="/models/xwing.glb" 
          tieFighterModelPath="/models/tiefighter.glb" 
        />
      </div>  
      */}

      {/* Content on top */}
      <div className="relative z-10">
        <Navbar />

        {/* Centered About Section (Full Screen Hero) */}
        <div className="flex items-center justify-center min-h-screen" id="about">
          <About />
        </div>

        {/* Rest of the content */}
        <div className="pt-15 max-w-[800px] mx-auto px-4 rounded-lg shadow-lg">

          <Experience workData={workData} educationData={educationData} />
                    
          {/* Update this component to at first have all skills, then when clicking on buttons, highlgigths what is selected and unseletecete */}
          <Skills skillsData={dummySkills} />

          {/* Projects Section */}
          <div className="mt-10 text-center" id="projects">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="flex flex-wrap gap-6 justify-start">
              {projectData.map((project, index) => (
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

      </div>
    </div>
  );
}

export default App
