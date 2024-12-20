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

const ArticleSettings = ({ articleData, accessToken }) => {
  const [newImage, setNewImage] = useState(null); // New image file
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [uploadedImage, setUploadedImage] = useState(articleData.image); // Updated image state

  // Editable article data states
  const [name, setName] = useState(articleData.name);
  const [description, setDescription] = useState(articleData.description);
  const [level, setLevel] = useState(articleData.level);
  const [price, setPrice] = useState(articleData.price);
  const [activityStatus, setActivityStatus] = useState("Active");

  const [tag1, setTag1] = useState(articleData.tag1);
  const [tag2, setTag2] = useState(articleData.tag2);
  const [tag3, setTag3] = useState(articleData.tag3);

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

    // Initialize selectedTags with existing examData tags
    setSelectedTags(
      [articleData.tag1, articleData.tag2, articleData.tag3].filter(Boolean) // Filter out null or undefined tags
    );

    fetchCategories();
  }, [articleData]);





  const handleTagChange = (event) => {
    const { value } = event.target;

    // Ensure selected tags are unique and limited to 3
    if (value.length <= 3) {
      setSelectedTags(value);
    } else {
      alert("You can only select up to 3 tags.");
    }
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Upload new image and update article data
  const uploadNewImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      setIsUploading(true);

      // Upload the new image
      const response = await axios.post(
        "/api/v1/educational-service/upload-fileName",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
            "x-role": localStorage.getItem("role"),
          },
        }
      );

      const newImageName = response.data.data.image; // Get the new image name
      setUploadedImage(newImageName);

      // Extract and prepare the updated article data
      const updatedArticleData = {
        articleId: articleData.articleId,
        title,
        description,
        tag1,
        tag2,
        tag3,
        activityStatus,
        price: parseFloat(price),
        level,
        image: newImageName,
      };

      // Send updated article data to the backend
      await axios.post("/api/v1/article/edit-article", updatedArticleData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("Image updated and article data saved successfully!");
    } catch (error) {
      console.error("Error updating image or article data:", error);
      alert("Failed to update image or article data.");
    } finally {
      setIsUploading(false);
      setNewImage(null);
    }
  };

  // Handle form data changes
  const handleSaveChanges = async () => {
    try {

      // Map selected tags to tag1, tag2, tag3, and fill with null for unselected tags
      const updatedTags = [
        selectedTags[0] || null, // First tag or null
        selectedTags[1] || null, // Second tag or null
        selectedTags[2] || null, // Third tag or null
      ];

      const updatedArticleData = {
        articleId: articleData.articleId,
        title,
        description,
        tag1: updatedTags[0],
        tag2: updatedTags[1],
        tag3: updatedTags[2],
        activityStatus,
        price: parseFloat(price),
        image: uploadedImage,
      };

      await axios.post("/api/v1/article/edit-article", updatedArticleData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      alert("Article data updated successfully!");
      setSelectedTags(selectedTags);
    } catch (error) {
      console.error("Error updating article data:", error);
      alert("Failed to update article data.");
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Image and Description in a row layout */}
      <Grid item xs={12} container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Current Image:</Typography>
          {uploadedImage ? (
            <Avatar
              src={uploadedImage}
              alt="Article Image"
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
          <Typography variant="h6">Article Name:</Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h6">Article Description:</Typography>
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

      {/* Editable Article Data */}
      {/* Tags */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ fontWeight: "500", marginBottom: 1 }}>
          <LocalOfferIcon sx={{ marginRight: 1, color: "#0288D1" }} /> Tags:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={selectedTags}
            onChange={handleTagChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: { style: { maxHeight: 200, overflow: "auto" } },
            }}
            sx={inputStyles}
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

export default ArticleSettings;
