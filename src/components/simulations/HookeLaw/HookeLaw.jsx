import React from 'react';
import Title from '../../Title';
import Title2 from '../../Title2';

const HookeLaw = () => {
  return (
  <div className="text-white space-y-4">
     {/* Title */}
      <Title2 title={'Simulation:'}/>
      <Title text1={'Spring & Mass'}/>
      <div className="w-full h-[500px]">
          <iframe
            src="https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_all.html"
            title="Hooke's Law Simulation"
            className="w-full h-full border-0 rounded-xl"
          />
        </div>
        </div>
  );
};

export default HookeLaw;
