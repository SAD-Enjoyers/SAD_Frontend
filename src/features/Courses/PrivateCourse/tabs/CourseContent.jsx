import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { Delete, CloudUpload } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Mock Data
const mockVideos = [
  {
    video_id: "1",
    sort_number: 1,
    title: "Introduction to React",
    video_address: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video URL
  },
  {
    video_id: "2",
    sort_number: 2,
    title: "JavaScript ES6 Features",
    video_address: "https://www.w3schools.com/html/movie.mp4", // Placeholder video URL
  },
  {
    video_id: "3",
    sort_number: 3,
    title: "Building REST APIs with Node.js",
    video_address: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video URL
  },
  {
    video_id: "4",
    sort_number: 4,
    title: "CSS Flexbox Layout",
    video_address: "https://www.w3schools.com/html/movie.mp4", // Placeholder video URL
  },
  {
    video_id: "5",
    sort_number: 5,
    title: "Version Control with Git and GitHub",
    video_address: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video URL
  },
  {
    video_id: "6",
    sort_number: 6,
    title: "Database Design with MySQL",
    video_address: "https://www.w3schools.com/html/movie.mp4", // Placeholder video URL
  },
  {
    video_id: "7",
    sort_number: 7,
    title: "TypeScript: A Supercharged JavaScript",
    video_address: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video URL
  },
  {
    video_id: "8",
    sort_number: 8,
    title: "Responsive Web Design with CSS Grid",
    video_address: "https://www.w3schools.com/html/movie.mp4", // Placeholder video URL
  },
  {
    video_id: "9",
    sort_number: 9,
    title: "Real-Time Applications with WebSockets",
    video_address: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video URL
  },
  {
    video_id: "10",
    sort_number: 10,
    title: "Introduction to Firebase for Backend Development",
    video_address: "https://www.w3schools.com/html/movie.mp4", // Placeholder video URL
  },
];

const CourseContent = () => {
  const [videos, setVideos] = useState(mockVideos);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    const updatedVideos = reorderedVideos.map((video, index) => ({
      ...video,
      sort_number: index + 1,
    }));
    setVideos(updatedVideos);
  };

  const handleDelete = (video_id) => {
    setVideos(videos.filter((video) => video.video_id !== video_id));
  };

  const handleUpload = () => {
    const newVideo = {
      video_id: `${videos.length + 1}`,
      sort_number: videos.length + 1,
      title: `New Video ${videos.length + 1}`,
      video_address: "https://www.example.com/new-video.mp4", // Replace with actual upload logic
    };
    setVideos([...videos, newVideo]);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Course Content
      </Typography>

      {/* Button aligned to the right for large screens, centered for small screens */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" }, // Center for small screens, right for larger ones
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={handleUpload}
          sx={{
            bgcolor: "#378CE7",
            "&:hover": { bgcolor: "#67C6E3" },
          }}
        >
          Upload New Video
        </Button>
      </Box>

      {/* Drag and Drop Videos List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ padding: 0 }}
            >
              {videos.map((video, index) => (
                <Draggable
                  key={video.video_id}
                  draggableId={video.video_id}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        mb: 2,
                        "&:hover": {
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                        flexDirection: { xs: "column", md: "row" }, // Stack items vertically on small screens
                        justifyContent: "space-between", // Aligns content on larger screens
                      }}
                    >
                      <Card
                        sx={{ width: "100%", boxShadow: 2, borderRadius: 2 }}
                      >
                        <CardMedia
                          component="video"
                          controls
                          src={video.video_address}
                          sx={{
                            height: { xs: 150, md: 200 }, // Adjust video size based on screen size
                            borderTopLeftRadius: 2,
                            borderTopRightRadius: 2,
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {`${video.sort_number}. ${video.title}`}
                          </Typography>
                          <ListItemText
                            secondary={video.video_address}
                            sx={{ color: "text.secondary" }}
                          />
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <IconButton
                              edge="end"
                              color="error"
                              onClick={() => handleDelete(video.video_id)}
                              sx={{
                                "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default CourseContent;
