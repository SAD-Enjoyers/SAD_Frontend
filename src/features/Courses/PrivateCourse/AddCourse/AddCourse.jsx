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
import { Alert } from "@mui/material";  // این خط را اضافه کنید


  
  export default function AddCourse() {
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [level, setLevel] = useState("");
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false); // State for dialog
    const [successMessage, setSuccessMessage] = useState(""); // Success message state
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
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
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 13,
        marginBottom: 7,
      }}
    >
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Add New Course
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                component="label"
                fullWidth
                startIcon={<Image />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {image && (
                <Box sx={{ position: "relative", marginTop: 2 }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "8px",
                      border: "2px solid #8e44ad",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#ffdddd",
                      },
                    }}
                    onClick={() => setImage(null)} // Remove image
                  >
                    <Close sx={{ color: "#8e44ad" }} />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {image.name}
                  </Typography>
                </Box>
              )}
              {errors.media && (
                <FormHelperText error>{errors.media}</FormHelperText>
              )}
            </Grid>

            {/* Course Name */}
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

            {/* Course Description */}
            <Grid item xs={12}>
              <TextField
                label="Course Description"
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

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                error={!!errors.price}
                helperText={errors.price}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputProps={{ min: "0" }} // Prevent negative values
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (Hours)"
                variant="outlined"
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                error={!!errors.duration}
                helperText={errors.duration}
                type="number"
                inputProps={{ min: "1" }} // Prevent negative values
              />
            </Grid>

            {/* Level */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.level}>
                <InputLabel>Level</InputLabel>
                <Select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  label="Level"
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
                {errors.level && (
                  <FormHelperText>{errors.level}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "#536FFF",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                Add Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "#8e44ad",
            textAlign: "center",
          }}
        >
          <Warning sx={{ color: "#8e44ad", fontSize: "2rem" }} /> Are you sure?
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#333",
            }}
          >
            Do you really want to add this course? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => handleDialogClose(false)}
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              "&:hover": { backgroundColor: "#e53935" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            sx={{
              backgroundColor: "#536FFF",
              color: "#fff",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          {successMessage}
        </Alert>
      )}
    </Container>
  );
}