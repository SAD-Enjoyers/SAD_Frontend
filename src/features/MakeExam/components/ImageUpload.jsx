import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImageName("");
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
        mt: "70px",
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
      {selectedImage && (
        <Box
          component="img"
          src={selectedImage}
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

export default ImageUpload;
