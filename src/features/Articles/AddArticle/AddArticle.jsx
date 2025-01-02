import {
  Avatar,
  Box,
  Container,
  Grid2,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { School, SchoolOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MakeArticle() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(10);
  const [categories, setCategories] = useState([]);
  const [activityStatus, setActivityStatus] = useState("Active");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = name.trim() && description.trim() && level && activityStatus;

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }

    submitImage();
  };

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        const fetchedCategories = response.data.data.categoryList || [];
        setCategories(fetchedCategories);
        setLoading(false);
        localStorage.setItem("categoryList", JSON.stringify(fetchedCategories));
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
        navigate("/profile");
      }
    };

    const storedCategoryList = localStorage.getItem("categoryList");
    if (!storedCategoryList) {
      fetchCategories();
    } else {
      try {
        const parsedCategoryList = JSON.parse(storedCategoryList);
        setCategories(parsedCategoryList);
        // console.log(parsedCategoryList[0]);
      } catch (error) {
        console.error("Error parsing category list from localStorage:", error);
        // Optional: Handle the case where parsing fails, e.g., clear invalid data
        localStorage.removeItem("categoryList");
      }
      setLoading(false);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageName("");
  };

  const submitImage = async () => {
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      submitArticle(data.data.fileName);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const submitArticle = (image) => {
    var [tag1, tag2, tag3] = [...selectedSubjects];

    const formData = {
      name,
      description,
      level,
      activityStatus,
      price: parseInt(price),
      image,
      tag1,
      tag2,
      tag3,
    };

    console.log(formData);

    fetch("/api/v1/article/make-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Article created successfully");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        border: "2px solid #378CE7",
        mt: "150px",
        mb: "150px",
        borderRadius: "70px",
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <Grid2 container alignItems="center" justifyContent="center">
          <Grid2 size={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Level</InputLabel>
                <Select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Price ($)"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Activity Status</InputLabel>
                <Select
                  value={activityStatus}
                  onChange={(e) => setActivityStatus(e.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{ mt: 3 }}
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
                <Button variant="outlined" color="error" onClick={handleClearImage}>
                  Remove Image
                </Button>
              )}
            </Box>
          </Grid2>

          <Grid2 size={4}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>Subjects</InputLabel>

              <Select
                multiple
                value={selectedSubjects}
                onChange={(e) => {
                  handleSubjectChange(e);
                }}
                label="Subjects"
                renderValue={(selected) => selected.join(", ")} // Comma-separated values
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224, // حداکثر ارتفاع منو
                      width: 250, // عرض منو
                    },
                  },
                }}
                sx={{
                  backgroundColor: "#ffffff", // Clean white background
                  borderRadius: "8px", // Rounded corners
                  borderColor: "#E0E0E0", // Lighter border color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0", // Light grey border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#378CE7", // Hover effect with blue border
                  },
                  "& .MuiSelect-icon": {
                    color: "#378CE7", // Icon color matches theme
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.category}
                  >
                    <Checkbox
                      checked={selectedSubjects.includes(category.category)}
                      sx={{
                        color: "#378CE7", // Checkbox icon color matches theme
                        "&.Mui-checked": {
                          color: "#378CE7", // Checked state color
                        },
                      }}
                    />
                    <ListItemText primary={category.category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12}>
            <Box textAlign="center" mt={3} mb={5}>
              <Button type="submit" variant="contained" color="primary">
                Make Article
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}
