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
  CircularProgress,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async () => {
    // Frontend validation checks
    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      // Send login request to backend with userName and userPassword
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          userPassword: password,
        }),
      });

      const responseData = await response.json();

      // Handle backend response
      if (response.ok) {
        // Successfully logged in, redirect to home page
        alert("Login successful!");
        navigate("/home");
      } else {
        setErrorMessage(
          responseData.message || "Login failed. Please try again."
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
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
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
        />

        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          <Link href="" underline="hover" color="primary">
            Forgot password?
          </Link>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Don't have an account?{" "}
          <Link href="/signup" underline="hover" color="primary">
            Signup
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

export default Login;
