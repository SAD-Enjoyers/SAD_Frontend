import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isValid, setIsValid] = useState(true); // استفاده از useState برای مدیریت isValid
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const pages = ["articles", "courses", "questions", "exams", "users"];
  const addresses = [
    "/SearchArticle",
    "/",
    "/QuestionSearch",
    "/ExamSearch",
    "/",
  ];
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (!token) {
    fetch("/api/v1/profile/private-data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsValid(false);
        } else {
          return response.json();
        }
      })
      .catch((err) => {
        setIsValid(false);
      })
      .then((profile) => {
        localStorage.setItem("profile", profile);
      });
    // }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsValid(false);
  };

  const fetchData = () => {
    if (!isValid) {
      return (
        <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 } }}>
          <Link to="/login">
            <Button
              sx={{
                color: "#378CE7",
                fontSize: { xs: "0.8rem", md: "1rem" },
                padding: { xs: "6px 12px", md: "8px 16px" },
                minWidth: "80px",
              }}
            >
              login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="outlined"
              sx={{
                color: "#378CE7",
                borderColor: "#378CE7",
                fontSize: { xs: "0.8rem", md: "1rem" },
                padding: { xs: "6px 12px", md: "8px 16px" },
                minWidth: "80px",
              }}
            >
              signup
            </Button>
          </Link>
        </Box>
      );
    } else {
      return (
        <Box ml="20px">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              alt="User Profile"
              src="/images/profile.png"
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <Menu
            sx={{ mt: 5 }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* inside jsx useNavigate */}
            <MenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/WalletPage");
              }}
            >
              Wallet
            </MenuItem>

            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setIsValid(false);
                navigate("/");
              }}
              sx={{ color: "red", fontSize: "20px" }}
            >
              LogOut
            </MenuItem>
          </Menu>
        </Box>
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 7400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: scrolled ? "-100px" : "0",
        transition: "top .3s ease",
        background: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: "48px", md: "56px" },
            paddingX: { xs: 1, md: 2 },
          }}
        >
          {/* منوی موبایل */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#378CE7" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page, index) => (
                <MenuItem
                  className="page"
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    to={addresses[index]}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography textAlign="center" sx={{ color: "#7D7D7D" }}>
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* لوگو وسط در حالت موبایل و سمت چپ در حالت دسکتاپ */}
          <Box
            sx={{
              flexGrow: 5,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                component="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#378CE7",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#378CE7",
                  },
                }}
              >
                <AdbIcon sx={{ mr: 0, color: "#378CE7" }} /> HOME
              </Typography>
            </Link>
          </Box>

          {/* صفحات در سمت راست در حالت دسکتاپ */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              marginRight: "auto",
            }}
          >
            {pages.map((page, index) => (
              <Link
                to={addresses[index]}
                style={{ textDecoration: "none" }}
                key={page}
              >
                <Button
                  className="page"
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "#7D7D7D",
                    fontSize: { md: "1rem" },
                    "&:hover": {
                      color: "#378CE7",
                    },
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {fetchData()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
