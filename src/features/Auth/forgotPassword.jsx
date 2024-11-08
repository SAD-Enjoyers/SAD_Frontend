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


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setError('');
      setSuccess('');
    }
      
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const handleSubmit = (e) => {
      e.preventDefault();

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
          error={Boolean("error-message" && !validateEmail(email))}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
        </Button>
        </form>
        </Box>
      </Container>
      
      
    );
  
};  
export default ForgotPassword;