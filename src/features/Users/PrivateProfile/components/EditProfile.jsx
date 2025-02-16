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

export default function EditProfile({ closeState, fetchData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };
  const submitImage = async (closeState) => {
    if (!selectedImage) {
      submitInformation(false, closeState);

      return;
    }

    // بررسی فرمت فایل
    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(selectedImage.type)) {
      toast.error("Only image files (jpeg, png) are allowed!", {
        autoClose: 3000,
      });

      return;
    }

    const formImage = new FormData();
    formImage.append("image", selectedImage);

    try {
      const response = await fetch("/api/v1/profile/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: formImage,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      submitInformation(data.data.fileName, closeState);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.", {
        autoClose: 3000,
      });
    }
  };
  const submitInformation = (image, closeState) => {
    localStorage.setItem("imageProfile", image);
    const formData = {};
    if (firstName) formData.firstName = firstName;
    if (lastName) formData.lastName = lastName;
    // if (userId) formData.userId = userId;
    // if (email) formData.email = email;
    if (description) formData.description = description;
    if (image) formData.image = image;
    if (address) formData.address = address;

    // Check if formData is empty
    if (Object.keys(formData).length === 0) {
      toast.error("Form data is empty. Please fill in the information.");
      return; // Stop further execution
    }

    const token = localStorage.getItem("token");
    fetch("/api/v1/profile/edit-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-role": localStorage.getItem("role"), // Add role to headers
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Profile updated successfully.");
        setTimeout(() => {
          closeState();
          // fetchData(token);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Request failed. Please try again.");
      });
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageName("");
  };
  const ImageUpload = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          textAlign: "center",
          margin: "0 auto",

          gap: 2,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          width: 200,
          mt: "30px",
          mb: "20px",
        }}
      >
        <Typography variant="h6">Upload an Image</Typography>
        <Button variant="contained" component="label">
          Choose Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {imageName && (
          <TextField
            value={imageName}
            variant="outlined"
            disabled
            fullWidth
            size="small"
            label="Selected File"
          />
        )}
        {previewImage && (
          <Box
            component="img"
            src={previewImage}
            alt="Uploaded Preview"
            sx={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        )}
        {selectedImage && (
          <Button variant="outlined" color="error" onClick={handleClear}>
            Remove Image
          </Button>
        )}
      </Box>
    );
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
        <ImageUpload />
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
          {/* <Grid2 size={5}>
            <TextField
              fullWidth
              label="Username"
              name="userName"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              margin="normal"
            />
          </Grid2>
          <Grid2 size={5}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              margin="normal"
            />
          </Grid2> */}
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
              label="address"
              multiline
              rows={2}
              defaultValue={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="description"
              multiline
              rows={2}
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
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
                submitImage(closeState);
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
