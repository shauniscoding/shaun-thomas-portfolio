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
import { FourSquare } from "react-loading-indicators"

//loading icon website for more interesting options later
// https://react-loading-indicators.netlify.app/

function App() {
  const [educationData, setEducationData] = useState(null)
  const [workData, setWorkData] = useState(null)
  const [projectData, setProjectData] = useState(null)
  const [skillsData, setSkillsData] = useState(null)
  
  //Get firebasedb info 
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

      const skillsRef = collection(db, "skills");
      const snapshotSkills = await getDocs(skillsRef);
      const skills = snapshotSkills.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkillsData(skills)
    }

    getData();
 
  }, []);


  if (!educationData || !workData || !projectData || !skillsData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        {/* Optional: background color to hide body */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Navbar />

          {/* Loading icon in center */}
          <div className="flex items-center justify-center min-h-[60vh]">
            <FourSquare color="#17f573ff" size="large" text="" textColor="#48bb78" />
          </div>
        </div>
      </div>
    );
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
          <Skills skillsData={skillsData} />

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
