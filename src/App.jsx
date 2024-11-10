// src/App.jsx
import React from "react";
// import AppRoutes from "./routes.jsx"; // Use .jsx extension
import ExamPreview from "./features/Auth/Exams/ExamPreview/ExamPreview";

function App() {
  return (
    <div className="App">
      {/* <AppRoutes /> */}

      <ExamPreview />
    </div>
  );
}

export default App;
