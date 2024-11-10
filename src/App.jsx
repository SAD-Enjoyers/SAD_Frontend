// src/App.jsx
import React from "react";
// import AppRoutes from "./routes.jsx"; // Use .jsx extension
import QuestionSearch from "./features/Auth/Exams/QuestionSearch/QuestionSearch";

function App() {
  return (
    <div className="App">
      {/* <AppRoutes /> */}

      <QuestionSearch />
    </div>
  );
}

export default App;
