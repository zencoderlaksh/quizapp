// data/Quizzes.js
export const fetchQuizData = async (category) => {
  const categoryApis = {
    sports:
      "https://opentdb.com/api.php?amount=15&category=21&difficulty=medium&type=multiple",
    general:
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple",
    science:
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple",
    math: "https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple",
    history:
      "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple",
    film: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
  };

  try {
    const response = await fetch(categoryApis[category]);
    const data = await response.json();
    if (data.results) {
      // Transform API results into required structure
      return data.results.map((item) => ({
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        answer: item.correct_answer,
      }));
    }
    throw new Error("Invalid API response");
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return []; // Return empty array if API fails
  }
};
