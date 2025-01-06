import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Modal,
  Snackbar,
  Alert,
  TextField,
  Divider,
  FormControl,
} from "@mui/material";
import { Download, Delete, Edit } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import {
  Delete as DeleteIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CourseContent = ({ courseData, accessToken }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success"); // "success", "error", "warning", "info"
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null); // Store the video to delete

  const [videos, setVideos] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  // console.log("Response Data:", JSON.stringify(courseData, null, 2));

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `/api/v1/course/play-list/${courseData.serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add token to the Authorization header
            },
          }
        );

        // console.log(
        //   "Raw Response Data:",
        //   JSON.stringify(response.data, null, 2)
        // );

        // Extract the playlist and map it to match the expected format
        const { playList } = response.data.data;

        const formattedVideos = playList.map((video) => ({
          id: video.video_id,
          title: video.title,
          description: video.v_description,
          thumbnail: video.address
            ? `/api/v1/uploads/service-images/${response.data.data.thumbnail}`
            : null, // Replace with correct thumbnail path if needed
          url: video.address, // Replace with correct video URL path if needed
          sortNumber: video.sort_number,
        }));

        // console.log("Formatted Videos:", formattedVideos); // Log the formatted data

        setVideos(formattedVideos); // Set the formatted data to state
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [courseData.serviceId, accessToken]);

  const handlePlayVideo = (videoUrl) => {
    // Open the video in a new tab/window
    window.open(`/api/v1/uploads/course-video/${videoUrl}`, "_blank");
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video); // Store video data for deletion
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const handleDelete = async (videoId, sortNumber) => {
    try {
      const payload = {
        serviceId: courseData.serviceId, // Assuming courseData contains serviceId
        videoId: videoId,
        sortNumber: sortNumber,
      };

      // Send the request to delete the video
      await axios.delete(`/api/v1/course/delete-video`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: payload, // Sending the payload as the body of the delete request
      });

      // Filter out the deleted video from the state
      setVideos(videos.filter((video) => video.id !== videoId));

      // Display success message
      setSeverity("success");
      setSnackbarMessage("Video deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting video:", error);

      // Display error message
      setSeverity("error");
      setSnackbarMessage("Failed to delete video. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleSaveReorder = async () => {
    const reorderedVideos = videos.map((video) => ({
      videoId: video.id,
      sortNumber: video.sortNumber,
    }));

    const data = {
      serviceId: courseData.serviceId, // Use the serviceId from your courseData
      reorderedVideos,
    };

    try {
      // Send PUT request to the backend to update video order
      const response = await axios.put("/api/v1/course/reorder-video", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
      });
      console.log("Videos reordered successfully:", response.data);

      // Show success message
      setSnackbarMessage("Videos reordered successfully!");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error reordering videos:", error);

      // Show error message
      setSnackbarMessage("Failed to reorder videos. Please try again.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    // Update sort numbers
    reorderedVideos.forEach((video, index) => {
      video.sortNumber = index + 1;
    });

    setVideos(reorderedVideos);

    // Send the reordered videos to the backend
    handleSaveReorder();
  };

  if (isLoading) {
    return <Typography>Loading videos...</Typography>;
  }

  if (isError) {
    return (
      <Typography>Error loading videos. Please try again later.</Typography>
    );
  }

  const handleUpload = () => {
    console.log("Upload a new video");
  };
  const handleEdit = (video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };
  const handleSave = async () => {
    try {
      const payload = {
        serviceId: courseData.serviceId,
        videoId: editingVideo.id,
        title: editingVideo.title,
        description: editingVideo.description,
      };

      await axios.put(`/api/v1/course/edit-video`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const updatedVideos = videos.map((video) =>
        video.id === editingVideo.id ? editingVideo : video
      );
      setVideos(updatedVideos);
      setIsModalOpen(false);
      setEditingVideo(null);

      // Display success message
      setSeverity("success");
      setSnackbarMessage("Video updated successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating video:", error);

      // Display error message
      setSeverity("error");
      setSnackbarMessage("Failed to update video details. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Course Videos
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <Grid
              container
              spacing={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {videos.map((video, index) => (
                <Draggable
                  key={video.id}
                  draggableId={String(video.id)}
                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={video.thumbnail}
                          alt={video.title}
                          sx={{ cursor: "pointer" }}
                          onClick={() => handlePlayVideo(video.url)} // Open in a new window
                        />

                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handlePlayVideo(video.url)}
                          >
                            {video.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {video.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Order: {video.sortNumber}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 1,
                            }}
                          >
                            <IconButton
                              aria-label="play"
                              color="primary"
                              onClick={() => handlePlayVideo(video.url)}
                            >
                              <Download />
                            </IconButton>
                            <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={() => handleEdit(video)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => handleDeleteClick(video)} // Open confirmation dialog
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#5356FF" }}
          >
            Edit Video
          </Typography>
          <Divider sx={{ mb: 3, borderColor: "#DFF5FF" }} />
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              value={editingVideo?.title || ""}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, title: e.target.value })
              }
              fullWidth
              variant="outlined"
              required
              error={!editingVideo?.title}
              helperText={!editingVideo?.title ? "Title is required" : ""}
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": { color: "#378CE7" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#67C6E3" },
                  "&:hover fieldset": { borderColor: "#5356FF" },
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              value={editingVideo?.description || ""}
              onChange={(e) =>
                setEditingVideo({
                  ...editingVideo,
                  description: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              required
              error={!editingVideo?.description}
              helperText={
                !editingVideo?.description ? "Description is required" : ""
              }
              multiline
              rows={4}
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": { color: "#378CE7" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#67C6E3" },
                  "&:hover fieldset": { borderColor: "#5356FF" },
                },
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{
              mt: 3,
              padding: "12px 0",
              backgroundColor: "#378CE7",
              "&:hover": { backgroundColor: "#67C6E3" },
              fontWeight: "bold",
              boxShadow: 2,
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)} // Close dialog when clicked outside
      >
        <DialogTitle>Are you sure you want to delete this video?</DialogTitle>
        <DialogContent>
          <Typography>Title: {videoToDelete?.title}</Typography>
          <Typography>Description: {videoToDelete?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmDialog(false)} // Close dialog without deleting
            color="primary"
            startIcon={<CancelIcon />} // Add Cancel icon
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(videoToDelete.id, videoToDelete.sortNumber); // Proceed with deletion
              setOpenConfirmDialog(false); // Close dialog
            }}
            color="error"
            startIcon={<DeleteIcon />} // Add Delete icon
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseContent;
