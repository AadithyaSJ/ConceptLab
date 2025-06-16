import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import ForceHUD from "./ForceHUD";
import CannonScene from "./CannonScene";
import Title from "../../Title";
import Title2 from "../../Title2";

const ForceSimulator = () => {
  const [mass, setMass] = useState(2);
  const [acceleration, setAcceleration] = useState(2);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 space-y-8 font-sans text-white">
      
      {/* Title */}
      <Title2 title={'Simulation:'}/>
      <Title text1={'Break the Wall'}/>

      {/* Simulation Panel */}
      <div className="w-full max-w-3xl aspect-video sm:h-[325px] rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 overflow-hidden shadow-lg">
        <CannonScene key={key} mass={mass} acceleration={acceleration} />
      </div>

      {/* HUD + Control Panel */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-start justify-center gap-6 mt-6">
        <div className="w-full md:w-1/2 rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
          <ForceHUD
            mass={mass}
            acceleration={acceleration}
            force={mass * acceleration}
          />
        </div>

        <div className="w-full md:w-1/2 rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
          <ControlPanel
            mass={mass}
            setMass={setMass}
            acceleration={acceleration}
            setAcceleration={setAcceleration}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default ForceSimulator;
