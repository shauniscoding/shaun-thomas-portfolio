import React, { useState } from "react";

const dummyData = [
  {
    image: "/assets/company1.png",
    startDate: "2021-06-01",
    endDate: "2022-08-15",
    company: "TechNova Solutions",
    jobTitle: "Frontend Developer",
    description:
      "Developed responsive web applications using React and integrated REST APIs to deliver dynamic data-driven features. Collaborated with designers to improve UI/UX consistency across products.",
  },
  {
    image: "/assets/company2.png",
    startDate: "2022-09-01",
    endDate: "2023-12-31",
    company: "CodeWave Labs",
    jobTitle: "Full Stack Developer",
    description:
      "Built and maintained full-stack web apps using React, Node.js, and MongoDB. Implemented authentication systems, optimized queries for performance, and led a small team of junior developers.",
  },
  {
    image: "/assets/company3.png",
    startDate: "2024-01-01",
    endDate: "Present",
    company: "NextGen AI",
    jobTitle: "Software Engineer",
    description:
      "Working on AI-powered tools and scalable backend services. Contributing to system architecture, developing new features, and optimizing cloud infrastructure for reliability and cost efficiency.",
  },
];

const Experience = () => {
  const [selected, setSelected] = useState("work");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Top Buttons */}
      <div className="flex w-full max-w-3xl h-12 mb-6 gap-4">
        <button
          onClick={() => setSelected("work")}
          className={`flex-1 text-white py-2 rounded-lg transition ${
            selected === "work"
              ? "border-2 border-white bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Work
        </button>
        <button
          onClick={() => setSelected("education")}
          className={`flex-1 text-white py-2 rounded-lg transition ${
            selected === "education"
              ? "border-2 border-white bg-gray-800"
              : "border border-transparent hover:bg-gray-700"
          }`}
        >
          Education
        </button>
      </div>

      {/* Text Container */}
      <div className="w-full max-w-3xl min-h-[400px] border-2 border-white flex items-center justify-center rounded-lg p-4">
        <p className="text-white text-center text-sm sm:text-base md:text-lg">
          {selected === "work"
            ? "Showing Work Experience..."
            : "Showing Education..."}
        </p>
      </div>
    </div>
  );
};

export default Experience;
