import React from "react";
import { Box, Container, Typography, Grid2 } from "@mui/material";
// css
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} sm={6} md={6}>
            <Typography variant="h6" className="footer-title">
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

          <Grid2 item xs={12} sm={6} md={6}>
            <Typography variant="h6" className="footer-title">
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: info@yourcompany.com <br />
            </Typography>
          </Grid2>
        </Grid2>

        <Box className="footer-bottom">
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
