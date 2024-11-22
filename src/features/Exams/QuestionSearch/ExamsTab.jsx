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
