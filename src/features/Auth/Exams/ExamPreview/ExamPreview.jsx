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

const ViewAllButton = styled(Button)(({ theme }) => ({
  backgroundColor: primaryGradient[2],
  color: "#fff",
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  borderRadius: "8px",
  marginTop: theme.spacing(2),
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
  questions: [
    {
      id: 1,
      title: "What is the derivative of sin(x)?",
      name: "Derivative of Sin(x)",
    },
    {
      id: 2,
      title: "Solve the integral of x^2 dx.",
      name: "Integration of x^2",
    },
    {
      id: 3,
      title: "Prove that every group of prime order is cyclic.",
      name: "Group Theory Proof",
    },
    {
      id: 4,
      title: "What is the limit of (1+x)^n as n approaches infinity?",
      name: "Limit of Binomial Expression",
    },
    {
      id: 5,
      title: "Find the eigenvalues of the matrix [[1, 2], [3, 4]].",
      name: "Matrix Eigenvalues",
    },
    {
      id: 6,
      title: "Differentiate x^3 + 3x^2 + 2x + 1.",
      name: "Differentiation of Polynomial",
    },
    {
      id: 7,
      title: "Solve the system of equations x + y = 5 and x - y = 1.",
      name: "Linear System",
    },
    {
      id: 8,
      title: "Find the integral of sin(x) dx.",
      name: "Integral of Sine Function",
    },
    {
      id: 9,
      title:
        "Calculate the area under the curve y = x^2 between x = 0 and x = 3.",
      name: "Area Under Curve",
    },
    {
      id: 10,
      title: "What is the Fourier transform of a constant function?",
      name: "Fourier Transform of Constant",
    },
  ],
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

const MAX_VISIBLE_TAGS = 4;

function ExamPreview() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

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

  const handleViewAllQuestions = () => {
    setShowAllQuestions(true);
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

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}>
            {selectedExam.tags.slice(0, MAX_VISIBLE_TAGS).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ backgroundColor: primaryGradient[2], color: "#fff" }}
              />
            ))}
            {selectedExam.tags.length > MAX_VISIBLE_TAGS && (
              <Chip
                label={`+${selectedExam.tags.length - MAX_VISIBLE_TAGS} more`}
                sx={{ backgroundColor: primaryGradient[1], color: "#fff" }}
              />
            )}
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
              startIcon={<ShoppingCartIcon />}
              onClick={handlePurchase}
            >
              Buy Exam to Unlock Questions
            </ButtonStyled>
          )}
        </CustomCard>

        {purchased && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Available Questions
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {(showAllQuestions
                ? selectedExam.questions
                : selectedExam.questions.slice(0, 5)
              ).map((question) => (
                <Grid item xs={12} sm={6} md={4} key={question.id}>
                  <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                    <Typography variant="h6">{question.name}</Typography>
                    <Typography variant="body2">{question.title}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {!showAllQuestions && (
              <ViewAllButton fullWidth onClick={handleViewAllQuestions}>
                View All Questions
              </ViewAllButton>
            )}

            <ButtonStyled
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleGoToExamPage}
            >
              Go to Exam Page
            </ButtonStyled>
          </Box>
        )}

        {/* Comment Section */}
        <CommentSection>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Comments
          </Typography>
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
              setNewComment((prev) => ({ ...prev, comment: e.target.value }))
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
