import React from "react";

const laws = [
  { title: "Newton’s First Law", description: "Law of Inertia" },
  { title: "Newton’s Second Law", description: "F = ma" },
  { title: "Newton’s Third Law", description: "Every action has an equal and opposite reaction" },
  { title: "Ohm’s Law", description: "V = IR" },
  { title: "Archimedes’ Principle", description: "Upthrust is equal to the weight of displaced fluid" },
  { title: "Hooke’s Law", description: "F = -kx" },
  { title: "Snell’s Law", description: "n1·sinθ1 = n2·sinθ2" },
  { title: "Law of Reflection", description: "Angle of incidence = Angle of reflection" },
  { title: "Boyle’s Law", description: "P1V1 = P2V2 (at constant temperature)" },
  { title: "Faraday’s Law", description: "Induced EMF is proportional to the rate of change of magnetic flux" },
];

const LawsList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        List of Scientific Laws
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {laws.map((law, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-purple-700">{law.title}</h2>
            <p className="text-gray-700 mt-2">{law.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawsList;
