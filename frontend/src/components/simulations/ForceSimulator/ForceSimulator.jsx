import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import ForceHUD from "./ForceHUD";
import CannonScene from "./CannonScene";

const ForceSimulator = () => {
  const [mass, setMass] = useState(2);
  const [acceleration, setAcceleration] = useState(2);
  const [key, setKey] = useState(0); // For resetting the scene

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      {/* Simulation on top */}
      <div className="w-[600px] h-[325px] sm:h-[100px] md:h-[300px] rounded-xl border overflow-hidden">
        <CannonScene key={key} mass={mass} acceleration={acceleration} />
      </div>

      {/* HUD + Controls below */}
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <ForceHUD
          mass={mass}
          acceleration={acceleration}
          force={mass * acceleration}
        />
        <ControlPanel
          mass={mass}
          setMass={setMass}
          acceleration={acceleration}
          setAcceleration={setAcceleration}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default ForceSimulator;
