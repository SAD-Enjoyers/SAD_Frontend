import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#3498db", color: "white", pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        {/* Footer Content */}
        <Grid container spacing={4} justifyContent="space-between">
          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#DFF5FF" }}
            >
              Quick Links
            </Typography>
            <Box>
              {[
                { text: "Home", to: "/" },
                { text: "About Us", to: "/AboutUs" },
                { text: "Courses", to: "/SearchCourse" },
                { text: "Contact", to: "/QA" },
              ].map((link) => (
                <Link
                  key={link.text}
                  to={link.to}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    textDecoration: "none",
                    color: "#67C6E3",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#DFF5FF")}
                  onMouseLeave={(e) => (e.target.style.color = "#67C6E3")}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#DFF5FF" }}
            >
              Follow Us
            </Typography>
            <Box>
              {[
                { icon: <Facebook />, href: "https://facebook.com" },
                { icon: <Twitter />, href: "https://twitter.com" },
                { icon: <Instagram />, href: "https://instagram.com" },
                { icon: <LinkedIn />, href: "https://linkedin.com" },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  sx={{
                    backgroundColor: "#378CE7",
                    "&:hover": { backgroundColor: "#67C6E3" },
                    color: "white",
                    mr: 1,
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#DFF5FF" }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "#DFF5FF" }}>
              <strong>Email:</strong> erfanmasoudiba@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "#DFF5FF" }}>
              <strong>Phone:</strong> (123) 456-7890
            </Typography>
            <Typography variant="body2" sx={{ color: "#DFF5FF" }}>
              <strong>Address:</strong> Research Lab., Iran University of
              Science and Technology (IUST), Tehran, Iran
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: "rgba(223, 245, 255, 0.2)" }} />

        {/* Footer Bottom */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#DFF5FF", opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} This Website. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
