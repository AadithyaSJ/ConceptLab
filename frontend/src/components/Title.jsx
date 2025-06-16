import React from 'react';

const Title = ({ text1 }) => {
  return (
    <h2
      className="text-xl sm:text-2xl md:text-4xl font-bold text-center px-2 sm:px-4 mb-4 bg-gradient-to-r from-yellow-400 to-amber-800 text-transparent bg-clip-text font-display tracking-wide drop-shadow-md break-words"
      style={{ fontFamily: "'Audiowide', cursive" }}
    >
      {text1}
    </h2>
  );
};

export default Title;
