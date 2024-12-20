// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Chip,
//     Card,
//     CardContent,
//     Button,
//     CircularProgress,
//     List,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     Divider,
//     Avatar,
//     TextField,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { styled } from "@mui/system";
// import CommentIcon from "@mui/icons-material/Comment";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PeopleIcon from "@mui/icons-material/People";
// import DefaultArticleImage from "../../../assets/images/default_exam_image.jpg"; // Replace with your default image

// const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
// const levelColors = {
//     Beginner: "#4CAF50",
//     Intermediate: "#FF9800",
//     Advanced: "#F44336",
// };

// // Styled components
// const Title = styled(Typography)({
//     fontWeight: "bold",
//     color: primaryGradient[0],
//     fontSize: "2rem",
//     marginBottom: "16px",
// });

// const SubTitle = styled(Typography)({
//     color: "#333",
//     fontSize: "1.1rem",
//     lineHeight: 1.6,
//     marginBottom: "16px",
// });

// const CustomCard = styled(Card)(({ theme }) => ({
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//     padding: theme.spacing(4),
//     backgroundColor: "#fff",
//     "&:hover": {
//         boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
//     },
// }));

// const CommentsContainer = styled(Box)(({ theme }) => ({
//     marginTop: theme.spacing(6),
//     backgroundColor: "#f9f9f9",
//     padding: theme.spacing(3),
//     borderRadius: "8px",
// }));

// const ButtonStyled = styled(Button)(({ theme }) => ({
//     backgroundColor: primaryGradient[0],
//     color: "#fff",
//     padding: theme.spacing(1.5),
//     borderRadius: "8px",
//     "&:hover": {
//         backgroundColor: primaryGradient[1],
//     },
// }));

// const LoadingContainer = styled(Box)({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     flexDirection: "column",
// });

// const ErrorContainer = styled(Box)({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     flexDirection: "column",
// });

