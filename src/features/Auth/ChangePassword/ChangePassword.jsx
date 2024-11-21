import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
import { Snackbar } from '@mui/material';
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/Visibility";

function ChangePassword() {
  // const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newError = {};

        if (!code) {
            newError.code = 'Recovery code is required';
        }

        if (newPassword !== confirmPassword) {
            newError.confirmPassword = 'Passwords do not match!';
        }

        if (!newPassword) {
            newError.newPassword = 'New password is required';
        } else if (!validatePassword(newPassword)) {
            newError.newPassword = 'New password must be at least 8 characters, including a number, an uppercase letter, and a special character';
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        setLoading(true);
        setError({});
        setSuccessMessage('');
        setSnackbarOpen(false);


        try {
            // Replace with actual API call using fetch (instead of axios)
            // const response = await fetch('/api/reset-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ code, newPassword }),
            // });
            
            // const data = await response.json();

            // If the response is successful, set the success message
            // if (data.status === 200) {
            setSuccessMessage('Password changed successfully!');
            setSnackbarOpen(true);
            setTimeout(() => {
                // Redirect to login page after success
                // navigate('/login'); // Uncomment this line to redirect after success
            }, 3000); // 3 seconds delay before redirect
            // }
        } catch (err) {
            if (err.response) {
                setError({ global: err.response.data.message || 'Error changing password' });
            } else {
                setError({ global: 'Network error' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
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
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                error={Boolean(error.code)}
                                helperText={error.code}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                error={Boolean(error.newPassword)}
                                helperText={error.newPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => togglePasswordVisibility(setShowNewPassword)}>
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
                                type={showConfirmPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                error={Boolean(error.confirmPassword)}
                                helperText={error.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => togglePasswordVisibility(setShowConfirmPassword)}>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
    </Container>
  );
}

export default ChangePassword;
