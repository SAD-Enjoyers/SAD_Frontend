import React from "react";
import { Box, Typography, Button } from "@mui/material";

function ExamPreview() {
  return (
    <Box
      sx={{
        backgroundColor: "#DFF5FF", // Lightest blue
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#5356FF", fontWeight: "bold", marginBottom: "10px" }} // Dark blue
      >
        Exam Preview
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#378CE7", marginBottom: "20px" }} // Medium blue
      >
        Preview details about the upcoming exam here.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#67C6E3", // Light blue
          "&:hover": {
            backgroundColor: "#378CE7", // Darker blue on hover
          },
          color: "white",
        }}
      >
        Start Exam
      </Button>
    </Box>
  );
}

export default ExamPreview;
