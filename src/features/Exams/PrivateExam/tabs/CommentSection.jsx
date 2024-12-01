import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function CommentSection() {
  return (
    <Box sx={{ padding: { xs: "10px", sm: "20px" }, textAlign: "center" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: "20px", fontSize: { xs: "1.2rem", sm: "1.8rem" } }}
      >
        Comment Section
      </Typography>
      <TextField
        label="Add a Comment"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />
      <Button variant="contained" sx={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Box>
  );
}

export default CommentSection;
