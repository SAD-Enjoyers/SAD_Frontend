// src/features/Home/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="body1" paragraph>
        This is the homepage. Click the button below to sign up.
      </Typography>
      <Button variant="contained" color="primary" onClick={goToSignup}>
        Go to Signup
      </Button>
    </Box>
  );
}

export default Home;
