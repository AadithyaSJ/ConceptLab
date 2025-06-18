import React from "react";

const LawSelector = ({ laws, selectedLawId, onChange }) => {
  return (
    <div className="inline-block relative w-full max-w-xs">
      <select
        className="block appearance-none w-full bg-yellow-300 text-black font-medium border border-yellow-500 hover:border-yellow-600 px-4 py-2 pr-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-500 transition duration-200"
        value={selectedLawId}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" >Select Law</option>
        {laws.map((law) => (
          <option key={law.id} value={law.id}>
            {law.title}
          </option>
        ))}
      </select>

      {/* Dropdown arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M5.516 7.548a.75.75 0 011.06-.032L10 10.793l3.424-3.277a.75.75 0 011.028 1.092l-4 3.833a.75.75 0 01-1.028 0l-4-3.833a.75.75 0 01-.032-1.06z" />
        </svg>
      </div>
    </div>
  );
};

export default LawSelector;
