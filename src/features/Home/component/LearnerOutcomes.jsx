import React from "react";
import { Typography, Button, Box, Grid2 } from "@mui/material";

// images
import blog from '../../../assets/images/blog2.jpg'
import quiz from '../../../assets/images/quiz.png'
import cooperation from '../../../assets/images/cooperation.jpg'

function LearnerOutcomes() {
  return (
    <>
    <Box sx={{ backgroundColor: "#FFFFFF", padding: "40px"}}>
      <Box sx={{ position: "relative", width: "250px", height: "150px", margin: "0 auto" }}>
        {/* تصویر اول */}
        <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translate(-90%, 0)" }}>
          <img src={blog} alt="Learners working" style={{ width: "300px", borderRadius: "8px" }} />
        </Box>

        {/* تصویر دوم */}
        <Box sx={{ position: "absolute", top: "130px", right: '-60px' }}>
          <img src={quiz} alt="Mentorship" style={{ width: "200px", borderRadius: "8px" }} />
        </Box>

        {/* تصویر سوم */}
        <Box sx={{ position: "absolute", top: "250px", left: "50%", transform: "translate(-90%, 0)" }}>
          <img src={cooperation} alt="Professional development" style={{ width: "250px", borderRadius: "8px" }} />
        </Box>
      </Box>
      
      {/* متن و دکمه */}
      <Box 
  sx={{ 
    display: "flex", 
    justifyContent: "center", 
    textAlign: "center", 
    marginTop: "50px"
  }}
>
  <Box 
    sx={{ 
      maxWidth: "600px", 
      padding: "20px",   
      lineHeight: "1.6",
      marginTop: "300px" 
    }}
  >
    <Typography variant="h4" gutterBottom>
      A Great Opportunity for Collaboration
    </Typography>
    <Typography variant="body1">
      Our platform helps companies discover skilled professionals and easily explore their detailed profiles, making recruitment smoother. Users can also highlight their resumes, boosting their visibility and creating more opportunities for collaboration and job offers from companies.
    </Typography>
    <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
      Start Hiring or Get Discovered
    </Button>
  </Box>
</Box>




    </Box>
    </>
  );
}

export default LearnerOutcomes;
