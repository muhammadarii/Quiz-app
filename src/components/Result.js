import React from "react";

const Result = ({ score, total, resetQuiz }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Your Score: {score} / {total}
      </h2>
      <button
        onClick={resetQuiz}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default Result;
