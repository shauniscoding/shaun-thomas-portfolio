import React, { useState, useMemo } from "react";

const Experience = ({ workData, educationData }) => {
  const [selected, setSelected] = useState("work");
  const [selectedData, setSelectedData] = useState(workData);

  // Function to sort data based on "Present" and descending date order
  const sortedData = useMemo(() => {
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date(0);
      if (dateStr.toLowerCase().includes("present")) return new Date(9999, 0, 1);
      return new Date(dateStr);
    };

    return [...selectedData].sort((a, b) => {
      const dateA = parseDate(a.endDate);
      const dateB = parseDate(b.endDate);
      return dateB - dateA; // Descending (newest first)
    });
  }, [selectedData]);

  return (
    <div
      className="w-full max-w-[900px] mx-auto px-4 py-12 text-white"
      id="experience"
    >
      {/* Top Buttons */}
      <div className="flex w-full h-12 mb-6 gap-4">
        <button
          onClick={() => {
            setSelected("work");
            setSelectedData(workData);
          }}
          className={`cursor-pointer flex-1 py-2 rounded-lg font-medium transition
            ${
              selected === "work"
                ? "bg-gradient-to-b from-[#323440] to-[#1C1D23]"
                : "bg-[#1C1D23]/60 hover:bg-[#323440]/60"
            }`}
        >
          Work
        </button>
        <button
          onClick={() => {
            setSelected("education");
            setSelectedData(educationData);
          }}
          className={`cursor-pointer flex-1 py-2 rounded-lg font-medium transition
            ${
              selected === "education"
                ? "bg-gradient-to-b from-[#323440] to-[#1C1D23]"
                : "bg-[#1C1D23]/60 hover:bg-[#323440]/60"
            }`}
        >
          Education
        </button>
      </div>

      {/* Text Container */}
      <div
        className="relative w-full h-[400px] flex flex-col items-center justify-start
                   rounded-2xl p-4 overflow-y-auto 
                   bg-gradient-to-b from-[#323440] to-[#1C1D23]
                   shadow-lg backdrop-blur-sm"
      >
        {sortedData.map((experience, index) => (
          <div
            key={index}
            className="group flex flex-col sm:flex-row p-4 w-full rounded-xl 
                       bg-gradient-to-b from-[#2C2E38] to-[#1C1D23]
                       shadow-md mb-4 transform transition-all duration-300
                       hover:scale-[1.02] hover:shadow-[0_0_8px_rgba(96,165,250,0.3)]"
          >
            {/* Image */}
            <img
              src={experience.image}
              alt={experience.organization}
              className="w-16 h-16 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4
                         bg-[#1C1D23] p-1 border border-[#323440]"
            />

            {/* Job/School Info */}
            <div className="flex flex-col transition-colors duration-300 group-hover:text-blue-400">
              <p className="text-sm text-gray-400 sm:text-left group-hover:text-blue-300">
                {experience.startDate} – {experience.endDate}
              </p>
              <h2 className="text-xl font-semibold sm:text-left">
                {experience.title}
              </h2>
              <h3 className="text-md text-gray-300 sm:text-left">
                {experience.organization}
              </h3>
              <p className="text-sm mt-2 sm:text-left text-gray-200">
                {experience.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
