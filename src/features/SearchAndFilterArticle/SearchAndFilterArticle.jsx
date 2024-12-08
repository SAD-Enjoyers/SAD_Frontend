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
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Sort, SortByAlpha } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";

const articles = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    rating: 4.7,
    writer: "John Doe",
    content:
      "Artificial Intelligence (AI) is rapidly evolving, and it has the potential to revolutionize industries like healthcare, transportation, and finance. In this article, we explore the trends and innovations that will shape the future of AI.",
    subject: ["Technology"],
  },
  {
    id: 2,
    title: "Climate Change and Its Impact on Agriculture",
    rating: 4.5,
    writer: "Jane Smith",
    content:
      "Climate change is affecting crop production and agriculture worldwide. This article discusses how rising temperatures and unpredictable weather patterns are challenging farmers and the strategies they are using to adapt.",
    subject: ["Environment"],
  },
  {
    id: 3,
    title: "The Rise of Remote Work Post-COVID",
    rating: 4.8,
    writer: "Alice Green",
    content:
      "The COVID-19 pandemic has changed how we work, with remote work becoming a permanent fixture for many industries. This article delves into the pros and cons of remote work, and how businesses can thrive in a hybrid work environment.",
    subject: ["Business"],
  },
  {
    id: 4,
    title: "Exploring the Wonders of Space Travel",
    rating: 4.6,
    writer: "Michael Brown",
    content:
      "Space exploration has captivated humans for decades. From the first moon landing to private space companies like SpaceX, this article explores the technological advancements and future of space travel.",
    subject: ["Science"],
  },
  {
    id: 5,
    title: "Mental Health Awareness in the Workplace",
    rating: 4.3,
    writer: "Emily White",
    content:
      "Mental health issues are becoming more prominent in the workplace. This article covers how companies can create supportive environments for employees, providing resources and breaking the stigma around mental health.",
    subject: ["Health"],
  },
  {
    id: 6,
    title: "Advances in Quantum Computing",
    rating: 4.9,
    writer: "David Black",
    content:
      "Quantum computing is an emerging field that could drastically change how we approach problem-solving in science, cryptography, and AI. In this article, we break down the complexities of quantum computing and its potential applications.",
    subject: ["Technology"],
  },
  {
    id: 7,
    title: "The Evolution of Social Media Marketing",
    rating: 4.4,
    writer: "Sarah Blue",
    content:
      "Social media marketing continues to evolve, with new platforms and strategies emerging regularly. This article looks at how businesses can stay ahead of the curve in utilizing social media to engage customers and drive sales.",
    subject: ["Marketing"],
  },
  {
    id: 8,
    title: "Sustainable Fashion: A Growing Trend",
    rating: 4.6,
    writer: "Rachel Gold",
    content:
      "As concerns about environmental impact grow, sustainable fashion is gaining momentum. This article discusses eco-friendly materials, ethical production practices, and how consumers can support sustainable fashion brands.",
    subject: ["Fashion"],
  },
  {
    id: 9,
    title: "The Future of Electric Vehicles",
    rating: 4.7,
    writer: "James Lee",
    content:
      "Electric vehicles (EVs) are rapidly becoming the future of transportation. This article explores the benefits of EVs, their impact on the environment, and the challenges that the automotive industry faces in shifting to electric power.",
    subject: ["Automotive"],
  },
  {
    id: 10,
    title: "The Role of Artificial Intelligence in Healthcare",
    rating: 4.8,
    writer: "Laura King",
    content:
      "AI is transforming healthcare by improving diagnostic accuracy, streamlining operations, and advancing medical research. This article dives into how AI is reshaping the healthcare landscape.",
    subject: ["Healthcare"],
  },
  {
    id: 11,
    title: "The Impact of Automation on Jobs",
    rating: 4.2,
    writer: "Ethan Taylor",
    content:
      "Automation is increasingly taking over jobs across various industries. While it boosts efficiency, it raises concerns about job displacement. This article analyzes the impact of automation on the workforce and potential solutions.",
    subject: ["Economics"],
  },
  {
    id: 12,
    title: "Exploring the Benefits of Plant-Based Diets",
    rating: 4.5,
    writer: "Olivia Scott",
    content:
      "Plant-based diets are growing in popularity due to their health and environmental benefits. This article outlines the benefits of plant-based eating, including reduced risk of chronic diseases and a lower carbon footprint.",
    subject: ["Health"],
  },
  {
    id: 13,
    title: "Smart Cities: The Future of Urban Living",
    rating: 4.9,
    writer: "Daniel Evans",
    content:
      "Smart cities are transforming the way we live by using technology to improve infrastructure, reduce energy consumption, and enhance quality of life. This article explores the advancements in smart city technology and their potential impact.",
    subject: ["Urban Development"],
  },
];

const Categories = [
  "All",
  "Science",
  "Technology",
  "Mathematics",
  "Literature",
];

function SearchAndFilterArticle() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    criterion: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

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
    <Box sx={{ minWidth: 500, maxWidth: 900, marginLeft: 35 }}>
      <div style={{ margin: 10, textAlign: "center" }}>
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
              minWidth: 900,
            }}
          />
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
            >
              {Categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
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
                {question.title}
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