// // Main Component
// function PublicArticle() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { articleData } = location.state || {};
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState({ name: "", comment: "" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {

//         // Handle loading article data
//         setLoading(true);
//         setError(null);

//         setTimeout(() => {
//             if (!articleData) {
//                 setError("Failed to load article data.");
//             }
//             setLoading(false);
//         }, 2000);
//     }, [location.state, articleData]);

//     const handleAddComment = () => {
//         if (!newComment.name || !newComment.comment.trim()) {
//             alert("Both name and comment are required.");
//             return;
//         }
//         setComments([
//             ...comments,
//             {
//                 id: comments.length + 1,
//                 name: newComment.name,
//                 comment: newComment.comment,
//             },
//         ]);
//         setNewComment({ name: "", comment: "" });
//     };

//     if (loading) {
//         return (
//             <LoadingContainer>
//                 <CircularProgress />
//                 <Typography sx={{ marginTop: 2 }}>Loading article details...</Typography>
//             </LoadingContainer>
//         );
//     }

//     if (error) {
//         return (
//             <ErrorContainer>
//                 <Typography sx={{ color: "red" }}>{error}</Typography>
//             </ErrorContainer>
//         );
//     }

//     return (
//         articleData && (
//             <Box sx={{ display: "flex", justifyContent: "center", paddingY: 4, backgroundColor: primaryGradient[3], marginTop: "50px" }}>
//                 <Box sx={{ maxWidth: 950, width: "100%", paddingX: 4 }}>
//                     <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", padding: 4, backgroundColor: "#fff" }}>
//                         <Box display={'flex'}>
//                             <Box mr={2}>
//                                 <Typography variant="h4" sx={{ fontWeight: "bold", color: primaryGradient[0], marginBottom: "16px" }}>
//                                     {articleData.title}
//                                 </Typography>

//                                 <SubTitle>{articleData.description}</SubTitle>

//                                 <Chip
//                                     label={articleData.level}
//                                     sx={{
//                                         backgroundColor: levelColors[articleData.level],
//                                         color: "#fff",
//                                         marginBottom: 2,
//                                     }}
//                                 />

//                                 <Box sx={{}}>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {articleData.tag1 && (
//                                             <Chip label={articleData.tag1} sx={{ marginRight: 1 }} />
//                                         )}
//                                         {articleData.tag2 && (
//                                             <Chip label={articleData.tag2} sx={{ marginRight: 1 }} />
//                                         )}
//                                         {articleData.tag3 && (
//                                             <Chip label={articleData.tag3} sx={{ marginRight: 1 }} />
//                                         )}
//                                     </Typography>
//                                 </Box>

//                                 <Rating
//                                     value={
//                                         typeof articleData.score === "number" ? articleData.score : 0
//                                     }
//                                     readOnly
//                                     precision={0.5}
//                                     sx={{ mt: 3 }}
//                                 />
//                                 <Typography
//                                     variant="body2"
//                                     color="text.secondary"
//                                     sx={{ marginTop: 1, marginBottom: 2 }}
//                                 >
//                                     Average User Rating:{" "}
//                                     {typeof articleData.score === "number"
//                                         ? articleData.score.toFixed(1)
//                                         : "0"}{" "}
//                                     / 5
//                                 </Typography>

//                                 <Typography variant="h5" sx={{ fontWeight: "bold", color: '#4CAF50', marginBottom: "16px" }}>
//                                     Price: ${articleData.price}
//                                 </Typography>

//                             </Box>

//                             <Box margin={'auto 0'}>
//                                 <Grid>
//                                     <img
//                                         src={articleData.image || DefaultArticleImage}
//                                         alt="Article Preview"
//                                         style={{
//                                             width: "100%",
//                                             height: "auto",
//                                             borderRadius: "8px",
//                                             marginBottom: "16px",
//                                         }}
//                                     />
//                                 </Grid>

//                                 <Grid>
//                                     <Button variant="contained" fullWidth onClick={() => window.scrollTo(0, 0)} sx={{ marginTop: 2 }}>
//                                         Go to article
//                                     </Button>
//                                 </Grid>
//                             </Box>
//                         </Box>

//                         {/* Number of Members */}
//                         <Grid item xs={12} sm={6} md={3}>
//                             <CustomCard
//                                 sx={{

//                                     padding: 2,
//                                     backgroundColor: "secondary.light",
//                                     color: "secondary.contrastText",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     height: "100%", // Ensuring it takes full height on mobile and centers
//                                 }}
//                             >
//                                 <PeopleIcon
//                                     sx={{
//                                         fontSize: { xs: 30, sm: 40 },
//                                         color: "secondary.main",
//                                         marginBottom: 1,
//                                     }}
//                                 />
//                                 <Typography
//                                     variant="h6"
//                                     fontWeight="bold"
//                                     sx={{
//                                         display: { xs: "none", sm: "block" },
//                                         fontSize: { xs: "1rem", sm: "1.25rem" },
//                                     }}
//                                 >
//                                     Number of Members
//                                 </Typography>
//                                 <Typography
//                                     variant="body1"
//                                     sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
//                                 >
//                                     {articleData?.numberOfMembers}
//                                 </Typography>
//                             </CustomCard>
//                         </Grid>
//                     </Card>

//                     <Box sx={{ marginTop: 4 }}>
//                         <Typography variant="h5" sx={{ marginBottom: 2 }}>
//                             Comments
//                         </Typography>

//                         <TextField
//                             label="Your Name"
//                             variant="outlined"
//                             fullWidth
//                             margin="normal"
//                             value={newComment.name}
//                             onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
//                         />
//                         <TextField
//                             label="Your Comment"
//                             variant="outlined"
//                             fullWidth
//                             multiline
//                             rows={4}
//                             margin="normal"
//                             value={newComment.comment}
//                             onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
//                         />
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             onClick={handleAddComment}
//                             disabled={!newComment.name || !newComment.comment.trim()}
//                             startIcon={<CommentIcon />}
//                         >
//                             Add Comment
//                         </Button>

//                         <List sx={{ marginTop: 2 }}>
//                             {comments.map((comment) => (
//                                 <React.Fragment key={comment.id}>
//                                     <ListItem>
//                                         <ListItemAvatar>
//                                             <Avatar>{comment.name.charAt(0).toUpperCase()}</Avatar>
//                                         </ListItemAvatar>
//                                         <ListItemText primary={comment.name} secondary={comment.comment} />
//                                     </ListItem>
//                                     <Divider />
//                                 </React.Fragment>
//                             ))}
//                         </List>
//                     </Box>
//                 </Box >
//             </Box >
//         )
//     );
// }

// export default PublicArticle;



import React, { useState, useEffect } from "react";
import { Rating, Grid, Box, Typography, Chip, Card, CardContent, Button, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar, TextField } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import DefaultArticleImage from "../../../assets/images/default_exam_image.jpg"; // Replace with your default image
import { styled } from "@mui/system";
import PeopleIcon from "@mui/icons-material/People";

const primaryGradient = ["#5356FF", "#378CE7", "#67C6E3", "#DFF5FF"];
const levelColors = {
    Beginner: '#4CAF50',
    Intermediate: "#FF9800",
    Advanced: "#F44336",
};

const CustomCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(4),
    backgroundColor: "#fff",
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


const articleData = {

    title: "The Future of AI: Impacts on Society",
    level: "Advanced",
    description:
        "This article discusses the future of artificial intelligence, its potential impacts on society, and how we can prepare for the changes it brings.",
    content:
        "Artificial Intelligence (AI) has made remarkable strides in recent years, transforming industries, economies, and even personal lives. From healthcare to transportation, AI is rapidly becoming a core component of innovation and problem-solving across the globe. As we move into a future dominated by AI, it's essential to understand the implications of this technology. AI is likely to have profound impacts on employment, education, privacy, ethics, and decision-making. It’s crucial that society begins preparing for these changes now, to ensure that AI remains a force for good, helping to address some of the world's most pressing challenges, such as climate change, inequality, and disease. However, it’s also essential to consider the risks, including job displacement, security concerns, and the potential for AI to be used unethically. With careful regulation and thoughtful leadership, we can harness the power of AI to create a brighter, more sustainable future for all.",
    numberOfMembers: 5,
    image: DefaultArticleImage, // You can replace this with a URL of an image
    tag1: 'rest',
    tag2: 'lkj',
    tag3: 'hgf',
    price: 100
};

function PublicArticle() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: "", comment: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            if (!articleData) {
                setError("Failed to load article data.");
            }
            setLoading(false);
        }, 2000);
    }, []);

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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
                <CircularProgress />
                <Typography sx={{ marginTop: 2 }}>Loading article details...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
                <Typography sx={{ color: "red" }}>{error}</Typography>
            </Box>
        );
    }

    return (
        articleData && (
            <Box sx={{ display: "flex", justifyContent: "center", paddingY: 4, backgroundColor: primaryGradient[3], marginTop: "50px" }}>
                <Box sx={{ maxWidth: 950, width: "100%", paddingX: 4 }}>
                    <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", padding: 4, backgroundColor: "#fff" }}>
                        <Box display={'flex'}>
                            <Box mr={2}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", color: primaryGradient[0], marginBottom: "16px" }}>
                                    {articleData.title}
                                </Typography>

                                <SubTitle>{articleData.description}</SubTitle>

                                <Chip
                                    label={articleData.level}
                                    sx={{
                                        backgroundColor: levelColors[articleData.level],
                                        color: "#fff",
                                        marginBottom: 2,
                                    }}
                                />

                                <Box sx={{}}>
                                    <Typography variant="body2" color="text.secondary">
                                        {articleData.tag1 && (
                                            <Chip label={articleData.tag1} sx={{ marginRight: 1 }} />
                                        )}
                                        {articleData.tag2 && (
                                            <Chip label={articleData.tag2} sx={{ marginRight: 1 }} />
                                        )}
                                        {articleData.tag3 && (
                                            <Chip label={articleData.tag3} sx={{ marginRight: 1 }} />
                                        )}
                                    </Typography>
                                </Box>

                                <Rating
                                    value={
                                        typeof articleData.score === "number" ? articleData.score : 0
                                    }
                                    readOnly
                                    precision={0.5}
                                    sx={{ mt: 3 }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ marginTop: 1, marginBottom: 2 }}
                                >
                                    Average User Rating:{" "}
                                    {typeof articleData.score === "number"
                                        ? articleData.score.toFixed(1)
                                        : "0"}{" "}
                                    / 5
                                </Typography>

                                <Typography variant="h5" sx={{ fontWeight: "bold", color: '#4CAF50', marginBottom: "16px" }}>
                                    Price: ${articleData.price}
                                </Typography>

                            </Box>

                            <Box margin={'auto 0'}>
                                <Grid>
                                    <img
                                        src={articleData.image || DefaultArticleImage}
                                        alt="Article Preview"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "8px",
                                            marginBottom: "16px",
                                        }}
                                    />
                                </Grid>

                                <Grid>
                                    <Button variant="contained" fullWidth onClick={() => window.scrollTo(0, 0)} sx={{ marginTop: 2 }}>
                                        Go to article
                                    </Button>
                                </Grid>
                            </Box>

                        </Box>

                        {/* Number of Members */}
                        <Grid item xs={12} sm={6} md={3}>
                            <CustomCard
                                sx={{

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
                                    {articleData?.numberOfMembers}
                                </Typography>
                            </CustomCard>
                        </Grid>
                    </Card>

                    <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            Comments
                        </Typography>

                        <TextField
                            label="Your Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                        />
                        <TextField
                            label="Your Comment"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            value={newComment.comment}
                            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleAddComment}
                            disabled={!newComment.name || !newComment.comment.trim()}
                            startIcon={<CommentIcon />}
                        >
                            Add Comment
                        </Button>

                        <List sx={{ marginTop: 2 }}>
                            {comments.map((comment) => (
                                <React.Fragment key={comment.id}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>{comment.name.charAt(0).toUpperCase()}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={comment.name} secondary={comment.comment} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                </Box >
            </Box >
        )
    );
}

export default PublicArticle;
