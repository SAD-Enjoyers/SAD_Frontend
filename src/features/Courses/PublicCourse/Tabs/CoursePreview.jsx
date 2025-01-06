import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid2,
  Card,
  Button,
  Chip,
  Rating,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DefaultCourseImage from "../../../../assets/images/default_course_image.jpg";
import axios from "axios";
// Palette colors
const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
  Beginner: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#F44336",
};

const CommentSection = styled(Box)({
  marginTop: 32,
});

const CommentsHeader = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "16px",
});
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

function CoursePreview(props) {
  const { serviceId } = props;
  console.log(serviceId);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Replace the mock data with API call
        const response = await axios.get(`/api/v1/course/preview/${serviceId}`);
        // console.log("Response Data:", JSON.stringify(response, null, 2));

        if (response.data.status === "success") {
          localStorage.setItem(
            "authorCourse",
            response.data.data.Course.userId
          );

          setCourseData(response.data.data.Course);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch course data"
          );
        }
      } catch (error) {
        setErrorMessage(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [serviceId]); // Dependency on serviceId
  const handlePurchase = useCallback(async () => {
    setPurchaseLoading(true);
    try {
      const payload = { serviceId };
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      // Log payload and headers
      console.log("Request Payload:", payload);
      console.log("Request Headers:", headers);

      const response = await fetch("/api/v1/educational-service/register", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      // Check response and log
      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error("Failed to process the purchase. Please try again.");
      }

      if (data.status === "success") {
        setPurchased(true);
        setSnackbarMessage(
          "Thank you for purchasing the course! Videos are now unlocked."
        );
        setSeverity("success");
        setOpenSnackbar(true);
        localStorage.setItem("courseData", JSON.stringify(courseData)); // Save to localStorage
        navigate("/PublicCourse", { state: { courseData } });
      } else {
        throw new Error(data.message || "Purchase failed");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      setSnackbarMessage(
        error.message || "An error occurred while processing your purchase."
      );
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setPurchaseLoading(false);
    }
  }, [serviceId, courseData, navigate]);

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
            <Grid2 container spacing={4}>
              {/* Left side: Course Details */}
              <Grid2 item xs={12} md={8}>
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

                <Rating
                  value={
                    typeof courseData.score === "number" ? courseData.score : 0
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
                  {typeof courseData.score === "number"
                    ? courseData.score.toFixed(1)
                    : "0"}{" "}
                  / 5 ({courseData.numberOfVoters} votes)
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {courseData.tag1 && (
                      <Chip label={courseData.tag1} sx={{ marginRight: 1 }} />
                    )}
                    {courseData.tag2 && (
                      <Chip label={courseData.tag2} sx={{ marginRight: 1 }} />
                    )}
                    {courseData.tag3 && (
                      <Chip label={courseData.tag3} sx={{ marginRight: 1 }} />
                    )}
                  </Typography>
                </Box>
                {/* <Typography variant="body2" sx={{ marginTop: 2 }}>
                  <strong>Number of Videos:</strong> {courseData.numberOfVideos}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Members Enrolled:</strong>{" "}
                  {courseData.numberOfMembers}
                </Typography> */}

                <Price
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: "#00796b",
                    marginTop: 2,
                  }}
                >
                  Price: ${courseData.price}
                </Price>
              </Grid2>

              {/* Right side: Image, Buy Button */}
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
                <img
                  src={
                    // courseData.image
                    //   ? `/api/v1/uploads/service-images/${courseData.image}`
                    //   : DefaultCourseImage
                    DefaultCourseImage
                  }
                  alt="Course Preview"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
              </Grid2>
            </Grid2>
          </CustomCard>
        </Box>
        {/* Snackbar for success/error message */}
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
