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
  Chip,
  Grid,
  Rating,
  Checkbox,
  ListItemText,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Sort, SortByAlpha } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SearchAndFilterArticle() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Categories for filter
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    criterion: "",
    direction: "asc",
  });
  const [articles, setArticles] = useState([]);
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

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/course");
        const transformedQuestions = response.data.data.result.map(
          (q, index) => {
            const subject = [];
            for (let i = 1; i < 4; i++) {
              if (q[`tag${i}`]) {
                subject.push(q[`tag${i}`]);
              }
            }
            return {
              id: q.serviceId,
              writer: q.userId,
              title: q.name,
              content: q.description,
              rating: q.score,
              subject: subject,
            };
          }
        );

        setArticles(transformedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchArticles();
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubjects(event.target.value);
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
    return articles
      .filter((question) => {
        const matchesSearchTerm = question.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesSubjects =
          selectedSubjects.length === 0 ||
          selectedSubjects.includes("All") ||
          selectedSubjects.some((subject) =>
            question.subject.includes(subject)
          );
        return matchesSearchTerm && matchesSubjects;
      })
      .sort((a, b) => {
        const { criterion, direction } = sortOrder;
        if (criterion === "score") {
          return direction === "asc"
            ? a.rating - b.rating
            : b.rating - a.rating;
        }
        if (criterion === "name") {
          return direction === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        if (criterion === "writer") {
          return direction === "asc"
            ? a.writer.localeCompare(b.writer)
            : b.writer.localeCompare(a.writer);
        }
        return 0;
      });
  }, [searchTerm, selectedSubjects, articles, sortOrder]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box
      sx={{
        minWidth: 500,
        maxWidth: 900,
        // marginLeft: 35,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="button" fontSize={20} color="primary" gutterBottom>
          Articles
        </Typography>
      </div>
      {/* Search and Sort Filters */}
      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {/* Search */}
        <Grid item xs={12} sm={8} md={9}>
          <TextField
            variant="outlined"
            placeholder="Search courses..."
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
              minWidth: 900,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {/* Filter by Subjects */}
        <Grid item xs={12} sm={4}>
          {/* Subjects */}
          <FormControl fullWidth variant="outlined">
              <InputLabel>Subjects</InputLabel>
              <Select
                multiple
                value={selectedSubjects}
                onChange={handleSubjectChange}
                label="Subjects"
                renderValue={(selected) => selected.join(", ")}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ddd",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4A90E2",
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.categoryId} value={category.category} sx={{maxHeight:50}}>
                    <Checkbox checked={selectedSubjects.includes(category.category)} />
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
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4A90E2",
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
                <SortByAlpha sx={{ marginRight: "8px" }} /> Title (A to Z)
              </MenuItem>
              <MenuItem value="name-desc">
                <SortByAlpha sx={{ marginRight: "8px" }} /> Title (Z to A)
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
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4A90E2",
                },
              }}
            >
              {[6, 12, 18, 24].map((items) => (
                <MenuItem key={items} value={items}>
                  {items} items
                </MenuItem>
              ))}
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
                <Link to={`/CoursePreview/${question.id}`} style={{ textDecoration: "none" }}>
                  {question.title}
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
                {question.content.split(" ").slice(0, 15).join(" ")}...
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
                {question.subject.map((subject, index) => (
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
                  value={question.rating}
                  max={5}
                  readOnly
                  sx={{
                    fontSize: "1.2rem",
                    "& .MuiRating-iconFilled": { color: "#ffcc00" },
                  }}
                />

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
                    {question.writer}
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#4A90E2",
              color: "#fff",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default SearchAndFilterArticle;