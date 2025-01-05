import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LibraryBooks,
  Settings,
  People,
  Comment,
  VideoLibrary,
} from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom"; // Import useLocation and useParams
import CourseContent from "./tabs/CourseContent";
import CourseSettings from "./tabs/CourseSettings";
import EnrolledStudents from "./tabs/EnrolledStudents";
import Comments from "../../../common/Comments/CommentSection";

const PrivateCourse = () => {
  const { serviceId } = useParams();
  const location = useLocation(); // Get location state
  const [selectedTab, setSelectedTab] = useState(0);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const accessToken = localStorage.getItem("token");
  const courseId = serviceId;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    localStorage.setItem("selectedTab", newValue); // Save selected tab to localStorage
  };

  useEffect(() => {
    if (location.state && location.state.courseData) {
      setCourseData(location.state.courseData);
      setLoading(false);
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
    if (savedTab) setSelectedTab(parseInt(savedTab, 10));
  }, []);

  const tabContent = [
    {
      label: "Course Content",
      content: (
        <CourseContent courseData={courseData} accessToken={accessToken} />
      ),
      icon: <VideoLibrary />,
    },
    {
      label: "Course Settings",
      content: (
        <CourseSettings courseData={courseData} accessToken={accessToken} />
      ),
      icon: <Settings />,
    },
    {
      label: "Enrolled Students",
      content: (
        <EnrolledStudents courseData={courseData} accessToken={accessToken} />
      ),
      icon: <People />,
    },
    {
      label: "Comment Section",
      content: <Comments serviceId={courseId} />,
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
          tabContent[selectedTab]?.content
        )}
      </Box>
    </Box>
  );
};

export default PrivateCourse;
