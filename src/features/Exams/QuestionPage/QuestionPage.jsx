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
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("questionData"));
    if (savedData) {
      setQuestion(savedData);
    } else {
      const dummyData = {
        id: 1,
        title: "API Development in Node.js",
        text: "How can I create an API in Node.js?",
        tags: ["Node.js", "API"],
        rating: 3,
        ratingCount: 15,
        options: [
          { text: "Using Express.js", isCorrect: true },
          { text: "Using Koa.js", isCorrect: false },
          { text: "Using Hapi.js", isCorrect: false },
          { text: "Using Flask", isCorrect: false },
        ],
        author: "John Doe",
        questionName: "How to create a Node.js API?"
      };
      setQuestion(dummyData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (question) {
      localStorage.setItem("questionData", JSON.stringify(question));
    }
  }, [question]);

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

    setSubmitted(true); // Disable further changes
    setCorrectAnswer(correct.text);
    setOpenDialog(true); // Open dialog after submission

    if (selected && selected.isCorrect) {
      setSuccessMessage("Correct! You chose the right answer.");
    } else {
      setSuccessMessage(`Incorrect! The correct answer is: ${correct.text}.`);
    }
  };

  const handleRatingChange = (event, newValue) => {
    if (newValue !== null) {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        rating: newValue,
        ratingCount: prevQuestion.ratingCount + 1, // Increment rating count
      }));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleExitDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "130px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "670px",
              padding: 2,
              backgroundColor: "#E3F2FD",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {question.questionName} {/* نمایش نام سوال */}
            </Typography>
          </Paper>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 2,
              width: "700px",
            }}
          >
            <Card
              sx={{
                flex: 2,
                padding: 2,
                boxShadow: 3,
                textAlign: "center",
                backgroundColor: "#E3F2FD",
                display: "flex",
              }}
            >
            
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {question.text}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Author: {question.author}
                </Typography>

                <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap", marginLeft: "10px" }}>
                  {question.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        margin: 0.5,
                        backgroundColor: "#5356FF",
                        color: "white",
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ marginTop: 2 }}>
                  <FormControl component="fieldset" sx={{ width: "100%" }}>
                    <RadioGroup
                      value={selectedOption}
                      onChange={(e) => handleOptionSelect(e.target.value)}
                    >
                      {question.options.map((option, index) => (
                        <FormControlLabel
                          key={index}
                          value={option.text}
                          control={
                            <Radio
                              sx={{ zIndex: 1 }}
                              disabled={submitted}
                            />
                          }
                          label={`${index + 1}. ${option.text}`}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginBottom: 1,
                            color:
                              submitted && option.isCorrect
                                ? "green"
                                : submitted && selectedOption === option.text
                                ? "red"
                                : "inherit",
                            fontWeight:
                              submitted && option.isCorrect
                                ? "bold"
                                : "normal",
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>

                {!submitted && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                      marginTop: 2,
                      width: "90%",
                      backgroundColor: "#5356FF",
                      "&:hover": {
                        backgroundColor: "#3f51b5",
                      },
                    }}
                  >
                    Submit
                  </Button>
                )}
              </CardContent>
              </Card>

              <Box
              sx={{
                flex: 1,
                padding: 2,
                backgroundColor: "#E3F2FD",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Rate this question
              </Typography>
              <Rating
                name={`rating-${question.id}`}
                value={question.rating}
                onChange={handleRatingChange}
                precision={0.5}
                sx={{ color: "#5356FF", fontSize: "24px" }}
              />

                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, color: "#5356FF" }}
                >
                  ({question.ratingCount} votes)
                </Typography>
              </Box>
            
          </Box>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#E3F2FD", // Match the background color of the question card
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: successMessage.includes("Correct") ? "green" : "red", // Green for correct, red for incorrect
            textAlign: "center",
            padding: "10px",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          {successMessage.includes("Correct") ? "Correct Answer!" : "Incorrect Answer!"}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleExitDialog}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              textAlign: "center",
              fontWeight: "normal",
            }}
          >
            {successMessage.includes("Correct") ? (
              successMessage
            ) : (
              <span>
                <strong style={{ color: "green", fontWeight: "bold" }}>
                  The correct answer is: {correctAnswer}
                </strong>
              </span>
            )}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "10px 20px",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#5356FF", // Match submit button color
              "&:hover": {
                backgroundColor: "#3f51b5",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default QuestionPage;
