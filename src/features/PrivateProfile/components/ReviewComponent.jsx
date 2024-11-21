import React, { useState } from "react";

import { Box, Button, Grid2, Typography, Card, CardMedia } from "@mui/material";
import exam from "../../../assets/images/exam.jpg";
export default function ReviewComponent(props) {
  const [bgColor, setBgColor] = useState("transmit"); // حالت اولیه برای پس‌زمینه

  const handleViewAllClick = () => {
    setBgColor("#E3F2FD"); // تغییر رنگ پس‌زمینه به آبی روشن
    window.location.href = "/full-exam-reviews";
  };

  return (
    <Box ml={props.style_ml}>
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
              background: "#E3F2FD",
              transition: "all 0.3s ease", // تغییرات آرام با زمان 0.3 ثانیه
              "&:hover": {
                backgroundColor: "#387CE7", // رنگ پس زمینه در حالت hover
                color: "#fff", // رنگ متن
              },
              "&:hover .buttonViewAll": {
                color: "#fff",
              },
            }}
          >
            <Box mb={5}>
              <Typography variant="h6" mb={2} textAlign="center">
                {props.section}
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
                        variant="outlined"
                        color="primary"
                        sx={{
                          fontSize: {
                            xs: "0.55rem",
                            sm: "0.65rem",
                            md: "0.75rem",
                          }, // تغییر اندازه فونت بر اساس سایز صفحه
                          padding: {
                            xs: "2px 4px",
                            sm: "3px 4px",
                            md: "6px 12px",
                          }, // تغییر padding بر اساس سایز صفحه
                          borderRadius: "10%",
                          "&:hover": {
                            backgroundColor: "#387CE7", // رنگ پس زمینه در حالت hover
                            color: "#fff",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Card>
                  </Box>
                ))}
              </Grid2>
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                className="buttonViewAll"
                variant="text"
                color="primary"
                onClick={handleViewAllClick}
              >
                View All Exams
              </Button>
            </Box>
          </Card>
        </Box>
      </Grid2>
    </Box>
  );
}
