import React, { useState } from 'react';
import '../../../styles/bulb.css'; // Make sure this file exists!
import Title from '../../Title';
import Title2 from '../../Title2';

const OhmsLawSim = () => {
  const [resistance, setResistance] = useState(10);
  const voltage = 10;
  const current = voltage / resistance;

  let brightness = '';
  if (current >= 1) brightness = 'bright';
  else if (current >= 0.5) brightness = 'medium';
  else if (current > 0) brightness = 'dim';

  return (
    <div className="flex flex-col items-center  p-6 rounded-xl text-white w-full max-w-md mx-auto gap-4">
        {/* Title */}
      <Title2 title={'Simulation:'}/>
      <Title text1={'Bulb Glow'}/>

      <div className={`bulb-container ${brightness}`}>
        <img src="/bulb.png" alt="Bulb" className="bulb-img" />
      </div>

      <p className="text-white/80">Resistance: {resistance} Ω</p>
      <input
        type="range"
        min={1}
        max={100}
        value={resistance}
        onChange={(e) => setResistance(Number(e.target.value))}
        className="w-full"
      />
      <p className="text-white/60">Current: {current.toFixed(2)} A</p>
    </div>
  );
};

export default OhmsLawSim;
