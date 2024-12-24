import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import { Warning, Clear } from "@mui/icons-material";

const OngoingExamPage = ({examData}) => {
  
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0); // زمان باقیمانده آزمون
  const [openDialog, setOpenDialog] = useState(false);
  const [questions, setQuestions] = useState([]); // سوالات از سمت بک‌اند
  const [examToken, setExamToken] = useState(""); // توکن آزمون
  const [loading, setLoading] = useState(true);

  // دریافت داده‌های آزمون از سمت سرور
  useEffect(() => {

    const startExam = async () => {
      // try {
        const serviceId = 1 //examData.serviceId; // آی‌دی سرویس به عنوان مثال
        const token = localStorage.getItem("examToken");
        // const token = localStorage.getItem("token");

        console.log(serviceId);
        console.log(token);
        if (!token) {
          throw new Error("Exam token is missing. Please login or start the exam again.");
        }

        const response = await fetch(`/api/v1/exam/start-exam/${serviceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exam data.");
        }

        const data = await response.json();
        console.log("Received Data:", data);

        if (data.status === "success") {
          const fetchedQuestions = data.data.questions.map((q) => ({
            questionId: q.questionId,
            questionText: q.questionText,
            options: [q.o1, q.o2, q.o3, q.o4], // تبدیل گزینه‌ها
          }));
          setQuestions(fetchedQuestions);
          setTimeRemaining(data.data.examDuration * 60); // تنظیم زمان
          const token = data.data.examToken;
          setExamToken(token); // ذخیره در state
          localStorage.setItem("examToken", token); // ذخیره در localStorage
          console.log("Exam token saved to localStorage:", token);
        } else {
          throw new Error("Unexpected response format.");
        }
      // } catch (error) {
      //   console.error("Error starting exam:", error);
      //   alert("Failed to fetch exam data.");
      // } finally {
      //   setLoading(false);
      // }
    };

    startExam();
  }, [examData]);

  // تایمر برای شمارش معکوس زمان آزمون
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // تنظیم پیشرفت آزمون
  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  const handleOptionChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const handleClearAnswer = () => {
    setSelectedOption({
      ...selectedOption,
      [currentQuestionIndex]: undefined,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    setOpenDialog(true);
  };

  const confirmSubmission = async () => {
    setOpenDialog(false);

    const answers = questions.map((question, index) => ({
      questionId: question.questionId,
      userAnswer: selectedOption[index] || null,
    }));

    try {
       const token = localStorage.getItem("examToken");
      const response = await fetch("/api/v1/exam/end-exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${examToken}`,
        },
        body: JSON.stringify({
          examToken, // ارسال توکن آزمون
          answers, // ارسال پاسخ‌ها
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit exam.");
      }

      const data = await response.json();

      if (data.status === "success") {
        console.log("Exam submitted successfully:", data);
        alert("Exam finished successfully.");
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Error submitting exam.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return <Typography variant="h6">Loading exam data...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <AppBar position="static" sx={{ width: "100%", maxWidth: "850px", bgcolor: "#3f51b5", borderRadius: "8px", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ongoing Exam
          </Typography>
          <Typography variant="subtitle1">Time Remaining: {formatTime(timeRemaining)}</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Card sx={{ flex: 3, boxShadow: 3, bgcolor: "#ffffff", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].questionText}
              </Typography>
              <RadioGroup value={selectedOption[currentQuestionIndex] || ""} onChange={handleOptionChange}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    label={`${String.fromCharCode(97 + index)}) ${option}`}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
              <Button
                variant="text"
                startIcon={<Clear />}
                onClick={handleClearAnswer}
                sx={{
                  mt: 2,
                  color: "#f44336",
                  "&:hover": { color: "#d32f2f" },
                }}
              >
                Clear Answer
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit your exam?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmSubmission} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OngoingExamPage;
