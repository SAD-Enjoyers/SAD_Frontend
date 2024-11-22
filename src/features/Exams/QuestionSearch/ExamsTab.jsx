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
