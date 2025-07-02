import React from "react";

const attempts = [
  { law: "Law 1", attempt: 1, score: "7/10", date: "13-06-2025", time: "10:15 AM" },
  { law: "Law 2", attempt: 1, score: "5/10", date: "11-06-2025", time: "09:45 AM" },
  { law: "Law 1", attempt: 2, score: "9/10", date: "14-06-2025", time: "11:20 AM" },
];

function AttemptHistoryTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="text-yellow-300 border-b border-white/10">
            <th className="py-2 pr-4">Law</th>
            <th className="py-2 pr-4">Attempt</th>
            <th className="py-2 pr-4">Score</th>
            <th className="py-2 pr-4">Date</th>
            <th className="py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((row, i) => (
            <tr key={i} className="border-b border-white/10 hover:bg-white/5">
              <td className="py-2 pr-4">{row.law}</td>
              <td className="py-2 pr-4">{row.attempt}</td>
              <td className="py-2 pr-4">{row.score}</td>
              <td className="py-2 pr-4">{row.date}</td>
              <td className="py-2">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttemptHistoryTable;
