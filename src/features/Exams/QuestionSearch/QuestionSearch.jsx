import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import QuestionsTab from "./QuestionsTab";
import ExamsTab from "./ExamsTab";

function QuestionSearch() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "50px", // Adjusted margin for a more spacious layout
        padding: "20px",
        backgroundColor: "#F9FAFB", // Light background for a clean look
        borderRadius: "12px", // Rounded corners
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadows for a floating effect
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "#4A90E2" } }} // Updated accent color
        textColor="primary"
      >
        <Tab
          label="Questions"
          style={{
            color: activeTab === 0 ? "#4A90E2" : "#9B9B9B", // Updated tab color
            fontWeight: activeTab === 0 ? "bold" : "normal",
          }}
        />
        <Tab
          label="Exams"
          style={{
            color: activeTab === 1 ? "#4A90E2" : "#9B9B9B",
            fontWeight: activeTab === 1 ? "bold" : "normal",
          }}
        />
      </Tabs>

      {activeTab === 0 && <QuestionsTab />}
      {activeTab === 1 && <ExamsTab />}
    </Box>
  );
}

export default QuestionSearch;
