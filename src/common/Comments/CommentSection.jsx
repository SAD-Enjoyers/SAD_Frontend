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
  Alert,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";

const CommentSection = ({ serviceId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setTotalPages(response.data.totalPages); // Adjust based on your response structure
    } catch (error) {
      console.error("Error fetching comments:", error);
      setErrorMessage("Failed to load comments. Please try again later.");
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
      const response = await axiosInstance.post("/add-comment", payload);
      setNewComment("");
      fetchComments(); // Refresh comments after posting
      setSuccessMessage("Comment posted successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage("Failed to post comment. Please try again.");
    }
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
                  {comment.userId.charAt(0).toUpperCase()}{" "}
                  {/* Avatar initials */}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.userId} {/* Display username */}
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

      {/* Error Message Snackbar */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert
          onClose={() => setErrorMessage("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Success Message Snackbar */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CommentSection;
