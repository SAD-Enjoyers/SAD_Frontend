import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5", // پس‌زمینه
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: "#3498db", // رنگ اسپینر
          mb: 2, // فاصله پایین
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: "#555",
          fontWeight: "bold",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
