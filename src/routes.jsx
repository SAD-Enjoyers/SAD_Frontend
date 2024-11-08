import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
// import ForgetPassword from "./features/Auth/ForgetPassword/ForgetPassword.js";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/ForgetPassword" element={<ForgetPassword />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
