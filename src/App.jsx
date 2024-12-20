import React from "react";
import AppRoutes from "./routes.jsx"; // Use .jsx extension
import { BrowserRouter } from 'react-router-dom';
import PrivateArticle from "./features/Articles/privateArticle/privateArticle.jsx";
import PrivateExam from "./features/Exams/PrivateExam/PrivateExam.jsx";
import PublicExam from "./features/Exams/PublicExam/PublicExam.jsx";
import PublicArticle from "./features/Articles/publicArticle/publicArticle.jsx";
import WalletPage from "./features/Wallet/Wallet.jsx";

// import PrivateProfile from "./features/Home/PrivateProfile.jsx";
function App() {
  return (
    <div className="App">
      {/* <AppRoutes /> */}
      <BrowserRouter>
        <WalletPage />
      </BrowserRouter>

    </div>

  );
}

export default App;
