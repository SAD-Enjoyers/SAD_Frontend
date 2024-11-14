import React, { useState } from "react";

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
import exam from "../../assets/images/exam.jpg";
import { Edit } from "@mui/icons-material";

export default function PrivateProfile() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid2 container spacing={2} mt={11}>
          {/* Sidebar */}
          <Grid2 item size={3}>
            <Box
              sx={{
                position: "sticky",
                top: "40px",
                backgroundColor: "white", // برای مشاهده‌ی بهتر در صورت چسبندگی
                zIndex: 1,
                // dont repead code
                "& button": {
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
                  borderRadius: "5px",
                  color: "#387CE7",
                  "&:hover": {
                    backgroundColor: "#387CE7", // رنگ پس زمینه در حالت hover
                    color: "#fff",
                  },
                },
              }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <Button fullWidth>add question</Button>
              <Button fullWidth>bank question</Button>
              <Button fullWidth>add courses</Button>
              <Button fullWidth>review profile</Button>
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
                      src={exam} // URL تصویر پروفایل
                      sx={{ width: "200px", height: "200px" }}
                    />
                  </Box>
                </Grid2>

                {/* User Information */}
                <CardContent
                  sx={{
                    textAlign: "center",
                    textAlign: "justify",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Full Name: John Doe
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Username: johndoe123
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: johndoe@example.com
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
            <ReviewComponent />
            <ReviewComponent />
            <ReviewComponent />
            <ReviewComponent />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
function ReviewComponent() {
  const [bgColor, setBgColor] = useState("transparent"); // حالت اولیه برای پس‌زمینه

  const handleViewAllClick = () => {
    setBgColor("#E3F2FD"); // تغییر رنگ پس‌زمینه به آبی روشن
    window.location.href = "/full-exam-reviews";
  };

  return (
    <Grid2
      container
      sx={{
        backgroundColor: bgColor,
        transition: "background-color 0.5s ease",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            borderColor: "#378CE7",
            mb: 6,
            maxWidth: 600,
            mx: "auto",
            borderRadius: "4%",
          }}
        >
          {["Review"].map((section) => (
            <Box key={section} mb={5}>
              <Typography variant="h6" mb={2} textAlign="center">
                {section}
              </Typography>

              <Grid2
                container
                spacing={1}
                justifyContent="center"
                alignItems="stretch"
              >
                {[1, 2, 3].map((item) => (
                  <Box key={item} display="flex" justifyContent="center">
                    <Card
                      sx={{
                        p: 1,
                        borderColor: "#378CE7",
                        width: "100%",
                        maxWidth: 220,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "10px",
                        boxShadow: 1,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="100"
                        image={exam} // مسیر تصویر را جایگزین کنید
                        alt="Review Image"
                        sx={{
                          borderRadius: "8px",
                          mb: 1,
                          width: { xs: "60px", sm: "100px", md: "100px" },
                          height: { xs: "60px", sm: "100px", md: "100px" },
                        }}
                      />

                      <Typography
                        variant="subtitle2"
                        component="div"
                        gutterBottom
                        fontSize="0.85rem"
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.85rem",
                            md: "0.95rem",
                          },
                        }}
                      >
                        Final Review
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="0.7rem"
                        mb={0.5}
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.85rem",
                            md: "0.95rem",
                          },
                        }}
                      >
                        2024-12-15
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="0.7rem"
                        mb={1}
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.85rem",
                            md: "0.95rem",
                          },
                        }}
                      >
                        Score: 85/100
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        textAlign="center"
                        fontSize="0.75rem"
                        mb={1.5}
                        sx={{
                          fontSize: {
                            xs: "0.0rem",
                            sm: "0.0rem",
                            md: "0.65rem",
                          },
                        }}
                      >
                        Needs improvement in algorithms.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          fontSize: {
                            xs: "0.5rem",
                            sm: "0.85rem",
                            md: "0.65rem",
                          }, // تغییر اندازه فونت بر اساس سایز صفحه
                          padding: {
                            xs: "2px 4px",
                            sm: "3px 4px",
                            md: "6px 4px",
                          }, // تغییر padding بر اساس سایز صفحه
                          borderRadius: "5px",
                        }}
                      >
                        View Details
                      </Button>
                    </Card>
                  </Box>
                ))}
              </Grid2>
            </Box>
          ))}

          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="text" color="primary" onClick={handleViewAllClick}>
              View All Exams
            </Button>
          </Box>
        </Card>
      </Box>
    </Grid2>
  );
}
