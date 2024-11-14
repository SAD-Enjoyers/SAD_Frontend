import { useState } from "react";
import NavBar from "../../common/NavBar.jsx";
import InfoCardsSection from "./component/InfoCardsSection.jsx";
import Footer from "../../common/Footer.jsx";
import GrowSection from "./component/GrowSection.jsx";
import LearnerOutcomes from "./component/LearnerOutcomes.jsx";
import StatsSection from "./component/StatsSection.jsx";

function Home() {
  return (
    <>
      <NavBar />
      <GrowSection />
      <InfoCardsSection />
      <StatsSection />
      <LearnerOutcomes />
      <Footer />
    </>
  );
}

// import { useNavigate } from "react-router-dom";

//   const navigate = useNavigate();

//   const goToSignup = () => {
//     navigate("/signup");
//   };

export default Home;
