import React from 'react';

const SnellsSim = () => {
  return (
  <div className="text-white space-y-4">
      <div className="w-full h-[500px]">
          <iframe
            src="https://frankenapps.github.io/SnellsLaw/"
            title="Snell's Law Simulation"
            className="w-full h-full border-0 rounded-xl"
          />
        </div>
        </div>
  );
};

export default SnellsSim;
