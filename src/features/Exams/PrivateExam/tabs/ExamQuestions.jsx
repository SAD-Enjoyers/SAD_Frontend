import React from "react";
import { Box, Typography, Grid, Chip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import { motion } from "framer-motion";
import examQuestionsData from "../data/examQuestions.json"; // Import the JSON data

function ExamQuestions() {
  return (
    <Grid container spacing={3} sx={{ marginTop: "20px" }}>
      {examQuestionsData.map((question) => (
        <Grid item xs={12} key={question.id}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Stack content vertically by default
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
              },
              width: "100%",
              margin: "0 auto",
              boxSizing: "border-box",
            }}
          >
            {/* Question Title */}
            <Typography
              variant="h6"
              sx={{
                color: "#4A90E2",
                fontWeight: "bold",
                textDecoration: "none",
                marginBottom: "10px",
                lineHeight: "1.4",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              }}
            >
              <Link
                to={`/question/${question.id}`}
                style={{ textDecoration: "none" }}
              >
                {question.name}
              </Link>
            </Typography>

            {/* Question Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginBottom: "10px",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                lineHeight: "1.5",
              }}
            >
              {question.text.split(" ").slice(0, 15).join(" ")}...
            </Typography>

            {/* Subjects */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "15px",
              }}
            >
              {question.subjects.map((subject, index) => (
                <Chip
                  key={index}
                  label={subject}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    padding: "2px 8px",
                  }}
                />
              ))}
            </Box>

            {/* Score & Writer */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Align horizontally for all screen sizes
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "15px",
                borderTop: "1px solid #ddd",
                paddingTop: "10px",
              }}
            >
              {/* Score */}
              <Rating
                name="score"
                value={question.score}
                max={5}
                readOnly
                sx={{
                  fontSize: "1.2rem",
                  "& .MuiRating-iconFilled": { color: "#ffcc00" },
                }}
              />

              {/* Display number of voters */}
              <Typography
                variant="body2"
                sx={{
                  color: "#6c757d",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PeopleIcon sx={{ marginRight: "5px", fontSize: "1rem" }} />
                {question.numberOfVoters} Voters
              </Typography>

              {/* Writer Name with Motion Effects */}
              <motion.div
                whileHover={{ scale: 1.05, color: "#4A90E2" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6c757d",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  <Link
                    to={`/profile/${question.writerId}`}
                    style={{
                      color: "#6c757d",
                      textDecoration: "none",
                    }}
                  >
                    {question.writer}
                  </Link>
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ExamQuestions;
