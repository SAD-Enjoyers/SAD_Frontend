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
          {/* Form fields go here */}
        </form>
      </Paper>
    </Container>
  );
}

export default ChangePassword;
