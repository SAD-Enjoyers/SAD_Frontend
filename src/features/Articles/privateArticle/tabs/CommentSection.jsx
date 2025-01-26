import React, { useState, useEffect  } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, List, ListItem } from '@mui/material';
import { styled } from "@mui/system";
import Comments from "../../../../common/Comments/CommentSection";

const CommentsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#f9f9f9",
  // padding: theme.spacing(3),
  borderRadius: "8px",
}));

const CommentSection = ({ accessToken }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const { articleData } = location.state || {};

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

       
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
    fetchArticleContent();
    
  }, [articleData]);

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


  return (
    <Box>
      {/* Comments Container */}
      <CommentsContainer>
        <Comments serviceId={articleData.serviceId} />
      </CommentsContainer>
    </Box>
  );
};

export default CommentSection;
