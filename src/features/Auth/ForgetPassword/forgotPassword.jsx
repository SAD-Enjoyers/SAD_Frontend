// import '../../../src/App.css'
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Snackbar,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Link,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add the background class when the component is mounted
    document.body.classList.add("signup-background");

    // Clean up by removing the class when the component is unmounted
    return () => {
      document.body.classList.remove("signup-background");
    };
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Forgot password
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Typography variant="p" gutterBottom>
              enter your Email Address to recieve a password reset link
            </Typography>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(errorMessage && !validateEmail(email))}
              helperText={
                !validateEmail(email)
                  ? "Enter a valid email address (e.g., name@example.com)."
                  : ""
              }
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
