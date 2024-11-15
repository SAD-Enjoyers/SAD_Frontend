import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";

export default function Layout() {
  const location = useLocation();
  const hideNavBar = ["/login", "/signup"].includes(location.pathname);

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
