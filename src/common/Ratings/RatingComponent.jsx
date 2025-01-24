import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Rating } from '@mui/material';


const RatingComponent = ({ serviceId, type }) => {
  const [question, setQuestion] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ratingStatus, setRatingStatus] = useState(null);

  // دریافت داده‌ها از API بر اساس serviceId
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`/api/v1/${type}/${serviceId}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        if (data.status === 'success') {
          setQuestion({
            ...data.data,
            userScore: data.data.userScore || 0, // مقدار ریتینگ کاربر (اگر وجود داشته باشد)
          });
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchItemData();
  }, [serviceId, type]);

  // مدیریت تغییرات ریتینگ
  const handleRatingChange = async (event, newValue) => {
    if (newValue !== null) {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role') || 'user';

        const response = await fetch(`/api/v1/${type}/score-submission`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-role': role,
          },
          body: JSON.stringify({
            serviceId,
            scored: newValue,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error submitting rating.');
          return;
        }

        const data = await response.json();
        if (data.status === 'success') {
          setQuestion((prev) => ({
            ...prev,
            userScore: newValue,
            rating: parseFloat(data.data.score),
            ratingCount: data.data.numberOfVoters,
          }));

          setSuccessMessage('Your rating has been updated successfully!');
          setRatingStatus('updated');
        }
      } catch (error) {
        setErrorMessage('Error submitting rating. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#E3F2FD', borderRadius: 2, textAlign: 'center' }}>
      {errorMessage && (
        <Typography sx={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px 20px', borderRadius: '5px' }}>
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography sx={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px 20px', borderRadius: '5px' }}>
          {successMessage}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom>
        Rate this {type}
      </Typography>

      <Rating
        name={`rating-${serviceId}`}
        value={question?.userScore || 0}
        onChange={handleRatingChange}
        precision={0.5}
        sx={{
          color: '#FFD700',
          fontSize: '48px',
          cursor: 'pointer',
          '& .MuiRating-iconEmpty': {
            color: '#FFD70066',
          },
        }}
      />

      <Typography variant="body1" sx={{ marginTop: 2, color: '#1E88E5', fontWeight: 'bold' }}>
        Average Rating: {question?.rating?.toFixed(1) || 'N/A'}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1, color: '#1E88E5', fontWeight: 'bold' }}>
        Total Votes: {question?.ratingCount || 0}
      </Typography>

      {question?.userScore !== null && (
        <Typography variant="body1" sx={{ marginTop: 2, color: '#4CAF50', fontWeight: 'bold' }}>
          Your Rating: {question?.userScore}
        </Typography>
      )}
    </Box>
  );
};

export default RatingComponent;
