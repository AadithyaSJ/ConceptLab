import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy
} from "firebase/firestore";
import { db, auth } from "../firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const LawGraph = ({ selectedLaw }) => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchAttempts = async () => {
  try {
    const user = auth.currentUser;
    if (!user || !selectedLaw) return;

    const attemptsRef = collection(db, `quizAttempts/${user.uid}/${selectedLaw}`);
    const snapshot = await getDocs(attemptsRef); // Just fetch all docs under selectedLaw

    const data = snapshot.docs.map((doc, index) => {
      const d = doc.data();
      return {
        attempt: index + 1, // or parse attempt number from doc.id if needed
        score: Number(d.score),
        date: d.date || '',
        time: d.time || '',
      };
    });

    console.log("Graph data:", data);
    setAttempts(data);
  } catch (error) {
    console.error("Error fetching attempts:", error);
  }
};


    fetchAttempts();
  }, [selectedLaw]);

  if (!attempts.length) {
    return <div className="text-white">No attempts to display for this law.</div>;
  }

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md mt-4">
      <h3 className="text-lg font-semibold text-white mb-4">Score Progression</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={attempts} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="attempt" stroke="#fff" />
          <YAxis stroke="#fff" domain={[0, 10]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "none" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line type="monotone" dataKey="score" stroke="#facc15" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LawGraph;
