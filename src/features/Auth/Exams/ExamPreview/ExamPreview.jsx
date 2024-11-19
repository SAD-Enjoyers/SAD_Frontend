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
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Palette colors
const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
  Beginner: primaryGradient[3],
  Intermediate: primaryGradient[2],
  Advanced: primaryGradient[1],
};

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

const Title = styled(Typography)({
  fontWeight: "bold",
  color: primaryGradient[0],
  fontSize: "1.8rem",
});

const SubTitle = styled(Typography)({
  color: "#333",
  fontSize: "1rem",
});

const Price = styled(Typography)({
  color: "#00796b",
  fontSize: "1.2rem",
  fontWeight: "bold",
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: primaryGradient[0],
  color: "#fff",
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: primaryGradient[1],
  },
}));

const CommentSection = styled(Box)({
  marginTop: 32,
});

const selectedExam = {
  id: 1,
  name: "Advanced Math Exam",
  description:
    "A comprehensive exam covering advanced calculus, algebra, and geometry.",
  provider: "Math Institute",
  providerId: "math-institute",
  image: "public/images/cooperation.jpg",
  price: 49.99,
  level: "Advanced",
  tags: ["Mathematics", "Calculus", "Geometry", "Algebra", "Statistics"],
};

const mockComments = [
  { id: 1, name: "John Doe", comment: "This is a great exam!" },
  { id: 2, name: "Jane Smith", comment: "Highly recommend this one!" },
  {
    id: 3,
    name: "Alan Turing",
    comment: "Good content, but could use more examples.",
  },
];

function ExamPreview() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const staticAverageRating = 4.5;

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
    };
    setComments([...comments, newCommentObj]);
    setNewComment({ name: "", comment: "" });
    setErrorMessage("");
    setOpenSnackbar(true);
  };

  const handleGoToExamPage = () => {
    alert("Navigating to the exam page.");
    // Redirect logic goes here, for example: navigate to /exam/1
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingY: 4,
        backgroundColor: primaryGradient[3],
      }}
    >
      <Box sx={{ maxWidth: 900, width: "100%", paddingX: 4 }}>
        <CustomCard>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ maxWidth: "60%" }}>
              <Title>{selectedExam.name}</Title>

              {/* Level Chip */}
              <Chip
                label={selectedExam.level}
                sx={{
                  backgroundColor: levelColors[selectedExam.level],
                  color: "#fff",
                  marginBottom: 2,
                }}
              />

              <SubTitle>{selectedExam.description}</SubTitle>
              <SubTitle>
                Provided by:{" "}
                <Link
                  to={`/provider/${selectedExam.providerId}`}
                  style={{ textDecoration: "none", color: primaryGradient[0] }}
                >
                  {selectedExam.provider}
                </Link>
              </SubTitle>

              <Box
                sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}
              >
                {selectedExam.tags.slice(0, 4).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{ backgroundColor: primaryGradient[2], color: "#fff" }}
                  />
                ))}
              </Box>

              <Rating
                value={staticAverageRating}
                readOnly
                precision={0.5}
                sx={{ marginTop: 2 }}
                aria-label="Average User Rating"
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1 }}
              >
                Average User Rating: {staticAverageRating.toFixed(1)} / 5
              </Typography>

              {!purchased && <Price>Price: ${selectedExam.price}</Price>}
            </Box>

            {/* Image and Button Section */}
            <Box sx={{ maxWidth: "35%", textAlign: "center" }}>
              <img
                src={selectedExam.image}
                alt={selectedExam.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 8,
                }}
              />
              {!purchased && (
                <ButtonStyled
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={handlePurchase}
                >
                  Buy The Exam
                </ButtonStyled>
              )}
            </Box>
          </Box>
        </CustomCard>

        {/* Comment Section */}
        <CommentSection>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Comments
          </Typography>
          {purchased ? (
            <>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newComment.name}
                onChange={(e) =>
                  setNewComment((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <TextField
                label="Your Comment"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newComment.comment}
                onChange={(e) =>
                  setNewComment((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                error={!newComment.comment && Boolean(errorMessage)}
                helperText={!newComment.comment ? "Comment is required." : ""}
              />
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              <ButtonStyled variant="contained" onClick={handleAddComment}>
                Submit Comment
              </ButtonStyled>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              You need to purchase the exam to leave a comment.
            </Typography>
          )}

          <List sx={{ marginTop: 2 }}>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.name}
                    secondary={comment.comment}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CommentSection>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Comment added successfully"
        />
      </Box>
    </Box>
  );
}

export default ExamPreview;
