import {
  Box,
  Typography,
  Grid2,
  InputAdornment,
  TextField,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const mockUsers = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "John Doe",
    description: "Frontend Developer at XYZ Company",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Jane Smith",
    description: "Backend Developer at ABC Inc.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "Alice Green",
    description: "UI/UX Designer at Creative Studio",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "Michael Brown",
    description: "DevOps Engineer at CloudNet",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    title: "Emily White",
    description: "Data Scientist at Analytics Co.",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    title: "David Black",
    description: "Full Stack Developer at Startup Hub",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    title: "Alice Green",
    description: "UI/UX Designer at Creative Studio",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    title: "Michael Brown",
    description: "DevOps Engineer at CloudNet",
  },
  {
    id: 9,
    image: "https://via.placeholder.com/150",
    title: "Emily White",
    description: "Data Scientist at Analytics Co.",
  },
  {
    id: 10,
    image: "https://via.placeholder.com/150",
    title: "David Black",
    description: "Full Stack Developer at Startup Hub",
  },
  {
    id: 11,
    image: "https://via.placeholder.com/150",
    title: "Alice Green",
    description: "UI/UX Designer at Creative Studio",
  },
  {
    id: 12,
    image: "https://via.placeholder.com/150",
    title: "Michael Brown",
    description: "DevOps Engineer at CloudNet",
  },
  {
    id: 13,
    image: "https://via.placeholder.com/150",
    title: "Emily White",
    description: "Data Scientist at Analytics Co.",
  },
  {
    id: 14,
    image: "https://via.placeholder.com/150",
    title: "David Black",
    description: "Full Stack Developer at Startup Hub",
  },
];

function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // تعداد آیتم‌ها در هر صفحه

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // بازگشت به صفحه اول هنگام جستجو
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  // فیلتر کاربران بر اساس متن جستجو
  const filteredUsers = mockUsers.filter((user) =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // تعیین کاربران صفحه جاری
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box
      sx={{
        minWidth: 500,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="button" fontSize={20} color="primary" gutterBottom>
          Articles
        </Typography>
      </div>
      {/* فیلتر جستجو */}
      <Grid2 container spacing={3} sx={{ marginTop: "40px" }}>
        <Grid2 size={{ xs: 12, sm: 8, md: 9 }}>
          <TextField
            variant="outlined"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={handleSearch}
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
        </Grid2>
      </Grid2>
      {/* نمایش کاربران */}
      <Grid2 container spacing={3} sx={{ mt: "50px", mb: "80px" }}>
        {currentUsers.map((user) => (
          <Grid2 size={{ s: 12, sm: 6, md: 4 }} key={user.id}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={user.image}
                alt={user.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
              <Typography variant="h6" gutterBottom>
                {user.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.description}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      {/* صفحه‌بندی */}
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

export default SearchUsers;
