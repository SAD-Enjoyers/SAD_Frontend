import { Box, Button, Card, Grid2, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddAdmin({ closeState }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [expertId, setExpertId] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [expertIdError, setExpertIdError] = useState(false);

  const cancleHandle = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneNumberError(false);
    setPasswordError(false);
    setExpertIdError(false);
  };

  const submitInformation = (closeState) => {
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneNumberError(false);
    setPasswordError(false);
    setExpertIdError(false);

    let hasError = false;
    if (!firstName) {
      setFirstNameError(true);
      hasError = true;
    }
    if (!lastName) {
      setLastNameError(true);
      hasError = true;
    }
    if (!phoneNumber) {
      setPhoneNumberError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
    if (!expertId) {
      setExpertIdError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const formData = {
      firstName,
      lastName,
      phoneNumber,
      password,
      expertId,
    };

    fetch("/api/v1/admin/new-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (
          data.code === 403 &&
          data.message === "There is an expert with same expertId."
        ) {
          toast.error("There is an expert with same expertId.");
        }
        if (data.status === "success") {
          toast.success("Admin successfully added");
        }
        if (data.code === 403 && data.message === "Invalid or expired token.") {
          toast.success("Invalid or expired token.");
        }
        setTimeout(() => {
          closeState();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while adding the admin");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f0f8ff",
        minHeight: "80vh",
      }}
    >
      <Card
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 400,
          backgroundColor: "#e6f7ff",
          borderRadius: 4,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Admin
        </Typography>
        <Grid2
          container
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid2 size={12}>
            <TextField
              label="Expert ID"
              name="expertId"
              value={expertId}
              onChange={(e) => {
                setExpertId(e.target.value);
                setExpertIdError(false);
              }}
              margin="normal"
              fullWidth
              error={expertIdError}
              helperText={expertIdError ? "This field is required." : ""}
            />
          </Grid2>
          <Grid2 size={5}>
            <TextField
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(false);
              }}
              margin="normal"
              fullWidth
              error={firstNameError}
              helperText={firstNameError ? "This field is required." : ""}
            />
          </Grid2>
          <Grid2 size={5}>
            <TextField
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(false);
              }}
              margin="normal"
              fullWidth
              error={lastNameError}
              helperText={lastNameError ? "This field is required." : ""}
            />
          </Grid2>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "20.4ch" } }}
            noValidate
            autoComplete="off"
            display={"flex"}
            gap={0.4}
            marginTop={"0px"}
          >
            <TextField
              id="outlined-multiline-static"
              label="Phone Number"
              multiline
              rows={1}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setPhoneNumberError(false);
              }}
              fullWidth
              error={phoneNumberError}
              helperText={phoneNumberError ? "This field is required." : ""}
            />
            <TextField
              id="outlined-multiline-static"
              label="Password"
              multiline
              rows={1}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              fullWidth
              error={passwordError}
              helperText={passwordError ? "This field is required." : ""}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              sx={{
                color: "#0077b6",
                borderColor: "#0077b6",
                "&:hover": {
                  backgroundColor: "#caf0f8",
                  borderColor: "#023e8a",
                },
              }}
              onClick={() => {
                closeState;
                cancleHandle();
              }}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0077b6",
                "&:hover": {
                  backgroundColor: "#023e8a",
                },
              }}
              onClick={() => {
                submitInformation(closeState);
              }}
            >
              Save
            </Button>
          </Box>
        </Grid2>
        <ToastContainer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "100px",
          }}
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Card>
    </Box>
  );
}
