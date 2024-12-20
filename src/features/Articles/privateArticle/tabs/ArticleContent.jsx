import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";

const ArticleContent = ({ articleData, accessToken }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Initialize the fields with article data if available
  useEffect(() => {
    if (articleData) {
      setTitle(articleData.title || "");
      setText(articleData.text || "");
      setAttachment(articleData.attachment || null);
    }
  }, [articleData]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  // Handle form submission (e.g., saving the article data)
  const handleSave = async () => {
    setLoading(true);
    try {

      const response = await fetch("/api/v1/articles/blog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Assuming you pass access token as prop
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
        body: JSON.stringify({
          title: title,
          text: text,
          attachment: attachment
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSnackbarSeverity("success");
      setSnackbarMessage("Article saved successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to save the article. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2, overflowY: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Article Content
      </Typography>

      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="Text"
        variant="outlined"
        multiline
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
        <Typography variant="body1" gutterBottom>
          Attachment
        </Typography>
        <Button variant="outlined" component="label" startIcon={<AttachFile />}>
          Choose File
          <input
            type="file"
            accept="image/*,application/pdf"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {attachment && (
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2">File: {attachment.name}</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save Article"}
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArticleContent;
