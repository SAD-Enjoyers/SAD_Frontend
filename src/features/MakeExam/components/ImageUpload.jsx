import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // ذخیره فایل برای ارسال به سرور
      setPreviewImage(URL.createObjectURL(file)); // پیش‌نمایش
      setImageName(file.name);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageName("");
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/v1/educational-service/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // توکن را اینجا اضافه کنید
          "x-role": localStorage.getItem("role"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        maxWidth: 400,
        mt: "30px",
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
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedImage}
      >
        Upload Image
      </Button> */}
    </Box>
  );
};

export default ImageUpload;
