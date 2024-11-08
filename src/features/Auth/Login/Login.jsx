import * as React from "react";
// import axios from "axios";
import { Container, Paper, TextField, Typography, Link, Button } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState(""); // تغییر از ایمیل به یوزرنیم
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false); // تغییر نام متغیر خطا از ایمیل به یوزرنیم
  const [passwordError, setPasswordError] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState(null);

  // هندل کردن نمایش رمز عبور
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // هندل کردن تغییر یوزرنیم
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (usernameError) setUsernameError(false);
  };

  // هندل کردن تغییر رمز عبور
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);    
    if (passwordError) setPasswordError(false);
  };

  const loginUser = async () => {
    try {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // ارسال یوزرنیم به جای ایمیل
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setLoginSuccess(true);
        console.log("Login successful:", data);
      } else {
        setLoginSuccess(false);
        setFormError(data.message || "Login failed");
      }
    } catch (error) {
      setLoginSuccess(false);
      setFormError("Error logging in. Please try again.");
      console.error("Login error:", error);
    }
  };



  // هندل کردن ارسال فرم
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    if (!username) {
      setUsernameError(true);
      valid = false;
    }

    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      valid = false;
    }

    if (valid) {
      loginUser();
    } else {
      setFormError("Please fill in all fields correctly.");
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: 300,
          height: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h5" component="h2">
          Login
        </Typography>

        <TextField
          id="username"
          error={usernameError}
          label="Username" // تغییر لیبل از ایمیل به یوزرنیم
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
          sx={{ width: "100%", marginBottom: 2 }}
          helperText={usernameError && "Please enter your username."}
        />

        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {passwordError && (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              Password should be 5-20 characters long.
            </Typography>
          )}
        </FormControl>

        {formError && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {formError}
          </Typography>
        )}

        {loginSuccess === true && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            Login successful!
          </Typography>
        )}
        {loginSuccess === false && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Login failed. {formError}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          <Link href="" underline="hover" color="primary">
            Forgot password?
          </Link>
        </Typography>

        <Button
          sx={{ width: "100%" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="signup" underline="hover" color="primary">
            Signup
          </Link>
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link href="/" underline="hover" color="primary">
            Go to Homepage
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
