import React, { useState } from "react";
import { quizzes } from "./data/Quizzes";
import CategorySelector from "./components/CategorySelector";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [timeout, setTimeoutReached] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setQuizComplete(false);
    setScore(0);
    setTimeoutReached(false);
  };

  if (!selectedCategory) {
    return (
      <CategorySelector
        categories={Object.keys(quizzes)}
        onSelectCategory={handleCategorySelect}
      />
    );
  }

  if (quizComplete) {
    return (
      <Results
        score={score}
        totalQuestions={quizzes[selectedCategory].length}
        onRestart={handleRestart}
        timeout={timeout}
      />
    );
  }

  return (
    <Quiz
      questions={quizzes[selectedCategory]}
      onQuizComplete={handleQuizComplete}
    />
  );
};

export default App;
