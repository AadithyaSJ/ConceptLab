import React from "react";

const LawStatsTable = ({ summaryData }) => {
  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="min-w-full bg-white/5 text-white border border-white/10 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-yellow-400 text-black text-sm">
            <th className="px-4 py-2 text-left">Law</th>
            <th className="px-4 py-2 text-center">Latest Score</th>
            <th className="px-4 py-2 text-center">Attempts</th>
            <th className="px-4 py-2 text-center">Highest</th>
            <th className="px-4 py-2 text-center">Lowest</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.map((law) => (
            <tr key={law.lawId} className="border-t border-white/10 text-sm text-center hover:bg-white/10 transition">
              <td className="px-4 py-2 text-left">{law.lawTitle}</td>
              <td className="px-4 py-2">{law.latestScore}</td>
              <td className="px-4 py-2">{law.totalAttempts}</td>
              <td className="px-4 py-2">{law.highest}</td>
              <td className="px-4 py-2">{law.lowest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LawStatsTable;
