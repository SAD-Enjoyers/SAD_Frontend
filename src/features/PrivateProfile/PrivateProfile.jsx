import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/Loading.jsx";
import {
  Box,
  Button,
  Container,
  Grid2,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ReviewComponent from "./components/ReviewComponent.jsx";

export default function PrivateProfile() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true); // استفاده از useState برای مدیریت isValid
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [token, setToken] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
    userName: " ",
    email: " ",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imageNameUrl, setImageNameurl] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // ذخیره فایل برای ارسال به سرور
      setPreviewImage(URL.createObjectURL(file)); // پیش‌نمایش
      setImageName(file.name);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated Profile Data:", formData);
    setOpen(false);
  };

  const fetchData = (tokenCheck) => {
    fetch("/api/v1/profile/private-data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenCheck}`,
        "x-role": localStorage.getItem("role"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsValid(false); // تغییر وضعیت به false در صورت خطا
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data);
        setData(data);
        setFormData({
          firstName: data.data.userData.firstName,
          lastName: data.data.userData.lastName,
          userName: data.data.userData.userName,
          email: data.data.userData.email,
        });
        setLoading(false); // وقتی درخواست تمام شد، حالت loading را به false تغییر بده
      })
      .catch((err) => {
        setIsValid(false); // در صورت بروز خطا، وضعیت را به false تغییر دهید
        setLoading(false); // حتی در صورت خطا نیز بارگذاری تمام می‌شود
      });
  };
  const ImageUpload = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          textAlign: "center",
          margin: "0 auto",

          gap: 2,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          width: 200,
          mt: "30px",
          mb: "20px",
        }}
      >
        <Typography variant="h6">Upload an Image</Typography>
        <Button variant="contained" component="label">
          Choose Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {imageName && (
          <TextField
            value={imageName}
            variant="outlined"
            disabled
            fullWidth
            size="small"
            label="Selected File"
          />
        )}
        {previewImage && (
          <Box
            component="img"
            src={previewImage}
            alt="Uploaded Preview"
            sx={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        )}
        {selectedImage && (
          <Button variant="outlined" color="error" onClick={handleClear}>
            Remove Image
          </Button>
        )}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={submitImage}
          disabled={!selectedImage}
        >
          Upload Image
        </Button> */}
      </Box>
    );
  };
  const handleClear = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageName("");
  };

  // dont repead yourself    dry
  const StyledButton = ({ link, children }) => {
    if (!link) {
      link = "";
    }
    return (
      <Link to={"/" + link} style={{ width: "100%" }}>
        <Button
          fullWidth
          sx={{
            borderBottom: "1px solid #387CE7",
            fontSize: {
              xs: "0.5rem",
              sm: "0.75rem",
              md: "1.1rem",
            },
            padding: {
              xs: "2px 4px",
              sm: "3px 4px",
              md: "6px 4px",
            },
            borderRadius: "0px",
            "&:hover": {
              backgroundColor: "#387CE7",
              color: "#fff",
            },
          }}
        >
          {children}
        </Button>
      </Link>
    );
  };
  // setToken(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !data) {
      fetchData(token);
    } else {
      setLoading(false); // اگر توکن موجود باشد، بارگذاری تمام می‌شود
    }
  }, []);
  // useEffect(() => {
  //   if (!token || !data) {
  //     fetchData(token);
  //   } else {
  //     setLoading(false); // اگر توکن موجود باشد، بارگذاری تمام می‌شود
  //   }
  // }, [token]);

  if (isLoading) {
    return <LoadingScreen />; // نمایش لودینگ
  }

  if (!isValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <>
      <Container maxWidth="lg">
        <Grid2 container spacing={2} mt={11}>
          {/* Sidebar */}
          <Grid2 item size={3}>
            <Box
              sx={{
                position: "sticky",
                top: "90px",
              }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <StyledButton link="AddQuestions">add question</StyledButton>
              {/* <StyledButton link="">bank question</StyledButton> */}
              <StyledButton link="make_exam">make exam</StyledButton>
              {/* <StyledButton link="private_exam_page">
                private exam page
              </StyledButton>
              <StyledButton link="ExamPreview">Exam Preview</StyledButton> */}
              <StyledButton link="">add courses</StyledButton>
              <StyledButton link="">review profile</StyledButton>
            </Box>
          </Grid2>

          {/* Main Profile Section */}
          <Grid2 item size={9}>
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
                      src="images/profile.png"
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
                  <Typography variant="body2" color="text.secondary">
                    Email: {formData.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bio: Software Developer with a passion for coding and
                    technology.
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

            <ReviewComponent section="My Exams" />
            <ReviewComponent section="My Courses" style_ml="20px" />
            <ReviewComponent section="My Articles" style_ml="0px" />

            {/* Edit Profile Dialog */}
            {open && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Card
                  sx={{
                    p: 4,
                    width: "90%",
                    maxWidth: 400,
                    backgroundColor: "white",
                    borderRadius: 2,
                    boxShadow: 5,
                  }}
                >
                  <ImageUpload />
                  <Typography variant="h6" gutterBottom>
                    Edit Profile
                  </Typography>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpen(false)}
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Box>
                </Card>
              </Box>
            )}
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
