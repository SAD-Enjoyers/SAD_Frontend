import '../../../src/App.css'
import React, { useState } from 'react';
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

const ResetPassword = () => {

    
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
      
    
    const validatePasswordStrength = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
      setShowConfirmPassword((show) => !show);


    const handleSubmit = (e) => {
      e.preventDefault();

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
    }
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
            Reset password
        </Typography>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
            
        <Typography variant="p" gutterBottom>
            enter your Email Address to recieve a password reset link
        </Typography>

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
            </div>
            
            {/* {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>} */}
            
            
            <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading}
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
        </Button>
        </form>
        </Box>
        </Container>

    
    
    
    );
         
    }
export default ResetPassword;