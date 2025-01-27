import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating as MuiRating,
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
import { useParams } from "react-router-dom";

function QuestionPage() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [ratingStatus, setRatingStatus] = useState(null);  // اضافه کردن استیت جدید


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // const urlParams = new URLSearchParams(window.location.search);
        // const questionId = urlParams.get("questionId") ;

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
        console.log("Response from server:", data);
        if (data.status === "success") {
          const fetchedQuestion = {
            id: data.data.question.questionId,
            title: data.data.question.questionName,
            text: data.data.question.questionText,
            tags: [data.data.question.tag1, data.data.question.tag2, data.data.question.tag3].filter(Boolean),
            rating: parseFloat(data.data.question.score),
            ratingCount: data.data.question.numberOfVoters,
            options: [
              { text: data.data.question.o1, isCorrect: data.data.question.rightAnswer === 1 },
              { text: data.data.question.o2, isCorrect: data.data.question.rightAnswer === 2 },
              { text: data.data.question.o3, isCorrect: data.data.question.rightAnswer === 3 },
              { text: data.data.question.o4, isCorrect: data.data.question.rightAnswer === 4 },
            ],
            author: data.data.question.userName || "Unknown Author",
            userScore: data.userScore !== null ? data.userScore : 0,
          };

          setQuestion(fetchedQuestion);
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

    setSubmitted(true); // Disable further changes
    setCorrectAnswer(correct.text);
    setOpenDialog(true); // Open dialog after submission

    // if (selected && selected.isCorrect) {
    //   setSuccessMessage("Correct! You chose the right answer.");
    // } else {
    //   setSuccessMessage(`Incorrect! The correct answer is: ${correct.text}.`);
    // }
  };

  const handleRatingChange = async (event, newValue) => {
    if (newValue !== null) {
      try {
        // Retrieve the token (the same key used at login)
        const token = localStorage.getItem("token");
  
        if (!token) {
          setErrorMessage("You must log in to rate this question.");
        }

        // if (question.author === "current_user") { // فرض کنید "current_user" شناسه کاربر جاری است
        //   setErrorMessage("You cannot rate your own question.");
        //    // جلوگیری از ادامه اجرا
        // }
  
        // Optionally, get the user role
        const role = localStorage.getItem("role") || "user";
  
        // If you are using a proxy, "/api/v1/..." is fine.
        // Otherwise, use the full URL: "http://localhost:3000/api/v1/..."
        const response = await fetch("/api/v1/questions/score-submission", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Include Bearer
            "x-role": role,
          },
          body: JSON.stringify({
            questionId: question.id,
            scored: newValue,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 403) {
            setErrorMessage( errorData.message || "You are not authorized to submit a rating.");
          } else {
            throw new Error("Failed to submit rating.");
          }
          return;
        }
  
        const data = await response.json();
        console.log("API Response after submitting rating:", data)
        
        if (data.status === "success") {
          setQuestion((prevQuestion) => ({
            ...prevQuestion,
            rating: parseFloat(data.data.score),
            ratingCount: data.data.numberOfVoters,
            userScore: data.data.userScore || newValue,
            
          }));

          localStorage.setItem(`rating-${question.id}`, newValue);
        // اگر اولین بار است ریتینگ داده شده، پیام ارسال می‌شود
        if (ratingStatus === null) {
          setSuccessMessage("Your rating has been successfully submitted.");
          setRatingStatus("submitted");
        } else {
          // اگر ریتینگ آپدیت شده باشد، پیام آپدیت شدن داده می‌شود
          setSuccessMessage("Your rating has been updated successfully!");
          setRatingStatus("updated");
        }
      } else {
        throw new Error("Unexpected response format");
      }
      } catch (error) {
        console.error("Error submitting rating:", error);
        setErrorMessage("Error submitting rating. Please try again.");
      }
    }
  };
  
  useEffect(() => {
    if (question) {
      const savedRating = localStorage.getItem(`rating-${question.id}`);
      if (savedRating && parseFloat(savedRating) !== question.userScore) {
        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          userScore: parseFloat(savedRating),
        }));
      }
    }
  }, [question?.id]);
  
  
  

  

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
            {question.title} {/* Display question name */}
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
                        control={<Radio sx={{ zIndex: 1 }} disabled={submitted} />}
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
     {/* Error Message */}
     {errorMessage && (
        <Typography
          sx={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '8px 16px',
            borderRadius: '5px',
            fontSize: '14px',
            marginBottom: '10px',
          }}
        >
          {errorMessage}
        </Typography>
      )}

      {/* Success Message */}
      {successMessage &&(
        <Typography
          sx={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '8px 16px',
            borderRadius: '5px',
            marginBottom: '10px',
            fontSize: '14px',
          }}
        >
          {successMessage}
        </Typography>
      )}

  {/* Update Message (for rating update)
  {hasSubmitted && (
    <Typography
      sx={{
        backgroundColor: "#c3e6cb",
        color: "#155724",
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "14px",
        fontWeight: 500,
        textAlign: "center",
        border: "1px solid #c3e6cb",
        marginBottom: "10px",
      }}
    >
      Your rating has been updated!
    </Typography>
  )} */}

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '18px', color: '#000', marginBottom: '10px' }}>
              Rate this question
            </Typography>

            {question.userScore !== null && (
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            color: "#4CAF50",
            fontWeight: "bold",
          }}
        >
        {question.userScore} / 5
        </Typography>
      )}

            <MuiRating
              name={`rating-${question.id}`}
              value={question.userScore || 0}
              onChange={handleRatingChange}
              precision={0.5}
              sx={{
                color: '#FFD700',
                fontSize: '24px',
                cursor: 'pointer',
                '& .MuiRating-iconEmpty': {
                  color: '#FFD70066',
                },
                marginBottom: '10px',
              }}
            />

            <Typography
              variant="body1"
              sx={{  marginTop: '5px', color: "#1E88E5", fontWeight: "bold",fontSize: '14px' }}
            >
              Average Rating: {question.rating.toFixed(1)}
            </Typography>
            <Typography
              variant="body1"
              sx={{    color: '#1E88E5',
                fontWeight: 'bold',
                fontSize: '14px',
                marginTop: '5px', }}
            >
              Total Votes: {question?.ratingCount || 0}
            </Typography>
            {/* {question.userScore !== null && (
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            color: "#4CAF50",
            fontWeight: "bold",
          }}
        >
          Your Rating: {question.userScore}
        </Typography>
      )} */}
          </Box>
        </Box>
      </Box>

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
            onClick={handleCloseDialog}
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
            <span style={{ color: "#000", fontWeight: "bold" }}>
              The correct answer is: {" "}
            </span>
            <span
              style={{
                color: "#4CAF50", // Softer green
                fontWeight: "bold",
              }}
            >
              {correctAnswer}
            </span>
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
