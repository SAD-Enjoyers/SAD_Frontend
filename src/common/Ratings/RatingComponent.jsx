import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating } from '@mui/material';

const RatingComponent = ({ serviceId, type }) => {
  const [data, setData] = useState(null); // ذخیره اطلاعات مربوط به ریتینگ
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('User is not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/v1/${type}/preview/${serviceId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} data.`);
        }

        const result = await response.json();
        console.log(`Fetched ${type} data:`, result);

        const fetchedData = result.data?.[type.charAt(0).toUpperCase() + type.slice(1)];

        if (result.status === 'success' && fetchedData) {
          setData({
            rating: parseFloat(fetchedData.score) || 0,
            ratingCount: fetchedData.numberOfVoters || 0,
            userScore: result.data.userScore || 0,
          });
          console.log("Updated state after GET:", {
            rating: parseFloat(fetchedData.score) || 0,
            ratingCount: fetchedData.numberOfVoters || 0,
            userScore: result.data.userScore || 0,
          });
        }
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId, type]);

  const handleRatingChange = async (event, newValue) => {
    console.log("Received rating value:", newValue);

    if (newValue !== null && !isNaN(newValue)) {
      setData((prevData) => ({
        ...prevData,
        userScore: newValue,
      }));

      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("User is not authenticated.");
        return;
      }

      try {
        const response = await fetch(`/api/v1/educational-service/score-submission`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            serviceId: parseInt(serviceId),
            scored: newValue,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Error submitting rating.");
          return;
        }

        const result = await response.json();
        console.log("Rating submission result:", result);

        if (result.status === "success" && result.data) {
          setSuccessMessage("Your rating has been updated successfully!");

          setData((prevData) => ({
            ...prevData,
            rating: parseFloat(result.data.score) || prevData.rating,
            ratingCount: result.data.numberOfVoters || prevData.ratingCount,
            userScore: newValue,
          }));
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
        setErrorMessage("Error submitting rating. Please try again.");
      }
    } else {
      setErrorMessage("Invalid rating value.");
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
        Rate this {type.charAt(0).toUpperCase() + type.slice(1)}
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
          color: "#FFD700",
          fontSize: "24px",
          cursor: "pointer",
          "& .MuiRating-iconEmpty": {
            color: "#FFD70066",
          },
          marginBottom: "10px",
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
        Average Rating: {typeof data?.rating === 'number' ? data.rating.toFixed(1) : 'N/A'}
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

export default RatingComponent;