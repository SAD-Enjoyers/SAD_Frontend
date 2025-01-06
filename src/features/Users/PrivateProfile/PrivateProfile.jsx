import React, { useState, useEffect } from "react";
import LoadingScreen from "../../../common/Loading.jsx";
import {
  Box,
  Button,
  Container,
  Grid2,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ReviewComponent from "./components/ReviewComponent.jsx";
import EditProfile from "./components/EditProfile.jsx";

export default function PrivateProfile() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true); // استفاده از useState برای مدیریت isValid
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [token, setToken] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageProfile, setImageProfile] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });

  const closeState = () => {
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
        setLoading(false);
      });
  };

  // dont repead yourself    dry
  const StyledButton = ({ link, children, onClick }) => {
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
          onClick={onClick} // انتقال onClick به دکمه داخلی
        >
          {children}
        </Button>
      </Link>
    );
  };

  useEffect(() => {
    setImageProfile(localStorage.getItem("imageProfile"));
    const token = localStorage.getItem("token");

    if (!token || !data) {
      fetchData(token);
    } else {
      setLoading(false); // اگر توکن موجود باشد، بارگذاری تمام می‌شود
    }
  }, []);

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
          <Grid2 size={3}>
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
              <StyledButton link="make_exam">add exam</StyledButton>
              <StyledButton link="AddCourse">add courses</StyledButton>
              <StyledButton link="AddArticle">add article</StyledButton>
              <StyledButton link="AddQuestion">add question</StyledButton>
              {formData?.userName && (
                <StyledButton
                  link={`PublicUsers/${formData.userName}`}
                  onClick={() => {
                    localStorage.setItem(
                      "userImage",
                      `/api/v1/uploads/profile-images/${imageProfile}`
                    );
                  }}
                >
                  Review Profile
                </StyledButton>
              )}
            </Box>
          </Grid2>

          {/* Main Profile Section */}
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
                      src={
                        imageProfile
                          ? `api/v1/uploads/profile-images/${imageProfile}`
                          : "images/profile.png"
                      }
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

            <ReviewComponent section="My Exams" Services="exam" />
            <ReviewComponent
              section="My Courses"
              style_ml="20px"
              Services="course"
            />
            <ReviewComponent
              section="My Articles"
              style_ml="0px"
              Services="article"
            />

            {/* Edit Profile Dialog */}
            {open && <EditProfile closeState={closeState} />}
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
