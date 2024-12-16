import React, { useState, useEffect } from "react";
import axios from "axios";

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
  Checkbox,
  ListItemText,
} from "@mui/material";

const ExamSettings = ({ examData, accessToken }) => {
  const [newImage, setNewImage] = useState(null); // New image file
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [uploadedImage, setUploadedImage] = useState(examData.image); // Updated image state

  // Editable exam data states
  const [description, setDescription] = useState(examData.description);
  const [level, setLevel] = useState(examData.level);
  const [price, setPrice] = useState(examData.price);
  const [activityStatus, setActivityStatus] = useState("Active");
  const [examDuration, setExamDuration] = useState(35);

  // Editable tags states
  const [tag1, setTag1] = useState(examData.tag1);
  const [tag2, setTag2] = useState(examData.tag2);
  const [tag3, setTag3] = useState(examData.tag3);

  // Categories fetched from the API
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([tag1, tag2, tag3]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        if (response.data.status === "success") {
          setCategories(response.data.data.categoryList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Upload new image and update exam data
  const uploadNewImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      setIsUploading(true);

      // Upload the new image
      const response = await axios.post(
        "/api/v1/educational-service/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImageName = response.data.data.image; // Get the new image name
      // Log the previous and new image names to the console
      console.log("Previous Image:", uploadedImage);
      console.log("New Image:", newImageName);
      setUploadedImage(newImageName);

      // Log the previous and new image names
      console.log("Previous Image:", uploadedImage);
      console.log("New Image:", newImageName);

      // Extract and prepare the updated parameters
      const updatedExamData = {
        serviceId: examData.serviceId,
        description,
        level,
        price: parseFloat(price), // Ensure price is a number
        activityStatus,
        image: newImageName,
        tag1,
        tag2,
        tag3,
        examDuration,
      };
      console.log("updatedExamData:", JSON.stringify(updatedExamData, null, 2));

      // Send updated exam data to the backend
      await axios.post("/api/v1/exam/edit-exam", updatedExamData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("Image updated and exam data saved successfully!");
    } catch (error) {
      console.error("Error updating image or exam data:", error);
      alert("Failed to update image or exam data.");
    } finally {
      setIsUploading(false);
      setNewImage(null);
    }
  };

  // Handle form data changes

  const handleSaveChanges = async () => {
    try {
      const updatedExamData = {
        serviceId: examData.serviceId,
        description,
        level,
        price: parseFloat(price), // Ensure price is a number
        activityStatus,
        image: uploadedImage,
        tag1: selectedTags[0] || null, // Set tag1, tag2, tag3 to null if not selected
        tag2: selectedTags[1] || null,
        tag3: selectedTags[2] || null,
        examDuration,
      };
      console.log("updatedExamData:", JSON.stringify(updatedExamData, null, 2));

      await axios.post("/api/v1/exam/edit-exam", updatedExamData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("Exam data updated successfully!");
    } catch (error) {
      console.error("Error updating exam data:", error);
      alert("Failed to update exam data.");
    }
  };
  const handleTagChange = (event) => {
    const { value } = event.target;

    // Limit the selected tags to a maximum of 3
    if (value.length <= 3) {
      // If user selects 1 or 2 tags, set unselected tags to null
      if (value.length === 1) {
        setTag2(null);
        setTag3(null);
      } else if (value.length === 2) {
        setTag3(null);
      } else {
        // If all 3 tags are selected, set the tags accordingly
        setTag1(value[0]);
        setTag2(value[1] || null);
        setTag3(value[2] || null);
      }

      setSelectedTags(value); // Update selected tags
    } else {
      alert("You can only select up to 3 tags.");
    }
  };

  return (
    // Inside the return function
    <Grid container spacing={2}>
      {/* Image and Description in a row layout */}
      <Grid item xs={12} container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Current Image:</Typography>
          {uploadedImage ? (
            <Avatar
              src={`/api/v1/uploads/service-images/${uploadedImage}`}
              alt="Exam Image"
              sx={{ width: 200, height: 200, marginBottom: 2 }}
            />
          ) : (
            <CircularProgress />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={uploadNewImage}
            sx={{ marginTop: 2 }}
            disabled={isUploading || !newImage}
          >
            {isUploading ? "Uploading..." : "Upload & Save Image"}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="h6">Exam Description:</Typography>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
      </Grid>

      {/* Editable Exam Data */}
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Level:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Level</InputLabel>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            label="Level"
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Price:
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Activity Status:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Activity Status</InputLabel>
          <Select
            value={activityStatus}
            onChange={(e) => setActivityStatus(e.target.value)}
            label="Activity Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Exam Duration:
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={examDuration}
          onChange={(e) => setExamDuration(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
      </Grid>

      {/* Tags Section */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Tags:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={selectedTags}
            onChange={handleTagChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.category}>
                <Checkbox
                  checked={selectedTags.indexOf(category.category) > -1}
                />
                <ListItemText primary={category.category} />
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
          sx={{ padding: "10px 20px", width: "100%" }}
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExamSettings;
