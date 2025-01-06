import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Pagination,
  Snackbar,
  Avatar,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import axios from "axios";

const CommentSection = ({ serviceId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "/api/v1/educational-service",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/comments/${serviceId}?page=${page}`
      );
      setComments(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Comments not found.");
        return; // Do nothing for 404 errors
      }
      console.error("Error fetching comments:", error);
      showSnackbar("Network is bad. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  const handleAddComment = async () => {
    const payload = {
      serviceId: serviceId,
      text: newComment,
    };

    try {
      await axiosInstance.post("/add-comment", payload);
      setNewComment("");
      showSnackbar("Comment posted successfully!", "success");
      fetchComments(); // Refresh comments after posting
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Service not found.");
        return; // Do nothing for 404 errors
      }
      console.error("Error adding comment:", error);
      showSnackbar("Failed to post comment. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severityType) => {
    setSnackbarMessage(message);
    setSeverity(severityType);
    setOpenSnackbar(true);
  };

  return (
    <Card sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          disabled={!newComment}
          sx={{ mb: 2 }}
        >
          Post Comment
        </Button>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Comments
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <Card key={comment.commentId} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {comment.userId.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.userId}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {comment.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {new Date(comment.date).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
            </Card>
          ))}
        </Stack>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      </CardContent>

      {/* Snackbar for success/error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CommentSection;
