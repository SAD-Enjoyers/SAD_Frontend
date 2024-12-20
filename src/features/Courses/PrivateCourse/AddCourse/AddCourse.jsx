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
  