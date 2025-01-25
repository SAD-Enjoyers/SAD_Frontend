import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating as MuiRating } from '@mui/material';

const CourseRatingComponent = ({ serviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ratingStatus, setRatingStatus] = useState(null); // برای پیگیری وضعیت ریتینگ
  const [userScore, setUserScore] = useState(0); // مقدار اولیه برای امتیاز کاربر

  // دریافت داده‌ها از API (GET)
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('User is not authenticated.');
          return;
        }

        const response = await fetch(`/api/v1/course/preview/${serviceId}`, {
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
          const courseData = result.data.Course;
          setData({
            rating: parseFloat(courseData.score) || 0,            // میانگین امتیاز
            ratingCount: courseData.numberOfVoters || 0,         // تعداد رای‌دهندگان
          });

          // بارگذاری امتیاز کاربر از localStorage
          const savedRating = localStorage.getItem(`rating-${serviceId}`);
          if (savedRating) {
            setUserScore(parseFloat(savedRating)); // اگر رای ذخیره شده بود، آن را در state قرار بده
          } else {
            setUserScore(courseData.userScore || 0); // اگر رای ذخیره‌شده نباشد، از داده‌های API استفاده کن
          }
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData(); // بارگذاری داده‌ها از API
  }, [serviceId]);

  // مدیریت تغییرات ریتینگ با متد PUT (ثبت امتیاز جدید)
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
          }));

          // ذخیره رای کاربر در localStorage
          localStorage.setItem(`rating-${serviceId}`, newValue);
          setUserScore(newValue); // به‌روزرسانی مقدار userScore برای نمایش در UI
          setSuccessMessage('Your rating has been updated successfully!');
          setRatingStatus('updated');
        }
      } catch (error) {
        setErrorMessage('Error submitting rating. Please try again.');
      }
    }
  };

  useEffect(() => {
    // بارگذاری رای از localStorage
    const savedRating = localStorage.getItem(`rating-${serviceId}`);
    if (savedRating) {
      setUserScore(parseFloat(savedRating)); // بارگذاری رای ذخیره‌شده
    }
  }, [serviceId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (errorMessage) {
    return (
      <Typography
        sx={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px 20px',
          borderRadius: '5px',
          textAlign: 'center',
        }}
      >
        {errorMessage}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: 'auto',
        maxWidth: '350px',
        margin: '0 auto',
        border: '2px solid #1E88E5',
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
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
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
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {errorMessage}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '18px', color: '#000', marginBottom: '10px' }}>
        Rate this Course
      </Typography>

      {/* Your Rating (به صورت 0/5) */}
      {userScore !== null ? (
        <Typography
          variant="body1"
          sx={{
            color: '#4CAF50',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '10px',
          }}
        >
          Your Rating: {userScore.toFixed(1)} / 5
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ color: '#FF5722', fontSize: '16px' }}>
          No rating yet
        </Typography>
      )}

      <MuiRating
        value={userScore || 0}
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
        Average Rating: {typeof data.rating === 'number' ? data.rating.toFixed(1) : 'N/A'} / 5
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

export default CourseRatingComponent;




