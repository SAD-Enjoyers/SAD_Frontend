import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import axios from "axios";

const CommentSection = ({ serviceId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Axios instance with token in the headers
  const axiosInstance = axios.create({
    baseURL: "/api/v1/educational-service",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch comments based on page and serviceId
  const fetchComments = async () => {
    try {
      console.log("Fetching comments..."); // Log start of fetch
      const response = await axiosInstance.get(
        `/comments/${serviceId}?page=${page}`
      );
      console.log("Request URL:", `/comments/${serviceId}?page=${page}`);
      console.log("Response Data:", JSON.stringify(response.data, null, 2));

      setComments(response.data.data);
      setTotalPages(5); // Replace with total pages from response if available
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    const payload = {
      serviceId: serviceId,
      text: newComment,
    };

    try {
      console.log("Sending comment payload:", JSON.stringify(payload, null, 2));
      const response = await axiosInstance.post("/add-comment", payload);
      console.log("Response Data:", JSON.stringify(response.data, null, 2));

      setNewComment("");
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        {/* Add Comment */}
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
        >
          Post Comment
        </Button>

        {/* List of Comments */}
        <Typography variant="h6" sx={{ mt: 4 }}>
          Comments
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <Card key={comment.commentId} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                User: {comment.userId}
              </Typography>
              <Typography variant="body1">{comment.text}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {new Date(comment.date).toLocaleString()}
              </Typography>
            </Card>
          ))}
        </Stack>

        {/* Pagination */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      </CardContent>
    </Card>
  );
};

export default CommentSection;
