import React from 'react';
import { Box, Button, Typography, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// image 
import growth from '../../../assets/images/growth.jpg'

function GrowSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 4,
        marginTop: '100px',
      }}
    >
      <Box
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          maxWidth: '500px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: '600', mb: 2, fontSize: "60px" }}>
        Learn and Grow Together
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 ,fontSize: "30px"}}>
        Join a community where users can create courses, write educational articles, and host interactive quizzes. Become both a learner and an educator!
You can also build your resume and showcase your knowledge!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: { xs: 'center', md: 'left' },
          }}
        >
          <Button variant="contained" sx={{ minWidth: '150px', backgroundColor: "#378CE7", padding: "10px" }}>
            Sign Up
          </Button>
          <Button variant="outlined" color="primary" sx={{ minWidth: '150px' }}>
            For Businesses
          </Button>
        </Box>
      </Box>

      {/* تصویر سمت راست در حالت بزرگ */}
      {!isSmallScreen && (
        <Box
          sx={{
            width: '350px',
            height: '350px',
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* دایره‌ی آبی پس‌زمینه */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#378CE7',
              borderRadius: '50%',
              position: 'absolute',
            }}
          />

          {/* تصویر فرد روی دایره */}
          <Box
            component="img"
            src={growth} // آدرس تصویر فرد خود را جایگزین کنید
            alt="Person"
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              // top: '5%',
              // left: '5%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </Box>
      )}
    </Container>
  );
}

export default GrowSection;
