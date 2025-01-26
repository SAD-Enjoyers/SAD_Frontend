// CardComponent.js
import React from "react";
import { Typography, Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import blog from "../../../assets/images/blog.jpg";
import course from "../../../assets/images/course.jpg";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
const CardComponent = ({ title, description, linkText, linkUrl }) => {
  return (
    <Box
      sx={{
        marginBottom: "30px",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition:
          "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
        backgroundColor: "#ffffff",
        color: "#333",
        textAlign: "left",
        width: "100%",
        maxWidth: "600px",
        marginInline: "auto",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#378ce7",
          color: "#ffffff",
        },
        "&:hover .cardTitle, &:hover p": {
          color: "inherit",
        },

        "&:hover .Link": {
          color: "#ffffff",
        },
      }}
    >
      <Typography
        variant="h5"
        className="cardTitle"
        sx={{
          fontWeight: "bold",
          fontSize: "1.6rem",
          color: "#333",
          marginBottom: "8px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        className="cardDescription"
        sx={{
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "16px",
          lineHeight: "1.6",
        }}
      >
        {description}
      </Typography>

      <Link
        component={RouterLink}
        className="Link"
        to={linkUrl}
        sx={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#378CE7",
          transition: "color 0.3s ease",
        }}
      >
        {linkText}
      </Link>
    </Box>
  );
};

const InfoCardsSection = () => {
  const cardData = [
    {
      title: "Courses",
      description:
        "Access a wide range of video courses with direct payment from student to instructor, enhancing learning efficiency and instructor benefits.",
      linkText: "View Courses",
      linkUrl: "/SearchCourse",
    },
    {
      title: "Questions",
      description:
        "Take multiple-choice tests with automatic grading and gain immediate feedback on your progress.",
      linkText: "Take Exams",
      linkUrl: "/QuestionSearch",
    },
    {
      title: "Articles",
      description:
        "Share your experiences through Articles, helping you build a comprehensive professional profile.",
      linkText: "Write a Blog",
      linkUrl: "/SearchArticle",
    },

    {
      title: "Rating & Profile",
      description:
        "Receive user ratings on your courses, exams, and blog posts, which automatically update your profile based on activity evaluations.",
      linkText: "View User Profiles",
      linkUrl: "/SearchUsers",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: "100px", direction: "ltr" }}>
      <Grid2 container spacing={4} alignItems="center" justifyContent="center">
        <Grid2
          size={{ xs: 0, md: 4 }}
          sx={{ display: { xs: "none", lg: "block" } }}
        >
          <Box
            sx={{
              position: "relative",
              width: "400px",
              height: "660px",
              margin: "0 auto",
            }}
          >
            <img
              src={blog}
              alt="Learners working"
              style={{
                borderRadius: "8px",
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translate(-90%, 0)",
                width: "350px",
              }}
            />
            <img
              src={course}
              alt="Professional development"
              style={{
                borderRadius: "8px",
                position: "absolute",
                top: "300px",
                left: "70%",
                transform: "translate(-90%, 0)",
                width: "400px",
              }}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Grid2
            container
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "center", minHeight: "500px" }}
          >
            {cardData.map((data, index) => (
              <Grid2 key={index}>
                <CardComponent
                  title={data.title}
                  description={data.description}
                  linkText={data.linkText}
                  linkUrl={data.linkUrl}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default InfoCardsSection;
