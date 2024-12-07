import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";

function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      text: "This is a comment from the user.",
      isAdmin: false,
      replies: [],
    },
    {
      id: 2,
      user: "Admin",
      text: "This is a reply from the admin.",
      isAdmin: true,
      replies: [],
    },
    {
      id: 3,
      user: "Jane Smith",
      text: "I have a question about this.",
      isAdmin: false,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Keeps track of the comment being replied to

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "User", // Replace with actual user name logic
          text: newComment,
          isAdmin: false,
          replies: [],
        },
      ]);
      setNewComment(""); // Clear the input after submission
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim() !== "") {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: comment.replies.length + 1,
                user: "Admin",
                text: replyText,
                isAdmin: true,
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText(""); // Clear the reply input
      setReplyingTo(null); // Close the reply field
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Comment Section
      </Typography>

      {/* Display existing comments */}
      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            <Paper
              sx={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: comment.isAdmin ? "#e3f2fd" : "#ffffff",
                boxShadow: 2,
                borderRadius: "8px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ marginRight: "10px", backgroundColor: "#1976d2" }}
                >
                  {comment.user[0]}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: comment.isAdmin ? "bold" : "normal",
                    color: comment.isAdmin ? "#1976d2" : "text.primary",
                  }}
                >
                  {comment.user}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  marginTop: "10px",
                  textAlign: "left",
                  color: "text.secondary",
                }}
              >
                {comment.text}
              </Typography>

              {comment.isAdmin && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    textAlign: "left",
                    marginTop: "10px",
                    fontStyle: "italic",
                  }}
                >
                  Admin Reply
                </Typography>
              )}

              {/* Display replies */}
              <List sx={{ marginTop: "10px", paddingLeft: "20px" }}>
                {comment.replies.map((reply) => (
                  <ListItem key={reply.id} sx={{ padding: "5px 0" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{ marginRight: "10px", backgroundColor: "#1976d2" }}
                      >
                        {reply.user[0]}
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: reply.isAdmin ? "bold" : "normal",
                          color: reply.isAdmin ? "#1976d2" : "text.primary",
                        }}
                      >
                        {reply.user}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: "5px",
                        color: reply.isAdmin ? "#1976d2" : "text.secondary",
                      }}
                    >
                      {reply.text}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              {/* Admin reply field */}
              {replyingTo === comment.id && (
                <Box sx={{ marginTop: "10px" }}>
                  <TextField
                    label="Write a reply"
                    variant="outlined"
                    fullWidth
                    value={replyText}
                    onChange={handleReplyChange}
                    multiline
                    rows={3}
                    sx={{ marginBottom: "10px" }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleReplySubmit(comment.id)}
                    sx={{
                      backgroundColor: "#1976d2",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    Submit Reply
                  </Button>
                </Box>
              )}

              {/* Reply button for Admin */}
              {!comment.isAdmin && (
                <Button
                  variant="outlined"
                  onClick={() => setReplyingTo(comment.id)}
                  sx={{
                    marginTop: "10px",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  Reply
                </Button>
              )}
            </Paper>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ margin: "20px 0" }} />

      {/* Add new comment */}
      <TextField
        label="Add a Comment"
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={handleCommentChange}
        sx={{ marginBottom: "10px" }}
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        onClick={handleCommentSubmit}
        sx={{
          width: "100%",
          backgroundColor: "#1976d2",
          marginTop: "10px",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default CommentSection;
