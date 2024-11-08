import React, { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  const navigate = useNavigate(); // Initialize navigate

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const validateUsername = (username) => /^[a-zA-Z0-9]{4,15}$/.test(username);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePasswordStrength = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  const handleSignup = async () => {
    // Input validation checks
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

    setLoading(true); // Show loading indicator

    try {
      // Send POST request to the backend
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username, // Ensure these match the backend field names
          email: email,
          userPassword: password,
        }),
      });
      // console.log(response);

      // Wait for JSON response from the server
      const responseData = await response.json();

      if (response.ok) {
        // Handle a successful response (e.g., status 201 or 200)
        alert("Signup successful! Check your email for confirmation.");
        navigate("/login"); // Redirect to the login page or another page as needed
      } else {
        // Handle server error messages
        setErrorMessage(
          responseData.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      // Handle network or unexpected errors
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
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
          Signup
        </Typography>

        {/* Form Fields */}
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
          error={!validatePasswordStrength(password) && Boolean(errorMessage)}
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
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
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
              <Link href="/terms" underline="hover" color="primary">
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
        </Button>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" color="primary">
            Login
          </Link>
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link href="/" underline="hover" color="primary">
            Go to Homepage
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </Container>
  );
}

export default Signup;
