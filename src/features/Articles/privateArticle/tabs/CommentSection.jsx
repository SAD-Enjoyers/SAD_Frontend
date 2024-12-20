import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem } from '@mui/material';

const CommentSection = ({ articleId, accessToken }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Assume we fetch comments from an API

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    // Post comment logic (e.g., API call)
    const newComment = {
      user: "User Name",
      text: comment,
    };
    setComments([...comments, newComment]);
    setComment(""); // Clear the comment field
  };

  return (
    <Box>
      <Typography variant="h6">Comments</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        label="Add a comment"
        variant="outlined"
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handlePostComment}>
          Post Comment
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">All Comments</Typography>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <Typography variant="body2">{comment.user}: {comment.text}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CommentSection;
