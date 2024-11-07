import { useState } from 'react';
import Navbar from './component/NavBar.jsx';
import InfoCardsSection from './component/InfoCardsSection.jsx'; 
import Footer from './component/Footer.jsx';
import GrowSection from './component/GrowSection.jsx';
import LearnerOutcomes from './component/LearnerOutcomes.jsx';
import StatsSection from './component/StatsSection.jsx';

function Home() {
  const [count, setCount] = useState(0);
  const backgroundStyle = {
    backgroundImage: 'url("../public/image/cloud.png")',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Use minHeight to allow scrolling
    width: '100%',
    Opacity:0.4
  };

  return (
    <>
      <Navbar />
      <GrowSection />
      <InfoCardsSection />
      <StatsSection />
      <LearnerOutcomes />
      <Footer />
    </>
  );
}

export default Home;
