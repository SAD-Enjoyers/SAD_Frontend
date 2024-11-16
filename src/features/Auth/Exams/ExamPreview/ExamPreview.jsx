import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Snackbar,
} from "@mui/material";

const selectedExam = {
  id: 1,
  name: "Advanced Math Exam",
  description:
    "A comprehensive exam covering advanced calculus, algebra, and geometry.",
  score: 98,
  provider: "Math Institute",
  image: "public/images/cooperation.jpg",
  price: 49.99,
  questions: [
    { id: 1, title: "What is the derivative of sin(x)?" },
    { id: 2, title: "Solve the integral of x^2 dx." },
    { id: 3, title: "Prove that every group of prime order is cyclic." },
  ],
};

const mockComments = [
  { id: 1, name: "John Doe", comment: "This is a great exam!", replies: [] },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Highly recommend this one!",
    replies: [{ id: 1, name: "John Doe", reply: "Agreed!" }],
  },
];

function Comment({
  comment,
  replyingTo,
  setReplyingTo,
  handleAddReply,
  newComment,
  setNewComment,
  reply,
  setReply,
}) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>{comment.name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={comment.name} secondary={comment.comment} />
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
          {replyingTo === comment.id ? (
            <>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                margin="normal"
                value={newComment.name}
                onChange={(e) =>
                  setNewComment({ ...newComment, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Reply..."
                variant="outlined"
                margin="normal"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, fontWeight: "bold" }}
                onClick={handleAddReply}
              >
                Post Reply
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={() => setReplyingTo(comment.id)}
            >
              Reply
            </Button>
          )}
        </Box>
      </ListItem>
      <Divider component="li" />
      {comment.replies.map((replyItem) => (
        <ListItem key={replyItem.id} sx={{ marginLeft: 4 }}>
          <ListItemAvatar>
            <Avatar>{replyItem.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={replyItem.name} secondary={replyItem.reply} />
        </ListItem>
      ))}
    </>
  );
}

function ExamPreview() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [reply, setReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    setPurchased(true);
    alert("Thank you for purchasing the exam! Questions are now unlocked.");
  };

  const handleAddComment = () => {
    if (!newComment.name || !newComment.comment.trim()) {
      setErrorMessage("Both name and comment are required.");
      return;
    }
    const newCommentObj = {
      id: comments.length + 1,
      name: newComment.name,
      comment: newComment.comment,
      replies: [],
    };
    setComments([...comments, newCommentObj]);
    setNewComment({ name: "", comment: "" });
    setErrorMessage("");
  };

  const handleAddReply = () => {
    if (!reply.trim() || !newComment.name.trim()) {
      setErrorMessage("Reply and your name are required.");
      return;
    }
    const updatedComments = comments.map((comment) =>
      comment.id === replyingTo
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              { id: comment.replies.length + 1, name: newComment.name, reply },
            ],
          }
        : comment
    );
    setComments(updatedComments);
    setReply("");
    setNewComment({ ...newComment, name: "" });
    setReplyingTo(null);
    setErrorMessage("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", paddingY: 4 }}>
      <Box sx={{ maxWidth: 700, width: "100%", paddingX: 4 }}>
        <Card sx={{ padding: 3, boxShadow: 6, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#5A4DB2" }}
          >
            {selectedExam.name}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {selectedExam.description}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Provided by: {selectedExam.provider}
          </Typography>
          <img
            src={selectedExam.image}
            alt={selectedExam.name}
            style={{
              width: "100%",
              height: "auto",
              marginTop: 16,
              borderRadius: 8,
            }}
          />
          {!purchased && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 3,
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: 2,
              }}
              onClick={handlePurchase}
            >
              Buy Exam to Unlock Questions
            </Button>
          )}
        </Card>

        {purchased && (
          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#5A4DB2" }}
            >
              Available Questions
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {selectedExam.questions.map((question) => (
                <Grid item xs={12} md={6} key={question.id}>
                  <Card
                    sx={{
                      border: "1px solid #E0E0E0",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1">{question.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box sx={{ marginTop: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#5A4DB2" }}
          >
            Comments
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              margin="normal"
              value={newComment.name}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, name: e.target.value }))
              }
              error={!newComment.name && Boolean(errorMessage)}
              helperText={!newComment.name ? "Name is required." : ""}
            />
            <TextField
              fullWidth
              label="Write a comment..."
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              value={newComment.comment}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, comment: e.target.value }))
              }
              error={!newComment.comment && Boolean(errorMessage)}
              helperText={!newComment.comment ? "Comment cannot be empty." : ""}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, fontWeight: "bold" }}
              onClick={handleAddComment}
            >
              Post Comment
            </Button>
          </Box>

          <List sx={{ marginTop: 2 }}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                handleAddReply={handleAddReply}
                newComment={newComment}
                setNewComment={setNewComment}
                reply={reply}
                setReply={setReply}
              />
            ))}
          </List>
        </Box>

        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
          message={errorMessage}
        />
      </Box>
    </Box>
  );
}

export default ExamPreview;
