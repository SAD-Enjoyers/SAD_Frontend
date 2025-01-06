import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const ExamPreview = ({ examData, accessToken }) => {
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (examData?.serviceId) {
      fetchExamResult(examData.serviceId);
    }
  }, [examData?.serviceId]);

  const fetchExamResult = async (serviceId) => {
    setLoading(true);
    setError(null);

    // const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `/api/v1/exam/exam-result/${serviceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include token in the Authorization header
          },
        }
      );
      console.log(response);

      if (response.data.status === "success") {
        setExamResult(response.data.data);
      } else {
        setError("Failed to fetch the exam result.");
      }
    } catch (err) {
      setError("An error occurred while fetching the exam result.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4">{examData?.title}</Typography>
      {examResult ? (
        <Box>
          <Typography variant="h6">
            Exam Score: {examResult.examScore}
          </Typography>
          <Typography variant="h6">
            Right Answers: {examResult.rightAnswers}
          </Typography>
          <Typography variant="h6">
            Wrong Answers: {examResult.wrongAnswers}
          </Typography>
          <Typography variant="h6">
            Empty Answers: {examResult.emptyAnswers}
          </Typography>
          <Typography variant="h6">Result: {examResult.passed}</Typography>
        </Box>
      ) : (
        <Typography variant="h6">No result available for this exam.</Typography>
      )}
    </Box>
  );
};

export default ExamPreview;
