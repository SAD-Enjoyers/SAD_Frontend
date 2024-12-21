import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Image, Close, Warning } from "@mui/icons-material";

  
  export default function AddCourse() {
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [level, setLevel] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false); // State for dialog
    const [successMessage, setSuccessMessage] = useState(""); // Success message state
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    const newErrors = {};
    if (!courseName.trim()) newErrors.courseName = "Course name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!price || price <= 0) newErrors.price = "Valid price is required";
    if (!duration || duration <= 0)
      newErrors.duration = "Valid duration is required";
    if (!level) newErrors.level = "Level is required";

    // Ensure that either image is uploaded
    if (!image) {
      newErrors.media = "Please upload an image";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // If no errors, open confirmation dialog
      setOpenDialog(true);
    }
  };
  const handleDialogClose = (confirm) => {
    if (confirm) {
      setSuccessMessage("Course added successfully!"); // Set success message
    }
    setOpenDialog(false); // Close the dialog
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select a valid image");
    }
  };
  
  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Course Name"
              variant="outlined"
              fullWidth
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              error={!!errors.courseName}
              helperText={errors.courseName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === "string" ? value.split(",") : value
    );
  };
  <Grid item xs={12} textAlign="center">
  <Button
    type="submit"
    variant="contained"
    color="primary"
    sx={{ padding: "10px 50px", backgroundColor: "#0056b3" }}
  >
    Add Course
  </Button>
</Grid>
