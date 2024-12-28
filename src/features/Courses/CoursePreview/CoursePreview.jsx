import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DefaultCourseImage from "../../../assets/images/default_course_image.jpg";

// Palette colors
const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
  Beginner: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#F44336",
};

const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
  },
}));

const Title = styled(Typography)(() => ({
  fontWeight: "bold",
  color: primaryGradient[0],
  fontSize: "2rem",
  marginBottom: "16px",
}));

const SubTitle = styled(Typography)(() => ({
  color: "#333",
  fontSize: "1.1rem",
  lineHeight: 1.6,
  marginBottom: "16px",
}));

const Price = styled(Typography)(({ theme }) => ({
  color: "#00796b",
  fontSize: "1.4rem",
  fontWeight: "bold",
  marginTop: "16px",
  transition: "transform 0.3s ease, color 0.3s ease", // Transition on hover
  "&:hover": {
    transform: "scale(1.1) rotate(5deg)", // "Wild" effect: scale and rotate
    color: "#FF4081", // Change color on hover
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: primaryGradient[0],
  color: "#fff",
  padding: theme.spacing(1),
  fontSize: "1rem",
  borderRadius: "8px",
  width: "50%",
  "&:hover": {
    backgroundColor: primaryGradient[1],
  },
  marginTop: theme.spacing(2),
  textTransform: "none",
}));

const VideoSection = styled(Box)({
  marginTop: 32,
});

const VideosHeader = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "16px",
});

const VideoItem = styled(Box)({
  marginBottom: "16px",
  padding: "16px",
  backgroundColor: "#f1f1f1",
  borderRadius: "8px",
});

function CoursePreview() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const mockCourseData = {
    name: "React Development Course",
    description:
      "Learn how to build modern web applications with React, including hooks, state management, and more!",
    level: "Intermediate",
    price: 99.99,
    image: "default_course_image.jpg",
    videos: [
      {
        id: 1,
        title: "Introduction to React",
        url: "https://example.com/video1",
      },
      {
        id: 2,
        title: "Understanding Components",
        url: "https://example.com/video2",
      },
      {
        id: 3,
        title: "State Management with Hooks",
        url: "https://example.com/video3",
      },
    ],
  };

  useEffect(() => {
    // Simulate data fetching with mock data
    setLoading(true);
    setTimeout(() => {
      setCourseData(mockCourseData);
      setLoading(false);
    }, 2000);
  }, []);

  const handlePurchase = useCallback(async () => {
    setPurchaseLoading(true);
    try {
      // Simulate a purchase action
      setTimeout(() => {
        setPurchased(true);
        setSnackbarMessage(
          "Thank you for purchasing the course! Videos are now unlocked."
        );
        setSeverity("success");
        setOpenSnackbar(true);
        localStorage.setItem("courseData", JSON.stringify(courseData)); // Save to localStorage
        navigate("/PublicCourse", { state: { courseData } });
      }, 2000);
    } catch (error) {
      setSnackbarMessage(
        "An error occurred while processing your purchase. Please try again."
      );
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setPurchaseLoading(false);
    }
  }, [courseData, navigate]);

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
        <Typography sx={{ marginLeft: 2 }}>
          Loading course details...
        </Typography>
      </Box>
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
    courseData && (
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
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Title>{courseData.name}</Title>
                <Chip
                  label={courseData.level}
                  sx={{
                    backgroundColor: levelColors[courseData.level],
                    color: "#fff",
                    marginBottom: 2,
                  }}
                />
                <SubTitle>{courseData.description}</SubTitle>
                <Price>${courseData.price}</Price>
              </Grid>

              <Grid
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
                <img
                  src={DefaultCourseImage}
                  alt="Course Preview"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />

                {!purchased && (
                  <ButtonStyled
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={handlePurchase}
                    disabled={purchaseLoading}
                  >
                    {purchaseLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Buy the Course"
                    )}
                  </ButtonStyled>
                )}
              </Grid>
            </Grid>
          </CustomCard>

          <VideoSection>
            <VideosHeader variant="h6">Course Videos</VideosHeader>
            {purchased ? (
              courseData.videos.map((video) => (
                <VideoItem key={video.id}>
                  <Typography variant="body1">{video.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Now
                    </a>
                  </Typography>
                </VideoItem>
              ))
            ) : (
              <Typography variant="body2">
                Please purchase the course to access videos.
              </Typography>
            )}
          </VideoSection>
        </Box>

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
      </Box>
    )
  );
}

export default CoursePreview;
