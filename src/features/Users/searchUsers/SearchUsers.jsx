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

function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 6;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // بازگشت به صفحه اول هنگام جستجو
  };
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/profile");
        const transformedQuestions = response.data.data.result.map((q) => ({
          userName: q.userName,
          firstName: q.firstName,
          lastName: q.lastName,
          description: q.description,
          image: q.image,
        }));
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
                {user.firstName} {user.lastName}
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
