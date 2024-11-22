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
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import ReviewComponent from "./components/ReviewComponent.jsx";
import useFetchWithLoader from "./hooks/fetchloader.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function PrivateProfile() {
  const navigate = useNavigate();
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

  const { isLoading, data, error, fetchData } = useFetchWithLoader(
    "/api/v1/profile/private-data",
    {
      method: "GET",
    }
  );
  useEffect(() => {
    fetchData({ data: "some data" });
  }, []);

  if (isLoading || !data) {
    return <LoadingScreen />; // نمایش لودینگ
  }

  if (error) {
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
              <StyledButton link="ExamPreview">Exam Preview</StyledButton>
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
                      src="images/profile.png" // URL تصویر پروفایل
                      sx={{ width: "150px", height: "150px" }}
                    />
                  </Box>
                </Grid2>

                {/* User Information */}
                <CardContent
                  sx={{
                    textAlign: "justify",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Full Name:{" "}
                    {data.data.userData.firstName +
                      "   " +
                      data.data.userData.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Username: {data.data.userData.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {data.data.userData.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bio: Software Developer with a passion for coding and
                    technology.
                  </Typography>
                </CardContent>
              </Grid2>

              {/* Edit Button */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="outlined" startIcon={<Edit />}>
                  Edit profile
                </Button>
              </Box>
            </Card>
            <ReviewComponent section="My Exams" />
            <ReviewComponent section="My Courses" style_ml="20px" />
            <ReviewComponent section="My Articles" style_ml="0px" />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
