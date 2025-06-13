import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

const Ground = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#888" />
    </mesh>
  );
};

const Wall = () => {
  const boxes = [];
  const rows = 3;
  const cols = 3;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      boxes.push(
        <Box
          key={`box-${i}-${j}`}
          position={[7, 0.5 + i * 1, -1 + j * 1]}
        />
      );
    }
  }
  return <>{boxes}</>;
};

const Box = ({ position }) => {
  const [ref] = useBox(() => ({ mass: 1, position,  }));
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ad343e" />
    </mesh>
  );
};

const Projectile = ({ mass, acceleration, fire }) => {
  const [ref, api] = useSphere(() => ({
    mass,
    position: [-10, 1, 0],
    args: [0.4],
  }));

  useEffect(() => {
    if (fire) {
      const force = mass * acceleration;
      api.velocity.set(force * 2, 0, 0); // velocity based on force
    }
  }, [fire]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Scene = ({ mass, acceleration, fireKey }) => {
  return (
    <Canvas shadows camera={{ position: [-10, 5, 15], fov: 60 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[-30, 10, 5]} intensity={1.2} />
      <OrbitControls />
      <Physics>
        <Ground />
        <Wall />
        <Projectile
          key={fireKey} // to remount and refire
          mass={mass}
          acceleration={acceleration}
          fire={true}
        />
      </Physics>
    </Canvas>
  );
};

const CannonScene = ({ mass, acceleration, key }) => {
  return (
    <div className="w-full h-[500px]">
      <Scene mass={mass} acceleration={acceleration} fireKey={key} />
    </div>
  );
};

export default CannonScene;