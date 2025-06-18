import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
      <div className="max-w-3xl">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-4xl font-bold text-white">
            AI Science Project Stimulator
          </h1>
        </div>

        <p className="text-lg text-gray-600 mb-6">
          Explore, simulate, and learn AI-driven science experiments. Designed
          for curious minds and future innovators.
        </p>

        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-2xl hover:bg-purple-700 transition">
            Get Started
          </button>
          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-2xl hover:bg-purple-100 transition">
            Learn More
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2721/2721283.png"
            alt="AI Science Illustration"
            className="w-64 h-64 animate-fade-in rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;