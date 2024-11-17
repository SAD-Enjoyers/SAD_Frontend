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
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../../../common/Layout";

function QuestionSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [activeTab, setActiveTab] = useState(0); // 0: Questions, 1: Exams

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
  ];

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simulate loading
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSearchSubmit();
  };

  const handleSubjectChange = (event) => setSelectedSubject(event.target.value);

  const handleSortChange = (event) => setSortOrder(event.target.value);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  // Filtered questions
  const filteredQuestions = questions
    .filter(
      (question) =>
        question.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubject ? question.subject === selectedSubject : true)
    )
    .sort((a, b) => {
      if (sortOrder === "date") return new Date(a.date) - new Date(b.date);
      if (sortOrder === "score") return b.score - a.score;
      return 0;
    });

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          marginTop: "120px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Questions" />
          <Tab label="Exams" />
        </Tabs>
        {activeTab === 0 && (
          <Box>
            <Box sx={{ marginTop: "20px", display: "flex", gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyPress}
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearchSubmit}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2, marginTop: "20px" }}>
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Subject</InputLabel>
                <Select
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  label="Subject"
                >
                  <MenuItem value="">All Subjects</MenuItem>
                  <MenuItem value="JavaScript">JavaScript</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                  <MenuItem value="AI">AI</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="score">Score</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              {filteredQuestions.map((question) => (
                <Box
                  key={question.id}
                  sx={{
                    marginBottom: "10px",
                    padding: "10px",
                    background: "#f9f9f9",
                    borderRadius: "4px",
                  }}
                >
                  <Typography variant="h6">{question.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Writer: {question.writer} | Subject: {question.subject} |
                    Score: {question.score} | Date:{" "}
                    {new Date(question.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h5" color="textSecondary">
              Exams section is under development.
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default QuestionSearch;
