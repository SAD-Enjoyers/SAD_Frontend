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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // حالت موفقیت
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/forgetPassword/v1/auth/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        setSuccess(true); // نمایش پیام موفقیت
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
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
      {success ? (
        <Box
          sx={{
            textAlign: "center",
            padding: 3,
            borderRadius: 2,
            backgroundColor: "white",
            boxShadow: 3,
            width: "100%",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 50, color: "#378CE7" }} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Send email successful!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            please Check your email
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/changePassword")} // رفتن به صفحه لاگین
          >
            GO TO change password
          </Button>
        </Box>
      ) : (
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
              error={Boolean(errorMessage)}
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
      )}
    </Container>
  );
};

export default ForgotPassword;
