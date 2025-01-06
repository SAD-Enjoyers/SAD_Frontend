import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    Button,
    Rating,
    Chip,
    Avatar,
    Snackbar,
    CardContent,
    Divider,
    Stack,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

// Define level colors
const levelColors = {
    Beginner: "#4CAF50",
    Intermediate: "#FF9800",
    Advanced: "#F44336",
};

// Styled components
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
    color: "#378CE7",
    fontSize: "2rem",
    marginBottom: "16px",
});

const SubTitle = styled(Typography)({
    color: "#333",
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: "16px",
});

const Price = styled(Typography)({
    color: "#00796b",
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginTop: "16px",
});

const CommentSection = styled(Box)({
    marginTop: 32,
});

const CommentsHeader = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "16px",
});

const ArticlePreview = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [purchased, setPurchased] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const response = await fetch(`/api/v1/article/preview/${serviceId}`, {
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch article data.");
                }
                const { data } = await response.json();
                setArticleData(data.Article);
            } catch (error) {
                setErrorMessage(error.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/v1/educational-service/comments/${serviceId}`);
                setComments(response.data.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
        fetchArticleData();
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
                body: JSON.stringify({ serviceId }),
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || "Purchase failed.");
            }
            setPurchased(true);
            setSnackbarMessage("Article successfully purchased!");
            setSeverity("success");
            localStorage.setItem("articleData", JSON.stringify(articleData));
            navigate(`/PublicArticle`, { state: { articleData } });
        } catch (error) {
            setSnackbarMessage(error.message);
            setSeverity("error");
        } finally {
            setPurchaseLoading(false);
            setOpenSnackbar(true);
        }
    }, [articleData, navigate, serviceId]);

    const handleCloseSnackbar = () => setOpenSnackbar(false);

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
                <Typography sx={{ marginLeft: 2 }}>Loading article details...</Typography>
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
            </Box>
        );
    }

    return (
        articleData && (
            <Box sx={{ paddingY: 10, backgroundColor: "#f0f8ff" }}>
                <Box sx={{ maxWidth: 950, margin: "auto", paddingX: 4 }}>
                    <CustomCard>
                        <Grid container>
                            <Grid item xs={12} md={7}>
                                <Title>{articleData.name}</Title>
                                <Chip
                                    label={articleData.level}
                                    sx={{
                                        backgroundColor: levelColors[articleData.level],
                                        color: "#fff",
                                        marginBottom: 2,
                                    }}
                                />
                                <SubTitle>{articleData.description}</SubTitle>
                                <Rating
                                    value={articleData.score || 0}
                                    readOnly
                                    precision={0.5}
                                    sx={{ marginTop: 2 }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Average Rating: {(articleData.score || 0)} / 5
                                </Typography>
                                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                                    {articleData.tag1 && (
                                        <Chip
                                            label={articleData.tag1}
                                            sx={{ backgroundColor: "#FFEB3B", color: "#000" }}
                                        />
                                    )}
                                    {articleData.tag2 && (
                                        <Chip
                                            label={articleData.tag2}
                                            sx={{ backgroundColor: "#FF9800", color: "#fff" }}
                                        />
                                    )}
                                    {articleData.tag3 && (
                                        <Chip
                                            label={articleData.tag3}
                                            sx={{ backgroundColor: "#009688", color: "#fff" }}
                                        />
                                    )}
                                </Box>
                                <Price>Price: ${articleData.price}</Price>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={
                                        articleData.image
                                            ? `/api/v1/uploads/service-images/${articleData.image}`
                                            : "/default-image.jpg"
                                    }
                                    alt="Article Preview"
                                    style={{
                                        width: "100%",
                                        maxWidth: "300px",
                                        height: "auto",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {!purchased && (
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<ShoppingCartIcon />}
                                onClick={handlePurchase}
                                disabled={purchaseLoading}
                                sx={{ marginTop: 3 }}
                            >
                                {purchaseLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Buy The Article"
                                )}
                            </Button>
                        )}
                    </CustomCard>
                    <Card sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Comments
                            </Typography>
                            <Stack spacing={2}>
                                {comments.map((comment) => (
                                    <Card key={comment.commentId} variant="outlined" sx={{ p: 2 }}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: "primary.main" }}>
                                                {comment.userId.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    {comment.userId}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {comment.text}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ mt: 1 }}
                                                >
                                                    {new Date(comment.date).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Divider sx={{ my: 2 }} />
                                    </Card>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={severity}
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        )
    );
};

export default ArticlePreview;
