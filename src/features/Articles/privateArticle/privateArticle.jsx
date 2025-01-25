import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LibraryBooks, Settings, Comment } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import { useLocation, useParams } from "react-router-dom";
import ArticleContent from "./tabs/ArticleContent";
import ArticleSettings from "./tabs/ArticleSettings";
import CommentSection from "./tabs/CommentSection";
import RegisterTicket from "./../../../common/registerTicket/registerTicket";
import { FeedbackOutlined } from "@mui/icons-material";

const PrivateArticle = (props) => {
  const { articleId } = useParams(); // Extract articleId from URL
  const location = useLocation(); // Get location state
  const [selectedTab, setSelectedTab] = useState(0);
  const [articleData, setArticleData] = useState(null);
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
    // First, check if articleData is passed via location state
    if (location.state?.articleData) {
      setArticleData(location.state.articleData);
      setLoading(false);
    } else {
      // Otherwise, try fetching the article data from localStorage
      const storedArticleData = JSON.parse(localStorage.getItem("articleData"));
      if (storedArticleData && storedArticleData.articleId === parseInt(articleId, 10)) {
        setArticleData(storedArticleData);
        setLoading(false);
      } else {
        // Handle the case if there's no matching articleData
        console.error("Article data not found or invalid articleId");
        setLoading(false);
      }
    }
  }, [location.state, articleId]);

  useEffect(() => {
    // Retrieve saved tab from localStorage
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) setSelectedTab(parseInt(savedTab, 10));
  }, []);

  const tabContent = [
    {
      label: "Article Contents",
      content: <ArticleContent articleData={articleData} accessToken={accessToken} />,
      icon: <LibraryBooks />,
    },
    {
      label: "Comments",
      content: <CommentSection articleId={articleId} accessToken={accessToken} />,
      icon: <Comment />,
    },
    {
      label: "Article Settings",
      content: <ArticleSettings articleData={articleData} accessToken={accessToken} />,
      icon: <Settings />,
    },
    {
      label: "Ticket Section",
      content: <RegisterTicket articleId={articleId} />,
      icon: <FeedbackOutlined />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#F9FAFB",
        borderRadius: "12px",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ bgcolor: "#f4f4f4", display: "flex", justifyContent: "center" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Private Article Navigation Tabs"
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
      </div>

      <div style={{ flex: 1, p: 2, overflowY: "auto" }}>
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
      </div>
    </Box>
  );
};

export default PrivateArticle;
