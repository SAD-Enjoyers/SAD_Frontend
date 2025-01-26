import React, { useState, useEffect } from "react";
import {
  Grid2,
  Box,
  Typography,
  Chip,
  Rating,
  Card,
  Button,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import DefaultArticleImage from "../../../assets/images/blog.jpg";
import Comments from "../../../common/Comments/CommentSection";
import RegisterTicket from "../../../common/registerTicket/registerTicket";
import RatingComponent from "../../../common/Ratings/RatingComponent";
const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
  Beginner: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#F44336",
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

const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: primaryGradient[0],
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: primaryGradient[1],
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

// Main Component
function PublicArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { articleData } = location.state || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleDetails, setArticleDetails] = useState(null);
  const [articleContents, setArticleContents] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/article/preview/${articleData.serviceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article data.");
        }

        const responseData = await response.json();
        setArticleDetails(responseData.data.Article);
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchArticleContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/article/blog/${articleData.serviceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-role": localStorage.getItem("role"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article data.");
        }

        const responseData = await response.json();
        setArticleContents(responseData.data);
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
    fetchArticleContent();
    console.log(articleContents);
  }, [articleData]);

  const handleTabChange = (_, newIndex) => {
    setTabIndex(newIndex);
  };

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

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>
          Loading article details...
        </Typography>
      </LoadingContainer>
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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    articleDetails && (
      <Box sx={{ paddingY: 10, backgroundColor: primaryGradient[3] }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Article Overview" />
          <Tab label="Article Content" />
        </Tabs>

        {tabIndex === 0 && (
          <Box sx={{ maxWidth: 950, margin: "0 auto" }}>
            <CustomCard sx={{ maxWidth: 800, margin: "0 auto" }}>
              <Grid2 container spacing={4}>
                <Grid2 item xs={12} md={8}>
                  <Title>{articleDetails.name}</Title>
                  <Chip
                    label={articleDetails.level}
                    sx={{
                      backgroundColor: levelColors[articleDetails.level],
                      color: "#fff",
                      marginBottom: 2,
                    }}
                  />
                  <SubTitle>{articleDetails.description}</SubTitle>

                  {/* Tags Section */}
                  <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {articleDetails.tag1 && (
                        <Chip
                          label={articleDetails.tag1}
                          sx={{ backgroundColor: "#FFEB3B", color: "#000" }}
                        />
                      )}
                      {articleDetails.tag2 && (
                        <Chip
                          label={articleDetails.tag2}
                          sx={{ backgroundColor: "#FF9800", color: "#fff" }}
                        />
                      )}
                      {articleDetails.tag3 && (
                        <Chip
                          label={articleDetails.tag3}
                          sx={{ backgroundColor: "#009688", color: "#fff" }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Rating */}
                  {/* <Rating
                    value={articleDetails.score || 0}
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
                    {typeof articleDetails.score === "number" &&
                      !isNaN(articleDetails.score)
                      ? articleDetails.score.toFixed(1)
                      : "0"}{" "}
                    / 5
                  </Typography> */}
                  <RatingComponent
                    serviceId={articleData.serviceId}
                    type={"article"}
                  />
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
                  {/* Article Image */}
                  <img
                    src={
                      articleDetails.image
                        ? `/api/v1/uploads/service-images/${articleDetails.image}`
                        : DefaultArticleImage
                    }
                    alt="Article Preview"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "16px",
                    }}
                  />
                </Grid2>
              </Grid2>
            </CustomCard>
            <RegisterTicket serviceId={articleData.serviceId} />
            {/* Number of Members */}
            <Box
              sx={{
                maxWidth: 825,
                marginInline: 7,
                marginBlock: 4,
                textAlign: "center",
                padding: 2,
                backgroundColor: "secondary.light",
                color: "secondary.contrastText",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Number of Members
              </Typography>
              <Typography variant="body1">
                {articleDetails.numberOfMembers}
              </Typography>
            </Box>

            {/* Comments Container */}
            <CommentsContainer>
              <SectionHeader>Comments</SectionHeader>
              <Comments serviceId={articleData.serviceId} />
            </CommentsContainer>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ maxWidth: 950, margin: "0 auto", paddingX: 4 }}>
            <CustomCard>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                {articleContents.title}
              </Typography>
              <div
                style={{
                  whiteSpace: "pre-wrap",

                  padding: "10px",
                  minHeight: "600px",
                  maxHeight: "250px",
                  overflowY: "auto", // enable vertical scrolling
                  backgroundColor: "white",
                  fontFamily: "'Roboto', 'Arial', sans-serif", // Add your desired font here
                  fontSize: "16px", // Optional: adjust the font size
                  lineHeight: "1.6", // Optional: improve readability
                }}
                dangerouslySetInnerHTML={{ __html: articleContents.text }}
              />
              {articleContents.attachment && (
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  href={`/api/v1/uploads/article-attachments/${articleContents.attachment}`}
                >
                  Download Attachment
                </Button>
              )}
            </CustomCard>
          </Box>
        )}
      </Box>
    )
  );
}

export default PublicArticle;
