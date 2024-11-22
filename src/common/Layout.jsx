// src/common/Layout.js
import React from "react";
import Navbar from "./Navbar"; // Your Navbar component
import Footer from "./Footer"; // Your Footer component
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div>
      <Box>
        <Navbar />
        <Box
          component="main"
          sx={{ minHeight: "calc(100vh - 80px)", paddingBottom: "80px" }}
        >
          {children} {/* This is where the page content will go */}
        </Box>
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;
