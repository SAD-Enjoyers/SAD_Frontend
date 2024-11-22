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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation } from "react-router-dom";
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const pages = ["blogs", "courses", "questions", "profiles", "my Profile"];
  var location = useLocation();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
        background: "white", // پس‌زمینه سفید
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
              color="inherit" // رنگ آیکون سه‌خطی
            >
              <MenuIcon sx={{ color: "#378CE7" }} />{" "}
              {/* رنگ آیکون سه‌خطی به آبی */}
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
              {pages.map((page) => (
                <MenuItem
                  className="page"
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  {page == "my Profile" ? (
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center" sx={{ color: "#7D7D7D" }}>
                        {page}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography textAlign="center" sx={{ color: "#7D7D7D" }}>
                      {page}
                    </Typography>
                  )}

                  {/* رنگ خاکستری */}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* لوگو وسط در حالت موبایل و سمت چپ در حالت دسکتاپ */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
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
                  color: "#378CE7", // رنگ لوگو به آبی
                  textDecoration: "none",
                  "&:hover": {
                    color: "#378CE7", // رنگ آبی هنگام هاور
                  },
                }}
              >
                <AdbIcon sx={{ mr: 0, color: "#378CE7" }} /> HOME{" "}
                {/* رنگ لوگو به آبی */}
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
            {pages.map((page) =>
              page == "my Profile" ? (
                <Link
                  to="/profile"
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
                        color: "#378CE7", // رنگ آبی هنگام هاور
                      },
                    }} // رنگ خاکستری
                  >
                    {page}
                  </Button>
                </Link>
              ) : (
                <Button
                  className="page"
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "#7D7D7D",
                    fontSize: { md: "1rem" },
                    "&:hover": {
                      color: "#378CE7", // رنگ آبی هنگام هاور
                    },
                  }} // رنگ خاکستری
                >
                  {page}
                </Button>
              )
            )}
          </Box>

          {/* دکمه‌ها سمت راست در همه حالات */}
          <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 } }}>
            <Link to="/login">
              <Button
                sx={{
                  color: "#378CE7", // رنگ متن دکمه ورود
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
                  color: "#378CE7", // رنگ متن دکمه عضویت
                  borderColor: "#378CE7", // رنگ مرز دکمه عضویت
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  padding: { xs: "6px 12px", md: "8px 16px" },
                  minWidth: "80px",
                }}
              >
                signup
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
