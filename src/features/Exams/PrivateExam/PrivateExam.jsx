import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import { LibraryBooks, Settings, People, Comment } from "@mui/icons-material"; // Importing icons
import ExamQuestions from "./tabs/ExamQuestions";
import CommentSection from "./tabs/CommentSection";
import ExamSettings from "./tabs/ExamSettings";
import ParticipantStatus from "./tabs/ParticipantStatus";

const PrivateExam = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [participants, setParticipants] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if mobile device
  const accessToken = localStorage.getItem("token");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Simulating fetching participants (you can replace this with an API call)
  useEffect(() => {
    setTimeout(() => {
      setParticipants([
        {
          name: "John Doe",
          score: 90,
          grade: "A",
          answeredRight: 45,
          answeredWrong: 5,
          notAnswered: 0,
          image: "",
        },
        {
          name: "Jane Smith",
          score: 85,
          grade: "B",
          answeredRight: 40,
          answeredWrong: 10,
          notAnswered: 0,
          image: "",
        },
        {
          name: "Tom Brown",
          score: 75,
          grade: "C",
          answeredRight: 30,
          answeredWrong: 15,
          notAnswered: 0,
          image: "",
        },
        {
          name: "Emily White",
          score: 88,
          grade: "B",
          answeredRight: 44,
          answeredWrong: 6,
          notAnswered: 0,
          image: "",
        },
        // Add more participants as needed
      ]);
    }, 1000);
  }, []);

  const tabContent = [
    {
      label: "Exam Questions",
      content: <ExamQuestions />,
      icon: <LibraryBooks />, // Icon for Exam Questions tab
    },
    {
      label: "Exam Settings",
      content: <ExamSettings serviceId={1} />,
      icon: <Settings />, // Icon for Exam Settings tab
    },
    {
      label: "Participant Status",
      content: <ParticipantStatus participants={participants} />, // Pass participants to ParticipantStatus
      icon: <People />, // Icon for Participant Status tab
    },
    {
      label: "Comment Section",
      content: <CommentSection />,
      icon: <Comment />, // Icon for Comment Section tab
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px", // Matching the width of QuestionSearch component
        margin: "50px auto", // Consistent margin with QuestionSearch
        padding: "20px", // Padding to match the layout
        backgroundColor: "#F9FAFB", // Light background for a clean look
        borderRadius: "12px", // Rounded corners
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadows for a floating effect
      }}
    >
      {/* Tab Navigation */}
      <Box
        sx={{ bgcolor: "#f4f4f4", display: "flex", justifyContent: "center" }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Private Exam Navigation Tabs"
          variant={isMobile ? "scrollable" : "standard"} // Scrollable tabs on mobile
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            paddingX: isMobile ? 1 : 0, // Reduce padding on mobile for better spacing
          }}
        >
          {tabContent.map((tab, index) => (
            <Tab
              key={index}
              label={isMobile ? "" : tab.label} // Hide label on mobile to keep the UI compact
              icon={tab.icon} // Adding the icon for each tab
              iconPosition="start"
              sx={{
                minWidth: isMobile ? 50 : 120, // Set a smaller tab size for mobile
                padding: isMobile ? 0 : 2, // Reduce padding on mobile for compact view
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {tabContent[selectedTab]?.content}
      </Box>
    </Box>
  );
};

export default PrivateExam;
