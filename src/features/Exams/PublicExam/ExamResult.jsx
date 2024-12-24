import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const ExamPreview = ({ examData }) => {
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

    try {
      const response = await axios.get(`/api/v1/exam/exam-result/${serviceId}`);
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert("Starting the exam...")}
      >
        Start Exam
      </Button>
    </Box>
  );
};

export default ExamPreview;

// <Card
//                 sx={{
//                   maxWidth: 600,
//                   margin: "35px auto",
//                   padding: { xs: 2, sm: 3 },
//                   boxShadow: 5,
//                   borderRadius: 3,
//                   backgroundColor: "#fff",
//                   width: "100%", // Ensures full width on smaller screens
//                 }}
//               >
//                 <CardContent>
//                   <Typography
//                     variant="h4"
//                     sx={{
//                       marginBottom: { xs: 2, sm: 3 },
//                       textAlign: "center",
//                       fontWeight: "bold",
//                       color: "#5356FF",
//                       fontSize: { xs: "h5", sm: "h4" }, // Adjust font size for smaller screens
//                     }}
//                   >
//                     Exam Results
//                   </Typography>
//                   <Divider sx={{ marginBottom: { xs: 2, sm: 3 } }} />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: 2,
//                       color: examResult.passed ? "green" : "red",
//                     }}
//                   >
//                     {examResult.passed ? (
//                       <CheckCircleIcon sx={{ marginRight: 1 }} />
//                     ) : (
//                       <CancelIcon sx={{ marginRight: 1 }} />
//                     )}
//                     <strong>Status:</strong>{" "}
//                     {examResult.passed ? "Passed" : "Failed"}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: 2,
//                       color: "#378CE7",
//                     }}
//                   >
//                     <QuestionAnswerIcon sx={{ marginRight: 1 }} />
//                     <strong>Score:</strong> {examResult.score || "N/A"}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: 2,
//                       color: "#67C6E3",
//                     }}
//                   >
//                     <AssignmentIcon sx={{ marginRight: 1 }} />
//                     <strong>Total Questions:</strong>{" "}
//                     {examResult.totalQuestions || "N/A"}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: 2,
//                       color: "#67C6E3",
//                     }}
//                   >
//                     <DoneAllIcon sx={{ marginRight: 1 }} />
//                     <strong>Correct Answers:</strong>{" "}
//                     {examResult.correctAnswers || "N/A"}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       color: "#5356FF",
//                     }}
//                   >
//                     <AccessTimeIcon sx={{ marginRight: 1 }} />
//                     <strong>Time Taken:</strong> {examResult.timeTaken || "N/A"}
//                   </Typography>
//                 </CardContent>
//               </Card>
