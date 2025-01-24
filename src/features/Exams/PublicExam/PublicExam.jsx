import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  Grid2,
  Card,
  Button,
  Chip,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleIcon from "@mui/icons-material/People";
import DefaultExamImage from "../../../assets/images/default_exam_image.jpg";
// import ExamResult from "./ExamResult";
import Comments from "../../../common/Comments/CommentSection";
import RegisterTicket from "../../../common/registerTicket/registerTicket.jsx";

import {
  CheckCircle,
  Clear,
  HourglassEmpty,
  Assessment,
} from "@mui/icons-material";

const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
  Beginner: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#F44336",
};

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
  const navigate = useNavigate();
  const [examInfo, setExamInfo] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const { examData } = location.state || {};
  const accessToken = localStorage.getItem("token");
  const serviceId = examData.serviceId;
  console.log(serviceId);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Fetch Exam Info
        const examInfoResponse = await fetch(`/api/v1/exam/${serviceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!examInfoResponse.ok) {
          throw new Error("Failed to fetch exam data");
        }

        const examInfoData = await examInfoResponse.json();
        console.log(examInfoData.data);

        setExamInfo(examInfoData.data);

        // Fetch Exam Result (assuming there's a separate endpoint for results)
        const examResultResponse = await fetch(
          `/api/v1/exam/exam-result/${serviceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(examResultResponse);

        if (examResultResponse.status === 404) {
          // If the result is not found, set examResult to null
          setExamResult(null);
        } else if (!examResultResponse.ok) {
          throw new Error("Failed to fetch exam result data");
        } else {
          const examResultData = await examResultResponse.json();
          console.log(
            "Response Data:",
            JSON.stringify(examResultData.data, null, 2)
          );

          setExamResult(examResultData.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [serviceId, accessToken]);
  const handleGoToExam = () => {
    if (examInfo.numberOfQuestion < 1) {
      setSnackbarMessage("There are no questions in this exam.");
      setSeverity("error");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Navigating to the exam...");
      setSeverity("success");
      setOpenSnackbar(true);
      navigate("/OngoingExamPage", { state: { examData } }); // Call the function to navigate to the exam
    }
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    examInfo && (
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
          <CustomCard sx={{ maxWidth: 800, margin: "0 auto" }}>
            <Grid2 container spacing={4}>
              <Grid2 item xs={12} md={8}>
                <Title>{examInfo.name}</Title>
                <Chip
                  label={examInfo.level}
                  sx={{
                    backgroundColor: levelColors[examInfo.level],
                    color: "#fff",
                    marginBottom: 2,
                  }}
                />
                <SubTitle>{examInfo.description}</SubTitle>

                {/* Tags Section */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6" sx={{ color: primaryGradient[0] }}>
                    Tags
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {examInfo.tag1 && (
                      <Chip
                        label={examInfo.tag1}
                        sx={{ backgroundColor: "#FFEB3B", color: "#000" }}
                      />
                    )}
                    {examInfo.tag2 && (
                      <Chip
                        label={examInfo.tag2}
                        sx={{ backgroundColor: "#FF9800", color: "#fff" }}
                      />
                    )}
                    {examInfo.tag3 && (
                      <Chip
                        label={examInfo.tag3}
                        sx={{ backgroundColor: "#009688", color: "#fff" }}
                      />
                    )}
                  </Box>
                </Box>

                <Rating
                  value={Number(examInfo.score) || 0}
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
                  {typeof examInfo.score === "number" && !isNaN(examInfo.score)
                    ? examInfo.score.toFixed(1)
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
                    examInfo.image
                      ? `/api/v1/uploads/service-images/${examInfo.image}`
                      : DefaultExamImage
                  }
                  alt="Exam Preview"
                  style={{
                    width: "100%",
                    maxWidth: "400px", // Adjusted maxWidth to make the image smaller
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />

                {/* Show button only if no exam result */}
                {!examResult && (
                  <ButtonStyled
                    variant="contained"
                    fullWidth
                    onClick={handleGoToExam}
                    sx={{
                      marginTop: 2,
                      maxWidth: "300px",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                      padding: { xs: "12px", sm: "15px" },
                    }}
                  >
                    Go to Exam
                  </ButtonStyled>
                )}
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
                  {examInfo?.examDuration} min
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
                  {examInfo?.minPassScore}%
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
                  {examInfo?.numberOfQuestion}
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
                  {examInfo?.numberOfMembers}
                </Typography>
              </CustomCard>
            </Grid2>
          </Grid2>

          <Box sx={{ padding: { xs: 2, sm: 4 } }}>
            {examResult && (
              <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
                <Paper
                  elevation={3}
                  sx={{ padding: 2, backgroundColor: "#f0f4f8" }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                  >
                    Exam Results
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#4caf50" }}
                      >
                        <CheckCircle
                          sx={{ verticalAlign: "middle", color: "#4caf50" }}
                        />{" "}
                        Exam Score:
                        <span
                          style={{ fontWeight: "normal", color: "#1e88e5" }}
                        >
                          {" "}
                          {examResult.examScore}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#388e3c" }}
                      >
                        <CheckCircle
                          sx={{ verticalAlign: "middle", color: "#388e3c" }}
                        />{" "}
                        Right Answers:
                        <span
                          style={{ fontWeight: "normal", color: "#1e88e5" }}
                        >
                          {" "}
                          {examResult.rightAnswers}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#f44336" }}
                      >
                        <Clear
                          sx={{ verticalAlign: "middle", color: "#f44336" }}
                        />{" "}
                        Wrong Answers:
                        <span
                          style={{ fontWeight: "normal", color: "#1e88e5" }}
                        >
                          {" "}
                          {examResult.wrongAnswers}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#ff9800" }}
                      >
                        <HourglassEmpty
                          sx={{ verticalAlign: "middle", color: "#ff9800" }}
                        />{" "}
                        Empty Answers:
                        <span
                          style={{ fontWeight: "normal", color: "#1e88e5" }}
                        >
                          {" "}
                          {examResult.emptyAnswers}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#1976d2" }}
                      >
                        <Assessment
                          sx={{ verticalAlign: "middle", color: "#1976d2" }}
                        />{" "}
                        Result:
                        <span
                          style={{ fontWeight: "normal", color: "#1e88e5" }}
                        >
                          {" "}
                          {examResult.passed}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}
          </Box>
          <RegisterTicket serviceId={serviceId} />

          {/* Snackbar for success/error messages */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>

          {/* Comments Container */}
          <CommentsContainer>
            <SectionHeader>Comments</SectionHeader>
            <Comments serviceId={examInfo.serviceId} />
          </CommentsContainer>
        </Box>
      </Box>
    )
  );
}

export default PublicExam;
