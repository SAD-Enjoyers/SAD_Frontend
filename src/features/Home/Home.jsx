import { useState } from 'react';
import Navbar from './component/NavBar.jsx';
import InfoCardsSection from './component/InfoCardsSection.jsx'; 
import Footer from './component/Footer.jsx';
import GrowSection from './component/GrowSection.jsx';
import LearnerOutcomes from './component/LearnerOutcomes.jsx';
import StatsSection from './component/StatsSection.jsx';

function Home() {
  return (
    <>
      <Navbar />
      <GrowSection />
      <InfoCardsSection />
      <StatsSection />
      <LearnerOutcomes />
      <Footer />
    </>
  )
}

// import { useNavigate } from "react-router-dom";

//   const navigate = useNavigate();

//   const goToSignup = () => {
//     navigate("/signup");
//   };


export default Home;
