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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Image as ImageIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";

const ArticleSettings = ({ articleData, accessToken }) => {
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(articleData?.image || "");

  const [name, setName] = useState(articleData?.name || "");
  const [description, setDescription] = useState(articleData?.description || "");
  const [level, setLevel] = useState(articleData?.level || "");
  const [price, setPrice] = useState(articleData?.price || "");
  const [activityStatus, setActivityStatus] = useState("Active");

  const [tag1, setTag1] = useState(articleData?.tag1 || "");
  const [tag2, setTag2] = useState(articleData?.tag2 || "");
  const [tag3, setTag3] = useState(articleData?.tag3 || "");

  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([tag1, tag2, tag3]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        setCategories(response.data.data.categoryList || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    setSelectedTags([tag1, tag2, tag3].filter(Boolean));
    fetchCategories();
  }, [articleData, tag1, tag2, tag3]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTagChange = (event) => {
    const { value } = event.target;
    if (value.length <= 3) {
      setSelectedTags(value);
    } else {
      setSnackbar({
        open: true,
        message: "You can only select up to 3 tags.",
        severity: "warning",
      });
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const uploadNewImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      setIsUploading(true);
      const response = await axios.post(
        "/api/v1/educational-service/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
            "x-role": localStorage.getItem("role"),
          },
        }
      );

      const newImageName = response.data.data.fileName;
      setUploadedImage(newImageName);

      setSnackbar({
        open: true,
        message: "Image uploaded successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setSnackbar({
        open: true,
        message: "Failed to upload image.",
        severity: "error",
      });
    } finally {
      setIsUploading(false);
      setNewImage(null);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedTags = [
        selectedTags[0] || null,
        selectedTags[1] || null,
        selectedTags[2] || null,
      ];

      const updatedArticleData = {
        serviceId: articleData.serviceId,
        title: name,
        description,
        tag1: updatedTags[0],
        tag2: updatedTags[1],
        tag3: updatedTags[2],
        activityStatus,
        price: parseFloat(price),
        image: uploadedImage,
      };

      await axios.put("/api/v1/article/edit-article", updatedArticleData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      setSnackbar({
        open: true,
        message: "Article data updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating article data:", error);
      setSnackbar({
        open: true,
        message: "Failed to update article data.",
        severity: "error",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Current Image:</Typography>
          {uploadedImage ? (
            <Avatar
              src={`/api/v1/uploads/service-images/${uploadedImage}`}
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

      <Grid item xs={12}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
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

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ArticleSettings;
