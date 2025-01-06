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
import Public from "./Tabs/Public";
import CommentSection from "../../../common/Comments/CommentSection";
import CoursePreview from "./Tabs/CoursePreview";

const PublicCourse = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0); // Default to first tab
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabContent, setTabContent] = useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    localStorage.setItem("selectedTab", newValue); // Save selected tab to localStorage
  };

  useEffect(() => {
    if (location.state && location.state.courseData) {
      setCourseData(location.state.courseData);
      setLoading(false);
      setTabContent([
        {
          label: "information course",
          content: (
            <CoursePreview serviceId={location.state.courseData.serviceId} />
          ),
          icon: <VideoLibrary />,
        },
        {
          label: "Enrolled Students",
          content: <Public serviceId={location.state.courseData.serviceId} />,
          icon: <VideoLibrary />,
        },
        {
          label: "Comment Section",
          icon: <Comment />,
          content: (
            <CommentSection serviceId={location.state.courseData.serviceId} />
          ),
        },
      ]);
    } else {
      const storedCourseData = JSON.parse(localStorage.getItem("courseData"));
      if (
        storedCourseData &&
        storedCourseData.courseId === parseInt(courseId)
      ) {
        setCourseData(storedCourseData);
        setLoading(false);
      } else {
        console.error("Course data not found or invalid courseId");
        setLoading(false);
      }
    }
  }, [location.state, courseId]);

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

export default PublicCourse;
