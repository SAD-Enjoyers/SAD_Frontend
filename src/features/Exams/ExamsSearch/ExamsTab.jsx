import { useState, useEffectوuseMemo } from "react";
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
  Rating,
  Pagination,
  ListItemIcon,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  School,
  SchoolOutlined,
  FilterList,
  Sort,
  SortByAlpha,
} from "@mui/icons-material";

function ExamsTab() {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [categories, setCategories] = useState([]); // Categories for filter
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortOrder, setSortOrder] = useState({
    criterion: "",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch("/api/v1/common/categories");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch categories");
  //     }
  //     const data = await response.json();
  //     setCategories(data.data.categoryList || []);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };
  useEffect(() => {
  const fetchExams = async () => {
    setLoading(true);
    try {
      // Build Query Parameters
      // const params = new URLSearchParams();
      // if (searchTerm) params.append("search", searchTerm);
      // if (selectedSubjects.length > 0) params.append("tags", selectedSubjects.join(","));
      // if (selectedLevel) params.append("level", selectedLevel);
      // if (sortOrder.criterion) params.append("sort", `${sortOrder.criterion}-${sortOrder.direction}`);
      
      const response = await fetch(`/api/v1/exam?${params.toString()}`, {
        method: "GET", // Explicitly set the method
      });
      if (!response.ok) {
        throw new Error("Failed to fetch exams");
      }
      const data = await response.json();
      const transformedExams = data.data.result.map((exam) => ({
        id: exam.serviceId, // Adjust according to your API response
        name: exam.name,
        description: exam.examDescription,
        subjects: [exam.tag1, exam.tag2, exam.tag3].filter(Boolean),
        score: exam.score,
        writer: exam.userId, 
        numberOfVoters: exam.numberOfVoters,
      }));

      setExams(transformedExams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

 
    // fetchCategories();
    fetchExams();
  }, [searchTerm, selectedSubjects, selectedLevel, sortOrder]);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }; //

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

  const filteredExams = useMemo(() => {
    return exams
      .filter((exam) => {
        const matchesSearchTerm = exam.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesSubjects =
          selectedSubjects.length === 0 ||
          selectedSubjects.every((subject) => exam.subjects.includes(subject));
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
  }, [searchTerm, selectedSubjects, exams, sortOrder]);

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExams = filteredExams.slice(startIndex,startIndex + itemsPerPage
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
      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        <Grid item xs={12} sm={8} md={9}>
          <TextField
            variant="outlined"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={(event) => event.key === "Enter" && handleSearchSubmit()}
            // onKeyDown={handleKeyPress}
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
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.category}>
                 
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
        {/* Filter by Level */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Level</InputLabel>
            <Select
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
              label="Level"
            >
              <MenuItem value="">
                <ListItemIcon>
                  <SchoolOutlined
                    sx={{ fontSize: "1.2rem", color: "#6c757d" }}
                  />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                  All Levels
                </Typography>
              </MenuItem>
              <MenuItem value="beginner">
                <ListItemIcon>
                  <School sx={{ fontSize: "1.2rem", color: "#4CAF50" }} />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                  Beginner
                </Typography>
              </MenuItem>
              <MenuItem value="intermediate">
                <ListItemIcon>
                  <School sx={{ fontSize: "1.2rem", color: "#FF9800" }} />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                  Medium
                </Typography>
              </MenuItem>
              <MenuItem value="advanced">
                <ListItemIcon>
                  <School sx={{ fontSize: "1.2rem", color: "#F44336" }} />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                  Advanced
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Sort By */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={`${sortOrder.criterion}-${sortOrder.direction}`}
              onChange={handleSortChange}
              label="Sort By"
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
        </Grid>

        {/* Items Per Page */}
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
        {currentExams.map((exam) => (
          <Grid item xs={12} key={exam.id}>
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
              {/* Exam Title */}
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
                  to={`/exam/${exam.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {exam.name}
                </Link>
              </Typography>

              {/* Exam Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginBottom: "10px",
                  fontSize: "0.875rem", // Slightly smaller font for description
                  lineHeight: "1.5",
                }}
              >
                {exam.text.split(" ").slice(0, 15).join(" ")}...
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
                {exam.subjects.map((subject, index) => (
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

              {/* Level, Score & Writer */}
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
                  value={exam.score}
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
                  {exam.numberOfVoters} Voters
                </Typography>

                {/* Level Icon
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {question.level === "beginner" && (
                    <School sx={{ fontSize: "1.5rem", color: "#4CAF50" }} />
                  )}
                  {question.level === "intermediate" && (
                    <School sx={{ fontSize: "1.5rem", color: "#FF9800" }} />
                  )}
                  {question.level === "advanced" && (
                    <School sx={{ fontSize: "1.5rem", color: "#F44336" }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6c757d",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {exam.level
                      ? exam.level.charAt(0).toUpperCase() +
                        exam.level.slice(1)
                      : "Not Specified"}
                  </Typography>
                </Box> */}

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
                      to={`/profile/${exam.writerId}`}
                      style={{
                        color: "#6c757d",
                        textDecoration: "none",
                      }}
                    >
                      {exam.writer}
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
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          borderRadius: "8px", // Rounded pagination buttons
        }}
      />
    </Box>
  );
}

export default ExamsTab;
