import React, { useEffect } from 'react';
import { bouncy } from 'ldrs';
import Background from './background';

// Register the custom loader element once
bouncy.register();

const LoaderSpinner = () => {
  return (
    
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <Background />
      <l-bouncy size="45" speed="1.75" color="#facc15" /> {/* yellow-400 */}
    </div>
  );
};

export default LoaderSpinner;
