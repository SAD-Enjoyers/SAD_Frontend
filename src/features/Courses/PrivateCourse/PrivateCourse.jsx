import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Settings, People, Comment, VideoLibrary } from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom"; // Import useLocation and useParams
import CourseContent from "./tabs/CourseContent";
import CourseSettings from "./tabs/CourseSettings";
import EnrolledStudents from "./tabs/EnrolledStudents";
import Comments from "../../../common/Comments/CommentSection";

const PrivateCourse = () => {
  const { serviceId } = useParams();
  const location = useLocation(); // Get location state
  const [selectedTab, setSelectedTab] = useState(0);
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
    const fetchCourseData = async () => {
      try {
        console.log("Fetching course data...");

        const response = await fetch(`/api/v1/course/preview/${courseId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("Fetch triggered. Response status:", response.status);

        // Log raw response to ensure the request returns something
        const responseText = await response.text();
        console.log("Raw Response Text:", responseText);

        if (!response.ok) {
          console.log("Fetch failed. Status:", response.status);
          throw new Error("Failed to fetch course data");
        }

        // Try parsing responseText manually
        const result = JSON.parse(responseText);
        console.log("API Response (Parsed):", result);

        if (result.status === "success" && result.data) {
          const fetchedCourseData = result.data.Course;
          setCourseData(fetchedCourseData);
          localStorage.setItem("courseData", JSON.stringify(fetchedCourseData));
        } else {
          throw new Error("Invalid course data");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);

        // Fallback to location.state or localStorage
        if (location.state && location.state.courseData) {
          setCourseData(location.state.courseData);
        } else {
          const storedCourseData = JSON.parse(
            localStorage.getItem("courseData")
          );
          if (storedCourseData) {
            setCourseData(storedCourseData);
          } else {
            setCourseData(null); // No data available
          }
        }
      } finally {
        setLoading(false);
      }
    };

    // Always fetch course data
    fetchCourseData();
  }, [courseId, location.state]);

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
