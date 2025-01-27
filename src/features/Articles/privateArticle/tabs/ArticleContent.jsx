import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ArticleContent = ({ articleData, accessToken }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachmentName, setAttachmentName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/article/blog/${articleData.serviceId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response?.data?.data) {
          setTitle(response.data.data.title || "");
          setContent(response.data.data.text || "");
          setAttachmentName(response.data.data.attachment || null);
        } else {
          throw new Error("No article data found.");
        }
      } catch (error) {
        showSnackbar("Failed to load article content.", "error");
      }
    };

    fetchArticleContent();
  }, [articleData, accessToken]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      showSnackbar("File size must be less than 5MB.", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `/api/v1/educational-service/upload-attachment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAttachmentName(response.data.data.fileName || file.name);
      showSnackbar("Attachment uploaded successfully!");
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Failed to upload the attachment.", "error");
    }
  };

  const handlePublicPage = () => {
    navigate("/PublicArticle", { state: { articleData } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      showSnackbar("Title and content are required.", "error");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `/api/v1/article/blog/${articleData.serviceId}`,
        {
          title,
          text: content,
          attachment: attachmentName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      showSnackbar("Article saved successfully!");
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Failed to save the article.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "0 auto", padding: 2, maxWidth: "1350px", width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          sx={{ backgroundColor: "white" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, paddingTop: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rich Text Editor
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              style={{
                padding: "10px",
                minHeight: "400px",
                maxHeight: "1000px",
                overflowY: "auto",
                backgroundColor: "white",
                fontFamily: "'Roboto', 'Arial', sans-serif",

              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              paddingTop: 2,
              maxWidth: { xs: "100%", md: "50%" },
              margin: "0 auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Text Preview
            </Typography>
            <div
              style={{
                padding: "10px",
                minHeight: "400px",
                maxHeight: "1000px",
                overflowY: "auto",
                backgroundColor: "white",
                fontFamily: "'Roboto', 'Arial', sans-serif",
                lineHeight: "1.6",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Box>
        </Box>

        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Upload Attachment
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {attachmentName && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Selected File: {attachmentName}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>

      <Button
        color="primary"
        fullWidth
        onClick={handlePublicPage}
        sx={{ marginTop: 3 }}
      >
        See Public Page
      </Button>

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
    </div>
  );
};

export default ArticleContent;
