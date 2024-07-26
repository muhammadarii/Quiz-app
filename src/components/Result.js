import React from "react";

const Result = ({
  correctAnswers,
  incorrectAnswers,
  answeredQuestions,
  total,
  resetQuiz,
  logOut,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hasil Kuis</h2>
      <p className="mb-2">📄Total Pertanyaan: {total}</p>
      <p className="mb-2">✔️ Jawaban Benar: {correctAnswers}</p>
      <p className="mb-2">✖️ Jawaban Salah: {incorrectAnswers}</p>
      <p className="mb-2">Jumlah Terjawab: {answeredQuestions}</p>
      <div className="flex justify-between">
        <button
          onClick={resetQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Coba Lagi
        </button>
        <button
          onClick={logOut}
          className="px-7 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Result;
