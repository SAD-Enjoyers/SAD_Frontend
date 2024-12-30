// AboutUs.js
import React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Avatar, Tooltip, Popover
} from "@mui/material";
import dswaminImage from "./assets/dswamin.png";
import { Instagram, GitHub, Email,Phone } from "@mui/icons-material";

const AboutUs = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleEmailClick = (event, email) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmail(email);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEmail("");
  };

  const [showEmail, setShowEmail] = useState(false); // برای نمایش ایمیل

  const handleemailClick = () => {
    setShowEmail(!showEmail); // تغییر وضعیت نمایش ایمیل
  };

  const open = Boolean(anchorEl);

  const teamMembers = [
    {
      name: "Ahmadreza Zabihi",
      role: "Backend Developer",
      description: "Skilled in API development and database management.",
      image: "",
      socials: { github: "https://github.com/ahmadreza", email: "ahmadreza@example.com" },
    
    },
    {
      name: "AmirHossein Kashkouei",
      role: "Backend Developer",
      description: "Expert in server-side development and cloud solutions.",
      image: "",
      socials: { github: "https://github.com/amirhossein", email: "amirhossein@example.com" },
   
    },
    {
      name: "AmirHossein Ghadrdan",
      role: "Frontend Developer",
      description: "Focuses on building interactive user interfaces.",
      image: "",
      socials: { github: "https://github.com/ghadrdan", email: "ghadrdan@example.com" },
    
    },
    {
      name: "Seyed Erfan Masoudi",
      role: "Frontend Developer",
      description: "Proficient in React and Material-UI.",
      image: "",
      socials: { github: "https://github.com/erfanmasoudi", email: "erfanmasoudiba@gmail.com" },
    
    },
    {
      name: "Alireza Karami",
      role: "Frontend Developer",
      description: "Specialized in modern JavaScript frameworks.",
      image: "",
      socials: { github: "https://github.com/alirezakarami", email: "alireza@example.com" },
    
    },
    {
      name: "Mohammadreza Edrisabadi",
      role: "Frontend Developer",
      description: "Experienced in responsive web design.",
      image: "",
      socials: { github: "https://github.com/edrisabadi", email: "edrisabadi@example.com" },
  
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 20 }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#378CE7", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "auto", sm: "500px", md: "635px" }, 
          padding: { xs: "20px", sm: "0px" }, 
        }}
      >
        <Container>
          <Grid container alignItems="center" spacing={4}>
            {/* Text Section */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "white", textAlign: { xs: "center", md: "left" } }}
              >
                TECHVERSE
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  lineHeight: "1.2",
                  color: "#DFF5FF",
                  textShadow: "1px 1px 2px #378CE7",
                  textAlign: { xs: "center", md: "left" }, 
                  fontSize: { xs: "2rem", md: "3rem" }, 
                }}
              >
                Teaching and Learning Center
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "#DFF5FF",
                  opacity: 0.9,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Further your professional development with online and on-site
                courses, webinars, and teaching materials.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" }, 
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#67C6E3",
                    color: "#DFF5FF",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    "&:hover": { backgroundColor: "#378CE7" },
                  }}
                  onClick={() => {
                    document
                      .getElementById("contact-us")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Grid>
    
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={dswaminImage}
                alt="Teaching Center"
                sx={{
                  width: "100%",
                  height: { xs: "auto", md: "600px" }, 
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
            {/* What We Do Section */}
            <Box
        sx={{
          backgroundColor: "#67c6e3",
          color: "#dff5ff",
          py: 6,
        }}
      >
        <Container>
          <Grid container spacing={20}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mb: 4,mt:8, color: "#378ce7" }}
              >
                WHAT WE DO
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, mt: 8, color: "#dff5ff", fontWeight: "600" }}
              >
                New Strategies for Teacher Learning
              </Typography>
              <Typography
                variant="body2"
                sx={{   color: "black", 
                  fontSize: "1rem", 
                  lineHeight: "1.6", 
                  fontWeight: "400", 
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", }}
              >
              We provide innovative strategies that help teachers adapt to modern learning environments.
              Our programs are designed to inspire creativity, engagement, and effectiveness in teaching methods.
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, mt: 8, color: "#dff5ff", fontWeight: "600" }}
              >
                Professional Learning in Practice
              </Typography>
              <Typography
                variant="body2"
                sx={{   color: "black", 
                  fontSize: "1rem", 
                  lineHeight: "1.6", 
                  fontWeight: "400", 
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", }}
              >
            Transform theoretical knowledge into actionable practices with our hands-on learning sessions.
             Empower educators to enhance their classroom performance and connect with students effectively.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mb: 4, mt:8, color: "#378ce7" }}
              >
                PROFESSIONAL LEARNING
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, mt: 8, color: "#dff5ff", fontWeight: "600" }}
              >
                What Teachers Need to Know
              </Typography>
              <Typography
                variant="body2"
                sx={{   color: "black", 
                  fontSize: "1rem", 
                  lineHeight: "1.6", 
                  fontWeight: "400", 
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",}}
              >
          Stay ahead in the education field with our up-to-date resources and training.
          We ensure that teachers are equipped with the latest knowledge and skills 
          to meet evolving educational demands.
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, mt: 8, color: "#dff5ff", fontWeight: "600" }}
              >
                The Good Design
              </Typography>
              <Typography
                variant="body1"
                sx={{     color: "black", 
                  mb: 8,
                  fontSize: "1rem", 
                  lineHeight: "1.6", 
                  fontWeight: "400", 
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", }}
              >
              Explore the power of thoughtful design in education. 
              From creating engaging lesson plans to designing impactful learning environments,
              we help educators make every experience meaningful.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
            {/* Education Section */}
            <Box
        sx={{
          backgroundColor: "#378CE7",
          color: "#DFF5FF",
          py: 6,
          textAlign: "center",
          boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "1px 1px 2px #67C6E3",
            }}
          >
            Education and Learning
          </Typography>
          <Typography
            variant="body1"
            sx={{  color: "white", 
              mb: 8,
              fontSize: "1.2rem", 
              lineHeight: "1.6", 
              fontWeight: "400", 
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",  }}
          >
            Learning is something we do almost every day
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                id: "01",
                title: "Teaching",
                description: "Empower educators with the tools and techniques needed to inspire and engage students effectively.",
              },
              {
                id: "02",
                title: "Innovations",
                description: "Explore cutting-edge ideas and practices designed to revolutionize teaching and learning.",
              },
              {
                id: "03",
                title: "Students",
                description: "Foster a learning environment where students can thrive, grow, and reach their full potential.",
              },
              {
                id: "04",
                title: "Resources",
                description: "Access comprehensive materials to support both educators and learners on their journey.",
              },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Box
                  sx={{
                    backgroundColor: "#DFF5FF",
                    borderRadius: "8px",
                    p: 4,
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#67C6E3",
                      color: "white",
                      width: "75px",
                      height: "75px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "40px",
                      margin: "0 auto 16px",
                    }}
                  >
                    {item.id}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "black" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{   textAlign: "center",mt:4,
                      color: "black", 
                      fontSize: "0.9rem", 
                      lineHeight: "1.6", 
                      fontWeight: "400", 
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                     }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
            {/* Meet The Team Section */}
            <Box
      sx={{
        backgroundColor: "#67C6E3",
        color: "#DFF5FF",
        py: 6,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 8,
            textShadow: "1px 1px 2px #378CE7",
          }}
        >
          Meet The Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((person, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  backgroundColor: "#DFF5FF",
                  color: "#378CE7",
                  borderRadius: "16px",
                  p: 4,
                  textAlign: "center",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: "40px",
                    mx: "auto",
                    mb: 2,
                    bgcolor: "#378CE7",
                    color: "#DFF5FF",
                  }}
                >
                  {person.name.charAt(0)}
                </Avatar>
                <Typography variant="body2" sx={{ mb: 1, color: "black" }}>
                  {person.role}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#378CE7" }}
                >
                  {person.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{color: "black", 
                    fontSize: "1rem", 
                    lineHeight: "1.6", 
                    fontWeight: "400", 
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", }}
                >
                  {person.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 3, color: "black", fontStyle: "italic" }}
                >
                  {person.bio}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <Box
                    component="a"
                    href={person.socials.github}
                    target="_blank"
                    sx={{
                      color: "#DFF5FF",
                      backgroundColor: "#67C6E3",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#378CE7",
                        color: "#DFF5FF",
                      },
                    }}
                  >
                    <GitHub fontSize="small" />
                  </Box>
                  <Box
                    sx={{
                      color: "#DFF5FF",
                      backgroundColor: "#67C6E3",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#378CE7",
                        color: "#DFF5FF",
                      },
                    }}
                    onClick={(e) => handleEmailClick(e, person.socials.email)}
                  >
                    <Email fontSize="small" />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* Popover for Email */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "#DFF5FF",
              color: "black",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography>Email: {selectedEmail}</Typography>
          </Box>
        </Popover>
      </Container>
    </Box>
          {/* Contact Us Section */}
          <Box
      id="contact-us"
      sx={{
        backgroundColor: "#F4F6F8",
        color: "#333333",
        py: 6,
        textAlign: "center",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "40px 0",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#378CE7",
            textShadow: "1px 1px 2px #CCCCCC",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 5, opacity: 0.9, fontSize: "1.2rem", color: "#555555" }}
        >
          We are here to assist you with any questions or feedback you may have. Feel free to connect with us using the following options.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {/* Email Section */}
<Box
  onClick={() => setShowEmail(!showEmail)} // تغییر وضعیت با هر کلیک
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "linear-gradient(145deg, #FFE2E8, #FFD1D9)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
    width: "250px",
    textDecoration: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#FFD1D9",
      cursor: "pointer",
    },
  }}
>

  {/* نمایش آیکون یا ایمیل */}
  {!showEmail ? (
    <>
      <Email
        fontSize="large"
        sx={{
          color: "#E1306C",
          mb: 2,
          transition: "color 0.3s ease",
          "&:hover": { color: "#C2185B" },
        }}
      />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, color: "#333333" }}
      >
        Email Us
      </Typography>
      <Typography variant="body2" sx={{ color: "#555555" }}>
        Click to reveal email
      </Typography>
    </>
  ) : (
    <>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, color: "#333333" }}
      >
        Contact Email
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#E1306C",
          fontWeight: "bold",
          animation: "fade-in 0.5s ease-in-out",
        }}
      >
        support@example.com
      </Typography>
    </>
  )}
</Box>






</Box>
