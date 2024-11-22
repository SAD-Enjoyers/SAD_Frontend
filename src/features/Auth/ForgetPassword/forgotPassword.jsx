import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
// import { useNavigate } from "react-router-dom"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); 

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // بررسی فرمت ایمیل
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format. Please enter a valid email.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

  
    /*
    try {
      const response = await fetch("https://your-backend-api.com/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("A reset code has been sent to your email.");
        navigate("/change-password"); // تغییر مسیر به صفحه ChangePassword
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
    */

   
    setTimeout(() => {
      alert("A reset code has been sent to your email.");
      // navigate("/change-password"); 
      setLoading(false);
    }, 2000);
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="body1" gutterBottom>
            Enter your Email Address to receive a password reset code.
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errorMessage && !validateEmail(email))}
            helperText={errorMessage}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Code"
            )}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link href="/" underline="hover" color="primary">
            Go to Homepage
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPassword;

