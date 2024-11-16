import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Quiz = ({ questions, onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [hintUsed, setHintUsed] = useState(false);

  const questionRef = useRef(null);
  const timerRef = useRef(null);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onQuizComplete(score, questions.length, true);
    }
  }, [timeLeft, score, questions.length, onQuizComplete]);

  // Animation on Question Change
  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [currentIndex]);

  const handleAnswer = (selectedOption) => {
    if (timeLeft <= 0) return;

    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + 1);
    }
    setHintUsed(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      onQuizComplete(score, questions.length);
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      alert(
        `Hint: The answer starts with '${questions[currentIndex].answer[0]}'`
      );
      setHintUsed(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-gray-900 text-white">
      <div ref={timerRef} className="w-full max-w-4xl">
        <p className="text-right font-bold text-lg">
          Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </p>
        <div
          className="h-2 bg-red-500"
          style={{ width: `${(timeLeft / 600) * 100}%` }}
        ></div>
      </div>
      <div ref={questionRef} className="w-full max-w-4xl mt-4 p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Question {currentIndex + 1}/{questions.length}
        </h1>
        <p>{questions[currentIndex].question}</p>
      </div>
      <div className="flex flex-col mt-4 w-full max-w-4xl space-y-2">
        {questions[currentIndex].options.map((option, index) => (
          <button
            key={index}
            className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            onClick={() => handleAnswer(option)}
            disabled={timeLeft <= 0}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
        onClick={handleHint}
        disabled={hintUsed}
      >
        Use Hint
      </button>
      <p className="mt-4 text-green-300 font-bold">Score: {score}</p>
    </div>
  );
};

export default Quiz;
