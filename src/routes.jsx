import React, { Children } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
import Fpass from "./features/Auth/ForgetPassword/forgotPassword.jsx";
import PrivateProfile from "./features/PrivateProfile/PrivateProfile.jsx";
import Layout from "./common/Layout.jsx";
import MakeExam from "./features/MakeExam/MakeExam.jsx";
import ExamPreview from "./features/Exams/ExamPreview/ExamPreview.jsx";
import QuestionSearch from "./features/Exams/QuestionSearch/QuestionSearch.jsx"; // Import QuestionSearch
import AddQuestion from "./features/AddQuestion/AddQuestion.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="fp" element={<Fpass />} />
          <Route path="profile" element={<PrivateProfile />} />
          <Route path="make_exam" element={<MakeExam />} />
          <Route path="ExamPreview" element={<ExamPreview />} />
          <Route path="QuestionSearch" element={<QuestionSearch />} />
          <Route path="AddQuestions" element={<AddQuestion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
