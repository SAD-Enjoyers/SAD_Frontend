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
  LinearProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import { Warning, Clear } from "@mui/icons-material";
const OngoingExamPage = () => {
    const [progress, setProgress] = useState(0);
    const [selectedOption, setSelectedOption] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
    const [openDialog, setOpenDialog] = useState(false);
  
    // Added 5 new questions
    const questions = [
      { id: 1, question: "What is 2 + 3?", options: ["4", "5", "6", "7"] },
      { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"] },
      { id: 3, question: "What is the square root of 16?", options: ["2", "4", "6", "8"] },
      { id: 4, question: "What is 10 * 10?", options: ["100", "110", "90", "80"] },
      { id: 5, question: "What is 15 / 3?", options: ["5", "6", "4", "3"] },
      { id: 6, question: "What is the color of the sky?", options: ["Blue", "Green", "Red", "Yellow"] },
      { id: 7, question: "What is 7 - 2?", options: ["4", "5", "6", "7"] },
      { id: 8, question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"] },
      { id: 9, question: "Who is the author of '1984'?", options: ["George Orwell", "J.K. Rowling", "Mark Twain", "Charles Dickens"] },
      { id: 10, question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"] },
    ];
    useEffect(() => {
        const timer = setInterval(() => {
          setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
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
    
      const confirmSubmission = () => {
        setOpenDialog(false);
        console.log("Exam finished. Answers:", selectedOption);
      };
    
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
      };
    
      const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index);
      };
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
          {/* Header */}
          <AppBar
            position="static"
            sx={{
              width: "100%",
              maxWidth: "850px",
              bgcolor: "#3f51b5",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Ongoing Exam: Mathematics
              </Typography>
              <Typography variant="subtitle1">
                Time Remaining: {formatTime(timeRemaining)}
              </Typography>
            </Toolbar>
          </AppBar>
    
          <Container maxWidth="md">
            {/* Progress Bar */}
            {/* <Box sx={{ width: "100%", mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 5,
                  bgcolor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    background: "linear-gradient(90deg, #3f51b5, #1a73e8)",
                  },
                }}
              />
            </Box> */}
                    {/* Question Card */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Card
            sx={{
              flex: 3,
              boxShadow: 3,
              bgcolor: "#ffffff",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
              </Typography>
              <RadioGroup
                value={selectedOption[currentQuestionIndex] || ""}
                onChange={handleOptionChange}
              >
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
                    {/* Right Panel */}
                    <Paper
            sx={{
              flex: 1,
              boxShadow: 3,
              p: 2,
              bgcolor: "#ffffff",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Question Progress
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {questions.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  sx={{
                    width: "50px",
                    height: "30px",
                    borderRadius: "5px",
                    backgroundColor:
                      selectedOption[index] !== undefined ? "#3f51b5" : "#f5f5f5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    transition: "background-color 0.3s",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Typography
                    sx={{
                      color: selectedOption[index] !== undefined ? "#fff" : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleFinish}
            sx={{
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#388e3c" },
            }}
          >
            Finish
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
        </Box>
      </Container>
            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Warning color="warning" />
          Confirm Submission
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your exam? Once submitted, you cannot change your answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              color: "#f44336",
              borderColor: "#f44336",
              "&:hover": {
                backgroundColor: "#f8d7da",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmSubmission}
            variant="contained"
            sx={{
              bgcolor: "#4caf50",
              "&:hover": {
                bgcolor: "#388e3c",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OngoingExamPage;