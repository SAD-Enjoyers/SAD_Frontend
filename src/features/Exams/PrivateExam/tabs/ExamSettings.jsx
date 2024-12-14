import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function EditExam({ examData }) {
  const [formData, setFormData] = useState(examData || {});
  const [openDialog, setOpenDialog] = useState(false); // Dialog visibility
  const [imageFile, setImageFile] = useState(null); // To store uploaded image

  // Handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFile(imageUrl); // Preview image
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl, // Update formData with the new image
      }));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Updated Exam Data:", formData); // Here, you can send data to backend
    setOpenDialog(false); // Close dialog after saving
    alert("Exam information has been updated successfully!");
  };

  // Open confirmation dialog before submission
  const handleSave = () => {
    setOpenDialog(true);
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Edit Exam Information
      </Typography>

      {/* Image upload section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            mb: 2,
            backgroundColor: "#f0f0f0",
          }}
          src={
            imageFile ||
            (formData.image
              ? `/api/v1/uploads/service-images/${formData.image}`
              : "")
          } // Dynamically fetch image from backend
        />
        <input
          accept="image/*"
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Click the icon to change the image
        </Typography>
      </Box>

      {/* Form fields for exam details */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Level"
            name="level"
            value={formData.level || ""}
            onChange={handleChange}
            select
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            type="number"
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Activity Status"
            name="activityStatus"
            value={formData.activityStatus || ""}
            onChange={handleChange}
            select
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Tag 1"
            name="tag1"
            value={formData.tag1 || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Tag 2"
            name="tag2"
            value={formData.tag2 || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Tag 3"
            name="tag3"
            value={formData.tag3 || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Exam Duration (minutes)"
            name="examDuration"
            value={formData.examDuration || ""}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            sx={{
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to save the changes to the exam details?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditExam;
