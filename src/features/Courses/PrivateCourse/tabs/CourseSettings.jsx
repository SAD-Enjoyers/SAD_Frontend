import React, { useState } from "react";

// Material-UI components
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Material-UI icons
import {
  Image as ImageIcon,
  Description as DescriptionIcon,
  Grade as GradeIcon,
  AttachMoney as AttachMoneyIcon,
  Timelapse as TimelapseIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

const CourseSettings = () => {
  // Mock data for demonstration
  const courseData = {
    image: "mock-image.jpg",
    description: "This is a sample course description.",
    level: "Beginner",
    price: 99.99,
    activityStatus: "Active",
    courseDuration: 30,
  };

  // Editable course data states
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(courseData.image);
  const [description, setDescription] = useState(courseData.description);
  const [level, setLevel] = useState(courseData.level);
  const [price, setPrice] = useState(courseData.price);
  const [activityStatus, setActivityStatus] = useState(
    courseData.activityStatus
  );
  const [courseDuration, setCourseDuration] = useState(
    courseData.courseDuration
  );

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Simulate image upload and save changes
  const uploadNewImage = async () => {
    if (!newImage) return;

    try {
      setIsUploading(true);
      // Simulate image upload delay
      setTimeout(() => {
        const newImageName = "uploaded-mock-image.jpg"; // Mock uploaded image name
        setUploadedImage(newImageName);
        setIsUploading(false);
        setNewImage(null);
        alert("Image uploaded successfully!");
      }, 1500);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
      setIsUploading(false);
    }
  };

  // Handle form data changes
  const handleSaveChanges = () => {
    const updatedCourseData = {
      description,
      level,
      price: parseFloat(price),
      activityStatus,
      image: uploadedImage,
      courseDuration: parseFloat(courseDuration),
    };

    console.log("Updated Course Data:", updatedCourseData);
    alert("Course data saved successfully!");
  };

  return (
    <Grid container spacing={3}>
      {/* Image and Description */}
      <Grid item xs={12} container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            <ImageIcon sx={{ marginRight: 1, color: "#378CE7" }} /> Current
            Image:
          </Typography>
          {uploadedImage ? (
            <Avatar
              src={uploadedImage}
              alt="Course Image"
              sx={{ width: 200, height: 200, marginBottom: 2, boxShadow: 3 }}
            />
          ) : (
            <CircularProgress size={50} sx={{ marginBottom: 2 }} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "12px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={uploadNewImage}
            sx={{
              marginTop: 2,
              width: "100%",
              backgroundColor: "#378CE7",
              "&:hover": {
                backgroundColor: "#67C6E3",
              },
            }}
            disabled={isUploading || !newImage}
          >
            {isUploading ? "Uploading..." : "Upload & Save Image"}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            <DescriptionIcon sx={{ marginRight: 1, color: "#67C6E3" }} /> Course
            Description:
          </Typography>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Editable Course Data */}
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "500" }}>
          <GradeIcon sx={{ marginRight: 1, color: "#5356FF" }} /> Level:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Level</InputLabel>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            label="Level"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "500" }}>
          <AttachMoneyIcon sx={{ marginRight: 1, color: "#FFAB00" }} /> Price:
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "500" }}>
          <TimelapseIcon sx={{ marginRight: 1, color: "#F9A825" }} /> Activity
          Status:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Activity Status</InputLabel>
          <Select
            value={activityStatus}
            onChange={(e) => setActivityStatus(e.target.value)}
            label="Activity Status"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "500" }}>
          <TimelapseIcon sx={{ marginRight: 1, color: "#F9A825" }} /> Course
          Duration (Hours):
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          variant="outlined"
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      </Grid>

      {/* Save Changes Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveChanges}
          sx={{
            padding: "12px 24px",
            width: "100%",
            backgroundColor: "#5356FF",
            "&:hover": {
              backgroundColor: "#378CE7",
            },
          }}
        >
          <SaveIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default CourseSettings;
