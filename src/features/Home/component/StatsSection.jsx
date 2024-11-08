import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

// css
import '../../../assets/styles/StatsSection.css';

function StatCard({ number, title }) {
    return (
        <Card className="stat-card">
            <CardContent>
                <Typography variant="h3" className="stat-card-number">
                    {number}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}

function StatsSection() {
    return (
        <Box className="stat-section">
            <StatCard number="100" title="Best Resumes" />
            <StatCard number="100" title="Better Blogs" />
            <StatCard number="100" title="Better Courses" />
        </Box>
    );
}

export default StatsSection;
