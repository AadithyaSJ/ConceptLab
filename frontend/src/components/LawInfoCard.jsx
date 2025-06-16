import React from "react";
import Title2 from "./Title2";

const LawInfoCard = ({ law }) => {
  if (!law) return null;

  const { name, formula, passage1, passage2 } = law;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/5 border border-white/10 text-white font-sans">
      
      {/* Title */}
      <Title2 title={name}/>

      {/* First Passage */}
      <p
        className="text-sm sm:text-base md:text-lg text-blue-100 mb-4 text-justify leading-relaxed tracking-wide"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {passage1}
      </p>

      {/* Formula */}
      <div
        className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-green-300 bg-white/10 backdrop-blur-sm p-4 rounded-md shadow-inner border border-green-500/30 font-mono"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {formula}
      </div>

      {/* Second Passage */}
      <p
        className="text-sm sm:text-base md:text-lg text-blue-100 mt-4 text-justify leading-relaxed tracking-wide"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {passage2}
      </p>
    </div>
  );
};

export default LawInfoCard;
