import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

// Mock Data
const mockVideos = [
  {
    video_id: "1",
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React.js, including components, state, and props.",
  },
  {
    video_id: "2",
    title: "Understanding JavaScript ES6",
    description:
      "Dive into the new features of JavaScript ES6, such as arrow functions, classes, and modules.",
  },
  {
    video_id: "3",
    title: "Building REST APIs with Node.js",
    description:
      "Learn how to build RESTful APIs using Node.js, Express, and MongoDB.",
  },
  {
    video_id: "4",
    title: "CSS Flexbox and Grid Layout",
    description:
      "Master modern CSS layout techniques, including Flexbox and Grid, to build responsive web designs.",
  },
  {
    video_id: "5",
    title: "Introduction to TypeScript",
    description:
      "Explore TypeScript and how it enhances JavaScript with static typing and other features.",
  },
  {
    video_id: "6",
    title: "Version Control with Git and GitHub",
    description:
      "Learn how to effectively use Git and GitHub for version control and collaboration in your projects.",
  },
  {
    video_id: "7",
    title: "Creating Beautiful UIs with Material-UI",
    description:
      "Design and build professional-looking user interfaces using Material-UI in React applications.",
  },
  {
    video_id: "8",
    title: "JavaScript Asynchronous Programming",
    description:
      "Master asynchronous JavaScript programming with Promises, async/await, and callbacks.",
  },
  {
    video_id: "9",
    title: "Building Real-Time Applications with WebSockets",
    description:
      "Learn how to create real-time applications with WebSockets and push notifications.",
  },
  {
    video_id: "10",
    title: "Database Design with MySQL",
    description:
      "Understand relational databases and how to design schemas for efficient querying with MySQL.",
  },
];

const CourseSettings = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const handleEdit = (video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedVideos = videos.map((video) =>
      video.video_id === editingVideo.video_id ? editingVideo : video
    );
    setVideos(updatedVideos);
    setIsModalOpen(false);
    setEditingVideo(null);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Course Settings
      </Typography>
      <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {videos.map((video) => (
          <ListItem
            key={video.video_id}
            sx={{
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              },
            }}
            secondaryAction={
              <IconButton
                edge="end"
                color="primary"
                onClick={() => handleEdit(video)}
                sx={{
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.1)" },
                }}
              >
                <Edit />
              </IconButton>
            }
          >
            <ListItemText
              primary={<Typography variant="h6">{video.title}</Typography>}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Edit Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Edit Video
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            label="Title"
            value={editingVideo?.title || ""}
            onChange={(e) =>
              setEditingVideo({ ...editingVideo, title: e.target.value })
            }
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
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
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{
              mt: 2,
              padding: "10px 0",
              bgcolor: "#378CE7",
              "&:hover": { bgcolor: "#67C6E3" },
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CourseSettings;
