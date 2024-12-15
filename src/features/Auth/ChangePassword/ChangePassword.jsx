import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Snackbar } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Visibility, VisibilityOff } from "@mui/icons-material";
function ChangePassword() {
  const navigate = useNavigate();
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const validatePassword = (password) => {
    // const passwordRegex =
    //   /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newError = {};

    if (!recoveryCode) {
      newError.code = "Recovery code is required";
    }

    if (newPassword !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match!";
    }

    const email = localStorage.getItem("userEmail");

    if (!newPassword) {
      newError.newPassword = "New password is required";
    } else if (!validatePassword(newPassword)) {
      newError.newPassword =
        "New password must be at least 8 characters, including a number, an uppercase letter, and a special character";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setLoading(true);
    setError({});
    setSuccessMessage("");
    setSnackbarOpen(false);
    console.log(recoveryCode, email, newPassword);

    try {
      const response = await fetch("/api/v1/auth/verify-recovery-code", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, recoveryCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // اگر تغییر رمز عبور موفق بود، پیام موفقیت نمایش دهید و کاربر را به صفحه ورود هدایت کنید
        setSuccessMessage("Password changed successfully!");
        // localStorage.removeItem("userEmail");
        // navigate("/login"); // هدایت به صفحه ورود
      } else {
        // اگر درخواست موفق نبود، پیام خطا نمایش دهید
        console.error("Error:", data.message || "Something went wrong.");
        alert(
          data.message || "Failed to change the password. Please try again."
        );
      }
    } catch (error) {
      // خطاهای مربوط به شبکه یا سایر مشکلات غیرمنتظره
      console.error("Catch Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      // در هر صورت، مقدار `setLoading` به false تنظیم می‌شود
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // صفحه کامل
      }}
    >
      {successMessage ? (
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
            Password Changed Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Please log in with your new password.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/login")} // رفتن به صفحه لاگین
          >
            Go to Login
          </Button>
        </Box>
      ) : (
        <Paper elevation={6} sx={{ padding: 3, borderRadius: 3, boxShadow: 3 }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <LockIcon sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Recovery Code"
                  variant="outlined"
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  required
                  error={Boolean(error.code)}
                  helperText={error.code}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  error={Boolean(error.newPassword)}
                  helperText={error.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  error={Boolean(error.confirmPassword)}
                  helperText={error.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                {loading ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled
                  >
                    Changing...
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Change Password
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
          {error.global && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ marginTop: 2 }}
            >
              {error.global}
            </Typography>
          )}

          {/* Snackbar for success message */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={successMessage}
          />
        </Paper>
      )}
    </Container>
  );
}

export default ChangePassword;
