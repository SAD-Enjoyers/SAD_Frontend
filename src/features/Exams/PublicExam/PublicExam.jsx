import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  Avatar,
  Rating,
  Grid2,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DefaultExamImage from "../../../assets/images/default_exam_image.jpg";
import ExamResult from "./ExamResult";

const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
  Beginner: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#F44336",
};

const mockExamResult = {
  score: 85,
  passed: true,
  totalQuestions: 100,
  correctAnswers: 85,
  timeTaken: "15 minutes",
};

// Styled components

const Title = styled(Typography)({
  fontWeight: "bold",
  color: primaryGradient[0],
  fontSize: "2rem",
  marginBottom: "16px",
});

const SubTitle = styled(Typography)({
  color: "#333",
  fontSize: "1.1rem",
  lineHeight: 1.6,
  marginBottom: "16px",
});

const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  backgroundColor: "#fff",
  "&:hover": {
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  marginBottom: theme.spacing(2),
  color: "#333",
}));

const CommentsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  backgroundColor: "#f9f9f9",
  padding: theme.spacing(3),
  borderRadius: "8px",
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: primaryGradient[0],
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: primaryGradient[1],
  },
}));

const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
});

const ErrorContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
});

// Main Component
function PublicExam() {
  const location = useLocation();
  const navigate = useNavigate();
  const { examData } = location.state || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examResult, setExamResult] = useState(null);
  useEffect(() => {
    // Check if exam results are available in location state
    if (location.state && location.state.examResult) {
      setExamResult(location.state.examResult);
      setLoading(false);
      return;
    }

    // Handle loading exam data
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (!examData) {
        setError("Failed to load exam data.");
      }
      setLoading(false);
    }, 2000);
  }, [location.state, examData]);

  const handleAddComment = () => {
    if (!newComment.name || !newComment.comment.trim()) {
      alert("Both name and comment are required.");
      return;
    }
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        name: newComment.name,
        comment: newComment.comment,
      },
    ]);
    setNewComment({ name: "", comment: "" });
  };
  const handleStartExam = () => {
    // Simulate navigating to the exam page
    console.log("Starting the exam...");

    // Simulate an exam process
    setTimeout(() => {
      console.log("Exam completed!");

      // Display an alert with the result
      alert(
        `Exam Done! Your Score: ${mockExamResult.score}, Status: ${
          mockExamResult.passed ? "Passed" : "Failed"
        }`
      );

      // Pass the result and exam data to the current page
      navigate("/PublicExam", {
        state: {
          examResult: mockExamResult,
          examData,
        },
      });
    }, 2000); // Simulate a 2-second delay for the exam process
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>Loading exam details...</Typography>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography sx={{ color: "red" }}>{error}</Typography>
      </ErrorContainer>
    );
  }
  return (
    examData && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingY: 4,
          backgroundColor: primaryGradient[3],
          marginTop: "50px",
        }}
      >
        <Box sx={{ maxWidth: 950, width: "100%", paddingX: 4 }}>
          <CustomCard>
            <Grid2 container spacing={4}>
              <Grid2 item xs={12} md={8}>
                <Title>{examData.name}</Title>
                <Chip
                  label={examData.level}
                  sx={{
                    backgroundColor: levelColors[examData.level],
                    color: "#fff",
                    marginBottom: 2,
                  }}
                />
                <SubTitle>{examData.description}</SubTitle>

                <Rating
                  value={
                    typeof examData.score === "number" ? examData.score : 0
                  }
                  readOnly
                  precision={0.5}
                  sx={{ marginTop: 2 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  Average User Rating:{" "}
                  {typeof examData.score === "number"
                    ? examData.score.toFixed(1)
                    : "0"}{" "}
                  / 5
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {examData.tag1 && (
                      <Chip label={examData.tag1} sx={{ marginRight: 1 }} />
                    )}
                    {examData.tag2 && (
                      <Chip label={examData.tag2} sx={{ marginRight: 1 }} />
                    )}
                    {examData.tag3 && (
                      <Chip label={examData.tag3} sx={{ marginRight: 1 }} />
                    )}
                  </Typography>
                </Box>
              </Grid2>

              <Grid2
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: "column", // Align items vertically
                  alignItems: "center",
                  justifyContent: "center", // Center both image and button vertically
                  textAlign: "center",
                }}
              >
                {/* Dynamically render image from the backend */}
                {examData.image && (
                  <img
                    src={`/api/v1/uploads/service-images/${examData.image}`}
                    alt="Exam Preview"
                    style={{
                      width: "100%", // Make it responsive
                      maxWidth: "500px", // Set a maximum width for better scaling
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "16px", // Add space below the image
                    }}
                  />
                )}
                {/* Start Exam Button */}
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  onClick={handleStartExam}
                  sx={{
                    marginTop: 2,
                    maxWidth: "300px", // Optional: limit button width
                  }}
                >
                  Go to Exam
                </ButtonStyled>
              </Grid2>
            </Grid2>
          </CustomCard>

          <Grid2
            container
            spacing={4}
            sx={{ marginTop: 4, justifyContent: "center" }}
          >
            {/* Duration */}
            <Grid2 item xs={12} sm={6} md={3}>
              <CustomCard
                sx={{
                  textAlign: "center",
                  padding: 2,
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensuring it takes full height on mobile and centers
                }}
              >
                <AccessTimeIcon
                  sx={{
                    fontSize: { xs: 30, sm: 40 },
                    color: "primary.main",
                    marginBottom: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Duration
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {examData?.examDuration} min
                </Typography>
              </CustomCard>
            </Grid2>

            {/* Pass Score */}
            <Grid2 item xs={12} sm={6} md={3}>
              <CustomCard
                sx={{
                  textAlign: "center",
                  padding: 2,
                  backgroundColor: "success.light",
                  color: "success.contrastText",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensuring it takes full height on mobile and centers
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: { xs: 30, sm: 40 },
                    color: "success.main",
                    marginBottom: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Pass Score
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {examData?.minPassScore}%
                </Typography>
              </CustomCard>
            </Grid2>

            {/* Number of Questions */}
            <Grid2 item xs={12} sm={6} md={3}>
              <CustomCard
                sx={{
                  textAlign: "center",
                  padding: 2,
                  backgroundColor: "info.light",
                  color: "info.contrastText",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensuring it takes full height on mobile and centers
                }}
              >
                <QuizIcon
                  sx={{
                    fontSize: { xs: 30, sm: 40 },
                    color: "info.main",
                    marginBottom: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Number of Questions
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {examData?.numberOfQuestion}
                </Typography>
              </CustomCard>
            </Grid2>

            {/* Number of Members */}
            <Grid2 item xs={12} sm={6} md={3}>
              <CustomCard
                sx={{
                  textAlign: "center",
                  padding: 2,
                  backgroundColor: "secondary.light",
                  color: "secondary.contrastText",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensuring it takes full height on mobile and centers
                }}
              >
                <PeopleIcon
                  sx={{
                    fontSize: { xs: 30, sm: 40 },
                    color: "secondary.main",
                    marginBottom: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Number of Members
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {examData?.numberOfMembers}
                </Typography>
              </CustomCard>
            </Grid2>
          </Grid2>

          <Box sx={{ padding: { xs: 2, sm: 4 } }}>
            {examResult ? (
              <ExamResult examData={examData} />
            ) : (
              <Box
                sx={{
                  maxWidth: 600,
                  margin: "35px auto",
                  textAlign: "center",
                  padding: { xs: 2, sm: 3 },
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "#f8f9fa",
                  width: "100%", // Ensures full width on smaller screens
                }}
              >
                <Typography variant="h6" sx={{ color: "#5356FF" }}>
                  You haven’t taken the test yet.
                </Typography>
              </Box>
            )}
          </Box>

          <CommentsContainer>
            <SectionHeader>Comments</SectionHeader>

            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
            />
            <TextField
              label="Your Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={newComment.comment}
              onChange={(e) =>
                setNewComment({ ...newComment, comment: e.target.value })
              }
            />
            <ButtonStyled
              variant="contained"
              fullWidth
              onClick={handleAddComment}
              disabled={!newComment.name || !newComment.comment.trim()}
              startIcon={<CommentIcon />}
            >
              Add Comment
            </ButtonStyled>

            <List sx={{ marginTop: 2 }}>
              {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{comment.name.charAt(0).toUpperCase()}</Avatar>
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
          </CommentsContainer>
        </Box>
      </Box>
    )
  );
}

export default PublicExam;