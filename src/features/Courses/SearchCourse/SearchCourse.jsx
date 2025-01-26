import { useState, useEffect, useMemo } from "react";
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
  Grid,
  Rating,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { Sort, SortByAlpha } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

function QuestionsTab() {
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
        const response = await axios.get("/api/v1/course");
        const transformedQuestions = response.data.data.result.map((q) => ({
          id: q.serviceId,
          name: q.name,
          text: q.description,
          subjects: [q.tag1, q.tag2, q.tag3].filter(Boolean),
          score: q.score,
          writer: q.userId, // Ensure writerId is available for linking
          numberOfVoters: q.numberOfVoters,
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

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
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

          {/* Display selected categories as tags */}
          {/* <Box sx={{ marginTop: 2 }}>
            {selectedSubjects.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedSubjects.slice(0, 3).map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    sx={{
                      backgroundColor: "#67C6E3", // Tag background color
                      color: "#ffffff", // Tag text color
                      borderRadius: "20px", // Rounded corners for the tag
                      padding: "6px 12px", // Padding for better appearance
                    }}
                  />
                ))}
                {selectedSubjects.length > 3 && (
                  <Chip
                    label="..."
                    sx={{
                      backgroundColor: "#67C6E3", // Tag background color
                      color: "#ffffff", // Tag text color
                      borderRadius: "20px", // Rounded corners for the tag
                      padding: "6px 12px", // Padding for better appearance
                    }}
                  />
                )}
              </Box>
            )}
          </Box> */}
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
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={36}>36</MenuItem>
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
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                },
                width: "100%",
                maxWidth: "900px", // Max width for large screens
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
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
                  to={`/CoursePreview/${question.id}`}
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
