import React from 'react';

const PerformanceTable = ({ attempts }) => {
  const groupByLaw = {};

  attempts.forEach((attempt) => {
    const { lawId, lawTitle, score } = attempt;

    if (!groupByLaw[lawId]) {
      groupByLaw[lawId] = {
        lawTitle: lawTitle || lawId,
        scores: [],
      };
    }

    groupByLaw[lawId].scores.push(score);
  });

  const summary = Object.entries(groupByLaw).map(([lawId, data]) => {
    const scores = data.scores;
    return {
      lawId,
      lawTitle: data.lawTitle,
      latestScore: scores[scores.length - 1],
      totalAttempts: scores.length,
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
    };
  });

  return (
    <div className="w-full mt-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Performance Table</h2>
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
          {summary.map((law) => (
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

export default PerformanceTable;
