import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const TicketReview = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updateData, setUpdateData] = useState({ state: "", answer: "" });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("api/v1/admin/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-role": role,
          },
        });
        setTickets(response.data.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const renderState = (state) => {
    switch (state) {
      case "Pending":
        return <Chip label="Pending" color="primary" />;
      case "Under review":
        return <Chip label="Under review" color="warning" />;
      case "Checked":
        return <Chip label="Checked" color="success" />;
      default:
        return <Chip label="Unknown" />;
    }
  };

  const handleOpenDialog = (ticket) => {
    setSelectedTicket(ticket);
    setUpdateData({ state: ticket.state || "", answer: ticket.answer || "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
  };

  const handleUpdate = async () => {
    if (!selectedTicket) return;

    try {
      const response = await axios.put(
        `api/v1/admin/update-ticket`,
        {
          ticketId: selectedTicket.ticketId,
          state: updateData.state,
          answer: updateData.answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-role": role,
          },
        }
      );

      // Update the tickets list with the modified ticket
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.ticketId === selectedTicket.ticketId
            ? { ...ticket, state: updateData.state, answer: updateData.answer }
            : ticket
        )
      );

      console.log("Update successful:", response.data.message);
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      handleCloseDialog();
    }
  };

  const columns = [
    { field: "ticketId", headerName: "Ticket ID", width: 100 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "serviceId", headerName: "Service ID", width: 100 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "reportTime", headerName: "Report Time", width: 200 },
    {
      field: "state",
      headerName: "State",
      width: 150,
      renderCell: (params) => renderState(params.value),
    },
    {
      field: "answer",
      headerName: "Answer",
      width: 200,
      renderCell: (params) =>
        params.value ? (
          <Typography>{params.value}</Typography>
        ) : (
          <Typography color="error">No Answer</Typography>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog(params.row)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ margin: "50px", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Ticket Review
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={tickets.map((ticket) => ({ id: ticket.ticketId, ...ticket }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Ticket Information</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="state-select-label">Ticket Status</InputLabel>
                <Select
                  labelId="state-select-label"
                  value={updateData.state}
                  onChange={(e) =>
                    setUpdateData((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Under review">Under Review</MenuItem>
                  <MenuItem value="Checked">Checked</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Response"
                fullWidth
                margin="dense"
                value={updateData.answer}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, answer: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketReview;
