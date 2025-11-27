"use client";
import React, { useState } from "react";

// QUIZ DATA
const data = [
  {
    question: "What does SSR stand for?",
    option: [
      "Server Side Rendering",
      "Single Source Repository",
      "Super Speed Response",
      "Secure System Route",
    ],
    answer: "Server Side Rendering",
  },
  {
    question: "Which React hook manages state?",
    option: ["useMemo", "useState", "useEffect", "useRef"],
    answer: "useState",
  },
  {
    question: "Which HTTP method creates data?",
    option: ["GET", "POST", "DELETE", "PATCH"],
    answer: "POST",
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (!selected) return;

    // scoring
    if (selected === data[index].answer) {
      setScore((prev) => prev + 1);
    }

    // last question?
    if (index === data.length - 1) {
      setFinished(true);
    } else {
      setIndex((prev) => prev + 1);
    }

    setSelected("");
  };

  const restart = () => {
    setIndex(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎯 React Quiz App</h1>

      {/* Progress Bar */}
      {!finished && (
        <div style={styles.progressWrapper}>
          <div
            style={{
              ...styles.progressBar,
              width: `${(index / data.length) * 100}%`,
            }}
          ></div>
        </div>
      )}

      {/* QUIZ FINISHED */}
      {finished ? (
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>🎉 Quiz Completed!</h2>
          <p style={styles.resultScore}>
            Your Score: <strong>{score}</strong> / {data.length}
          </p>

          <button onClick={restart} style={styles.restartBtn}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          {/* Question */}
          <h2 style={styles.question}>
            {index + 1}. {data[index].question}
          </h2>

          {/* Options */}
          <div style={styles.optionList}>
            {data[index].option.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                style={{
                  ...styles.option,
                  background: selected === opt ? "#4f46e5" : "#f3f4f6",
                  color: selected === opt ? "white" : "black",
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Next / Finish Button */}
          <button
            disabled={!selected}
            onClick={handleNext}
            style={{
              ...styles.nextBtn,
              opacity: selected ? 1 : 0.5,
            }}
          >
            {index === data.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------
// STYLES FOR UI/UX
// -------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "40px 20px",
    maxWidth: 550,
    margin: "0 auto",
    fontFamily: "Inter, sans-serif",
    textAlign: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 20,
    color: "#1f2937",
  },

  progressWrapper: {
    height: 10,
    width: "100%",
    background: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 25,
  },

  progressBar: {
    height: "100%",
    background: "#4f46e5",
    transition: "0.4s",
  },

  card: {
    background: "white",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  question: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20,
  },

  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },

  option: {
    padding: "12px 18px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    cursor: "pointer",
    transition: "0.2s",
  },

  nextBtn: {
    padding: "12px 30px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    fontSize: 18,
    borderRadius: 8,
    cursor: "pointer",
    transition: "0.3s",
  },

  resultCard: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 10,
  },

  resultScore: {
    fontSize: 20,
    marginBottom: 20,
  },

  restartBtn: {
    padding: "12px 26px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 18,
    cursor: "pointer",
  },
};
