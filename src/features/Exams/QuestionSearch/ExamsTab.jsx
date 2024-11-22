import { useState } from "react";
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
import Mokdata from "./examData.json";
import { motion } from "framer-motion";
import {
  School,
  SchoolOutlined,
  FilterList,
  Sort,
  SortByAlpha,
} from "@mui/icons-material";

const [searchTerm, setSearchTerm] = useState("");
const [loading, setLoading] = useState(false);
const [selectedSubjects, setSelectedSubjects] = useState([]);
const [selectedLevel, setSelectedLevel] = useState("");

const [sortOrder, setSortOrder] = useState({
  criterion: "",
  direction: "asc",
});
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
        
        {/* More JSX for displaying question details */}
        
      </Box>
    </Grid>
  ))}
</Grid>


  