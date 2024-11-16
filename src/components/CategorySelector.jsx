import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CategorySelector = ({ categories, onSelectCategory }) => {
  const buttonRefs = useRef([]);

  useEffect(() => {
    gsap.from(buttonRefs.current, {
      duration: 0.8,
      y: 50,
      opacity: 0.5,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-blue-400 text-white">
      <h1 className="text-4xl font-bold mb-6">Choose a Category</h1>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <button
            key={category}
            ref={(el) => (buttonRefs.current[index] = el)}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
