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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
    // Reset errors
    setUsernameError(false);
    setPasswordError(false);
    //  setErrorMessage("");

    // Frontend validation checks
    if (!username && !password) {
      setUsernameError(true);
      setPasswordError(true);
      setErrorMessage("Both fields are required.");
      return;
    }

    if (!username) {
      setUsernameError(true);
      setErrorMessage("Username is required");
      return;
    }

    if (!password) {
      setPasswordError(true);
      setErrorMessage("Password is required");
      return;
    }

    setLoading(true);

    try {
      // Send login request to backend with userName and userPassword
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          // "x-role": localStorage.getItem("role"),
        },
        body: JSON.stringify({
          userName: username,
          userPassword: password,
        }),
      });

      const responseData = await response.json();

      // Map of error messages
      const errorMessages = {
        "Invalid username or password":
          "The username or password you entered is incorrect.",
        "User not found": "No account found with this username.",
        "Account locked": "Your account is locked. Please contact support.",
      };

      // Handle backend response
      if (response.ok) {
        // Assuming responseData is the object containing the token and role
        const token = responseData.data.token;
        const role = responseData.data.role;

        // Set the role in localStorage
        localStorage.setItem("role", role);

        // Check the role and set the appropriate token
        if (role !== "user") {
          localStorage.setItem("AdminToken", token);
          localStorage.setItem("AdminRole", role);

          localStorage.setItem("token", token); // Set token if role is "user"
          // Set AdminToken if role is not "user"
        } else {
          localStorage.setItem("token", token); // Set token if role is "user"
        }
        // Successfully logged in, redirect to home page
        // console;
        // alert("Login successful!");
        // localStorage.setItem("token", responseData.data.token);
        // localStorage.setItem("role", responseData.data.role);
        toast.success("Login successful! Redirecting to homepage...");
        // console.log(responseData.data.role);
        setTimeout(
          () =>
            responseData.data.role === "user"
              ? navigate("/")
              : navigate("/admin"),
          2000
        ); // Redirect after 2 seconds
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
          error={usernameError}
          helperText={usernameError ? "Username is required" : ""}
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
          error={passwordError}
          helperText={passwordError ? "Password is required" : ""}
        />

        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          <Link href="/fp" underline="hover" color="primary">
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default Login;
