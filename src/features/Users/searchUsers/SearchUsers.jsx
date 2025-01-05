import {
  Box,
  Typography,
  Grid2,
  InputAdornment,
  TextField,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";

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
      try {
        const response = await axios.get(`/api/v1/profile/`);
        const transformedQuestions = response.data.data.result.map((q) => ({
          userName: q.userName,
          firstName: q.firstName,
          lastName: q.lastName,
          description: q.description,
          image:
            q.image == "/api/public/defaultProfilePicture.jpg"
              ? "/api/public/defaultProfilePicture.jpg"
              : "/api/v1/uploads/profile-images/" + q.image,
        }));
        setUsers(transformedQuestions);
        console.log(transformedQuestions);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfile();
  }, []);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box
      sx={{
        minWidth: 500,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="button" fontSize={20} color="primary" gutterBottom>
          Articles
        </Typography>
      </div>

      <Grid2
        container
        spacing={3}
        sx={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
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

      <Grid2 container spacing={3} sx={{ mt: "50px", mb: "80px" }}>
        {currentUsers.map((user, id) => (
          <Grid2 size={{ s: 12, sm: 6, md: 4 }} key={id}>
            <Box
              sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <img
                src={user.image}
                alt={user.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              />
              <Grid2 container spacing={2} alignItems="center">
                <Grid2 size={4}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    User Name:
                  </Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography variant="h6">{user.userName}</Typography>
                </Grid2>

                <Grid2 size={4}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: "bold", textAlign: "right" }}
                  >
                    Full Name:
                  </Typography>
                </Grid2>
                <Grid2 size={8}>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                </Grid2>

                <Grid2 size={4}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: "bold", textAlign: "right" }}
                  >
                    Description:
                  </Typography>
                </Grid2>
                <Grid2 size={8}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {user.description}
                  </Typography>
                </Grid2>
              </Grid2>
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
