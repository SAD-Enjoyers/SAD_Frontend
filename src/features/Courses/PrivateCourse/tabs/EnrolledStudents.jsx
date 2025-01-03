import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Pagination,
} from "@mui/material";
import axios from "axios"; // Ensure axios is installed: npm install axios

const ParticipantStatus = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // Fetch participants from the backend
  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/course/participants/53");
        const participantsData = response.data.data.Participants.map((p) => ({
          id: p.userId,
          name:
            p.firstName && p.lastName
              ? `${p.firstName} ${p.lastName}`
              : p.email,
          email: p.email,
          image: p.image || "https://via.placeholder.com/80", // Fallback image
        }));
        setParticipants(participantsData);
        setFilteredParticipants(participantsData);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  // Filter and sort participants
  useEffect(() => {
    let result = participants.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "name") {
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
      <Grid container spacing={4}>
        {paginatedParticipants.map((participant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                src={participant.image}
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
                <Typography variant="body2" color="text.secondary">
                  {participant.email}
                </Typography>
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
