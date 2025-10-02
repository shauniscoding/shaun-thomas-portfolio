import React, { useState } from "react";

const Experience = ({ workData, educationData }) => {
  const [selected, setSelected] = useState("work");
  const [selectedData, setSelectedData] = useState(workData);

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 py-12" id="experience">
      {/* Top Buttons */}
      <div className="flex w-full h-12 mb-6 gap-4">
        <button
          onClick={() => {
            setSelected("work");
            setSelectedData(workData);
          }}
          className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition ${
            selected === "work"
              ? "bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Work
        </button>
        <button
          onClick={() => {
            setSelected("education");
            setSelectedData(educationData);
          }}
          className={`cursor-pointer flex-1 text-white py-2 rounded-lg transition ${
            selected === "education"
              ? "bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Education
        </button>
      </div>

      {/* Text Container */}
      <div className="relative w-full h-[400px] flex flex-col items-center justify-start rounded-lg p-4 overflow-y-auto bg-gray-800/60">
        {selectedData.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row p-4 w-full"
          >
            {/* Image */}
            <img
              src={experience.image}
              alt={experience.organization}
              className="w-16 h-16 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 bg-gray-700 p-1"
            />

            {/* Job/School Info */}
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 sm:text-left">
                {experience.startDate} - {experience.endDate}
              </p>
              <h2 className="text-xl font-semibold sm:text-left">
                {experience.title}
              </h2>
              <h3 className="text-md text-gray-300 sm:text-left">
                {experience.organization}
              </h3>
              <p className="text-sm mt-2 sm:text-left">{experience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
