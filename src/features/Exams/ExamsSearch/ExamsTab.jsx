import { useState,useEffect } from "react";
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/v1/common/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.data.categoryList || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


    const fetchExams = async () => {
      setLoading(true); 
      try {
       
        const params = new URLSearchParams({
          sort: `${sortOrder.criterion}-${sortOrder.direction}`, 
          search: searchTerm, 
          tags: selectedSubjects.join(","), 
          level: selectedLevel, 
        });
  
        
        const response = await fetch(`/api/v1/exam?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch exams"); 
        }
  
        
        const data = await response.json();
  
       
        const transformedExams = data.data.result.map((exam) => ({
          id: exam.serviceId,
          name: exam.name,
          description: exam.description,
          subjects: [exam.tag1, exam.tag2, exam.tag3].filter(Boolean),
          level: exam.level,
          score: exam.score,
          price: exam.price,
          numberOfVoters: exam.numberOfVoters,
          image: exam.image,
        }));
  
        
        setExams(transformedExams);
      } catch (error) {
        console.error("Error fetching exams:", error); 
      } finally {
        setLoading(false); 
      }
    };
  
    
    useEffect(() => {
      fetchExams(); 
    }, [searchTerm, selectedSubjects, selectedLevel, sortOrder]); 
  
    
    const totalPages = Math.ceil(exams.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentExams = exams.slice(
      startIndex,
      startIndex + itemsPerPage
    );

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

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  // const filteredQuestions = questions
  //   .filter((question) => {
  //     const matchesSearchTerm = question.name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const matchesSubjects =
  //       selectedSubjects.length === 0 ||
  //       selectedSubjects.every((subject) =>
  //         question.subjects.includes(subject)
  //       );
  //     const matchesLevel = selectedLevel
  //       ? question.level === selectedLevel
  //       : true;

  //     return matchesSearchTerm && matchesSubjects && matchesLevel;
  //   })
  //   .sort((a, b) => {
  //     const { criterion, direction } = sortOrder;
  //     if (criterion === "score") {
  //       return direction === "asc" ? a.score - b.score : b.score - a.score;
  //     }
  //     if (criterion === "name") {
  //       return direction === "asc"
  //         ? a.name.localeCompare(b.name)
  //         : b.name.localeCompare(a.name);
  //     }
  //     if (criterion === "writer") {
  //       return direction === "asc"
  //         ? a.writer.localeCompare(b.writer)
  //         : b.writer.localeCompare(a.writer);
  //     }
  //     return 0;
  //   });

  // const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentQuestions = filteredQuestions.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

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
              <MenuItem value="JavaScript">
                <FilterList sx={{ marginRight: "8px" }} /> JavaScript
              </MenuItem>
              <MenuItem value="Frontend">
                <FilterList sx={{ marginRight: "8px" }} /> Frontend
              </MenuItem>
              <MenuItem value="Backend">
                <FilterList sx={{ marginRight: "8px" }} /> Backend
              </MenuItem>
              <MenuItem value="AI">
                <FilterList sx={{ marginRight: "8px" }} /> AI
              </MenuItem>
              <MenuItem value="Data Science">
                <FilterList sx={{ marginRight: "8px" }} /> Data Science
              </MenuItem>
              <MenuItem value="Python">
                <FilterList sx={{ marginRight: "8px" }} /> Python
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
                  value={question.score}
                  max={5}
                  readOnly
                  sx={{
                    fontSize: "1.2rem",
                    "& .MuiRating-iconFilled": { color: "#ffcc00" },
                  }}
                />

                {/* Level Icon */}
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
                    {question.level
                      ? question.level.charAt(0).toUpperCase() +
                        question.level.slice(1)
                      : "Not Specified"}
                  </Typography>
                </Box>

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
