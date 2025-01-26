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
import { useNavigate } from "react-router-dom";

const AdminToken = localStorage.getItem("token");
const AdminRole = localStorage.getItem("role");

const TicketReview = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updateData, setUpdateData] = useState({ state: "", answer: "" });
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceState, setServiceState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketResponse = await axios.get("api/v1/admin/tickets", {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
            "Content-Type": "application/json",
            "x-role": AdminRole,
          },
        });

        const tickets = ticketResponse.data.data;

        // Fetch service information for each serviceId in parallel
        const servicePromises = tickets.map((ticket) =>
          axios
            .get(
              `/api/v1/admin/service-information?serviceId=${ticket.serviceId}`,
              {
                headers: {
                  Authorization: `Bearer ${AdminToken}`,
                  "Content-Type": "application/json",
                  "x-role": AdminRole,
                },
              }
            )
            .then((res) => ({
              serviceId: ticket.serviceId,
              activityStatus: res.data.data.activityStatus,
              serviceType: res.data.data.serviceType,
            }))
            .catch((err) => {
              console.error(
                `Error fetching service info for ID ${ticket.serviceId}:`,
                err
              );
              return {
                serviceId: ticket.serviceId,
                activityStatus: "Unknown",
                serviceType: "Unknown",
              };
            })
        );

        const serviceData = await Promise.all(servicePromises);

        // Map service data back to tickets
        const mergedData = tickets.map((ticket) => {
          const service =
            serviceData.find((s) => s.serviceId === ticket.serviceId) || {};
          return {
            ...ticket,
            activityStatus: service.activityStatus,
            serviceType: service.serviceType,
          };
        });

        setTickets(mergedData);
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
  const handleReviewPage = async (serviceType, serviceId, userId) => {
    try {
      // Fetch userToken and userRole from the backend
      const reviewResponse = await fetch(
        `/api/v1/admin/get-user-session?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AdminToken}`,
            "Content-Type": "application/json",
            "x-role": AdminRole,
          },
        }
      );

      if (!reviewResponse.ok) {
        throw new Error("Failed to fetch user information.");
      }

      const responseData = await reviewResponse.json(); // Parse the JSON response

      // Log the full response to see its structure
      console.log("Full response from backend:", responseData);

      console.log(responseData.data.role);
      console.log(responseData.data.token);

      const { token, role } = responseData.data;

      console.log("Token and Role fetched successfully:", { token, role });

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      // Navigate to the appropriate page based on serviceType
      switch (serviceType) {
        case "Course":
          navigate("/publicCourse", {
            state: {
              courseData: { serviceId },
              userToken: token,
              userRole: role,
            },
          });
          break;
        case "Exam":
          navigate("/publicExam", {
            state: {
              examData: { serviceId },
              userToken: token,
              userRole: role,
            },
          });
          break;
        case "Article":
          navigate("/publicArticle", {
            state: {
              articleData: { serviceId },
              userToken: token,
              userRole: role,
            },
          });
          break;
        default:
          console.error("Unsupported service type:", serviceType);
      }
    } catch (error) {
      console.error("Error fetching user information:", error.message);
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
            Authorization: `Bearer ${AdminToken}`,
            "Content-Type": "application/json",
            "x-role": AdminRole,
          },
        }
      );

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

  const handleServiceStateDialog = (ticket) => {
    setSelectedTicket(ticket);
    setServiceDialog(true);
  };

  const handleServiceStateUpdate = async () => {
    if (!selectedTicket) return;
    console.log(selectedTicket.serviceId);
    console.log(serviceState);
    console.log(AdminToken);
    console.log(AdminRole);

    try {
      const response = await axios.put(
        `api/v1/admin/change-service-state?serviceId=${selectedTicket.serviceId}&activityStatus=${serviceState}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
            "Content-Type": "application/json",
            "x-role": AdminRole,
          },
        }
      );

      console.log("Service state update successful:", response.data.message);
    } catch (error) {
      console.error("Error updating service state:", error);
    } finally {
      setServiceDialog(false);
      setSelectedTicket(null);
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
    { field: "activityStatus", headerName: "Activity Status", width: 150 },
    { field: "serviceType", headerName: "Service Type", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(params.row)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleServiceStateDialog(params.row)}
            sx={{ ml: 2 }}
          >
            Change Service State
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handleReviewPage(
                params.row.serviceType,
                params.row.serviceId,
                params.row.userId
              )
            }
            sx={{ ml: 2 }}
          >
            Review Page
          </Button>
        </>
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

      {/* Ticket Update Dialog */}
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

      {/* Service State Update Dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)}>
        <DialogTitle>Change Service State</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="service-state-select-label">
              Service State
            </InputLabel>
            <Select
              labelId="service-state-select-label"
              value={serviceState}
              onChange={(e) => setServiceState(e.target.value)}
            >
              <MenuItem value="Suspended">Suspended</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Passive">Passive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleServiceStateUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketReview;
