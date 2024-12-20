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
    Checkbox,
    ListItemText,
    FormHelperText,
    CircularProgress,
  } from "@mui/material";
  import {
    MonetizationOn,
    AccessTime,
    School,
    UploadFile,
  } from "@mui/icons-material";
  import React, { useState } from "react";
  export default function AddCourse() {
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [durationHours, setDurationHours] = useState("");
    const [level, setLevel] = useState("");
    const [categories, setCategories] = useState([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
      { id: 3, name: "Programming" },
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    const newErrors = {};
    if (!courseName.trim()) newErrors.courseName = "Course name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!price) {
      newErrors.price = "Price is required.";
    } else if (price < 0) {
      newErrors.price = "Price cannot be negative.";
    }
    if (!durationHours || durationHours < 0) {
      newErrors.duration = "Duration must be a positive value.";
    }
    if (!level) newErrors.level = "Level is required.";
    if (selectedCategories.length === 0)
      newErrors.categories = "At least one category must be selected.";
    if (!image) newErrors.image = "Course image is required.";
    if (!video) newErrors.video = "Course video is required.";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      console.log({
        courseName,
        description,
        price,
        duration: durationHours,
        level,
        selectedCategories,
        image,
        video,
      });
      alert("Course added successfully!");
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      alert("Only JPEG images are allowed.");
    }
  };
  
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(file);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };
  