import React, { useState } from "react";
import { FaReact } from "react-icons/fa";

const iconMap = {
  FaReact: FaReact,
};

const Skills = ({skillsData}) => {
  const [selected, setSelected] = useState("Frontend");
  const [selectedData, setSelectedData] = useState(skillsData["Frontend"])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Top Buttons */}
      <div className="flex w-full max-w-3xl h-12 mb-6 gap-4">
        <button onClick={() => {setSelected("Frontend");  setSelectedData(skillsData["Frontend"]);}}
            className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition ${
            selected === "Frontend"
              ? "border-2 border-white bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Frontend
        </button>
        <button
          onClick={() => {setSelected("Backend"); setSelectedData(skillsData["Backend"])}}
          className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition ${
            selected === "Backend"
              ? "border-2 border-white bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Backend
        </button>
        <button
          onClick={() => {setSelected("Database/Cloud"); setSelectedData(skillsData["Database/Cloud"])}}
          className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition ${
            selected === "Database/Cloud"
              ? "border-2 border-white bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Database/Cloud
        </button>
        <button
          onClick={() => {setSelected("WorkFlow"); setSelectedData(skillsData["WorkFlow"])}}
          className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition ${
            selected === "WorkFlow"
              ? "border-2 border-white bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          WorkFlow
        </button>
      </div>

        {/* Skills section */}
        <div className="relative w-full max-w-3xl h-[400px] border-2 border-white grid [grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))] gap-4 justify-items-center content-start rounded-lg p-4 overflow-y-scroll">
        {selectedData.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            return (
            <div
                key={index}
                className="group flex flex-col items-center justify-center w-40 h-40 border border-white rounded-xl transition-all duration-300 cursor-pointer hover:border-[var(--hover-color)]"
                style={{ "--hover-color": skill.color }}
            >
                <Icon
                size={55}
                className="mb-2 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                />
                <span className="text-sm text-center transition-colors duration-300 group-hover:text-[var(--hover-color)]">
                {skill.name}
                </span>
            </div>
            );
        })}
        </div>





    </div>
  );
};

export default Skills;
