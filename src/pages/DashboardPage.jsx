import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../components/Quiz";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-4xl font-bold mb-8">React Quiz</header>
      <main className="w-full">
        <Quiz />
      </main>
    </div>
  );
};

export default DashboardPage;
