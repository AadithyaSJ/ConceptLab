import React from "react";

const ControlPanel = ({ onShake }) => {
  return (
    <div className="text-center mt-4">
      <button
        onClick={onShake}
        className="bg-green-600 text-white px-6 py-2 rounded-md text-lg hover:bg-green-700 transition"
      >
        Shake Tree
      </button>
    </div>
  );
};

export default ControlPanel;
