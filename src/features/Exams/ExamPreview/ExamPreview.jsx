import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid2,
  Card,
  Button,
  Rating,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DefaultExamImage from "../../../assets/images/default_exam_image.jpg";

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
  padding: theme.spacing(1), // Reduced padding for a smaller button
  fontSize: "1rem", // Adjusted font size for better fitting
  borderRadius: "8px",
  width: "50%", // Ensures the button remains full width within its container
  "&:hover": {
    backgroundColor: primaryGradient[1],
  },
  marginTop: theme.spacing(2), // Add margin for spacing between the button and other elements
  textTransform: "none", // Ensures button text is not all uppercase
}));

const CommentSection = styled(Box)({
  marginTop: 32,
});

const CommentsHeader = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "16px",
});

function ExamPreview() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // Can be "success" or "error"

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `/api/v1/exam/preview?serviceId=${serviceId}`,
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
  }, [serviceId]);

  const handlePurchase = useCallback(async () => {
    setPurchaseLoading(true);
    try {
      const response = await fetch("/api/v1/educational-service/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId }), // Send the `serviceId` to the backend
      });

      if (!response.ok) {
        const responseData = await response.json();
        setSnackbarMessage(
          `Failed to register the exam: ${responseData.message}`
        );
        setSeverity("error");
        setOpenSnackbar(true);
        setPurchaseLoading(false);
        return;
      }

      const responseData = await response.json();
      setPurchased(true); // Mark the exam as purchased
      setSnackbarMessage(
        "Thank you for purchasing the exam! Questions are now unlocked."
      );
      setSeverity("success");
      setOpenSnackbar(true);
      localStorage.setItem("examData", JSON.stringify(examData)); // Save to localStorage
      navigate("/PublicExam", { state: { examData } });
    } catch (error) {
      setSnackbarMessage(
        "An error occurred while processing your purchase. Please try again."
      );
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setPurchaseLoading(false);
    }
  }, [examData, navigate, serviceId]);

  const handleAddComment = useCallback(() => {
    if (!newComment.name || !newComment.comment.trim()) {
      alert("Both name and comment are required.");
      return;
    }

    const newCommentObj = {
      id: comments.length + 1,
      name: newComment.name,
      comment: newComment.comment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment({ name: "", comment: "" });
    setOpenSnackbar(true);
  }, [comments, newComment]);

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
        <Typography sx={{ marginLeft: 2 }}>Loading exam details...</Typography>
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
                <Price
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: "#00796b",
                  }}
                >
                  Price: ${examData.price}
                </Price>
              </Grid2>

              {/* Right side: Image, Buy Button*/}
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
                {/* Dynamically render image or fallback to default */}
                <img
                  src={
                    examData.image
                      ? `/api/v1/uploads/service-images/${examData.image}`
                      : DefaultExamImage // مسیر تصویر پیش‌فرض
                  }
                  alt="Exam Preview"
                  style={{
                    width: "100%", // واکنش‌گرا کردن
                    maxWidth: "500px",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />

                {/* Display the "Buy The Exam" button */}
                {!purchased && (
                  <>
                    <ButtonStyled
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      onClick={handlePurchase}
                      disabled={purchaseLoading} // Disable the button while loading
                      sx={{
                        maxWidth: "300px",
                        marginBottom: "16px",
                      }}
                    >
                      {purchaseLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Buy The Exam"
                      )}
                    </ButtonStyled>
                  </>
                )}
              </Grid2>
            </Grid2>
          </CustomCard>

          <CommentSection>
            <CommentsHeader variant="h6">Comments</CommentsHeader>

            <Typography variant="body2">
              Please purchase the exam to leave a comment.
            </Typography>
          </CommentSection>
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

export default ExamPreview;
