import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LibraryBooks, Settings, People, Comment } from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom"; // Import useLocation and useParams
import ExamQuestions from "./tabs/ExamQuestions";
import Comments from "../../../common/Comments/CommentSection";
import ExamSettings from "./tabs/ExamSettings";
import ParticipantStatus from "./tabs/ParticipantStatus";

const PrivateExam = () => {
  const { serviceId } = useParams(); // Extract serviceId from URL
  const location = useLocation(); // Get location state
  const [selectedTab, setSelectedTab] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [examData, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const accessToken = localStorage.getItem("token");

  // Handle tab changes and persist the selected tab
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    localStorage.setItem("selectedTab", newValue); // Save selected tab to localStorage
  };

  useEffect(() => {
    // First, check if examData is passed via location state
    if (location.state && location.state.examData) {
      setExamResult(location.state.examData);
      setLoading(false);
    } else {
      // Otherwise, try fetching the exam data from localStorage
      const storedExamData = JSON.parse(localStorage.getItem("examData"));
      if (storedExamData && storedExamData.serviceId === parseInt(serviceId)) {
        setExamResult(storedExamData);
        setLoading(false);
      } else {
        // Handle the case if there's no matching examData
        console.error("Exam data not found or invalid serviceId");
        setLoading(false);
      }
    }
  }, [location.state, serviceId]);

  useEffect(() => {
    // Retrieve saved tab from localStorage
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) setSelectedTab(parseInt(savedTab, 10));
  }, []);

  const tabContent = [
    {
      label: "Exam Questions",
      content: <ExamQuestions examData={examData} accessToken={accessToken} />,
      icon: <LibraryBooks />,
    },
    {
      label: "Exam Settings",
      content: <ExamSettings examData={examData} accessToken={accessToken} />,
      icon: <Settings />,
    },
    {
      label: "Participant Status",
      content: participants.length ? (
        <ParticipantStatus
          participants={participants}
          accessToken={accessToken}
        />
      ) : (
        <Box>No participants yet.</Box>
      ),
      icon: <People />,
    },
    {
      label: "Comment Section",
      content: <Comments serviceId={serviceId} />,
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
              aria-label={`Tab for ${tab.label}`}
              sx={{ minWidth: isMobile ? 50 : 120, padding: isMobile ? 0 : 2 }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          tabContent[selectedTab]?.content
        )}
      </Box>
    </Box>
  );
};

export default PrivateExam;
