import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
import Fpass from "./features/Auth/ForgetPassword/forgotPassword.jsx";
import ExamPreview from "./features/Exams/QuestionSearch/ExamPreview/ExamPreview.jsx";
import QuestionSearch from "./features/Exams/QuestionSearch/QuestionSearch.jsx"; // Import QuestionSearch



function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fp" element={<Fpass />} />
        <Route path="/ExamPreview" element={<ExamPreview />} />
        <Route path="/QuestionSearch" element={<QuestionSearch />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
