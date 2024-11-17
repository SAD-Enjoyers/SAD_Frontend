import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

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

  return <Box>Loading...</Box>;
}

export default QuestionPage;
