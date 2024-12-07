import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        padding: "40px 0 20px",
        color: "#333",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 xs={12} sm={6} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.3rem",
                color: "#0077b6",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Your Company
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ wordWrap: "break-word" }}
            >
              We provide top-quality courses, blogs, and user profiles to help
              you grow and connect with other professionals. Follow us on social
              media or reach out if you have any questions!
            </Typography>
          </Grid2>

          <Grid2 xs={12} sm={6} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.3rem",
                color: "#0077b6",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: info@yourcompany.com <br />
            </Typography>
          </Grid2>
        </Grid2>

        <Box
          sx={{
            textAlign: "center",
            padding: "10px 0",
            marginTop: "20px",
            backgroundColor: "#cce8f9",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
