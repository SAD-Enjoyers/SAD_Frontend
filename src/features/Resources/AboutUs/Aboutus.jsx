import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
const AboutUs = () => {
    return (
      <Box sx={{ width: "100%", margin: "0px" }}>
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: "#67C6E3",
          }}
        >
          <Container>
            <Grid container alignItems="center" spacing={4}>
              {/* Text Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  COACHING CENTER
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    lineHeight: "1.2",
                  }}
                >
                  Teaching and Learning Center
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Further your professional development with online and on-site
                  courses, webinars, and teaching materials.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#1976d2",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  Contact Us
                </Button>
              </Grid>
  
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={dswaminImage} 
                  alt="Teaching Center"
                  sx={{
                    width: "100%",
                    height: "600px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>


        </Box>
  );
};
        export default AboutUs;
