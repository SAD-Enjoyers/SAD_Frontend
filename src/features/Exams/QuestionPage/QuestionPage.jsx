import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const questionId = urlParams.get("questionId") || "3"; // Default questionId for testing

        const response = await fetch(`/api/v1/questions/get-question?questionId=${questionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }

        const data = await response.json();

        if (data.status === "success") {
          const questionData = data.data.question;
          setQuestion({
            id: questionData.questionId,
            name: questionData.questionName,
            text: questionData.questionText,
            options: [
              { text: questionData.o1, isCorrect: questionData.rightAnswer === 1 },
              { text: questionData.o2, isCorrect: questionData.rightAnswer === 2 },
              { text: questionData.o3, isCorrect: questionData.rightAnswer === 3 },
              { text: questionData.o4, isCorrect: questionData.rightAnswer === 4 },
            ],
            tags: [questionData.tag1, questionData.tag2, questionData.tag3].filter(Boolean),
            author: questionData.userName || "Unknown Author",
            visibility: questionData.visibility ?? false,
          });
          setRating(parseFloat(questionData.score) || 0);
          setRatingCount(questionData.numberOfVoters || 0);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const handleOptionSelect = (optionText) => {
    if (!submitted) {
      setSelectedOption(optionText);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option before submitting!");
      return;
    }

    const selected = question.options.find(
      (option) => option.text === selectedOption
    );
    const correct = question.options.find((option) => option.isCorrect);

    setSubmitted(true);
    setOpenDialog(true);

    if (selected && selected.isCorrect) {
      setSuccessMessage("Correct! You chose the right answer.");
    } else {
      setSuccessMessage(`Incorrect! The correct answer is: ${correct.text}`);
    }
  };

  const handleRatingChange = async (event, newValue) => {
    if (newValue !== null) {
      try {
        const response = await fetch(`/api/v1/questions/score-submission`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: question.id,
            scored: newValue,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit rating");
        }

        const data = await response.json();

        if (data.status === "success") {
          setRating(parseFloat(data.data.score));
          setRatingCount(data.data.numberOfVoters);
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: "#E3F2FD",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {question.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {question.text}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {question.tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ marginRight: 1, marginBottom: 1 }} />
          ))}
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Author: {question.author}
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedOption}
              onChange={(e) => handleOptionSelect(e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.text}
                  control={<Radio disabled={submitted} />}
                  label={option.text}
                  sx={{
                    color:
                      submitted && option.isCorrect
                        ? "green"
                        : submitted && selectedOption === option.text
                        ? "red"
                        : "inherit",
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {!submitted && (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          )}
        </CardContent>
      </Card>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          textAlign: "center",
          backgroundColor: "#E3F2FD",
        }}
      >
        <Typography variant="h6">Rate this question</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          precision={0.5}
        />
        <Typography variant="body2">
          Current Rating: {rating.toFixed(1)} ({ratingCount} votes)
        </Typography>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {successMessage.includes("Correct") ? "Correct Answer" : "Incorrect Answer"}
        </DialogTitle>
        <DialogContent>
          <Typography>{successMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default QuestionPage;
