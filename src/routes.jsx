import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Signup from "./features/Auth/Signup/Signup.jsx";
import Login from "./features/Auth/Login/Login.jsx";
<<<<<<< HEAD
// import ForgetPassword from "./features/Auth/ForgetPassword/ForgetPassword.js";
=======
import Fpass from "./features/Auth/ForgetPassword/forgotPassword.jsx";
>>>>>>> 9219866b2e6d62d3ddc8aa7ca4b6791e64cf97da

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        {/* <Route path="/ForgetPassword" element={<ForgetPassword />} /> */}
=======
        <Route path="/fp" element={<Fpass />} />
>>>>>>> 9219866b2e6d62d3ddc8aa7ca4b6791e64cf97da
      </Routes>
    </Router>
  );
}

export default AppRoutes;
