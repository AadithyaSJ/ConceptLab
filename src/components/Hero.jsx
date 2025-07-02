import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "/hero.png";
import logoImg from "/logo.png"; // Logo image

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center  px-8 sm:px-16 py-20 text-white overflow-hidden">

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 text-center md:text-left z-10"
      >
        {/* Brand Logo + Name */}
        <div className="flex items-center justify-center md:justify-start mb-6 gap-3">
          <img
            src={logoImg}
            alt="ConceptLab Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-wide font-orbitron">
            Concept<span className="text-yellow-300">Lab</span>
          </h1>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 drop-shadow mb-4 font-bebas">
          Explore Science Through Simulations
        </h1>

        <p className="text-white/80 text-lg sm:text-xl max-w-xl mb-6 font-bebas">
          Dive into interactive experiments and understand scientific laws like never before — visually, intuitively, and engagingly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/laws"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
          >
            Explore Laws
          </Link>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="md:w-1/2 mb-10 md:mb-0 z-10"
      >
        <img
          src={heroImg}
          alt="Astronaut floating"
          className="w-full max-w-md mx-auto md:max-w-lg drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]"
        />
      </motion.div>

      {/* Background Blur Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl top-0 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl bottom-0 -right-28 animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default Hero;
