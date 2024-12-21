import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
import Fpass from "./features/Auth/ForgetPassword/forgotPassword.jsx";
import PrivateProfile from "./features/PrivateProfile/PrivateProfile.jsx";
import Layout from "./common/Layout.jsx";
import ExamPreview from "./features/Exams/ExamPreview/ExamPreview.jsx";
import PublicExam from "./features/Exams/PublicExam/PublicExam.jsx";
import ExamResult from "./features/Exams/PublicExam/ExamResult.jsx";
import QuestionSearch from "./features/Questions/QuestionsSearch/QuestionsTab.jsx";
import ExamSearch from "./features/Exams/ExamsSearch/ExamsTab.jsx";
import PrivateExam from "./features/Exams/PrivateExam/PrivateExam.jsx";
import QuestionBank from "./features/Exams/PrivateExam/tabs/QuestionBank.jsx";
import ChangePassword from "./features/Auth/ChangePassword/ChangePassword.jsx";
import QuestionPage from "./features/Exams/QuestionPage/QuestionPage";
import TermsAndConditions from "./features/Auth/TermsAndConditions/TermsAndConditions.jsx";
import OngoingExamPage from "./features/Exams/OngoingExamPage/OngoingExamPage.jsx";
import AddArticle from "./features/Articles/AddArticle/AddArticle.jsx";
import ArticleSearch from "./features/Articles/SearchArticle/SearchArticle.jsx";
import PublicCourse from "./features/Courses/PublicCourse/PublicCourse.jsx";
import MakeExam from "./features/Exams/MakeExam/MakeExam.jsx";
import ImageUpload from "./features/Exams/MakeExam/components/ImageUpload.jsx";
import PrivateCourse from "./features/Courses/PrivateCourse/PrivateCourse.jsx";
import Comments from "./common/Comments/CommentSection.jsx";
import WalletPage from "./features/PrivateProfile/Wallet/Wallet.jsx";
import AddQuestion from "./features/AddQuestion/AddQuestion.jsx";
import PublicArticle from "./features/Articles/publicArticle/publicArticle.jsx";
import PrivateArticle from "./features/Articles/privateArticle/privateArticle.jsx";
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
          <Route path="QuestionBank" element={<QuestionBank />} />
          <Route path="ExamPreview/:serviceId" element={<ExamPreview />} />
          <Route path="QuestionSearch" element={<QuestionSearch />} />
          <Route path="ExamSearch" element={<ExamSearch />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="QuestionPage" element={<QuestionPage />} />
          <Route path="image" element={<ImageUpload />} />
          <Route path="TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="PrivateExam/:serviceId" element={<PrivateExam />} />
          <Route path="PrivateCourse" element={<PrivateCourse />} />
          <Route path="PublicCourse" element={<PublicCourse />} />
          <Route path="PublicExam" element={<PublicExam />} />
          <Route path="ExamResult" element={<ExamResult />} />
          <Route path="AddArticle" element={<AddArticle />} />
          <Route path="OngoingExamPage" element={<OngoingExamPage />} />
          <Route path="SearchArticle" element={<ArticleSearch />} />
          <Route path="AddQuestion" element={<AddQuestion />} />
          <Route path="PublicCourse" element={<PublicCourse />} />
          <Route path="Comments" element={<Comments />} />
          <Route path="WalletPage" element={<WalletPage />} />
          <Route path="AddQuestion" element={<AddQuestion />} />
          <Route path="PublicArticle" element={<PublicArticle />} />
          <Route
            path="PrivateArticle/:serviceId"
            element={<PrivateArticle />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
