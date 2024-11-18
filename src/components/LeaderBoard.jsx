import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard from LocalStorage
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    // Sort scores in descending order (highest score first)
    storedScores.sort((a, b) => b.score - a.score);
    setLeaderboard(storedScores.slice(0, 5)); // Limit to top 5 scores
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="space-y-4">
        {leaderboard.length === 0 ? (
          <p className="text-xl">No scores available yet.</p>
        ) : (
          leaderboard.map((entry, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md w-72 flex flex-col space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{entry.username}</span>
                <span className="text-sm text-gray-400">{entry.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Age: {entry.age}</span>
                <span>{entry.score} pts</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
