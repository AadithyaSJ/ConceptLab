// Final version of PerformanceTable with filter and sort
import React, { useState } from 'react';

const PerformanceTable = ({ attempts }) => {
  const [sortBy, setSortBy] = useState('lawTitle');
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');

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

  let summary = Object.entries(groupByLaw).map(([lawId, data]) => {
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

  // Filter
  if (search) {
    summary = summary.filter((law) =>
      law.lawTitle.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  summary.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
  });

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="w-full mt-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Performance Table</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search law title..."
          className="px-3 py-1 rounded-md bg-yellow-400 text-black placeholder-black font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>
      <table className="min-w-full bg-white/5 text-white border border-white/10 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-yellow-400 text-black text-sm">
            <th className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort('lawTitle')}>
              Law {sortBy === 'lawTitle' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('latestScore')}>
              Latest {sortBy === 'latestScore' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('totalAttempts')}>
              Attempts {sortBy === 'totalAttempts' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('highest')}>
              Highest {sortBy === 'highest' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('lowest')}>
              Lowest {sortBy === 'lowest' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
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
