import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  CircularProgress,
  Table,
  Alert,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Chip,
  TableRow,
  Paper,
} from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const TicketUser = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Axios call to get the true/false value
    const fetchStatus = async () => {
      try {
        const response = await axios.get("/api/v1/profile/ticket-notify", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        });

        setStatus(response.data.data.status); // Assuming the API returns `{ status: true }` or `{ status: false }`
        // setStatus(true);

        // console.log(response.data.data.status); // Assuming the API returns `{ status: true }` or `{ status: false }`
      } catch (err) {
        console.error("Error fetching ticket status:", err);
        setError(true);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/v1/profile/user-tickets", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        });
        setTickets(response.data.data);
      } catch (err) {
        setError("Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      m={4}
      sx={{
        marginTop: "50px",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h2">
          Your Tickets
        </Typography>

        {/* Show loading spinner while fetching */}
        {status === null && !error && <CircularProgress size={20} />}

        {/* Show error message if API call fails */}
        {/* {error && <Typography color="error">Error!</Typography>} */}

        {/* Show green or red light based on status */}
        {status !== null && !error && (
          <Brightness1Icon
            style={{
              color: status ? "green" : "red", // Green for true, red for false
              fontSize: "1.5rem", // Adjust the size if needed
            }}
          />
        )}
      </Box>

      {status === null && !error && (
        <Box display="flex" alignItems="center" mt={2}>
          <CircularProgress size={24} sx={{ marginRight: 1 }} />
          <Typography variant="body1">Loading tickets...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Something went wrong! Please try again later.
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f1f1" }}>
            <TableRow>
              <TableCell>
                <strong>Ticket ID</strong>
              </TableCell>
              <TableCell>
                <strong>Message</strong>
              </TableCell>
              <TableCell>
                <strong>Report Time</strong>
              </TableCell>
              <TableCell>
                <strong>State</strong>
              </TableCell>
              <TableCell>
                <strong>Answer</strong>
              </TableCell>
              <TableCell>
                <strong>Expert</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticketId} hover>
                <TableCell>{ticket.ticketId}</TableCell>
                <TableCell>{ticket.message}</TableCell>
                <TableCell>
                  {new Date(ticket.reportTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.state}
                    color={
                      ticket.state === "Pending"
                        ? "error" // Red for Pending
                        : ticket.state === "Under Review"
                        ? "warning" // Orange for Under Review
                        : ticket.state === "Checked"
                        ? "success" // Green for Checked
                        : "default" // Default if no state matches
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{ticket.answer || "N/A"}</TableCell>
                <TableCell>{ticket.expertId || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketUser;
