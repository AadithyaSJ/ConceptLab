import React from "react";

const LawInfoCard = ({ law }) => {
  if (!law) return null;

  const { name, formula, passage1, passage2 } = law;
  console.log(law);
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-4">
        {name}
      </h2>

      {/* First Passage */}
      <p className="text-sm md:text-base text-gray-700 mb-4 text-justify leading-relaxed">
        {passage1}
      </p>

      {/* Formula */}
      <div className="text-lg md:text-xl font-semibold text-center text-red-600 bg-gray-100 p-3 rounded-md shadow-sm mb-4">
        {formula}
      </div>

      {/* Second Passage */}
      <p className="text-sm md:text-base text-gray-700 text-justify leading-relaxed">
        {passage2}
      </p>
    </div>
  );
};

export default LawInfoCard;
