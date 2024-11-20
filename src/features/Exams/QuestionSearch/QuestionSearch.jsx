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
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Layout from "../../../common/Layout";
import Mokdata from "./mokData.json";

function QuestionSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");

  const [sortOrder, setSortOrder] = useState({
    criterion: "",
    direction: "asc",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const questions = Mokdata;

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
    .filter((question) => {
      const matchesSearchTerm = question.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSubjects =
        selectedSubjects.length === 0 ||
        selectedSubjects.every((subject) =>
          question.subjects.includes(subject)
        );
      const matchesLevel = selectedLevel
        ? question.level === selectedLevel
        : true;

      return matchesSearchTerm && matchesSubjects && matchesLevel;
    })
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
          marginTop: "50px", // Adjusted margin for a more spacious layout
          padding: "20px",
          backgroundColor: "#F9FAFB", // Light background for a clean look
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadows for a floating effect
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{ style: { backgroundColor: "#4A90E2" } }} // Updated accent color
          textColor="primary"
        >
          <Tab
            label="Questions"
            style={{
              color: activeTab === 0 ? "#4A90E2" : "#9B9B9B", // Updated tab color
              fontWeight: activeTab === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label="Exams"
            style={{
              color: activeTab === 1 ? "#4A90E2" : "#9B9B9B",
              fontWeight: activeTab === 1 ? "bold" : "normal",
            }}
          />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Grid container spacing={3} sx={{ marginTop: "30px" }}>
              <Grid item xs={12} sm={8} md={9}>
                <TextField
                  variant="outlined"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyDown={handleKeyPress}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon style={{ color: "#4A90E2" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#fff", // Added white background for input fields
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  onClick={handleSearchSubmit}
                  disabled={loading}
                  fullWidth
                  sx={{
                    backgroundColor: "#4A90E2", // Accent color
                    color: "#fff",
                    borderRadius: "8px", // Rounded button
                    "&:hover": { backgroundColor: "#357ABD" },
                    padding: "10px",
                  }}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Grid>
            </Grid>

            {/* Filter Options */}
            <Grid container spacing={3} sx={{ marginTop: "30px" }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
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
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={selectedLevel}
                    onChange={(event) => setSelectedLevel(event.target.value)}
                    label="Level"
                  >
                    <MenuItem value="">All Levels</MenuItem>
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
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
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Items Per Page</InputLabel>
                  <Select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    label="Items Per Page"
                  >
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Display Results */}
            <Grid container spacing={3} sx={{ marginTop: "20px" }}>
              {currentQuestions.map((question) => (
                <Grid item xs={12} sm={6} md={4} key={question.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px",
                      borderRadius: "12px", // Rounded corners for cards
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)", // Soft shadow
                      transition: "transform 0.3s ease-in-out", // Hover effect
                      "&:hover": {
                        transform: "scale(1.03)", // Slightly enlarge on hover
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#4A90E2",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
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
                      sx={{ marginTop: "8px" }}
                    >
                      {question.text.split(" ").slice(0, 10).join(" ")}...
                    </Typography>

                    {/* Display Subjects */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px",
                        marginTop: "10px",
                      }}
                    >
                      {question.subjects.map((subject, index) => (
                        <Chip
                          key={index}
                          label={subject}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            borderRadius: "4px", // Slight rounding for chips
                          }}
                        />
                      ))}
                    </Box>

                    {/* Score & Writer */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6c757d",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {question.writer}
                      </Typography>
                      <Rating
                        name="score"
                        value={question.score}
                        max={5}
                        readOnly
                        sx={{
                          fontSize: "1.2rem",
                          "& .MuiRating-iconFilled": { color: "#ffcc00" },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "8px", // Rounded pagination buttons
              }}
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default QuestionSearch;
