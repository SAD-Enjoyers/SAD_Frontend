import React from "react";
import AppRoutes from "./routes.jsx"; // Use .jsx extension
import ValetPage from "./features/Valet/ValetPage.jsx";
// import PrivateProfile from "./features/Home/PrivateProfile.jsx";
function App() {
  return (
    <div className="App">
      {/* <AppRoutes /> */}
      <ValetPage />
      
    </div>
    
  );
}

export default App;
