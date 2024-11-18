import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Quiz = ({ questions, onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [hintUsed, setHintUsed] = useState(false);

  const questionRef = useRef(null);
  const timerRef = useRef(null);
  const buttonRefs = useRef([]);
  const quizContainerRef = useRef(null);

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

  // Animation on Question Change (GSAP)
  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }

    // Animate button appearance
    if (buttonRefs.current.length > 0) {
      gsap.fromTo(
        buttonRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
      );
    }
  }, [currentIndex]);

  // Handle Answer
  const handleAnswer = (selectedOption) => {
    if (timeLeft <= 0) return;

    if (selectedOption === questions[currentIndex].answer) {
      // Correct answer animation: Party effect with fireworks
      setScore(score + 1);
      partyEffect();
    } else {
      // Incorrect answer: Buzzer sound with vibration
      wrongAnswerEffect();
    }

    setHintUsed(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      onQuizComplete(score, questions.length);
    }
  };

  // Correct answer: Party effect (confetti or celebration animation)
  const partyEffect = () => {
    // Debug: Check if partyEffect is being triggered
    console.log("Party Effect Triggered");

    // Ensure previous confetti is removed
    const existingCanvas = document.querySelector("#confetti-canvas");
    if (existingCanvas) {
      console.log("Removing existing canvas");
      existingCanvas.remove();
    }

    // Create the confetti canvas
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas"; // Set an ID to reference the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Use absolute positioning to make the canvas full-screen and above all content
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 9999; // Make sure the confetti appears above the quiz content

    // Initialize confetti
    const confetti = window.confetti.create(canvas, { resize: true });
    console.log("Launching Confetti");
    confetti({ particleCount: 100, spread: 70 });

    // Remove the canvas after 3 seconds to prevent overflow and clutter
    setTimeout(() => {
      console.log("Removing canvas after 3 seconds");
      document.body.removeChild(canvas);
    }, 3000);
  };

  // Incorrect answer: Buzzer sound with shaking animation
  const wrongAnswerEffect = () => {
    // Buzzer sound (make sure you have a buzzer.mp3 or sound file in your public folder)
    const buzzer = new Audio("/buzzer.mp3");
    buzzer.play();

    // Shaking animation with GSAP
    gsap.to(quizContainerRef.current, {
      x: -20,
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      onComplete: () =>
        gsap.to(quizContainerRef.current, { x: 0, duration: 0.1 }),
    });
  };

  // Handle Hint
  const handleHint = () => {
    if (!hintUsed) {
      alert(
        `Hint: The answer starts with '${questions[currentIndex].answer[0]}'`
      );
      setHintUsed(true);
    }
  };

  return (
    <div
      ref={quizContainerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-gray-900 text-white"
    >
      {/* Timer Section */}
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

      {/* Question Section */}
      <div ref={questionRef} className="w-full max-w-4xl mt-4 p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Question {currentIndex + 1}/{questions.length}
        </h1>
        <p>{questions[currentIndex].question}</p>
      </div>

      {/* Answer Options */}
      <div className="flex flex-col mt-4 w-full max-w-4xl space-y-2">
        {questions[currentIndex].options.map((option, index) => (
          <button
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            onClick={() => handleAnswer(option)}
            disabled={timeLeft <= 0}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Hint Button */}
      <button
        className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
        onClick={handleHint}
        disabled={hintUsed}
      >
        Use Hint
      </button>

      {/* Score Display */}
      <p className="mt-4 text-green-300 font-bold">Score: {score}</p>
    </div>
  );
};

export default Quiz;
