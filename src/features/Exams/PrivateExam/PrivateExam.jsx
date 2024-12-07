import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import { LibraryBooks, Settings, People, Comment } from "@mui/icons-material"; // Importing icons
import { useLocation } from "react-router-dom"; // Import useLocation hook
import ExamQuestions from "./tabs/ExamQuestions";
import CommentSection from "./tabs/CommentSection";
import ExamSettings from "./tabs/ExamSettings";
import ParticipantStatus from "./tabs/ParticipantStatus";

const PrivateExam = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [examData, setExamResult] = useState(null); // State to hold the exam result
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation(); // Get the location object to access passed state

  const accessToken = localStorage.getItem("token");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    // Check if exam results are available in location state
    if (location.state && location.state.examData) {
      setExamResult(location.state.examData); // Set the exam results if available
      console.log(
        "Exam data received from the other page:",
        location.state.examData
      );
    } else {
      // Handle loading exam data if state is not passed
      setTimeout(() => {
        setParticipants([
          /* Simulated participants data */
        ]);
        setExamResult({
          serviceId: 1,
          name: "Sample Exam",
          description: "This is a sample exam for demonstration.",
          // Add more default exam details if necessary
        });
      }, 1000);
    }
  }, [location.state]);

  useEffect(() => {
    // Log the examData data whenever it changes
    if (examData) {
      console.log("Current Exam Data (examData):", examData);
    }
  }, [examData]);

  const tabContent = [
    {
      label: "Exam Questions",
      content: <ExamQuestions examData={examData} />, // Pass examData to tab
      icon: <LibraryBooks />,
    },
    {
      label: "Exam Settings",
      content: (
        <ExamSettings
          examData={examData}
          serviceId={examData?.serviceId || 1}
          accessToken={accessToken}
        />
      ), // Dynamically pass serviceId
      icon: <Settings />,
    },
    {
      label: "Participant Status",
      content: <ParticipantStatus participants={participants} />,
      icon: <People />,
    },
    {
      label: "Comment Section",
      content: <CommentSection />,
      icon: <Comment />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#F9FAFB",
        borderRadius: "12px",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{ bgcolor: "#f4f4f4", display: "flex", justifyContent: "center" }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Private Exam Navigation Tabs"
          variant={isMobile ? "scrollable" : "standard"}
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            paddingX: isMobile ? 1 : 0,
          }}
        >
          {tabContent.map((tab, index) => (
            <Tab
              key={index}
              label={isMobile ? "" : tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ minWidth: isMobile ? 50 : 120, padding: isMobile ? 0 : 2 }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {tabContent[selectedTab]?.content}
      </Box>
    </Box>
  );
};

export default PrivateExam;
