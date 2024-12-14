import React, { useState, useEffect, memo } from "react";
import { Box, Button, Grid2, Typography, Card, CardMedia } from "@mui/material";
import { LineAxis } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ReviewComponent(props) {
  const [bgColor, setBgColor] = useState("transparent"); // حالت اولیه برای پس‌زمینه
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // توابع
  const fetchExamData = async () => {
    try {
      const response = await fetch("/api/v1/profile/exam-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // توکن را اینجا اضافه کنید
          "x-role": localStorage.getItem("role"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // دریافت تصاویر و ذخیره در حافظه
      const fetchedData = await Promise.all(
        responseData.data.map(async (item) => {
          // console.log(item.serviceId);
          if (!item.image) {
            return { ...item, imageURL: null }; // یا هر مقدار پیش‌فرض دلخواه
          }
          // console.log(`${item.image}`);

          const imageResponse = await fetch(
            `/api/v1/uploads/service-images/${item.image}`,
            {
              method: "GET",
            }
          );
          const imageBlob = await imageResponse.blob();
          const imageURL = URL.createObjectURL(imageBlob); // ساخت URL محلی
          return { ...item, imageURL }; // اضافه کردن تصویر به داده‌ها
        })
      );

      setData(fetchedData); // ذخیره داده‌ها در State
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  const navigateToPublicExam = (examData) => {
    localStorage.setItem("examData", JSON.stringify(examData)); // Save to localStorage
    navigate("/PublicExam", { state: { examData } });
  };
  const navigateToPrivateExam = (examData) => {
    localStorage.setItem("examData", JSON.stringify(examData)); // Save to localStorage
    navigate("/PrivateExam", { state: { examData } });
  };
  // اجرا در بارگذاری اولیه
  useEffect(() => {
    if (props.section === "My Exams") {
      fetchExamData();
    }
  }, [props.section]);

  // مدیریت رنگ پس‌زمینه
  const handleViewAllClick = () => {
    setBgColor("#E3F2FD"); // تغییر رنگ پس‌زمینه به آبی روشن
    window.location.href = "/full-exam-reviews";
  };

  // کامپوننت بازگشتی
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
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "#387CE7",
                color: "#fff",
              },
              "&:hover .buttonMakeExam": {
                color: "#ffffff",
                borderColor: "#ffffff",
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
                justifyContent="flex-start"
                alignItems="stretch"
                sx={{
                  overflow: "auto",
                  paddingBottom: "20px",
                  flexWrap: "nowrap",
                  width: { xs: "220px", sm: "370px", md: "600px" },
                  flexShrink: 0,
                }}
              >
                {data.map((item, index) => (
                  <Box key={index} display="flex" justifyContent="center">
                    <Card
                      sx={{
                        p: 1,
                        borderColor: "#378CE7",
                        width: "100%",
                        maxWidth: 250,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "10px",
                        boxShadow: 1,
                        transition: "transform 0.3s ease",
                        minWidth: { xs: 100, sm: 150, md: 220 },
                        "&:hover": {
                          transform: "scale(1.05)", // مقدار کمی بزرگ‌تر
                          boxShadow: 5, // سایه بیشتر برای تمایز
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="100"
                        image={
                          item.imageURL ? item.imageURL : "/images/exam.png"
                        }
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
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        Price: {item.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        Level: {item.level}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Score: {item.score}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        textAlign="center"
                        mb={1.5}
                      >
                        Description: {item.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={
                          item.type == "member"
                            ? () => {
                                navigateToPublicExam(item);
                              }
                            : () => {
                                navigateToPrivateExam(item);
                              }
                        }
                        sx={{
                          fontSize: {
                            xs: "0.65rem",
                            sm: "0.75rem",
                            md: "0.95rem",
                          },
                          padding: {
                            xs: "2px 4px",
                            sm: "3px 4px",
                            md: "6px 12px",
                          },
                          borderRadius: "10%",
                          "&:hover": {
                            backgroundColor: "#387CE7",
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
              <Box sx={{ textAlign: "center", mt: "30px" }}>
                <Button className="buttonMakeExam" variant="outlined">
                  make Exam
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid2>
    </Box>
  );
}
