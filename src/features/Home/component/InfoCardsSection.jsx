// CardComponent.js
import React from 'react';
import { Typography, Box, Container} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import blog from '../../../assets/images/blog.jpg';
import course from '../../../assets/images/course.jpg';
// css
import '../../../assets/styles/EventBar.css';

const CardComponent = ({ title, description, linkText, linkUrl }) => {
    return (
        <Box className="card">
            <Typography variant="h5" className="cardTitle">
                {title}
            </Typography>
            <Typography variant="body1" className="cardDescription">
                {description}
            </Typography>
            <a href={linkUrl} className="cardLink">
                {linkText}
            </a>
        </Box>
    );
};

const InfoCardsSection = () => {
    const cardData = [
        {
            title: 'Courses',
            description: 'Access a wide range of video courses with direct payment from student to instructor, enhancing learning efficiency and instructor benefits.',
            linkText: 'View Courses',
            linkUrl: '#',
        },
        {
            title: 'Questions',
            description: 'Take multiple-choice tests with automatic grading and gain immediate feedback on your progress.',
            linkText: 'Take Exams',
            linkUrl: '#',
        },
        {
            title: 'Blog',
            description: 'Share your experiences through blog posts, helping you build a comprehensive professional profile.',
            linkText: 'Write a Blog',
            linkUrl: '#',
        },
        {
            title: 'Rating & Profile',
            description: 'Receive user ratings on your courses, exams, and blog posts, which automatically update your profile based on activity evaluations.',
            linkText: 'View User Profiles',
            linkUrl: '#',
        }
    ];

    return (
        <Container maxWidth="lg" className="container">
            <Grid2 container spacing={4} alignItems="center" justifyContent="center">
                <Grid2 item xs={0} md={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
                    <Box className="imageContainer">
                        <img src={blog} alt="Learners working" className="image1" />
                        <img src={course} alt="Professional development" className="image2" />
                    </Box>
                </Grid2>
                <Grid2 item xs={12} md={8}>
                    <Grid2 container direction="column" spacing={2} justifyContent="center" alignItems="center" className="cardsContainer">
                        {cardData.map((data, index) => (
                            <Grid2 item key={index}>
                                <CardComponent
                                    title={data.title}
                                    description={data.description}
                                    linkText={data.linkText}
                                    linkUrl={data.linkUrl}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default InfoCardsSection;
