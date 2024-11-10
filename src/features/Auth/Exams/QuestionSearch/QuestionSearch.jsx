// src/features/Home/QuestionSearch.jsx
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Layout from "../../../../common/Layout"; // Import Layout component

function QuestionSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Layout>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: "#DFF5FF", // Lightest blue
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "20px", // Optional: adds some space from the top
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search questions"
            sx={{
              width: "200px",
              "& .MuiOutlinedInput-root": {
                color: "#5356FF", // Dark blue for text
                "& fieldset": {
                  borderColor: "#378CE7", // Medium blue for border
                },
                "&:hover fieldset": {
                  borderColor: "#5356FF", // Darker blue on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5356FF", // Dark blue when focused
                },
              },
            }}
          />
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
            Search
          </Button>
        </Box>
      </Layout>
    </div>
  );
}

export default QuestionSearch;
