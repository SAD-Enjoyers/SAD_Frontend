// import React, { useState } from "react";
// import {
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Avatar,
// } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";

// // Mock data representing the current state of the exam
// const mockData = {
//   serviceId: 1,
//   description: "An updated description for the AI exam.",
//   level: "Beginner",
//   price: 250.0,
//   activityStatus: "Active",
//   image: "updated_image.jpg",
//   tag1: "ai",
//   tag2: "Machine Learning",
//   tag3: null,
//   examDuration: 35,
// };

// function EditExam() {
//   const [formData, setFormData] = useState(mockData);
//   const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
//   const [imageFile, setImageFile] = useState(null); // State to manage uploaded image file

//   // Handle form data changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle image upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImageFile(imageUrl); // Set the uploaded image as the preview
//       setFormData((prevData) => ({
//         ...prevData,
//         image: imageUrl,
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     console.log("Updated Exam Data:", formData);
//     setOpenDialog(false); // Close the dialog after saving
//     alert("Exam information has been updated successfully!");
//   };

//   // Open confirmation dialog before submission
//   const handleSave = () => {
//     setOpenDialog(true);
//   };

//   // Close confirmation dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         mx: "auto",
//         mt: 4,
//         p: 3,
//         border: "1px solid #ccc",
//         borderRadius: 2,
//         boxShadow: 3, // Add subtle shadow for depth
//       }}
//     >
//       <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
//         Edit Exam Information
//       </Typography>

//       {/* Image upload section */}
//       <Box sx={{ textAlign: "center", mb: 3 }}>
//         <Avatar
//           sx={{
//             width: 100,
//             height: 100,
//             margin: "0 auto",
//             mb: 2,
//             backgroundColor: "#f0f0f0",
//           }}
//           src={imageFile || formData.image} // Display the uploaded image or the current image
//         />
//         <input
//           accept="image/*"
//           type="file"
//           id="image-upload"
//           style={{ display: "none" }}
//           onChange={handleImageUpload}
//         />
//         <label htmlFor="image-upload">
//           <IconButton color="primary" component="span">
//             <PhotoCamera />
//           </IconButton>
//         </label>
//         <Typography variant="body2" sx={{ color: "gray" }}>
//           Click the icon to change the image
//         </Typography>
//       </Box>

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             multiline
//             rows={2}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             label="Level"
//             name="level"
//             value={formData.level}
//             onChange={handleChange}
//             select
//           >
//             <MenuItem value="Beginner">Beginner</MenuItem>
//             <MenuItem value="Intermediate">Intermediate</MenuItem>
//             <MenuItem value="Advanced">Advanced</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             label="Price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             type="number"
//             inputProps={{ min: 0 }} // Ensure price can't be negative
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Activity Status"
//             name="activityStatus"
//             value={formData.activityStatus}
//             onChange={handleChange}
//             select
//           >
//             <MenuItem value="Active">Active</MenuItem>
//             <MenuItem value="Inactive">Inactive</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Image URL"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="Tag 1"
//             name="tag1"
//             value={formData.tag1}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="Tag 2"
//             name="tag2"
//             value={formData.tag2}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="Tag 3"
//             name="tag3"
//             value={formData.tag3 || ""}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Exam Duration (minutes)"
//             name="examDuration"
//             value={formData.examDuration}
//             onChange={handleChange}
//             type="number"
//           />
//         </Grid>
//         <Grid item xs={12} sx={{ mt: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleSave}
//             sx={{
//               textTransform: "none", // Avoid uppercase text transformation
//             }}
//           >
//             Save Changes
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Confirm Changes</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to save the changes to the exam details?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default EditExam;

import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Alert } from "@mui/material";

function ExamSettings({ serviceId, accessToken }) {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(`/api/v1/exam/${serviceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        });

        if (!response.ok) {
          const responseData = await response.json();
          setErrorMessage(responseData.message || "Failed to fetch exam data.");
          return;
        }

        const responseData = await response.json();
        setExamData(responseData.data);
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [serviceId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (!examData) {
    return <Typography>No exam data available.</Typography>;
  }

  // Render exam details
  return (
    <div>
      <Typography variant="h5">{examData.name}</Typography>
      <Typography variant="body1">{examData.description}</Typography>
      <Typography variant="body2">
        Level: {examData.level}, Price: {examData.price}
      </Typography>
      <Typography variant="body2">
        Tags: {examData.tag1}, {examData.tag2}, {examData.tag3}
      </Typography>
      <Typography variant="body2">
        Duration: {examData.examDuration} mins
      </Typography>
      <Typography variant="body2">
        Minimum Pass Score: {examData.minPassScore}
      </Typography>
      <Typography variant="body2">
        Number of Questions: {examData.numberOfQuestion}
      </Typography>
    </div>
  );
}

export default ExamSettings;
