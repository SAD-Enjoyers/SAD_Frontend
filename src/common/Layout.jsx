import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const location = useLocation();
  const hideNavBar = ["/login", "/signup", "/changePassword", "/fp"].includes(
    location.pathname
  );

  return (
    <>
      {!hideNavBar && <NavBar />}
      <main>
        <Outlet />
      </main>
      {!hideNavBar && <Footer />}
    </>
  );
}
