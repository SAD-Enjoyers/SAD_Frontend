import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating } from '@mui/material';

const RatingComponentExam = ({ serviceId, type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ratingStatus, setRatingStatus] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      const savedRating = localStorage.getItem(`rating-${serviceId}`);
      if (savedRating) {
        setData((prevData) => ({
          ...prevData,
          userScore: parseFloat(savedRating),
        }));
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('User is not authenticated.');
          return;
        }

        const response = await fetch(`/api/v1/${type}/${serviceId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        if (result.status === 'success') {
          setData({
            rating: parseFloat(result.data.score) || 0,
            ratingCount: result.data.numberOfVoters || 0,
            userScore: result.data.userScore || 0,
          });
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [serviceId, type]);

  const handleRatingChange = async (event, newValue) => {
    if (newValue !== null) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('User is not authenticated.');
          return;
        }

        const role = localStorage.getItem('role') || 'user';

        const response = await fetch(`/api/v1/educational-service/score-submission`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-role': role,
          },
          body: JSON.stringify({
            serviceId: parseInt(serviceId),
            scored: newValue,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error submitting rating.');
          return;
        }

        const result = await response.json();
        if (result.status === 'success') {
          setData((prevData) => ({
            ...prevData,
            rating: parseFloat(result.data.score),
            ratingCount: result.data.numberOfVoters,
            userScore: newValue,
          }));
          setSuccessMessage('Your rating has been updated successfully!');
          setRatingStatus('updated');
          localStorage.setItem(`rating-${serviceId}`, newValue);  // Store updated rating in localStorage
        }
      } catch (error) {
        setErrorMessage('Error submitting rating. Please try again.');
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: 'auto',
        maxWidth: '350px',
        margin: '0 auto',
        border: '2px solid #1976d2',
      }}
    >
      {successMessage && (
        <Typography
          sx={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '8px 16px',
            borderRadius: '5px',
            marginBottom: '10px',
            fontSize: '14px',
          }}
        >
          {successMessage}
        </Typography>
      )}

      {errorMessage && (
        <Typography
          sx={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '8px 16px',
            borderRadius: '5px',
            fontSize: '14px',
            marginBottom: '10px',
          }}
        >
          {errorMessage}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '18px', color: '#000', marginBottom: '10px' }}>
        Rate this {type}
      </Typography>

      {data?.userScore !== null && (
        <Typography
          variant="body1"
          sx={{
            color: '#4CAF50',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '10px',
          }}
        >
          {data?.userScore.toFixed(1)} / 5
        </Typography>
      )}

      <Rating
        name={`rating-${serviceId}`}
        value={data?.userScore || 0}
        onChange={handleRatingChange}
        precision={0.5}
        sx={{
          color: '#FFD700',
          fontSize: '24px',
          cursor: 'pointer',
          '& .MuiRating-iconEmpty': {
            color: '#FFD70066',
          },
          marginBottom: '10px',
        }}
      />

      <Typography
        variant="body1"
        sx={{
          color: '#1E88E5',
          fontWeight: 'bold',
          fontSize: '14px',
          marginTop: '5px',
        }}
      >
        Average Rating: {typeof data.rating === 'number' ? data.rating.toFixed(1) : 'N/A'}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#1E88E5',
          fontWeight: 'bold',
          fontSize: '14px',
          marginTop: '5px',
        }}
      >
        Total Votes: {data?.ratingCount || 0}
      </Typography>
    </Box>
  );
};

export default RatingComponentExam;