import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { Box } from "@mui/material";

export default function Layout() {
  const location = useLocation();
  const hideNavBar = [
    "/login",
    "/signup",
    "/changePassword",
    "/fp",
    "/admin",
  ].includes(location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // حداقل ارتفاع صفحه
      }}
    >
      {!hideNavBar && <NavBar />}

      <Box sx={{ flex: "1", padding: "16px" }}>
        <main>
          <Outlet />
        </main>
      </Box>

      {!hideNavBar && <Footer />}
    </Box>
  );
}
