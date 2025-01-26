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
  styled,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewComponent from "./components/ReviewComponent.jsx";

export default function PublicUsers() {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);
  const [isValid, setIsValid] = useState(true); // استفاده از useState برای مدیریت isValid
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [token, setToken] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageProfile, setImageProfile] = useState("");
  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
    userName: " ",
    email: " ",
    address: " ",
  });

  const closeState = () => {
    setOpen(false);
  };

  const fetchData = (tokenCheck) => {
    fetch("/api/v1/profile/public-profile/" + userId, {
      method: "GET",
      headers: {
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
          address: data.data.userData.address,
          phoneNumber: data.data.userData.phoneNumber,
        });
        setLoading(false); // وقتی درخواست تمام شد، حالت loading را به false تغییر بده
      })
      .catch((err) => {
        setIsValid(false); // در صورت بروز خطا، وضعیت را به false تغییر دهید
        setLoading(false);
      });
  };
  const OutlineContainer = styled(Container)(({ theme }) => ({
    marginTop: "70px",
    marginBottom: "40px",
    border: `2px solid #378CE7`, // خط دور
    borderRadius: "10px", // گرد کردن گوشه‌ها
    padding: theme.spacing(2), // فاصله داخلی
    backgroundColor: theme.palette.background.paper, // رنگ پس‌زمینه
  }));

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
      <OutlineContainer>
        <Grid2 container spacing={2} mt={11} justifyContent={"center"}>
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
                      src={localStorage.getItem("userImage")}
                      sx={{ width: "200px", height: "200px" }}
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
                    Address: {formData.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    phoneNumber:{" "}
                    {formData.phoneNumber
                      ? formData.phoneNumber
                      : "phoneNumber not provided"}
                  </Typography>
                </CardContent>
              </Grid2>
            </Card>

            <ReviewComponent
              title={"Exams " + userId}
              section="My Exams"
              Services="exam"
              userId={userId}
            />
            <ReviewComponent
              title={"Courses " + userId}
              section="My Courses"
              Services="course"
              userId={userId}
            />
            <ReviewComponent
              title={"Articles " + userId}
              section="My Articles"
              Services="article"
              userId={userId}
            />
          </Grid2>
        </Grid2>
      </OutlineContainer>
    </>
  );
}
