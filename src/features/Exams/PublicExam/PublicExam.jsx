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
import Comments from "../../../common/Comments/CommentSection";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [examData2, setExamData] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `/api/v1/exam/preview?serviceId=${examData.serviceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          setErrorMessage(responseData.message || "Failed to fetch exam data.");
          return;
        }

        const responseData = await response.json();
        console.log("Response Data:", JSON.stringify(responseData, null, 2));

        setExamData(responseData.data.Exam);
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
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

  console.log("Response Data:", JSON.stringify(examData, null, 2));
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

    // Pass the result and exam data to the current page
    navigate("/OngoingExamPage", {
      state: {
        // examResult: mockExamResult,
        examData,
      },
    }); // Simulate a 2-second delay for the exam process
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
  if (errorMessage) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{errorMessage}</Typography>
        <Button onClick={() => setErrorMessage("")}>Retry</Button>
      </Box>
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

                {/* Tags Section */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6" sx={{ color: primaryGradient[0] }}>
                    Tags
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {examData.tag1 && (
                      <Chip
                        label={examData.tag1}
                        sx={{ backgroundColor: "#FFEB3B", color: "#000" }}
                      />
                    )}
                    {examData.tag2 && (
                      <Chip
                        label={examData.tag2}
                        sx={{ backgroundColor: "#FF9800", color: "#fff" }}
                      />
                    )}
                    {examData.tag3 && (
                      <Chip
                        label={examData.tag3}
                        sx={{ backgroundColor: "#009688", color: "#fff" }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Rating and Average User Rating */}
                <Rating
                  value={examData.score || 0}
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
                  {typeof examData.score === "number" && !isNaN(examData.score)
                    ? examData.score.toFixed(1)
                    : "0"}{" "}
                  / 5
                </Typography>
              </Grid2>

              <Grid2
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {/* Exam Image */}
                <img
                  src={
                    examData.image
                      ? `/api/v1/uploads/service-images/${examData.image}`
                      : DefaultExamImage
                  }
                  alt="Exam Preview"
                  style={{
                    width: "100%",
                    maxWidth: "300px", // Adjusted maxWidth to make the image smaller
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />

                {/* Start Exam Button */}
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  onClick={handleStartExam}
                  sx={{
                    marginTop: 2,
                    maxWidth: "300px",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    padding: { xs: "12px", sm: "15px" },
                  }}
                >
                  Go to Exam
                </ButtonStyled>
              </Grid2>
            </Grid2>
          </CustomCard>

          {/* Additional Information Section */}
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
                  height: "100%",
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
                  {examData2?.examDuration} min
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
                  height: "100%",
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
                  {examData2?.minPassScore}%
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
                  height: "100%",
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
                  {examData2?.numberOfQuestion}
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
                  height: "100%",
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
                  {examData2?.numberOfMembers}
                </Typography>
              </CustomCard>
            </Grid2>
          </Grid2>

          {/* Comments and Exam Result */}
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
                  width: "100%",
                }}
              >
                <Typography variant="h6" sx={{ color: "#5356FF" }}>
                  You haven’t taken the test yet.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Comments Container */}
          <CommentsContainer>
            <SectionHeader>Comments</SectionHeader>
            <Comments serviceId={examData.serviceId} />
          </CommentsContainer>
        </Box>
      </Box>
    )
  );
}

export default PublicExam;
