import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  Checkbox,
  ListItemText,
  Chip,
  Alert,
  Snackbar,
  Grid,
  Rating,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { Sort, SortByAlpha } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the icon you want to use
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"; // Import icon for unselected state
import { handleAddQuestionsBack } from "./handleAddQuestions";

// Reusable Category Filter Component
const CategoryFilter = ({ categories, selectedSubjects, onSubjectChange }) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel>Categories</InputLabel>
    <Select
      multiple
      value={selectedSubjects}
      onChange={onSubjectChange}
      renderValue={(selected) => selected.join(", ")}
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      {categories.map((category) => (
        <MenuItem key={category.categoryId} value={category.category}>
          <Checkbox checked={selectedSubjects.includes(category.category)} />
          <ListItemText primary={category.category} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Reusable Sort By Component
const SortBy = ({ sortOrder, onSortChange }) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel>Sort By</InputLabel>
    <Select
      value={`${sortOrder.criterion}-${sortOrder.direction}`}
      onChange={onSortChange}
    >
      <MenuItem value="score-asc">
        <Sort sx={{ marginRight: "8px" }} /> Score (Low to High)
      </MenuItem>
      <MenuItem value="score-desc">
        <Sort sx={{ marginRight: "8px" }} /> Score (High to Low)
      </MenuItem>
      <MenuItem value="name-asc">
        <SortByAlpha sx={{ marginRight: "8px" }} /> Name (A to Z)
      </MenuItem>
      <MenuItem value="name-desc">
        <SortByAlpha sx={{ marginRight: "8px" }} /> Name (Z to A)
      </MenuItem>
    </Select>
  </FormControl>
);

function QuestionsTab() {
  const navigate = useNavigate(); // Use navigate hook here
  const [selectedQuestions, setSelectedQuestions] = useState([]); // State for selected questions
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success"); // You can change this to "error" based on the outcome
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]); // Categories for filter
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    criterion: "",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        setCategories(response.data.data.categoryList || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/questions");
        const transformedQuestions = response.data.data.result.map((q) => ({
          id: q.questionId,
          name: q.questionName,
          text: q.questionText,
          subjects: [q.tag1, q.tag2, q.tag3].filter(Boolean),
          score: q.score,
          writer: q.userName,
          numberOfVoters: q.numberOfVoters, // Add number of voters here
        }));
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchQuestions();
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
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
  const handleSelectQuestion = (questionId) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionId)
        ? prevSelected.filter((id) => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleAddToExam = () => {
    if (selectedQuestions.length > 0) {
      // Assuming the questions are successfully added here
      setSeverity("success");
      setSnackbarMessage("Questions successfully added to the exam.");
      setOpenSnackbar(true);

      // Navigate back to the previous page or the desired page after a delay
      setTimeout(() => {
        navigate("/PrivateExam"); // Replace with the actual route
      }, 3000); // 3 seconds delay to allow user to see the success message
    } else {
      setSeverity("error");
      setSnackbarMessage("No questions selected.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  // Memoized filtering and sorting logic
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((question) => {
        const matchesSearchTerm = question.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesSubjects =
          selectedSubjects.length === 0 ||
          selectedSubjects.every((subject) =>
            question.subjects.includes(subject)
          );
        return matchesSearchTerm && matchesSubjects;
      })
      .sort((a, b) => {
        const { criterion, direction } = sortOrder;
        if (criterion === "score") {
          return direction === "asc" ? a.score - b.score : b.score - a.score;
        }
        if (criterion === "voters") {
          return direction === "asc"
            ? a.numberOfVoters - b.numberOfVoters
            : b.numberOfVoters - a.numberOfVoters;
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
  }, [searchTerm, selectedSubjects, questions, sortOrder]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
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
      {/* Search and Sort Filters */}
      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {/* Search */}
        <Grid item xs={12} sm={8} md={9}>
          <TextField
            variant="outlined"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={(event) => event.key === "Enter" && handleSearchSubmit()}
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
                backgroundColor: "#fff",
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
              backgroundColor: "#4A90E2",
              color: "#fff",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#357ABD" },
              padding: "10px",
            }}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {/* Filter by Subjects */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Subjects</InputLabel>

            <Select
              multiple
              value={selectedSubjects}
              onChange={handleSubjectChange}
              label="Subjects"
              renderValue={(selected) => selected.join(", ")}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                borderColor: "#E0E0E0",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E0E0E0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#378CE7",
                },
                "& .MuiSelect-icon": {
                  color: "#378CE7",
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Limit height
                    overflow: "auto", // Enable scrolling
                  },
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.category}>
                  <Checkbox
                    checked={selectedSubjects.includes(category.category)}
                    sx={{
                      color: "#378CE7",
                      "&.Mui-checked": {
                        color: "#378CE7",
                      },
                    }}
                  />
                  <ListItemText primary={category.category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sort By Filter */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={`${sortOrder.criterion}-${sortOrder.direction}`}
              onChange={handleSortChange}
              label="Sort By"
              sx={{
                backgroundColor: "#f5f5f5", // Light background for Select box
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd", // Lighter border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4A90E2", // Hover effect with blue border
                },
              }}
            >
              <MenuItem value="score-asc">
                <Sort sx={{ marginRight: "8px" }} /> Score (Low to High)
              </MenuItem>
              <MenuItem value="score-desc">
                <Sort sx={{ marginRight: "8px" }} /> Score (High to Low)
              </MenuItem>
              <MenuItem value="name-asc">
                <SortByAlpha sx={{ marginRight: "8px" }} /> Name (A to Z)
              </MenuItem>
              <MenuItem value="name-desc">
                <SortByAlpha sx={{ marginRight: "8px" }} /> Name (Z to A)
              </MenuItem>
              <MenuItem value="voters-asc">
                <Sort sx={{ marginRight: "8px" }} /> Voters (Low to High)
              </MenuItem>
              <MenuItem value="voters-desc">
                <Sort sx={{ marginRight: "8px" }} /> Voters (High to Low)
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Items Per Page Filter */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Items Per Page</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items Per Page"
              sx={{
                backgroundColor: "#f5f5f5", // Light background for Select box
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd", // Lighter border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4A90E2", // Hover effect with blue border
                },
              }}
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Display Results */}
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {currentQuestions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: selectedQuestions.includes(question.id)
                  ? "#e0f7fa"
                  : "#fff", // Change color when selected
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                transition:
                  "transform 0.3s ease-in-out, background-color 0.3s ease-in-out", // Smooth transition
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: selectedQuestions.includes(question.id)
                    ? "#b2ebf2"
                    : "#f5f5f5", // Hover effect on selected question
                },
                width: "100%",
                maxWidth: "900px", // Max width for large screens
                margin: "0 auto",
                boxSizing: "border-box",
                position: "relative", // To enable absolute positioning inside
              }}
            >
              {/* Selection Icon positioned at top-right */}
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => handleSelectQuestion(question.id)}
                  color={
                    selectedQuestions.includes(question.id)
                      ? "primary"
                      : "default"
                  }
                  sx={{
                    padding: 0, // Remove default padding for a cleaner look
                    fontSize: "2rem", // Increase the size of the icon
                  }}
                  aria-label="select question for exam"
                >
                  {selectedQuestions.includes(question.id) ? (
                    <CheckCircleIcon sx={{ fontSize: "2rem" }} /> // Increase icon size when selected
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: "2rem" }} /> // Increase icon size when unselected
                  )}
                </IconButton>
              </Box>

              {/* Question Title */}
              <Typography
                variant="h6"
                sx={{
                  color: "#4A90E2",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginBottom: "10px",
                  lineHeight: "1.4", // Adjust line height for better readability
                }}
              >
                <Link
                  to={`/question/${question.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {question.name}
                </Link>
              </Typography>

              {/* Question Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginBottom: "10px",
                  fontSize: "0.875rem", // Slightly smaller font for description
                  lineHeight: "1.5",
                }}
              >
                {question.text.split(" ").slice(0, 15).join(" ")}...
              </Typography>

              {/* Subjects */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "15px", // Space before the next section
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
                      borderRadius: "4px",
                      padding: "2px 8px",
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
                  marginTop: "15px",
                  borderTop: "1px solid #ddd",
                  paddingTop: "10px",
                }}
              >
                {/* Score */}
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

                {/* Display number of voters */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6c757d",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PeopleIcon sx={{ marginRight: "5px", fontSize: "1rem" }} />
                  {question.numberOfVoters} Voters
                </Typography>

                {/* Writer Name with Motion Effects */}
                <motion.div
                  whileHover={{ scale: 1.05, color: "#4A90E2" }} // Hover effect: scale up and change color
                  whileTap={{ scale: 0.98 }} // Click effect: scale down on tap
                  transition={{ duration: 0.2 }} // Smooth transition for hover and click
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6c757d",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    <Link
                      to={`/profile/${question.writerId}`}
                      style={{
                        color: "#6c757d",
                        textDecoration: "none",
                      }}
                    >
                      {question.writer}
                    </Link>
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Back Button: Navigates to the Exam Overview */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddQuestionsBack(navigate)}
          sx={{
            padding: "12px 24px",
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: 2,
          }}
        >
          Back to Exam Overview
        </Button>

        {/* Action Section for Adding Questions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns buttons to the right
            marginTop: "20px",
          }}
        >
          {/* Add Selected Questions Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToExam}
            disabled={selectedQuestions.length === 0}
            sx={{
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: 2,
              opacity: selectedQuestions.length === 0 ? 0.5 : 1,
            }}
          >
            Add Selected Questions to Exam
          </Button>
        </Box>

        {/* Snackbar for Feedback and Alerts */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000} // Auto-hide after 3 seconds
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}

export default QuestionsTab;
