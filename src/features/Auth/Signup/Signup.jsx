import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
} from "@mui/icons-material"; // Import Email icon
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // To toggle success message

  const navigate = useNavigate();

  useEffect(() => {
    // Add the background class when the component is mounted
    document.body.classList.add("signup-background");

    // Clean up by removing the class when the component is unmounted
    return () => {
      document.body.classList.remove("signup-background");
    };
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const validateUsername = (username) => /^[a-zA-Z0-9]{4,15}$/.test(username);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePasswordStrength = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }
    if (!validateUsername(username)) {
      setErrorMessage("Username must be 4-15 alphanumeric characters");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
    if (!validatePasswordStrength(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, include an uppercase letter and a number"
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/signuppage/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email: email,
          userPassword: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setShowSuccessMessage(true); // Show success message
      } else {
        setErrorMessage(
          responseData.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
        {showSuccessMessage ? (
          // Success Message Box
          <Box sx={{ textAlign: "center", padding: 3 }}>
            <EmailIcon
              sx={{ fontSize: 80, color: "#378CE7", marginBottom: 2 }}
            />{" "}
            {/* Big Email Icon */}
            <Typography variant="h5" gutterBottom>
              Signup successful!
            </Typography>
            <Typography variant="body2">
              Check your email for confirmation. Please follow the instructions
              to activate your account.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </Box>
        ) : (
          // Signup Form
          <>
            <Typography variant="h4" gutterBottom>
              Signup
            </Typography>
            {/* Error Message Box */}
            <Box
              sx={{
                backgroundColor: "#fce4e4", // Light red background
                color: "#d32f2f", // Dark red text
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "center",
                marginBottom: "10px",
                border: "1px solid #f8b6b6",
                display: errorMessage ? "block" : "none", // Hide if no error
              }}
            >
              {errorMessage}
            </Box>

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!validateUsername(username) && Boolean(errorMessage)}
              helperText={
                !validateUsername(username)
                  ? "Username should be 4-15 alphanumeric characters."
                  : ""
              }
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errorMessage && !validateEmail(email))}
              helperText={
                !validateEmail(email)
                  ? "Enter a valid email address (e.g., name@example.com)."
                  : ""
              }
            />
            <TextField
              fullWidth
              label="Create password"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                !validatePasswordStrength(password) && Boolean(errorMessage)
              }
              helperText={
                !validatePasswordStrength(password)
                  ? "Password must be 8+ characters, include an uppercase letter and a number."
                  : ""
              }
            />
            <TextField
              fullWidth
              label="Confirm password"
              variant="outlined"
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={password !== confirmPassword && Boolean(errorMessage)}
              helperText={
                password !== confirmPassword ? "Passwords do not match." : ""
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link
                    href="/TermsAndConditions"
                    underline="hover"
                    color="primary"
                  >
                    terms and conditions
                  </Link>
                </Typography>
              }
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Signup"
              )}
            </Button>

            <Typography variant="body2" sx={{ mt: 1 }}>
              Already have an account?{" "}
              <Link href="/login" underline="hover" color="primary">
                Login
              </Link>
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link href="/" underline="hover" color="primary">
                Back to Home
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Signup;
