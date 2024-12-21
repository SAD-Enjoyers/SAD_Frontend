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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { keyframes } from "@mui/system";

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
  const [value, setValue] = useState();
  const [maxMembers, setMaxMembers] = useState(10);
  const [price, setPrice] = useState(10);
  const [minScore, setMinScore] = useState(50);
  const [examName, setExamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imageNameUrl, setImageNameurl] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [examNameError, setExamNameError] = useState("");
  const [selectedLevelError, setSelectedLevelError] = useState("");
  const [selectedSubjectsError, setSelectedSubjectsError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [minScoreError, setMinScoreError] = useState("");

  const validateFields = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.author) newErrors.author = "Author name is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.content || formData.content.trim() === "")
      newErrors.content = "Article content cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    // پیام تایید با Toastify
    toast.success("Article submitted successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // تمیزکاری فرم
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
    <Container maxWidth="md" sx={{ marginTop: 14, marginBottom: 14 }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 4, animation: `${fadeIn} 0.5s ease-out` }}
      >
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
                "& .MuiInputBase-root": {
                  backgroundColor: "#f4f7fc",
                  borderRadius: "8px",
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
                "& .MuiInputBase-root": {
                  backgroundColor: "#f4f7fc",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#f4f7fc",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 7 }}>
            <Typography variant="h6" gutterBottom>
              Content
            </Typography>
            <TextField
              id="content-editor"
              label="Write your article..."
              multiline
              rows={8} // تعداد خطوط اولیه
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Write your article..."
              variant="outlined"
              error={!!errors.content} // نمایش خطا در صورت وجود
              helperText={errors.content ? "This field is required." : ""}
              sx={{
                width: "100%",
                maxWidth: "600px", // محدود کردن عرض
                backgroundColor: "#f4f7fc",
                borderRadius: "8px",
                fontFamily: "'Roboto', sans-serif",
              }}
            />
          </Box>
          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={handlePreview} fullWidth>
              Preview
            </Button>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Box>
        </form>

        {/* Preview Section - نمایش پریویو به صورت دیالوگ */}
        <Dialog
          open={showPreview}
          onClose={() => setShowPreview(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Article Preview</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                padding: 3,
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Right Section (Text) */}
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {formData.title || "Untitled"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "#555" }}
                >
                  By {formData.author || "Unknown"} - {formData.date || "No Date"}
                </Typography>
                <Box
                  sx={{
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {formData.content || "No content available."}
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPreview(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

export default AddArticle;
