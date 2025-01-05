import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { PlayArrow, Delete, Edit } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const mockVideos = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React in this introductory course.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com/video1",
    sortNumber: 1,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and state management.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com/video2",
    sortNumber: 2,
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    description: "Understand React Hooks with practical examples.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com/video3",
    sortNumber: 3,
  },
  {
    id: 4,
    title: "React and TypeScript",
    description: "Build robust React apps using TypeScript.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com/video4",
    sortNumber: 4,
  },
];

const CourseContent = (courseData) => {
  const [videos, setVideos] = useState(mockVideos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  console.log("Response Data:", JSON.stringify(courseData, null, 2));
  const handlePlayVideo = (videoUrl) => {
    window.open(videoUrl, "_blank"); // Open video in a new tab or modal
  };

  const handleDelete = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  const handleUpload = () => {
    console.log("Upload a new video");
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
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedVideos = videos.map((video) =>
      video.id === editingVideo.id ? editingVideo : video
    );
    setVideos(updatedVideos);
    setIsModalOpen(false);
    setEditingVideo(null);
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
                          onClick={() => handlePlayVideo(video.url)}
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
                              <PlayArrow />
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
                              onClick={() => handleDelete(video.id)}
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 3 }}
      >
        Upload New Video
      </Button>

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
    </Box>
  );
};

export default CourseContent;
