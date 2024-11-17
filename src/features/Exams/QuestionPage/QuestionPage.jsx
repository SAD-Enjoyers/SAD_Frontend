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

    setSubmitted(true); // گزینه‌ها را غیرقابل تغییر می‌کند.
    setCorrectAnswer(correct.text);

    if (selected && selected.isCorrect) {
      setSuccessMessage("Correct! You chose the right answer.");
    } else {
      setSuccessMessage(
        `Incorrect! The correct answer is: "${correct.text}".`
      );
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
}

export default QuestionPage;
