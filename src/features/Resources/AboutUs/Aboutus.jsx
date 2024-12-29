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