import React, { useEffect } from "react";
import { gsap } from "gsap";

const Results = ({ score, totalQuestions, onRestart, timeout }) => {
  useEffect(() => {
    gsap.fromTo(
      ".results",
      { opacity: 0.5, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 }
    );
  }, []);

  return (
    <div className="results flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-800 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        {timeout ? "Time's Up!" : "Quiz Completed!"}
      </h1>
      <p className="text-lg">
        You scored <span className="font-bold">{score}</span> out of{" "}
        <span className="font-bold">{totalQuestions}</span>.
      </p>
      <button
        className="mt-4 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
