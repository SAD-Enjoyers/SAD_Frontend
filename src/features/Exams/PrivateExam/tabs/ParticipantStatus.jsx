import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
import {
  Star as StarIcon,
  Grade as GradeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from "@mui/icons-material";

const ParticipantStatus = ({ examData, accessToken }) => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `/api/v1/exam/participants/${examData.serviceId}`,
          {
            method: "GET", // Specify the method here
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Log raw response details
        console.log("Raw Response Object:", response);

        // Parse JSON data
        const data = await response.json();

        // Log parsed data
        console.log("Parsed Response Data:", JSON.stringify(data, null, 2));

        if (data.status === "success") {
          const formattedParticipants = data.data.map((p) => ({
            id: p.userId,
            name: p.firstName,
            image: p.image || "/placeholder.jpg",
            score: p.examResult?.examScore || 0,
            grade: p.examResult?.passed || "N/A",
            answeredRight: p.examResult?.rightAnswers || 0,
            answeredWrong: p.examResult?.wrongAnswers || 0,
            notAnswered: p.examResult?.emptyAnswers || "All",
          }));

          // Log formatted participants
          console.log(
            "Formatted Participants:",
            JSON.stringify(formattedParticipants, null, 2)
          );

          setParticipants(formattedParticipants);
          setFilteredParticipants(formattedParticipants);
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    let result = participants.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "score") {
      result.sort((a, b) => b.score - a.score);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredParticipants(result);
  }, [search, sortBy, participants]);

  const handlePagination = (event, value) => setCurrentPage(value);

  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!participants.length) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        No participants found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#F9FAFB",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Participant Status
      </Typography>

      {/* Search and Sorting */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search participants"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, marginRight: "16px" }}
        />
        <TextField
          select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ width: "150px" }}
          label="Sort By"
        >
          <MenuItem value="score">Score</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </TextField>
      </Box>

      <Grid container spacing={4}>
        {paginatedParticipants.map((participant) => (
          <Grid item xs={12} sm={6} md={4} key={participant.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                textAlign: "center",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Avatar
                src={`/api/v1/uploads/profile-images/${participant.image}`}
                alt={participant.name}
                sx={{ width: 80, height: 80, marginBottom: "16px" }}
              />
              <CardContent
                sx={{
                  width: "100%",
                  padding: 0,
                  "&:last-child": { paddingBottom: 0 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "8px" }}
                >
                  {participant.name}
                </Typography>
                <Divider sx={{ marginBottom: "16px" }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  <StarIcon color="primary" sx={{ marginRight: "8px" }} />
                  <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
                    <strong>Score:</strong> {participant.score}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  <GradeIcon color="secondary" sx={{ marginRight: "8px" }} />
                  <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
                    <strong>Grade:</strong> {participant.grade}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "4px",
                  }}
                >
                  <CheckCircleIcon
                    color="success"
                    sx={{ marginRight: "8px" }}
                  />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                    <strong>Right Answers:</strong> {participant.answeredRight}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "4px",
                  }}
                >
                  <CancelIcon color="error" sx={{ marginRight: "8px" }} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                    <strong>Wrong Answers:</strong> {participant.answeredWrong}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HourglassEmptyIcon
                    color="action"
                    sx={{ marginRight: "8px" }}
                  />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                    <strong>Not Answered:</strong> {participant.notAnswered}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredParticipants.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePagination}
        />
      </Box>
    </Box>
  );
};

export default ParticipantStatus;
