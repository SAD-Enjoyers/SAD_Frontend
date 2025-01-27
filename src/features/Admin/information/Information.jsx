import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  CircularProgress,
  createTheme,
  ThemeProvider,
  TextField,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileAdmin from "./EditProfileAdmin";
import AddAdmin from "./AddAdmin";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a blue theme
const blueTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue color
    },
  },
});

export default function Information() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
  });

  const handleOpenAddAdmin = () => {
    setOpenAddAdmin(true);
  };

  const handleCloseAddAdmin = () => {
    setOpenAddAdmin(false);
  };
  const handleClose = () => {
    setCategoryName("");
  };
  const handleSave = () => {
    if (categoryName.trim() === "") {
      setError(true);
      toast.error("Please enter a category name!", {
        autoClose: 3000,
      });
      return;
    }

    fetch(`/api/v1/admin/new-category/?category=${categoryName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // بررسی ارور خاص
        if (
          data.status === "error" &&
          data.message === "This Category already exist."
        ) {
          toast.error("This category already exists!");
        } else {
          toast.success("Category added successfully!");
          setTimeout(() => {
            handleClose();
            fetchCategories();
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add category. Please try again.");
      });
  };

  const closeState = () => {
    setOpen(false);
  };

  const fetchData = (tokenCheck) => {
    fetch("/api/v1/admin/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenCheck}`,
        "x-role": localStorage.getItem("AdminRole"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsValid(false);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setData(data);
        setFormData({
          firstName: data.data.expertData.firstName,
          lastName: data.data.expertData.lastName,
          userName: data.data.expertData.userName,
          phoneNumber: data.data.expertData.phoneNumber,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/v1/common/categories");
      setCategories(response.data.data.categoryList || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("AdminToken");

    if (!token || !data) {
      fetchData(token);
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!isValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <ThemeProvider theme={blueTheme}>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 2, mb: 6, maxWidth: 600, mx: "auto", boxShadow: 3 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              direction={{ xs: "column", md: "row" }}
            >
              {/* Profile Image */}
              <Grid item>
                <Box display="flex" justifyContent="center">
                  <Avatar
                    alt="User Name"
                    src={"images/admin.png"}
                    sx={{ width: 150, height: 150 }}
                  />
                </Box>
              </Grid>
              {/* User Information */}
              <Grid item>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" component="div">
                    Full Name: {formData.firstName + " " + formData.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Username: {formData.userName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Phone Number: {formData.phoneNumber}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" mt={2}>
              <EditProfileAdmin fetchData={fetchData} />
            </Box>
          </Card>
          <Box display="flex" justifyContent="center" gap={4} mt={4}>
            {/* Add New Category */}
            <Grid
              container
              gap={13}
              justifyContent={"center"}
              sx={{
                borderRadius: 3,
                border: "1px solid #81D4FA", // بوردر ملایم به رنگ آبی آسمانی
                background:
                  "linear-gradient(135deg, #E1F5FE 40%, #B3E5FC 100%)", // گرادیانت ملایم آبی
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // سایه لطیف‌تر
                animation: "fadeIn 1s ease-out", // انیمیشن ملایم
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                justifyContent={"center"}
                alignItems={"center"}
                mt={7}
              >
                <Stack
                  sx={{
                    bgcolor: "#E1F5FE", // پس‌زمینه ملایم آبی
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 2,
                    width: "100%",
                    maxWidth: 360,
                    border: "1px solid #4FC3F7", // بوردر آبی ملایم
                    transition: "all 0.3s ease",
                    background: "linear-gradient(45deg, #E1F5FE, #B3E5FC)", // گرادیانت آرام
                    "&:hover": {
                      bgcolor: "#B3E5FC", // تغییر رنگ در هاور
                      borderColor: "#29B6F6", // تغییر رنگ بوردر در هاور
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)", // سایه ملایم‌تر
                      transform: "scale(1.03)", // بزرگتر شدن ملایم
                    },
                  }}
                >
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      error={error}
                      margin="dense"
                      label="Category Name"
                      type="text"
                      fullWidth
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        setError(false);
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </Stack>
              </Grid>

              {/* Categories List */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    bgcolor: "#B3E5FC", // پس‌زمینه ملایم آبی
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    border: "2px solid #4FC3F7", // رنگ ملایم برای بوردر
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#29B6F6", // تغییر رنگ در هاور
                      transform: "scale(1.02)", // بزرگتر شدن در هاور
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      p: 2,
                      backgroundColor: "#29B6F6", // پس‌زمینه ملایم آبی در عنوان
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#fff",
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                    }}
                  >
                    Categories
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      overflowY: "auto",
                      "&::-webkit-scrollbar": { width: "8px" },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#ccc",
                      },
                    }}
                  >
                    <List>
                      {categories.map((cat) => (
                        <ListItem
                          key={cat.categoryId}
                          sx={{
                            borderBottom: "1px solid #E1F5FE", // بوردر ملایم برای آیتم‌ها
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(255, 255, 255, 0.8)", // پس‌زمینه شفاف ملایم
                            "&:hover": {
                              background: "#29B6F6", // تغییر رنگ در هاور
                              color: "#fff", // تغییر رنگ متن به سفید در هاور
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "medium",
                              textAlign: "center",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {cat.category}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Add Admin Button Below */}
          <Box display="flex" justifyContent="center" mt={4}>
            <AddAdmin closeState={handleCloseAddAdmin} />
          </Box>

          {open && <EditProfileAdmin closeState={closeState} />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
