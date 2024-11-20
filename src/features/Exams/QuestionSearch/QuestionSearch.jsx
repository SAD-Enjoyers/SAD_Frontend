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
  Chip,
  Rating,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Layout from "../../../common/Layout";

function QuestionSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    criterion: "",
    direction: "asc",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const questions = [
    {
      id: 1,
      name: "What is React?",
      writer: "Alice",
      score: 4,
      subjects: ["JavaScript", "Frontend"],
      text: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      name: "What is Node.js?",
      writer: "Bob",
      score: 3.5,
      subjects: ["JavaScript", "Backend"],
      text: "Node.js is a runtime environment for JavaScript outside the browser.",
    },
    {
      id: 3,
      name: "What is Machine Learning?",
      writer: "Charlie",
      score: 4.5,
      subjects: ["AI", "Data Science"],
      text: "Machine learning is a subset of AI that uses algorithms to learn.",
    },
    {
      id: 4,
      name: "What is CSS Flexbox?",
      writer: "David",
      score: 4,
      subjects: ["Frontend", "CSS"],
      text: "CSS Flexbox is a layout model that allows you to design complex layouts with ease using flexible containers and items.",
    },
    {
      id: 5,
      name: "What is the difference between SQL and NoSQL?",
      writer: "Eve",
      score: 4.2,
      subjects: ["Backend", "Database"],
      text: "SQL databases are relational, while NoSQL databases are non-relational. SQL is best for structured data, while NoSQL is better for unstructured data.",
    },
    {
      id: 6,
      name: "What are the main types of machine learning?",
      writer: "Frank",
      score: 4.7,
      subjects: ["AI", "Machine Learning"],
      text: "The main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning.",
    },
    {
      id: 7,
      name: "What is Docker?",
      writer: "Grace",
      score: 3.9,
      subjects: ["Backend", "DevOps"],
      text: "Docker is a platform that allows you to automate the deployment of applications inside lightweight containers.",
    },
    {
      id: 8,
      name: "What is the difference between JavaScript and TypeScript?",
      writer: "Henry",
      score: 4.3,
      subjects: ["JavaScript", "Frontend", "AI"],
      text: "TypeScript is a superset of JavaScript that adds static types and other features, making it easier to scale large applications.",
    },
    {
      id: 9,
      name: "What are neural networks?",
      writer: "Ivy",
      score: 4.6,
      subjects: ["AI", "Machine Learning"],
      text: "Neural networks are a type of machine learning algorithm inspired by the structure of the human brain, used to recognize patterns and make decisions.",
    },
    {
      id: 10,
      name: "What is RESTful API?",
      writer: "Jack",
      score: 4.1,
      subjects: ["Backend", "API"],
      text: "A RESTful API is an architectural style for designing networked applications, based on stateless, client-server interactions using HTTP.",
    },
    {
      id: 11,
      name: "What is Git?",
      writer: "Kathy",
      score: 4.5,
      subjects: ["Development", "Version Control"],
      text: "Git is a distributed version control system that allows multiple developers to track changes in source code and collaborate on projects.",
    },
    {
      id: 12,
      name: "What is Blockchain?",
      writer: "Leo",
      score: 4.8,
      subjects: ["Technology", "Blockchain"],
      text: "Blockchain is a decentralized, distributed ledger technology that securely records transactions across many computers.",
    },
    {
      id: 13,
      name: "What are cloud services?",
      writer: "Mia",
      score: 4.2,
      subjects: ["Cloud", "DevOps"],
      text: "Cloud services provide on-demand access to computing resources such as servers, storage, and databases over the internet, typically on a pay-as-you-go basis.",
    },
  ];

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSearchSubmit();
  };

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const handleSortChange = (event) => {
    const [criterion, direction] = event.target.value.split("-");
    setSortOrder({ criterion, direction });
  };

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const filteredQuestions = questions
    .filter(
      (question) =>
        question.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubjects.length === 0 ||
          selectedSubjects.every((subject) =>
            question.subjects.includes(subject)
          ))
    )
    .sort((a, b) => {
      const { criterion, direction } = sortOrder;
      if (criterion === "score") {
        return direction === "asc" ? a.score - b.score : b.score - a.score;
      }
      if (criterion === "name") {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (criterion === "writer") {
        return direction === "asc"
          ? a.writer.localeCompare(b.writer)
          : b.writer.localeCompare(a.writer);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          marginTop: "120px",
          padding: "20px",
          backgroundColor: "#DFF5FF",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{ style: { backgroundColor: "#5356FF" } }}
          textColor="primary"
        >
          <Tab
            label="Questions"
            style={{ color: activeTab === 0 ? "#5356FF" : "#378CE7" }}
          />
          <Tab
            label="Exams"
            style={{ color: activeTab === 1 ? "#5356FF" : "#378CE7" }}
          />
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
                      <SearchIcon style={{ color: "#5356FF" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearchSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#5356FF",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#378CE7" },
                }}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", gap: 2 }}>
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Subjects</InputLabel>
                <Select
                  multiple
                  value={selectedSubjects}
                  onChange={handleSubjectChange}
                  label="Subjects"
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="JavaScript">JavaScript</MenuItem>
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="AI">AI</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={`${sortOrder.criterion}-${sortOrder.direction}`}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="score-asc">Score (Low to High)</MenuItem>
                  <MenuItem value="score-desc">Score (High to Low)</MenuItem>
                  <MenuItem value="name-asc">Name (A to Z)</MenuItem>
                  <MenuItem value="name-desc">Name (Z to A)</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Items Per Page</InputLabel>
                <Select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  label="Items Per Page"
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              {currentQuestions.map((question) => (
                <Box
                  key={question.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "15px",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    marginBottom: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#5356FF", textDecoration: "none" }}
                  >
                    <Link
                      to={`/question/${question.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {question.name}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "5px" }}
                  >
                    {question.text.split(" ").slice(0, 10).join(" ")}...
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {question.subjects.map((subject, index) => (
                        <Chip
                          key={index}
                          label={subject}
                          sx={{
                            backgroundColor: "#67C6E3",
                            color: "#fff",
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        By {question.writer}
                      </Typography>
                      <Rating value={question.score} readOnly size="small" />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
export default QuestionSearch;
