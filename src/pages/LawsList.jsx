import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, textVariant } from "../utils/motion";
import lawsData from "../data/lawsData";
import Title from "../components/Title";

// Entry animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const LawCard = ({ index, name, formula, id }) => {
  return (
    <motion.div variants={childVariants}>
      <Link to={`/laws/${id}`} className="block">
        <Tilt
          tiltMaxAngleX={20}
          tiltMaxAngleY={20}
          scale={1.05}
          transitionSpeed={600}
          className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-sky-400/30 hover:border-yellow-400 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.25)] hover:scale-[1.03]"
        >
          <h2 className="text-lg font-extrabold text-sky-300 drop-shadow-md">
            {name}
          </h2>
          <p className="text-sm text-white/90 mt-2 leading-snug tracking-wide">
            {formula}
          </p>
        </Tilt>
      </Link>
    </motion.div>
  );
};

const LawsList = () => {
  return (
    <motion.div
      className="min-h-screen p-8 sm:p-12 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={childVariants} className="text-center mb-12">
        <Title text1="Explore the Laws of Science" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {lawsData.map((law, index) => (
          <LawCard
            key={index}
            index={index}
            id={index}
            name={law.name}
            formula={law.formula}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LawsList;
