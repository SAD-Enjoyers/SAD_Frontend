import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { keyframes } from '@mui/system';

// تعریف انیمیشن
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AddArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.author) newErrors.author = "Author name is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.content || formData.content === "<p><br></p>")
      newErrors.content = "Article content cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    toast.success("Article submitted successfully!");
    setFormData({
      title: "",
      author: "",
      content: "",
      date: "",
    });
    setShowPreview(false);
  };

  const handlePreview = () => {
    if (validateFields()) setShowPreview(true);
  };
  return (
    <Container maxWidth="md" sx={{ marginTop: 6 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, animation: `${fadeIn} 0.5s ease-out` }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Article
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#f4f7fc',
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Author"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              error={!!errors.author}
              helperText={errors.author}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#f4f7fc',
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content
            </Typography>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => handleChange("content", value)}
              placeholder="Write your article..."
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["link", "image"], // اضافه کردن آیکون تصویر در نوار ابزار
                  ["blockquote", "code-block"],
                  [{ align: [] }],
                  ["clean"],
                ],
              }}
              style={{
                height: "250px",
                border: errors.content ? "1px solid red" : "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f4f7fc",
                fontFamily: "'Roboto', sans-serif", // اضافه کردن فونت
              }}
            />
          </Box>