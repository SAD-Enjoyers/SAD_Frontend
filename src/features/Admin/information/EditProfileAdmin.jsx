import {
  Box,
  Button,
  Card,
  Grid2,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function EditProfile({ closeState }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const submitInformation = (closeState) => {
    const formData = {};
    if (firstName) formData.firstName = firstName;
    if (lastName) formData.lastName = lastName;
    if (password) formData.password = password;
    if (phoneNumber) formData.phoneNumber = phoneNumber;

    fetch("/api/v1/admin/edit-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"), // Add role to headers
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("change profile successfully");
        setTimeout(() => {
          closeState();
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Card
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 400,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>
        <Grid2
          container
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid2 size={5}>
            <TextField
              // fullWidth
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              margin="normal"
            />
          </Grid2>
          <Grid2 size={5}>
            <TextField
              // fullWidth
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              margin="normal"
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
            {" "}
            <TextField
              id="outlined-multiline-static"
              label="phoneNumber"
              multiline
              rows={1}
              defaultValue={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="password"
              multiline
              rows={1}
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={closeState}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
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
