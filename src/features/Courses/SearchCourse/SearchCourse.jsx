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
  Rating,
  Pagination,
  Checkbox,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  School,
  FilterList,
  Sort,
  SortByAlpha,
} from "@mui/icons-material";

function CoursesTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState({ criterion: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/courseCategories");
        setCategories(response.data.data.categoryList || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/courses");
        const transformedCourses = response.data.data.result.map((course) => ({
          id: course.id,
          name: course.title,
          description: course.description,
          categories: [course.category1, course.category2, course.category3].filter(Boolean),
          level: course.level,
          price: course.price,
          rating: course.rating,
          instructor: course.instructorName,
          numberOfRatings: course.numberOfRatings,
        }));
        setCourses(transformedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchCourses();
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedCategories(selected);
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

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesSearchTerm = course.name
          ? course.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false;
        const matchesCategories =
          selectedCategories.length === 0 ||
          selectedCategories.every((category) =>
            course.categories.includes(category)
          );
        return matchesSearchTerm && matchesCategories;
      })
      .sort((a, b) => {
        const { criterion, direction } = sortOrder;
        if (criterion === "rating") {
          return direction === "asc" ? a.rating - b.rating : b.rating - a.rating;
        }
        if (criterion === "name") {
          return direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (criterion === "instructor") {
          return direction === "asc"
            ? a.instructor.localeCompare(b.instructor)
            : b.instructor.localeCompare(a.instructor);
        }
        return 0;
      });
  }, [searchTerm, selectedCategories, courses, sortOrder]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        backgroundColor: "#F9FAFB",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Search and Sort Filters */}
      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              label="Categories"
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
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    sx={{
                      color: "#378CE7",
                      "&.Mui-checked": {
                        color: "#378CE7",
                      },
                    }}
                  />
                  {category.name}
                </MenuItem>
              ))}
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
              <MenuItem value="rating-asc">
                <Sort sx={{ marginRight: "8px" }} /> Rating (Low to High)
              </MenuItem>
              <MenuItem value="rating-desc">
                <Sort sx={{ marginRight: "8px" }} /> Rating (High to Low)
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Items Per Page</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items Per Page"
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {currentCourses.map((course) => (
          <Grid item xs={12} key={course.id}>
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
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#4A90E2", fontWeight: "bold" }}
              >
                <Link
                  to={`/coursePreview/${course.id}`}
                  style={{ textDecoration: "none", color: "#4A90E2" }}
                >
                  {course.name}
                </Link>
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: "10px" }}
              >
                {course.description.split(" ").slice(0, 15).join(" ")}...
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {course.categories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Rating
                  name="rating"
                  value={course.rating}
                  max={5}
                  readOnly
                  sx={{ fontSize: "1.2rem" }}
                />
                <Typography variant="body2">
                  Instructor: {course.instructor}
                </Typography>
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
        sx={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}

export default CoursesTab;
