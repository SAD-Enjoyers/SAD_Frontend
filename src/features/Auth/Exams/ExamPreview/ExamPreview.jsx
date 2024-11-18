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
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom
import { styled } from "@mui/system"; // Import styled from MUI system

// Custom styled components
const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#333",
  fontSize: "1.8rem",
  marginBottom: theme.spacing(1),
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#555",
  fontSize: "1rem",
  marginBottom: theme.spacing(2),
}));

const Price = styled(Typography)(({ theme }) => ({
  color: "#00796b",
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginTop: theme.spacing(1),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  },
}));

const CommentSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const getQuestionSnippet = (question) => {
  const words = question.title.split(" ");
  return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : ""); // Show the first 5 words
};

const selectedExam = {
  id: 1,
  name: "Advanced Math Exam",
  description:
    "A comprehensive exam covering advanced calculus, algebra, and geometry.",
  score: 98,
  provider: "Math Institute", // This is now clickable
  providerId: "math-institute", // Added provider ID for routing
  image: "public/images/cooperation.jpg",
  price: 49.99,
  questions: [
    { id: 1, title: "What is the derivative of sin(x)?" },
    { id: 2, title: "Solve the integral of x^2 dx." },
    { id: 3, title: "Prove that every group of prime order is cyclic." },
  ],
};

const mockComments = [
  {
    id: 1,
    name: "John Doe",
    comment: "This is a great exam!",
    rating: 4,
    replies: [],
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Highly recommend this one!",
    rating: 5,
    replies: [{ id: 1, name: "John Doe", reply: "Agreed!" }],
  },
];

function ExamPreview() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({
    name: "",
    comment: "",
    rating: 0,
  });
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
    if (newComment.rating === 0) {
      setErrorMessage("Please provide a rating.");
      return;
    }
    const newCommentObj = {
      id: comments.length + 1,
      name: newComment.name,
      comment: newComment.comment,
      rating: newComment.rating, // Add rating
      replies: [],
    };
    setComments([...comments, newCommentObj]);
    setNewComment({ name: "", comment: "", rating: 0 });
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingY: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ maxWidth: 900, width: "100%", paddingX: 4 }}>
        {/* Header Section */}
        <CustomCard>
          <Title>{selectedExam.name}</Title>
          <SubTitle>{selectedExam.description}</SubTitle>
          <SubTitle variant="body2" color="text.secondary">
            {/* Provider name is now a clickable link */}
            Provided by:{" "}
            <Link
              to={`/provider/${selectedExam.providerId}`}
              style={{ textDecoration: "none", color: "#00796b" }}
            >
              {selectedExam.provider}
            </Link>
          </SubTitle>
          {!purchased && (
            <Price>Price: ${selectedExam.price}</Price> // Only show price if not purchased
          )}
          <Rating
            value={4} // Static value for now. Replace with dynamic average rating.
            readOnly
            precision={0.5}
            sx={{ marginTop: 2 }}
          />
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
            <ButtonStyled
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePurchase}
            >
              Buy Exam to Unlock Questions
            </ButtonStyled>
          )}
        </CustomCard>

        {/* Available Questions Section */}
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
                  <CustomCard>
                    <CardContent>
                      <Typography variant="h6">{question.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getQuestionSnippet(question)} {/* Show snippet */}
                      </Typography>
                    </CardContent>
                  </CustomCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Comment Section */}
        <CommentSection>
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
            <Rating
              value={newComment.rating}
              onChange={(e, newValue) =>
                setNewComment((prev) => ({ ...prev, rating: newValue }))
              }
              precision={0.5}
              sx={{ marginTop: 2 }}
            />
            <ButtonStyled
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, fontWeight: "bold" }}
              onClick={handleAddComment}
            >
              Post Comment
            </ButtonStyled>
          </Box>

          <List sx={{ marginTop: 2 }}>
            {comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{comment.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={comment.name}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {comment.comment}
                      </Typography>
                      <Rating
                        value={comment.rating}
                        readOnly
                        size="small"
                        sx={{ marginTop: 1 }}
                      />
                    </>
                  }
                />
                <Divider />
              </ListItem>
            ))}
          </List>
        </CommentSection>

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
