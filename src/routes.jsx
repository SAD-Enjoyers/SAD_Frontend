import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
import Fpass from "./features/Auth/ForgetPassword/forgotPassword.jsx";
import PrivateProfile from "./features/PrivateProfile/PrivateProfile.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fp" element={<Fpass />} />
        <Route path="/profile" element={<PrivateProfile />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
