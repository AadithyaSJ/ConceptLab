import { useParams } from 'react-router-dom';
import lawsData from '../data/lawsData';
import LawInfoCard from '../components/LawInfoCard';
import QuizStartButton from '../components/QuizStartButton';
import SimulationComponents from '../components/simulations';

import { motion } from 'framer-motion';

// Basic fade and slide animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function LawDetail() {
  const { id } = useParams();
  const law = lawsData[id];
  const SimulationComponent = SimulationComponents?.[law?.component];

  if (!law) return <div className="text-red-500 text-center py-8">Law not found</div>;

  return (
    <motion.div
      className="flex flex-col items-center w-full mt-20 px-4 py-6 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Info + Simulation Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 justify-center">
        
        {/* Law Info */}
        <motion.div className="w-full md:w-1/2" variants={childVariants}>
          <LawInfoCard law={law} />
        </motion.div>

        {/* Simulation */}
        <motion.div className="w-full md:w-1/2" variants={childVariants}>
          {SimulationComponent ? (
            <div className="rounded-2xl shadow-xl backdrop-blur-md bg-white/5 border border-white/10 text-white w-full h-full">
              <SimulationComponent />
            </div>
          ) : (
            <p className="text-center text-gray-500">Simulation not available.</p>
          )}
        </motion.div>
      </div>

      {/* Quiz Button */}
      <motion.div variants={childVariants}>
        <QuizStartButton lawId={id} />
      </motion.div>
    </motion.div>
  );
}
