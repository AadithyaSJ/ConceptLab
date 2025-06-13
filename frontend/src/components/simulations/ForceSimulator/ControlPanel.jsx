import React from "react";

const ControlPanel = ({ mass, setMass, acceleration, setAcceleration, onReset }) => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block font-medium">Mass (kg)</label>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm">{mass} kg</p>
      </div>
      <div>
        <label className="block font-medium">Acceleration (m/s²)</label>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={acceleration}
          onChange={(e) => setAcceleration(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm">{acceleration} m/s²</p>
      </div>
      <button
        onClick={onReset}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Reset Simulation
      </button>
    </div>
  );
};

export default ControlPanel;
