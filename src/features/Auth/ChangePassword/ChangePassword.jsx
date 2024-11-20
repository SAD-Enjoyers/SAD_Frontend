import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Paper, IconButton, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/Visibility';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
  
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const togglePasswordVisibility = (setter) => {
      setter((prev) => !prev);
    };
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      return passwordRegex.test(password);
    };
  



  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper elevation={6} sx={{ padding: 3, borderRadius: 3, boxShadow: 3 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <LockIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Old Password"
        type={showOldPassword ? 'text' : 'password'}
        variant="outlined"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
        error={Boolean(error.oldPassword)}
        helperText={error.oldPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => togglePasswordVisibility(setShowOldPassword)}>
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
  </Grid>

        </form>
      </Paper>
    </Container>
  );
}

export default ChangePassword;
