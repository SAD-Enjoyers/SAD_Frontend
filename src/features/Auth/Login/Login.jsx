import * as React from "react";
import { Container, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";


const Login = () => {
  // Password Field
  const [showPassword, setShowPassword] = React.useState(false);

  //   // Inputs
  //   const { emailInput, setEmailInput } = useState();
  //   const { passwordInput, setPasswordInput } = useState();

  //   // // Input Error
  //   const[emailError,setEmailError]=useState(false);
  //   const[passwordError,setPasswordError]=useState(false);

  //   //Form Validity
  //   const[formValid,setFormValid]=useState();
  //   const[success,setSuccess]=useState();

  //Validation for onBlur Email
  //    const handleEmail=()=>{
  //   if (!isEmail(emailInput)){
  //     setEmailError(false);
  //   }

  // }

  //Validation for onBlur Password
// const handlePassword = () =>{
//   if(
// !passwordInput || passwordInput.length < 5 || passwordInput.length > 20

//   ){

//     setPasswordError(true);
//     return;
//   }
//   setPasswordError(false);
// }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      sx={{
        height: "100vh", // ارتفاع کامل صفحه برای وسط‌چینی
        display: "flex",
        alignItems: "center", // وسط‌چین عمودی
        justifyContent: "center", // وسط‌چین افقی
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: 300,
          height: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography sx={{mb:2}} variant="h5" component="h2">
          Login
        </Typography>

        <TextField
          id="outlined-basic"
          // error={emailError}
          label="Email"
          //   value={emailInput}
          // onChange={(event) => setEmailInput(event.target.value)}
          variant="outlined"
          sx={{ width: "100%", marginBottom: 2 }}
        />

        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            // error={passwordError}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            // value={passwordInput}
            // onChange={(event) => setPasswordInput(event.target.value)}
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
        </FormControl>

        <Typography variant="body2" sx={{ mt: 2,mb:2 }}>
          <Link href="" underline="hover" color="primary">
            Forgot password?
          </Link>
        </Typography>

        <Button sx={{width:"100%"}} variant="contained">Login</Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Dont have an account?{" "}
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
