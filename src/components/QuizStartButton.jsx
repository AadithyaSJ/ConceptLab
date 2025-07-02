import React from "react";
import { useNavigate } from "react-router-dom";

const StartQuizButton = ({ lawId }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/quiz/${lawId}`);
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base font-semibold rounded-xl shadow-md transition duration-300"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartQuizButton;
