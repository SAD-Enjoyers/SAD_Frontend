import React, { useState, useEffect } from "react";
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [save, setSave] = useState(false);


  useEffect(() => {
    // if (articleData) {
    //   setTitle(articleData.title || "");
    //   setContent(articleData.text || "");
    //   setAttachment(articleData.attachment || null);
    // }

    const fetchArticleContent = async () => {
      // URL of the API endpoint
      const apiUrl = `/api/v1/article/blog/${articleData.serviceId}`; // Replace with your API URL

      // Make the GET request
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        })
        .then(async (response) => {
          if (response?.data?.data) {
            setTitle(response.data.data.title)
            setContent(response.data.data.text)
            setAttachment(response.data.data.attachment)
          }
          else {
            throw new Error("No transactions data");
          }
        })
        .catch((error) => {
          console.error("Error fetching ArticleContent:", error);
          setSnackbarMessage("Failed to load ArticleContent.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    };

    const fetchAttachment = async () => {
      // URL of the API endpoint
      const apiUrl = `/api/v1/educational-service/upload-attachment`; // Replace with your API URL

      // Make the GET request
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        })
        .then(async (response) => {
          if (response?.data?.data) {
            setTitle(response.data.data.title)
            setContent(response.data.data.text)
            setAttachment(response.data.data.attachment)
          }
          else {
            throw new Error("No transactions data");
          }
        })
        .catch((error) => {
          console.error("Error fetching ArticleContent:", error);
          setSnackbarMessage("Failed to load ArticleContent.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    };
    fetchArticleContent();
  }, [articleData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setSnackbarSeverity("error");
      setSnackbarMessage("File size must be less than 5MB.");
      setSnackbarOpen(true);
      return;
    }
    setAttachment(file);
    setAttachmentName(file.name)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Title and content are required.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/v1/article/blog/${articleData.serviceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: JSON.stringify({
          title: title,
          text: content,
          attachment: attachmentName
        }),
      });
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Article saved successfully!");
      setSnackbarOpen(true);
      setSave(true)
      setTitle("");
      setContent("");
      setAttachment(null);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message || "Failed to save the article. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ margin: "0 auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          defaultValue={title}
          sx={{ backgroundColor: 'white' }}
        />

        <Box sx={{ display: 'flex' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Rich Text Editor
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              style={{ height: "200px", minHeight: "580px", marginBottom: "70px", minWidth: 650, backgroundColor: 'white', borderRadius: 10 }}
            />
          </Box>

          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" gutterBottom>Text Preview</Typography>
            <div
              style={{
                whiteSpace: "pre-wrap",
                border: "1px solid #ddd",
                minWidth: 650,
                padding: "10px",
                minHeight: "600px",
                maxHeight: "250px",
                overflowY: "auto", // enable vertical scrolling
                backgroundColor: 'white'
              }}

              dangerouslySetInnerHTML={{ __html: content }}

            />
          </Box>
        </Box>

        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Upload Attachment
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {attachment && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Selected File: {attachment}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
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
