import { Add, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Typography,
  Stack,
  List,
  ListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../common/Loading";
import { useNavigate } from "react-router-dom";
import EditProfileAdmin from "./EditProfileAdmin";
import AddCategoryButton from "./AddCategory";
import AddAdmin from "./AddAdmin";
import axios from "axios";

export default function Information() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
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
      console.log("categories", response.data.data.categoryList);
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
    return <LoadingScreen />;
  }
  if (!isValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <>
      <Grid2 container alignItems={"center"} justifyContent={"center"}>
        <Grid2 size={9}>
          <Card
            sx={{
              p: 2,
              mb: 6,
              maxWidth: 600,
              mx: "auto",
              boxShadow: "none",
            }}
          >
            <Grid2
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              direction={{ xs: "column", md: "row" }}
            >
              {/* Profile Image */}
              <Grid2>
                <Box display="flex" justifyContent="center">
                  <Avatar
                    alt="User Name"
                    src={"images/admin.png"}
                    sx={{ width: "150px", height: "150px" }}
                  />
                </Box>
              </Grid2>

              {/* User Information */}
              <CardContent sx={{ textAlign: "justify" }}>
                <Typography variant="h6" component="div">
                  Full Name: {formData.firstName + " " + formData.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Username: {formData.userName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  phoneNumber: {formData.phoneNumber}
                </Typography>
              </CardContent>
            </Grid2>

            {/* Edit Button */}
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setOpen(true)}
              >
                Edit profile
              </Button>
            </Box>
          </Card>
          <Box display={"flex"} justifyContent={"center"} gap={10}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenAddAdmin} // تابعی که هنگام کلیک فراخوانی می‌شود
              >
                Add Admin
              </Button>

              {openAddAdmin && <AddAdmin closeState={handleCloseAddAdmin} />}
            </Box>
            <Box>
              <AddCategoryButton />
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: "hidden", // Prevent content from overflowing
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ p: 2, backgroundColor: "#f5f5f5" }}
                >
                  Categories
                </Typography>
                <Box
                  sx={{
                    height: 300, // Fixed height for scrollable area
                    overflowY: "auto", // Enable vertical scrolling
                    "&::-webkit-scrollbar": {
                      width: "8px", // Scrollbar width
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#888", // Scrollbar thumb color
                      borderRadius: "4px", // Scrollbar thumb rounded corners
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#555", // Scrollbar thumb color on hover
                    },
                  }}
                >
                  <List>
                    {categories.map((cat) => (
                      <ListItem
                        key={cat.categoryId}
                        sx={{
                          borderBottom: "1px solid #eee",
                          "&:hover": {
                            backgroundColor: "#f9f9f9", // Hover effect
                          },
                        }}
                      >
                        <Typography sx={{ fontWeight: "medium" }}>
                          {cat.category}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
          {open && <EditProfileAdmin closeState={closeState} />}
        </Grid2>
      </Grid2>
    </>
  );
}
