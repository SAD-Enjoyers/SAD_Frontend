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

const EnrolledStudents = ({ courseId, accessToken }) => {
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
      setLoading(true); // Set loading to true while fetching data
      try {
        // Make the API request
        const response = await fetch(
          `/api/v1/course/participants/${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Log the raw response for debugging
        console.log("Raw Response:", response);

        // Parse the JSON response
        const data = await response.json();

        // Log the parsed response for debugging
        console.log("Parsed Response Data:", JSON.stringify(data, null, 2));

        // Check if the response has the expected structure
        if (data && data.data && Array.isArray(data.data)) {
          // Map and format the participants data
          const formattedParticipants = data.data.map((p) => ({
            id: p.userId,
            name:
              p.firstName && p.lastName
                ? `${p.firstName} ${p.lastName}`
                : p.email,
            email: p.email,
            image: p.image || "/placeholder.jpg", // Fallback image if none provided
          }));

          // Log the formatted participants for debugging
          console.log(
            "Formatted Participants:",
            JSON.stringify(formattedParticipants, null, 2)
          );

          // Update state with the formatted participants
          setParticipants(formattedParticipants);
          setFilteredParticipants(formattedParticipants);
        } else {
          // Handle unexpected response structure
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        // Log errors if the request fails
        console.error("Error fetching participants:", error);
      } finally {
        // Reset the loading state
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [courseId, accessToken]);

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
        Enrolled Students
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
                src={`/api/v1/uploads/profile-images/${participant.image}`}
                alt={participant.id}
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
                  {participant.id}
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

export default EnrolledStudents;
