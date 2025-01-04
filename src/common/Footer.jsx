// import React from "react";
// import { Box, Container, Typography } from "@mui/material";
// import Grid2 from "@mui/material/Grid2";

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f8f9fa",
//         padding: "40px 0 20px",
//         color: "#333",
//         boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
//         mt: "300px", // اطمینان از چسبیدن به انتهای صفحه
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid2 container spacing={4}>
//           <Grid2 xs={12} sm={6} md={6}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: "1.3rem",
//                 color: "#0077b6",
//                 marginBottom: "10px",
//                 fontWeight: "bold",
//               }}
//             >
//               Your Company
//             </Typography>
//             <Typography
//               variant="body2"
//               color="textSecondary"
//               sx={{ wordWrap: "break-word" }}
//             >
//               We provide top-quality courses, blogs, and user profiles to help
//               you grow and connect with other professionals. Follow us on social
//               media or reach out if you have any questions!
//             </Typography>
//           </Grid2>

//           <Grid2 xs={12} sm={6} md={6}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: "1.3rem",
//                 color: "#0077b6",
//                 marginBottom: "10px",
//                 fontWeight: "bold",
//               }}
//             >
//               Contact Us
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Email: info@yourcompany.com <br />
//             </Typography>
//           </Grid2>
//         </Grid2>

//         <Box
//           sx={{
//             textAlign: "center",
//             padding: "10px 0",
//             marginTop: "20px",
//             backgroundColor: "#cce8f9",
//           }}
//         >
//           <Typography variant="body2" color="textSecondary">
//             &copy; 2024 Your Company. All rights reserved.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

// src/components/Footer.jsx
// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

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
              {["Home", "About Us", "Courses", "Contact"].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    display: "block",
                    mb: 1,
                    color: "#67C6E3",
                    "&:hover": { color: "#DFF5FF" },
                  }}
                >
                  {text}
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
              <strong>Email:</strong> contact@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "#DFF5FF" }}>
              <strong>Phone:</strong> (123) 456-7890
            </Typography>
            <Typography variant="body2" sx={{ color: "#DFF5FF" }}>
              <strong>Address:</strong> Research Lab., Iran University of Scince
              and Technology (IUST) , Tehran, Iran
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
