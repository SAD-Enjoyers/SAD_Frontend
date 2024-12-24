import React, { useState } from "react";

// Material-UI components
import {
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
  Checkbox,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";

// Material-UI icons
import {
  Image as ImageIcon,
  Description as DescriptionIcon,
  Grade as GradeIcon,
  AttachMoney as AttachMoneyIcon,
  Timelapse as TimelapseIcon,
  Save as SaveIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";

const CourseSettings = () => {
  // Mock data for demonstration
  const courseData = {
    image: "mock-image.jpg",
    name: "Sample Course",
    description: "This is a sample course description.",
    level: "Beginner",
    price: 99.99,
    activityStatus: "Active",
    tags: ["Tag1", "Tag2"],
  };

  // Editable course data states
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(courseData.image);
  const [courseName, setCourseName] = useState(courseData.name);
  const [description, setDescription] = useState(courseData.description);
  const [level, setLevel] = useState(courseData.level);
  const [price, setPrice] = useState(courseData.price);
  const [activityStatus, setActivityStatus] = useState(
    courseData.activityStatus
  );
  const [selectedTags, setSelectedTags] = useState(courseData.tags);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // List of available tags (this can be dynamically fetched if needed)
  const availableTags = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Simulate image upload and save changes
  const uploadNewImage = async () => {
    if (!newImage) return;

    try {
      setIsUploading(true);
      setTimeout(() => {
        const newImageName = "uploaded-mock-image.jpg"; // Mock uploaded image name
        setUploadedImage(newImageName);
        setIsUploading(false);
        setNewImage(null);
        setSnackbarMessage("Image uploaded successfully!");
        setSeverity("success");
        setOpenSnackbar(true);
      }, 1500);
    } catch (error) {
      console.error("Error uploading image:", error);
      setSnackbarMessage("Failed to upload image.");
      setSeverity("error");
      setOpenSnackbar(true);
      setIsUploading(false);
    }
  };

  // Handle tag selection
  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  // Handle form data changes
  const handleSaveChanges = () => {
    const updatedCourseData = {
      name: courseName,
      description,
      level,
      price: parseFloat(price),
      activityStatus,
      image: uploadedImage,
      tags: selectedTags,
    };

    console.log("Updated Course Data:", updatedCourseData);
    setSnackbarMessage("Course data saved successfully!");
    setSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <Grid container spacing={3}>
      {/* Image Section */}
      <Grid item xs={12} sm={4}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 1, color: "#378CE7" }}
        >
          <ImageIcon sx={{ marginRight: 1 }} /> Current Image:
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
          style={{ display: "block", marginBottom: "12px", fontSize: "14px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={uploadNewImage}
          sx={{
            marginTop: 2,
            width: "100%",
            backgroundColor: "#378CE7",
            "&:hover": { backgroundColor: "#67C6E3" },
          }}
          disabled={isUploading || !newImage}
        >
          {isUploading ? "Uploading..." : "Upload & Save Image"}
        </Button>
      </Grid>

      {/* Course Name and Description Section */}
      <Grid item xs={12} sm={8} container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ marginBottom: 1, fontWeight: "bold", color: "#67C6E3" }}
          >
            <DescriptionIcon sx={{ marginRight: 1 }} />
            Course Name:
          </Typography>
          <TextField
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            variant="outlined"
            placeholder="Enter course name"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 1, color: "#67C6E3" }}
          >
            <DescriptionIcon sx={{ marginRight: 1 }} /> Course Description:
          </Typography>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter a brief description"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          />
        </Grid>
      </Grid>

      {/* Editable Course Data */}
      {[
        {
          label: "Level",
          icon: <GradeIcon sx={{ marginRight: 1, color: "#5356FF" }} />,
          value: level,
          onChange: setLevel,
          options: ["Beginner", "Medium", "Advanced"],
        },
        {
          label: "Price",
          icon: <AttachMoneyIcon sx={{ marginRight: 1, color: "#FFAB00" }} />,
          value: price,
          onChange: setPrice,
          type: "number",
        },
        {
          label: "Activity Status",
          icon: <TimelapseIcon sx={{ marginRight: 1, color: "#F9A825" }} />,
          value: activityStatus,
          onChange: setActivityStatus,
          options: ["Active", "Inactive"],
        },
      ].map((field, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Typography
            variant="body1"
            sx={{ marginBottom: 1, fontWeight: "600", color: "#5356FF" }}
          >
            {field.icon} {field.label}:
          </Typography>
          {field.options ? (
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                label={field.label}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              >
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              type={field.type || "text"}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              variant="outlined"
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          )}
        </Grid>
      ))}

      {/* Tags Section next to Activity Status */}
      <Grid item xs={12} sm={4}>
        <Typography
          variant="body1"
          sx={{ marginBottom: 1, fontWeight: "600", color: "#0288D1" }}
        >
          <LocalOfferIcon sx={{ marginRight: 1 }} /> Tags:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={selectedTags}
            onChange={handleTagChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflow: "auto",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          >
            {availableTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            "&:hover": { backgroundColor: "#378CE7" },
          }}
        >
          <SaveIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> Save Changes
        </Button>
      </Grid>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default CourseSettings;
