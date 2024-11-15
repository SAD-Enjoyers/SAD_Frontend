import InfoCardsSection from "./component/InfoCardsSection.jsx";
import Footer from "../../common/Footer.jsx";
import GrowSection from "./component/GrowSection.jsx";
import LearnerOutcomes from "./component/LearnerOutcomes.jsx";
import StatsSection from "./component/StatsSection.jsx";

function Home() {
  return (
    <>
      <GrowSection />
      <InfoCardsSection />
      <StatsSection />
      <LearnerOutcomes />
    </>
  );
}

// import { useNavigate } from "react-router-dom";

//   const navigate = useNavigate();

//   const goToSignup = () => {
//     navigate("/signup");
//   };

export default Home;
