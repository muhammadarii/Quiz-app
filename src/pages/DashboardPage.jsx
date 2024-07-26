import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../components/Quiz";
import Logo from "../images/Asset-6-8.png";

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
      <img src={Logo} alt="Logo" className="w-40 mb-8" />
      <div className="w-full">
        <Quiz />
      </div>
    </div>
  );
};

export default DashboardPage;
