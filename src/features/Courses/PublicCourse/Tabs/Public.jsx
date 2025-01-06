import React, { useState, useEffect } from "react";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Public(props) {
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [videoDurations, setVideoDurations] = useState({});
  const [videos, setVideos] = useState([]);

  const fetchExamData = async () => {
    const response = await fetch(
      `/api/v1/course/play-list/${props.serviceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const thumbnail = responseData.data.thumbnail;
    const updatedVideos = responseData.data.playList.map((video) => ({
      id: video.video_id,
      title: video.title,
      src: video.address,
      thumbnail,
    }));

    setVideos(updatedVideos);
  };

  useEffect(() => {
    if (props.serviceId) {
      fetchExamData();
    }
  }, [props.serviceId]);

  const handleVideoChange = (src, id) => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    setSelectedVideo(`/api/v1/uploads/course-video/${src}`);
    setSelectedVideoId(id);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{ height: "100vh", padding: 2, mt: "80px", mb: "80px" }}
    >
      <Grid2 size={4}>
        <Typography
          variant="h6"
          sx={{
            pt: "20px",
            textAlign: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          Introduction to TypeScript
        </Typography>
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            overflowY: "auto",
            borderRadius: 2,
            padding: 2,
            height: "500px",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c0c0c0",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a0a0a0",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          {videos.map((video) => (
            <Box
              key={video.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
                marginBottom: 1,
                borderRadius: 2,
                backgroundColor:
                  video.id === selectedVideoId ? "#67C6E3" : "transparent",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    video.id === selectedVideoId ? "#67C6E3" : "#DFF5FF",
                },
              }}
              onClick={() => handleVideoChange(video.src, video.id)}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "1.4rem",
                  }}
                >
                  {video.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "90px",
                  height: "90px",
                  marginLeft: 2,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={`/api/v1/uploads/service-images/${video.thumbnail}`}
                  alt={video.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Grid2>

      <Grid2
        size={8}
        sx={{
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          padding: 2,
          height: "auto",
          minHeight: "300px",
        }}
      >
        {selectedVideo ? (
          <>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                borderRadius: "18px",
              }}
            >
              <video
                key={selectedVideo}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
              >
                <source src={selectedVideo} type="video/mp4" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", fontSize: "35px" }}
              >
                {videos.find((video) => video.src === selectedVideo)?.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Box
                  component="img"
                  src="/images/profile.png"
                  alt="author"
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    ml: 1,
                  }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", ml: "20px" }}
                  >
                    {localStorage.getItem("authorCourse")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h5" color="textSecondary">
            please select a video
          </Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
