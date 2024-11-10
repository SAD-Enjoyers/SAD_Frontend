import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Importing the search icon
import Layout from "../../../common/Layout";

function QuestionSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(""); // For filtering
  const [sortOrder, setSortOrder] = useState(""); // For sorting

  // Sample questions data for demonstration
  const questions = [
    {
      id: 1,
      name: "What is React?",
      writer: "Alice",
      score: 8,
      subject: "JavaScript",
      date: "2024-10-01",
    },
    {
      id: 2,
      name: "What is Node.js?",
      writer: "Bob",
      score: 7.5,
      subject: "JavaScript",
      date: "2024-10-03",
    },
    {
      id: 3,
      name: "What is Machine Learning?",
      writer: "Charlie",
      score: 9,
      subject: "AI",
      date: "2024-10-05",
    },
    {
      id: 4,
      name: "What is Python?",
      writer: "David",
      score: 6,
      subject: "Python",
      date: "2024-10-07",
    },
    // Add more questions as needed
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setLoading(true);
    // Add search logic here (e.g., make API call)
    setTimeout(() => setLoading(false), 1500); // Simulate loading time
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filter and sort the questions based on the search term, selected subject, and sorting order
  const filteredQuestions = questions
    .filter(
      (question) =>
        question.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubject ? question.subject === selectedSubject : true)
    )
    .sort((a, b) => {
      if (sortOrder === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortOrder === "score") {
        return b.score - a.score;
      }
      return 0; // No sorting
    });

  return (
    <div>
      <Layout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: "#DFF5FF", // Lightest blue
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "120px", // Adjust this value based on the height of your NavBar
            width: "100%",
            maxWidth: "600px", // Restrict maximum width for better layout
            marginX: "auto", // Center horizontally
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyPress} // Trigger search on Enter key press
            aria-label="Search questions"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                color: "#5356FF", // Dark blue for text
                "& fieldset": {
                  borderColor: "#378CE7", // Medium blue for border
                },
                "&:hover fieldset": {
                  borderColor: "#5356FF", // Darker blue on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5356FF", // Dark blue when focused
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#378CE7" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchSubmit}
            aria-label="Search"
            sx={{
              backgroundColor: "#67C6E3", // Light blue
              "&:hover": {
                backgroundColor: "#378CE7", // Darker blue on hover
              },
              color: "white",
              width: "120px", // Fixed width for button
              height: "100%", // Make button height align with input field
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: loading ? 0.6 : 1, // Show loading state
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Searching..." : "Search"}
          </Button>

          {/* Filter Section */}
          <Box sx={{ display: "flex", gap: 2, marginTop: "20px" }}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject}
                onChange={handleSubjectChange}
                label="Subject"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#5356FF",
                    "& fieldset": {
                      borderColor: "#378CE7",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5356FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5356FF",
                    },
                  },
                }}
              >
                <MenuItem value="">All Subjects</MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="AI">AI</MenuItem>
                {/* Add more subjects as needed */}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOrder}
                onChange={handleSortChange}
                label="Sort By"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#5356FF",
                    "& fieldset": {
                      borderColor: "#378CE7",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5356FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5356FF",
                    },
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="score">Score</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Display filtered and sorted questions */}
          <Box sx={{ marginTop: "20px", width: "100%" }}>
            {filteredQuestions.map((question) => (
              <Box
                key={question.id}
                sx={{
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6">{question.name}</Typography>
                <Typography variant="body2" sx={{ color: "#7D7D7D" }}>
                  Writer: {question.writer} | Subject: {question.subject} |
                  Score: {question.score} | Date:{" "}
                  {new Date(question.date).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Layout>
    </div>
  );
}

export default QuestionSearch;
