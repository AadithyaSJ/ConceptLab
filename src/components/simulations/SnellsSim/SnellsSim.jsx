import React from 'react';
import Title from '../../Title';
import Title2 from '../../Title2';

const SnellsSim = () => {
  return (
  <div className="text-white space-y-4">
     {/* Title */}
      <Title2 title={'Simulation:'}/>
      <Title text1={'Refraction'}/>
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
