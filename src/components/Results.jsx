import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Results = ({ score, totalQuestions, onRestart, timeout, category }) => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".results",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 }
    );
  }, []);

  // Save score to LocalStorage
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const userDetails = JSON.parse(localStorage.getItem("userDetails")); // Get user details
    const newEntry = {
      username: userDetails?.username || "Guest", // Use username or fallback to "Guest"
      score,
      category,
      timestamp: new Date().toISOString(),
    };
    storedScores.push(newEntry);
    storedScores.sort((a, b) => b.score - a.score); // Sort by score descending
    localStorage.setItem(
      "leaderboard",
      JSON.stringify(storedScores.slice(0, 5))
    ); // Save top 5 scores
  }, [score, category]);

  return (
    <div className="results flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-800 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        {timeout ? "Time's Up!" : "Quiz Completed!"}
      </h1>
      <p className="text-lg">
        You scored <span className="font-bold">{score}</span> out of{" "}
        <span className="font-bold">{totalQuestions}</span>.
      </p>
      <div className="mt-6 flex space-x-4">
        {/* Restart Quiz Button */}
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
          onClick={onRestart}
        >
          Restart Quiz
        </button>
        {/* View Leaderboard Button */}
        <button
          className="bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-600"
          onClick={() => navigate("/leaderboard")} // Navigate to leaderboard
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Results;
