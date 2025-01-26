import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { VideoLibrary, Comment } from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom";
import Information from "./information/Information";
import Statistics from "./statistic/Statistics";
import TicketReview from "./ticketReview/ticketReview";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Default to first tab
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabContent, setTabContent] = useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    localStorage.setItem("selectedTab", newValue); // Save selected tab to localStorage
  };

  useEffect(() => {
    setLoading(false);
    setTabContent([
      {
        label: "information admin",
        content: <Information />,
        icon: <VideoLibrary />,
      },
      {
        label: "tickets",
        content: <TicketReview />,
        icon: <VideoLibrary />,
      },
      {
        label: "Statistic",
        icon: <Comment />,
        content: <Statistics />,
      },
    ]);
  }, []);

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      setSelectedTab(parseInt(savedTab, 10));
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1500px",
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
          aria-label="Private Course Navigation Tabs"
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
          <Box
            sx={{
              width: selectedTab === 2 ? "800px" : "100%",
              margin: "0 auto",
            }}
          >
            {tabContent[selectedTab]?.content}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
