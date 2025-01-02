import React, { useState, useEffect, memo } from "react";
import {
  Box,
  Button,
  Grid2,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { DarkMode, LineAxis } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ReviewComponent(props) {
  const [bgColor, setBgColor] = useState("transparent"); // حالت اولیه برای پس‌زمینه
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(0);

  const Data = [
    {
      imageURL: "/images/exam.png",
      name: "typescript",
      price: "10",
      description: " Learn TypeScript",
      score: "0.00",
      author: "creator",
    },
    {
      imageURL: "/images/exam.png",
      name: "typescript",
      price: "10",
      description: " Learn TypeScript",
      score: "0.00",
      author: "",
    },
  ];
  const Data2 = [
    {
      imageURL: "/images/exam.png",
      name: "typescript",
      price: "10",
      description: " Learn TypeScript",
      score: "0.00",
      author: "creator",
    },
    {
      imageURL: "/images/exam.png",
      name: "typescript",
      price: "10",
      description: " Learn TypeScript",
      score: "0.00",
      author: "",
    },
  ];
  const Condition = (item) => {
    if (props.section === "My Exams") {
      if (item.type === "member") {
        navigateToPublicExam(item);
      } else {
        navigateToPrivateExam(item);
      }
    }
    if (props.section == "My Courses") {
      if (item.author == "creator") {
        navigateToPublicArticle(item);
      } else {
        navigateToPrivateArticle(item);
      }
    }
    if (props.section == "My Articles") {
      console.log(item.author)
      if (item.type === "member") {
        navigateToPublicArticle(item);
      } else {
        console.log(item.author)
        navigateToPrivateArticle(item);
      }
    }
  };
  // توابع
  const fetchExamData = async (Services) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/profile/${Services}-list`, {
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
    } finally {
      setLoading(false);
    }
  };

  const navigateToPublicExam = (examData) => {
    localStorage.setItem("examData", JSON.stringify(examData)); // Save to localStorage
    navigate("/PublicExam", { state: { examData } });
  };
  const navigateToPrivateExam = (examData) => {
    localStorage.setItem("examData", JSON.stringify(examData)); // Save to localStorage
    navigate(`/PrivateExam/${examData.serviceId}`, { state: { examData } });
  };

  const navigateToPublicArticle = (articleData) => {
    localStorage.setItem("articleData", JSON.stringify(articleData)); // Save to localStorage
    navigate("/PublicArticle", { state: { articleData } });
  };
  const navigateToPrivateArticle = (articleData) => {
    localStorage.setItem("PrivateData", JSON.stringify(articleData)); // Save to localStorage
    navigate(`/PrivateArticle/${articleData.serviceId}`, { state: { articleData } });
  };

    // اجرا در بارگذاری اولیه
    useEffect(() => {
      if (props.section === "My Courses") {
        setData(Data);
      }
      // if (props.section === "My Exams" || props.section === "My Articles") {
      //   console.log(props.Services);
      //   fetchExamData(props.Services);
      // }
      if (props.section === "My Exams") {
        console.log(props.Services);
        fetchExamData(props.Services);
      }
      if (props.section === "My Articles") {
        console.log(props.Services);
        fetchExamData(props.Services);
      }
    }, [props.section]);

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
                width: 600,
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
              {loading ? ( // نمایش لودینگ در صورت بارگذاری
                <CircularProgress
                  sx={{
                    color: "#378CE7",
                    mt: 2,
                    ml: "270px",
                  }}
                />
              ) : (
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
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={1}
                          >
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
                            onClick={() => {
                              Condition(item);
                            }}
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
                </Box>
              )}
            </Card>
          </Box>
        </Grid2>
      </Box>
    );
  }
