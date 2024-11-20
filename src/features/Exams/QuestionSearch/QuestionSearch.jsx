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
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
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
                        <SearchIcon style={{ color: "#5356FF" }} />
                      </InputAdornment>
                    ),
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
                    backgroundColor: "#5356FF",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#378CE7" },
                  }}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <Grid item xs={12} sm={4} md={3}>
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
              <Grid item xs={12} sm={4} md={3}>
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

              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth variant="outlined">
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
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              {currentQuestions.map((question) => (
                <Grid item xs={12} sm={6} md={4} key={question.id}>
                  <Box
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
                          sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                        />
                      ))}
                    </Box>

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
                        sx={{ color: "#6c757d", fontWeight: "bold" }}
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

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default QuestionSearch;
