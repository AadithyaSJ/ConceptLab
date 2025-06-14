import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import TreeModel from "./TreeModel";

const Apple = ({ shouldFall, resetKey }) => {
  const ref = useRef();
  const [falling, setFalling] = useState(false);
  const [position, setPosition] = useState([0, 6, 10]);
  

  useEffect(() => {
    if (shouldFall) {
      setFalling(true);
    }
    console.log
  }, [shouldFall]);

  useFrame((_, delta) => {
    if (falling && ref.current) {
      const y = ref.current.position.y;
      if (y > 0) {
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
    <div className="w-[700px] h-[500px] flex flex-col gap-4 items-center sm:items-start sm:p-4">
      <Canvas shadows camera={{ position: [0, 30, 70], fov: 17 } }>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} castShadow />
        <OrbitControls />
        <Physics gravity={[0, -9.81, 0]}>
          <Ground />
          <TreeModel scale={2} position={[-1.8, 0, 10]} rotation={[0, 90, 0]} /> {/* 👈 Adjust position */}
          <Apple key={resetKey} shouldFall={shouldFall} />
        </Physics>
      </Canvas>
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full max-w-5xl">
  {/* HUD / Control Panel */}
  <div className="p-4 bg-white rounded-md shadow-md text-sm text-gray-800 flex-1 space-y-2">
    <p>
      <strong>Status:</strong>{" "}
      {shouldFall
        ? "Tree was shaken. Apple is falling due to gravity."
        : "Apple is still on the tree."}
    </p>
    <p>
      <strong>Concept:</strong> An object at rest stays at rest unless acted
      upon by an external force. Shaking the tree applies a force, making the
      apple fall — illustrating Newton’s First Law.
    </p>
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-2 w-full lg:w-auto">
    <button
      onClick={() => setShouldFall(true)}
      className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
    >
      Drop the Apple
    </button>
    <button
      onClick={() => {
        setShouldFall(false);
        setResetKey((prev) => prev + 1);
      }}
      className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition"
    >
      Reset
    </button>
  </div>
</div>
   
    </div>
  );
};

export default FallingAppleScene;
