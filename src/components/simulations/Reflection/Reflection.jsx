import React from 'react';
import Title from '../../Title';
import Title2 from '../../Title2';

const Reflection = () => {
  return (
  <div className="text-white space-y-4">
     {/* Title */}
      <Title2 title={'Simulation:'}/>
      <Title text1={'Reflection'}/>
      <div className="w-full h-[500px]">
          <iframe
            src="https://clixplatform.tiss.edu/phet/sims/html/bending-light/latest/bending-light_en.html"
            title="Reflection Law Simulation"
            className="w-full h-full border-0 rounded-xl"
          />
        </div>
        </div>
  );
};

export default Reflection;
