import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CategorySelector from "./components/CategorySelector";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import Leaderboard from "./components/LeaderBoard";
import UserRegistration from "./components/UserRegistration";
import { fetchQuizData } from "./data/Quizzes";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState(null); // To store fetched questions
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [timeout, setTimeoutReached] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    navigate("/categories");

    // Fetch questions dynamically using the selected category
    try {
      const questions = await fetchQuizData(category); // Fetch data based on category
      setQuizQuestions(questions);
    } catch {
      alert("Error fetching questions. Please try again later.");
    }
  };

  const handleQuizComplete = (
    finalScore,
    totalQuestions,
    isTimeout = false
  ) => {
    setScore(finalScore);
    setQuizComplete(true);
    if (isTimeout) {
      setTimeoutReached(true);
    }

    // Retrieve userDetails from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    // Save score to LocalStorage
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const newEntry = {
      username: userDetails?.username || "Guest",
      age: userDetails?.age || "N/A",
      score: finalScore,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
    };
    storedScores.push(newEntry);
    storedScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(storedScores));

    navigate("/results");
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setQuizComplete(false);
    setScore(0);
    setTimeoutReached(false);
    setQuizQuestions(null); // Clear questions
    navigate("/categories");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }

    const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (savedUserDetails) {
      setUserDetails(savedUserDetails);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const appClass = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <div className={`${appClass} min-h-screen flex flex-col`}>
      <nav className="flex justify-between items-center p-4">
        <Link to="/" className="text-lg font-semibold">
          Quiz App
        </Link>
        <div className="flex items-center space-x-4">
          {userDetails && (
            <span className="text-sm font-medium">
              Welcome, {userDetails.username}!
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-white bg-gray-800 rounded-lg"
          >
            Toggle Dark Mode
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route
          path="/categories"
          element={
            selectedCategory ? (
              quizQuestions ? (
                <Quiz
                  questions={quizQuestions}
                  onQuizComplete={handleQuizComplete}
                />
              ) : (
                <p className="text-center mt-10">Loading Questions...</p>
              )
            ) : (
              <CategorySelector
                categories={[
                  { name: "General Knowledge", id: "general" },
                  { name: "Science", id: "science" },
                  { name: "Math", id: "math" },
                  { name: "History", id: "history" },
                  { name: "Sports", id: "sports" },
                ]}
                onSelectCategory={handleCategorySelect} // Passing category ID directly to fetchQuizData
              />
            )
          }
        />
        <Route
          path="/results"
          element={
            <Results
              score={score}
              totalQuestions={quizQuestions?.length}
              onRestart={handleRestart}
              timeout={timeout}
              category={selectedCategory}
              userDetails={userDetails}
            />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
};

export default App;
