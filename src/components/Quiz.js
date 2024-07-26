import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Questions";
import Result from "./Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10); // Timer in seconds

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
        );
        const data = response.data.results.map((question) => ({
          question: question.question,
          options: [
            ...question.incorrect_answers,
            question.correct_answer,
          ].sort(() => Math.random() - 0.5),
          answer: question.correct_answer,
        }));
        setQuestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Load quiz state from localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setQuestions(savedState.questions);
      setCurrentQuestion(savedState.currentQuestion);
      setCorrectAnswers(savedState.correctAnswers);
      setIncorrectAnswers(savedState.incorrectAnswers);
      setAnsweredQuestions(savedState.answeredQuestions);
      setShowResult(savedState.showResult);
      setTimeLeft(savedState.timeLeft);
      setLoading(false);
    }
  }, []);

  // Save quiz state to localStorage
  useEffect(() => {
    if (!loading) {
      const state = {
        questions,
        currentQuestion,
        correctAnswers,
        incorrectAnswers,
        answeredQuestions,
        showResult,
        timeLeft,
      };
      localStorage.setItem("quizState", JSON.stringify(state));
      console.log("State saved to localStorage", state); // Log state saving
    }
  }, [
    questions,
    currentQuestion,
    correctAnswers,
    incorrectAnswers,
    answeredQuestions,
    showResult,
    timeLeft,
    loading,
  ]);

  // Handle timer
  useEffect(() => {
    if (loading || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, showResult]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }
    setAnsweredQuestions((prev) => prev + 1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleTimeout = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setTimeLeft(60); // Reset timer
    localStorage.removeItem("quizState");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("quizState");
    window.location.reload();
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-4">
      {showResult ? (
        <Result
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          answeredQuestions={answeredQuestions}
          total={questions.length}
          resetQuiz={resetQuiz}
          logOut={logOut}
        />
      ) : (
        <>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
            <p className="text-lg font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="text-lg font-semibold">
              Time Left: {timeLeft} seconds
            </p>
            <p className="text-sm text-gray-600">
              Soal yang telah dikerjakan: {answeredQuestions}
            </p>
          </div>
          {questions.length > 0 && (
            <Question
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              handleAnswer={handleAnswer}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
