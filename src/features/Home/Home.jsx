import { useState } from 'react';
import Navbar from '../../common/NavBar.jsx';
import InfoCardsSection from './component/InfoCardsSection.jsx'; 
import Footer from '../../common/Footer.jsx';
import GrowSection from './component/GrowSection.jsx';
import LearnerOutcomes from './component/LearnerOutcomes.jsx';
import StatsSection from './component/StatsSection.jsx';

function Home() {
  const app = ()=>{
    fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST', // یا 'GET', 'PUT', 'DELETE' بسته به نوع درخواست
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // سایر هدرها در صورت نیاز، مثل Authorization
      },
      body: JSON.stringify({
        // داده‌هایی که می‌خواهید به سرور ارسال کنید
        userName: 'userName',
        userPassword: 'Password',
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  

  
  return (

    <>
    {app()}
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
