import React from "react";
import Hero from "../components/Hero";
import { Link, useNavigate } from "react-router-dom";
import lawsData from "../data/lawsData";
import { fadeIn } from "../utils/motion";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Contact from '../components/Contact';
import { StarsCanvas } from "../components/canvas";

// Assume this boolean comes from user context/auth state
const isUserLoggedIn = false;

const MotionCard = ({ index, title, desc }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.6)}>
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.05}
      transitionSpeed={500}
      className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-cyan-500/30 hover:border-fuchsia-500/80 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
    >
      <h3 className="text-lg font-bold text-yellow-200 mb-2">{title}</h3>
      <p className="text-white/85 text-sm">{desc}</p>
    </Tilt>
  </motion.div>
);

const LawCardPreview = ({ index, law }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.6)}>
    <Link to={`/laws/${index}`}>
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1.05}
        transitionSpeed={500}
        className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-cyan-500/30 hover:border-yellow-400 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
      >
        <h3 className="text-lg font-bold text-purple-300">{law.name}</h3>
        <p className="text-white/85 text-sm mt-1">{law.formula}</p>
      </Tilt>
    </Link>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();

  const handleQuizAccess = () => {
    if (!isUserLoggedIn) {
      alert("Please register or log in to access the quiz.");
      navigate("/register"); // Redirect to your register/login page
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="flex flex-col bg-primary min-h-screen text-white">
      
      {/* Hero Section with motion */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 px-6 sm:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-12 text-yellow-300"
          >
            Why Use This Platform?
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } },
            }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Interactive Simulations",
                desc: "Experience laws in action through immersive 3D and VR experiences.",
              },
              {
                title: "AI-Based Quizzes",
                desc: "Test your understanding with smart adaptive quizzes.",
              },
              {
                title: "Progress Tracking",
                desc: "Monitor your learning journey and revisit any law anytime.",
              },
            ].map((item, i) => (
              <MotionCard key={i} index={i} title={item.title} desc={item.desc} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Laws Section */}
      <section className="py-20 px-6 sm:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-12 text-fuchsia-300"
          >
            Popular Scientific Laws
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {lawsData.slice(0, 3).map((law, index) => (
              <LawCardPreview key={index} index={index} law={law} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/laws"
              className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium shadow-md transition"
            >
              View All Laws
            </Link>
          </div>
        </div>
      </section>

      <div id="contact" className='relative z-0'>
        <Contact/>
        <StarsCanvas/>
      </div>
    </div>
  );
};

export default Home;
