import React from "react";

const labels = ["A.", "B.", "C.", "D."];
const Questions = ({ question, options, handleAnswer }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleAnswer(option)}
            className="cursor-pointer mb-2 p-2 border rounded hover:bg-gray-100"
          >
            <span className="mr-2">{labels[index]}</span>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
