import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import Title from "../../Title";
import Title2 from "../../Title2";
import TreeModel from "./TreeModel";
        

const Apple = ({ shouldFall, resetKey }) => {
  const ref = useRef();
  const [falling, setFalling] = useState(false);
  const [position, setPosition] = useState([0, 6, 10]);

  useEffect(() => {
    if (shouldFall) setFalling(true);
  }, [shouldFall]);

  useFrame((_, delta) => {
    if (falling && ref.current) {
      const y = ref.current.position.y;
      if (y > 0.5) {
        const newY = Math.max(0.5, y - delta * 4);
        ref.current.position.set(0, newY, 10);
      } else {
        setFalling(false);
      }
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#5BC34A" />
    </mesh>
  );
};

const FallingAppleScene = () => {
  const [shouldFall, setShouldFall] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 space-y-8 text-white font-sans">
      
      {/* Title */}
      <Title2 title={'Simulation:'}/>
      <Title text1={'Apple Drop'}/>

      {/* Simulation Container */}
      <div className="w-full max-w-4xl h-[325px] rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 overflow-hidden shadow-lg">
        <Canvas shadows camera={{ position: [0, 30, 70], fov: 17 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} castShadow />
          <OrbitControls />
          <Physics gravity={[0, -9.81, 0]}>
            <Ground />
            <TreeModel
              scale={2}
              position={[-1.8, 0, 10]}
              rotation={[0, 90, 0]}
            />
            <Apple key={resetKey} shouldFall={shouldFall} />
          </Physics>
        </Canvas>
      </div>

      {/* HUD + Controls */}
      <div className="w-full max-w-3xl flex flex-col lg:flex-row items-start justify-center gap-6">
        
        <div className="p-6 bg-white/5 border border-cyan-300/20 backdrop-blur-md rounded-2xl shadow-lg text-sm text-white flex-1 space-y-4 relative overflow-hidden">
          {/* Glow Accent */}
          <div className="absolute -top-1 -left-1 w-1/3 h-1/3 bg-cyan-300/10 rounded-full blur-2xl z-0 animate-pulse" />
          
          {/* Content */}
          <div className="relative z-10 space-y-3">
            <p className="text-base leading-relaxed tracking-wide">
              <span className="font-semibold text-cyan-300">Status:</span>{" "}
              {shouldFall ? (
                <span className="text-yellow-200">
                  Tree was shaken. Apple is falling due to gravity.
                </span>
              ) : (
                <span className="text-blue-200">Apple is still on the tree.</span>
              )}
            </p>

            <p className="text-base leading-relaxed tracking-wide text-blue-100">
              <span className="font-semibold text-cyan-300">Concept:</span> An object at rest stays at rest unless acted upon by an external force. Shaking the tree applies a force, making the apple fall — illustrating <span className="text-orange-300 font-semibold">Newton’s First Law</span>.
            </p>
          </div>
        </div>


        <div className="flex flex-col gap-4 w-full lg:w-auto">
          {/* Drop Button */}
          <button
            onClick={() => setShouldFall(true)}
            className="relative inline-flex items-center justify-center px-6 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-300 rounded-lg shadow-lg transition duration-300 ease-in-out hover:from-yellow-300 hover:to-yellow-500 hover:scale-105 hover:shadow-yellow-400/50 group"
          >
            <span className="absolute inset-0 w-full h-full bg-yellow-100 opacity-10 rounded-lg blur-md group-hover:opacity-20 transition duration-300" />
            Drop the Apple
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              setShouldFall(false);
              setResetKey((prev) => prev + 1);
            }}
            className="relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-pink-500/40 group"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-10 rounded-lg blur-md group-hover:opacity-20 transition duration-300" />
            Reset
          </button>
        </div>

      </div>
    </div>
  );
};

export default FallingAppleScene;
