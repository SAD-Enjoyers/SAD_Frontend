import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
import Fpass from "./features/Auth/ForgetPassword/forgotPassword.jsx";
import PrivateProfile from "./features/PrivateProfile/PrivateProfile.jsx";
import Layout from "./common/Layout.jsx";
import MakeExam from "./features/MakeExam/MakeExam.jsx";
import ExamPreview from "./features/Exams/ExamPreview/ExamPreview.jsx";
import QuestionSearch from "./features/Exams/QuestionSearch/QuestionSearch.jsx";
import AddQuestion from "./features/AddQuestion/AddQuestion.jsx";
import PrivateExam from "./features/Exams/PrivateExam/PrivateExam.jsx";
import ChangePassword from "./features/Auth/ChangePassword/ChangePassword.jsx";
import QuestionPage from "./features/Exams/QuestionPage/QuestionPage";
import TermsAndConditions from "./features/Auth/TermsAndConditions/TermsAndConditions.jsx";

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
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="QuestionPage" element={<QuestionPage />} />
          <Route path="TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="PrivateExam" element={<PrivateExam />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
