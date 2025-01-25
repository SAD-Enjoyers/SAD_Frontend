import React from "react";
import AppRoutes from "./routes.jsx"; // Use .jsx extension
import ChartPage from "./features/Admin/adminPanel.jsx";
// import PrivateProfile from "./features/Home/PrivateProfile.jsx";
function App() {
  return (
    <div className="App" margin={0}>
      <ChartPage />
    </div>
  );
}

export default App;
