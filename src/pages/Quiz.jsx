import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, auth } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import lawsData from '../data/lawsData';
import quizComponent from '../components/quizComponent';

function Quiz() {
  const { id } = useParams();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [updated, setUpdates] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const [summary, setSummary] = useState(""); // NEW

  const law = lawsData[id];

  if (!law || !law.quiz) {
    return <div className="text-white text-center p-10">⚠️ Quiz not found. Please go back and select a valid law.</div>;
  }

  const questionsData = quizComponent?.[law.quiz];
  if (!Array.isArray(questionsData) || questionsData.length === 0) {
    return <div className="text-white text-center p-10">⚠️ Quiz data is missing or malformed for this law.</div>;
  }

  const questions = questionsData;
  const current = currentQ < questions.length ? questions[currentQ] : null;

  const saveQuizResult = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userId = user.uid;
      const lawId = id;
      const totalQuestions = questions.length;

      const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const [date, time] = timestamp.split(", ");

      const attemptsCollectionRef = collection(db, "quizAttempts", userId, lawId);
      const snapshot = await getDocs(attemptsCollectionRef);
      const attemptNo = snapshot.size + 1;

      const attemptDocRef = doc(db, "quizAttempts", userId, lawId, `attempt${attemptNo}`);

      await setDoc(attemptDocRef, {
        score,
        totalQuestions,
        attempt: attemptNo,
        date,
        time
      });

      console.log("✅ Nested quiz result saved successfully.");
    } catch (error) {
      console.error("❌ Failed to save nested quiz result:", error);
    }
  };

  // 🧠 NEW: Summarize mistakes via Groq API
  const generateSummary = async () => {
    if (mistakes.length === 0) return;

    const prompt = `
You are an AI tutor. Based on the following mistakes made by a student in a quiz, write a 3–4 line summary of their weak areas. 
Each mistake contains a question and an explanation. Be clear and concise.

Mistakes:
${mistakes.map((m, i) => `${i + 1}. ${m.topic} - ${m.reason}`).join("\n")}
`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful educational assistant summarizing quiz mistakes." },
            { role: "user", content: prompt },
          ],
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) setSummary(content);
    } catch (err) {
      console.error("Groq summary error:", err);
      setSummary("⚠️ Could not generate summary at this time.");
    }
  };

  useEffect(() => {
    const goFullScreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
    };

    goFullScreen();

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenWarning(true);
        setTimeout(() => goFullScreen(), 3000);
      } else {
        setFullscreenWarning(false);
      }
    };

    const blockKeys = (e) => {
      const blocked = ['F12', 'Tab'];
      if (
        blocked.includes(e.key) ||
        (e.ctrlKey && ['r', 'R'].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.metaKey && e.key === 'r')
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const regainFocus = () => window.focus();
    const blockContext = (e) => e.preventDefault();

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', blockKeys);
    window.addEventListener('blur', regainFocus);
    window.addEventListener('contextmenu', blockContext);

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => window.history.pushState(null, "", window.location.href);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', blockKeys);
      window.removeEventListener('blur', regainFocus);
      window.removeEventListener('contextmenu', blockContext);
      document.onpopstate = null;
    };
  }, []);

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    setShowExplanation(true);
    if (index === current.correct) {
      setScore(score + 1);
    } else {
      setMistakes([...mistakes, {
        topic: current.question,
        reason: current.explanation
      }]);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
      setCurrentQ(currentQ + 1);
    } else {
      setCurrentQ(currentQ + 1);
      setCompleted(true);
    }
  };

  if (completed) {
    if (!updated) {
      saveQuizResult();
      generateSummary(); // 🧠 Trigger summary
      setUpdates(true);
    }

    const weakAreas = mistakes.length > 0 ? (
      <ul className="text-left mt-4 space-y-2">
        {mistakes.map((m, i) => (
          <li key={i}>
            <strong>{i + 1}. {m.topic}</strong> - {m.reason}
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-4">✅ You got everything right! Great job!</p>
    );

    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-white bg-transparent">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-10 w-full max-w-xl text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-yellow-400 drop-shadow">
            🎉 Quiz Completed!
          </h2>
          <p className="text-xl text-white/90 mb-6">
            You scored <span className="font-bold text-yellow-300">{score}</span> out of <span className="font-bold text-yellow-300">{questions.length}</span>
          </p>
          <p className="mb-4 text-white/80">
            You mastered:<br />
            <span className="text-yellow-300">[
              {'■'.repeat(Math.floor((score / questions.length) * 10))}
              {'□'.repeat(10 - Math.floor((score / questions.length) * 10))}
            ] {Math.round((score / questions.length) * 100)}%</span>
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">Topics needing review:</h3>
          {weakAreas}

          {summary && (
            <div className="mt-6 p-4 rounded-md bg-blue-100 text-black text-left">
              <h4 className="font-bold mb-2">🧠 Summary of Weak Areas:</h4>
              <p>{summary}</p>
            </div>
          )}

          <Link
            to="/laws"
            className="inline-block mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-lg shadow hover:scale-[1.03] transition-transform duration-200"
          >
            Next Law
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex mt-20 flex-col items-center justify-start bg-transparent text-white px-4 py-6">
      {fullscreenWarning && (
        <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white py-3 text-center shadow-md font-semibold">
          ⚠️ Please do not exit fullscreen during the quiz. Returning in 3 seconds...
        </div>
      )}
      <div className="w-full max-w-4xl text-center py-4 border-b border-white/10 bg-white/5 backdrop-blur-md shadow rounded-xl mb-6">
        <h2 className="text-lg font-semibold tracking-wide text-yellow-300">
          {law.title} — Question {currentQ + 1} of {questions.length}
        </h2>
      </div>
      <div className="w-full max-w-4xl p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl text-white space-y-6">
        <h3 className="text-xl font-semibold tracking-wide drop-shadow">{current.question}</h3>
        <div className="space-y-3">
          {current.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-md transition border
                ${selected === i
                  ? i === current.correct
                    ? 'bg-green-600 border-green-800'
                    : 'bg-red-600 border-red-800'
                  : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
            >
              {option}
            </button>
          ))}
        </div>
        {showExplanation && (
          <div className="mt-6 p-4 rounded-md bg-yellow-100 text-black">
            {selected === current.correct ? (
              <p><strong>Correct!</strong> {current.explanation}</p>
            ) : (
              <>
                <p className="mb-2"><strong>Incorrect.</strong> {current.options[selected]} is not correct.</p>
                <p>
                  <strong>Correct Answer:</strong> {current.options[current.correct]}<br />
                  {current.explanation}
                </p>
              </>
            )}
          </div>
        )}
        {answered && (
          <button
            onClick={nextQuestion}
            className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 rounded-lg hover:scale-[1.02] transition-transform"
          >
            {currentQ + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
