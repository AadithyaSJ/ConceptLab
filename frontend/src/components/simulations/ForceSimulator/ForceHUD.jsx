import React from "react";

const ForceHUD = ({ mass, acceleration, force }) => {
  return (
    <div className="bg-white/80 p-4 rounded-xl shadow-md text-sm w-full max-w-sm">
      <h2 className="text-lg font-bold mb-2">Simulation Info</h2>
      <div className="flex justify-between">
        <span>Mass (kg):</span>
        <span>{mass}</span>
      </div>
      <div className="flex justify-between">
        <span>Acceleration (m/s²):</span>
        <span>{acceleration}</span>
      </div>
      <div className="flex justify-between font-semibold mt-2">
        <span>Force (F = ma):</span>
        <span>{(mass * acceleration).toFixed(2)} N</span>
      </div>
    </div>
  );
};

export default ForceHUD;
