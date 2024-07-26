// src/components/Quiz.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Questions from "./Questions";
import Result from "./Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
        );
        const data = response.data.results.map((question) => ({
          question: question.question,
          options: [...question.incorrect_answers, question.correct_answer],
          answer: question.correct_answer,
        }));
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {showResult ? (
        <Result score={score} total={questions.length} resetQuiz={resetQuiz} />
      ) : (
        questions.length > 0 && (
          <Questions
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            handleAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
};

export default Quiz;
