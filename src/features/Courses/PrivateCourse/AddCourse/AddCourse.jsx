// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import { Image, Close, Warning } from "@mui/icons-material";
// import { Alert } from "@mui/material";  // این خط را اضافه کنید

//   export default function AddCourse() {
//     const [courseName, setCourseName] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [duration, setDuration] = useState("");
//     const [level, setLevel] = useState("");
//     const [image, setImage] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [errors, setErrors] = useState({});
//     const [openDialog, setOpenDialog] = useState(false); // State for dialog
//     const [successMessage, setSuccessMessage] = useState(""); // Success message state

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!courseName.trim()) newErrors.courseName = "Course name is required.";
//     if (!description.trim()) newErrors.description = "Description is required.";
//     if (!price || price <= 0) newErrors.price = "Valid price is required";
//     if (!duration || duration <= 0)
//       newErrors.duration = "Valid duration is required";
//     if (!level) newErrors.level = "Level is required";

//     // Ensure that either image is uploaded
//     if (!image) {
//       newErrors.media = "Please upload an image";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       // If no errors, open confirmation dialog
//       setOpenDialog(true);
//     }
//   };
//   const handleDialogClose = (confirm) => {
//     if (confirm) {
//       setSuccessMessage("Course added successfully!"); // Set success message
//     }
//     setOpenDialog(false); // Close the dialog
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setImage(file);
//     } else {
//       alert("Please select a valid image");
//     }
//   };
//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         marginTop: 13,
//         marginBottom: 7,
//       }}
//     >
//       <Box
//         sx={{
//           padding: 3,
//           backgroundColor: "#fff",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h4" align="center" color="primary" gutterBottom>
//           Add New Course
//         </Typography>
//         <form onSubmit={handleFormSubmit}>
//           <Grid container spacing={2}>
//             {/* Image Upload */}
//             <Grid item xs={12}>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 component="label"
//                 fullWidth
//                 startIcon={<Image />}
//               >
//                 Upload Image
//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//               </Button>
//               {image && (
//                 <Box sx={{ position: "relative", marginTop: 2 }}>
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt="Preview"
//                     style={{
//                       maxWidth: "100%",
//                       borderRadius: "8px",
//                       border: "2px solid #8e44ad",
//                     }}
//                   />
//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       top: "5px",
//                       right: "5px",
//                       backgroundColor: "#fff",
//                       "&:hover": {
//                         backgroundColor: "#ffdddd",
//                       },
//                     }}
//                     onClick={() => setImage(null)} // Remove image
//                   >
//                     <Close sx={{ color: "#8e44ad" }} />
//                   </IconButton>
//                   <Typography variant="body2" color="textSecondary" align="center">
//                     {image.name}
//                   </Typography>
//                 </Box>
//               )}
//               {errors.media && (
//                 <FormHelperText error>{errors.media}</FormHelperText>
//               )}
//             </Grid>

//             {/* Course Name */}
//             <Grid item xs={12}>
//               <TextField
//                 label="Course Name"
//                 variant="outlined"
//                 fullWidth
//                 value={courseName}
//                 onChange={(e) => setCourseName(e.target.value)}
//                 error={!!errors.courseName}
//                 helperText={errors.courseName}
//               />
//             </Grid>

//             {/* Course Description */}
//             <Grid item xs={12}>
//               <TextField
//                 label="Course Description"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 error={!!errors.description}
//                 helperText={errors.description}
//               />
//             </Grid>

//             {/* Price */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Price"
//                 variant="outlined"
//                 fullWidth
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 error={!!errors.price}
//                 helperText={errors.price}
//                 type="number"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">$</InputAdornment>
//                   ),
//                 }}
//                 inputProps={{ min: "0" }} // Prevent negative values
//               />
//             </Grid>

//             {/* Duration */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Duration (Hours)"
//                 variant="outlined"
//                 fullWidth
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 error={!!errors.duration}
//                 helperText={errors.duration}
//                 type="number"
//                 inputProps={{ min: "1" }} // Prevent negative values
//               />
//             </Grid>

//             {/* Level */}
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth error={!!errors.level}>
//                 <InputLabel>Level</InputLabel>
//                 <Select
//                   value={level}
//                   onChange={(e) => setLevel(e.target.value)}
//                   label="Level"
//                 >
//                   <MenuItem value="beginner">Beginner</MenuItem>
//                   <MenuItem value="intermediate">Intermediate</MenuItem>
//                   <MenuItem value="advanced">Advanced</MenuItem>
//                 </Select>
//                 {errors.level && (
//                   <FormHelperText>{errors.level}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>

//             {/* Submit Button */}
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{
//                   backgroundColor: "#536FFF",
//                   "&:hover": {
//                     backgroundColor: "#0056b3",
//                   },
//                   padding: "12px",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 Add Course
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>

//       {/* Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle
//           sx={{
//             fontWeight: 600,
//             fontSize: "1.25rem",
//             color: "#8e44ad",
//             textAlign: "center",
//           }}
//         >
//           <Warning sx={{ color: "#8e44ad", fontSize: "2rem" }} /> Are you sure?
//         </DialogTitle>
//         <DialogContent>
//           <Typography
//             sx={{
//               textAlign: "center",
//               fontSize: "1rem",
//               fontWeight: 500,
//               color: "#333",
//             }}
//           >
//             Do you really want to add this course? This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center" }}>
//           <Button
//             onClick={() => handleDialogClose(false)}
//             sx={{
//               backgroundColor: "#f44336",
//               color: "#fff",
//               "&:hover": { backgroundColor: "#e53935" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={() => handleDialogClose(true)}
//             sx={{
//               backgroundColor: "#536FFF",
//               color: "#fff",
//               "&:hover": { backgroundColor: "#0056b3" },
//             }}
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Success Message */}
//       {successMessage && (
//         <Alert severity="success" sx={{ marginTop: 2 }}>
//           {successMessage}
//         </Alert>
//       )}
//     </Container>
//   );
// }

import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  School,
  SchoolOutlined,
  Business,
  BusinessOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCourse() {
  const [coursename, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [price, setPrice] = useState(10);
  const [priceError, setPriceError] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageError, setImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [selectedLevelError, setSelectedLevelError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [courseNameError, setcourseNameError] = useState("");
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectsError, setSelectedSubjectsError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    let isValid = true;

    if (!coursename.trim()) {
      setcourseNameError("Course name is required.");
      isValid = false;
    } else {
      setcourseNameError("");
    }

    if (!selectedLevel) {
      setSelectedLevelError(" ");
      isValid = false;
    } else {
      setSelectedLevelError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (selectedSubjects.length === 0) {
      setSelectedSubjectsError(" ");
      isValid = false;
    } else {
      setSelectedSubjectsError("");
    }

    if (!price) {
      setPriceError(" ");
      isValid = false;
    } else {
      setPriceError("");
    }
    // console.log(isValid);
    if (isValid) {
      console.log("Form submitted successfully.");
      submitImage();
      // Add form submission logic here
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageName("");
  };

  const submitImage = async () => {
    if (!selectedImage) {
      setSnackbarMessage("Please select an image first!");
      setOpenSnackbar(true);
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(selectedImage.type)) {
      alert("Only image files (jpeg, png) are allowed!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/v1/educational-service/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      submitCourse(data.data.fileName);
    } catch (error) {
      console.error("Error uploading image:", error);
      setSnackbarMessage("Failed to upload image. Please try again.");
      setOpenSnackbar(true);
    }
  };
  useEffect(() => {
    // setSnackbarMessage("Test Message: Snackbar should be visible.");
    // setOpenSnackbar(true);
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        const fetchedCategories = response.data.data.categoryList || [];
        setCategories(fetchedCategories);
        setLoading(false);
        localStorage.setItem("categoryList", JSON.stringify(fetchedCategories));
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
        navigate("/privateprofile");
      }
    };

    const storedCategoryList = localStorage.getItem("categoryList");
    if (!storedCategoryList) {
      fetchCategories();
    } else {
      try {
        const parsedCategoryList = JSON.parse(storedCategoryList);
        setCategories(parsedCategoryList);
      } catch (error) {
        console.error("Error parsing category list from localStorage:", error);
        localStorage.removeItem("categoryList");
      }
      setLoading(false);
    }
  }, []);

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const submitCourse = (image) => {
    var [tag1, tag2, tag3] = [...selectedSubjects];

    const formData = {
      name: coursename,
      description,
      level: selectedLevel,
      activityStatus: "Active",
      serviceType: "3",
      price: parseInt(price),
      image: image,
      tag1,
      tag2,
      tag3,
    };
    console.log(formData);

    fetch("/api/v1/course/make-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSnackbarMessage("Course created successfully!");
        setOpenSnackbar(true);
        navigate("/PrivateCourse/"+serviceId);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbarMessage("Failed to create course. Please try again.");
        setOpenSnackbar(true);
      });
  };

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Container maxWidth="md">
      <Box
        mt={8}
        mb={4}
        p={4}
        borderRadius={3}
        boxShadow={5}
        // borderColor={"#378ce7"}
        sx={{
          background: "linear-gradient(135deg, #f2f2f2 30%, #ffffff 90%)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            transform: "scale(1.02)",
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#378ce7",
            mb: 4,
            textTransform: "uppercase",
          }}
        >
          Add New Course
        </Typography>
        {/* Course Image Preview
        {previewImage && (
          <Box mb={2} display="flex" justifyContent="center">
            <Avatar alt={imageName} src={previewImage} sx={{ width: 120, height: 120, border: "2px solid #378ce7" }} />
          </Box>
        )} */}
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            {/* Course Name */}
            <Grid item xs={12}>
              <TextField
                label="Course Name"
                fullWidth
                required
                value={coursename}
                onChange={(e) => {
                  setCourseName(e.target.value);
                  if (e.target.value.trim() === "") {
                    setcourseNameError("Course name is required.");
                  } else {
                    setcourseNameError("");
                  }
                }}
                onBlur={() => {
                  if (coursename.trim() === "") {
                    setcourseNameError("Course name is required.");
                  }
                }}
                helperText={courseNameError}
                error={!!courseNameError}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "red", // تغییر رنگ helperText به قرمز
                  },
                }}
              />
            </Grid>
            {/* Course Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                required
                multiline
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (e.target.value.trim() === "") {
                    setDescriptionError("Description is required.");
                  } else {
                    setDescriptionError("");
                  }
                }}
                onBlur={() => {
                  if (description.trim() === "") {
                    setDescriptionError("Description is required.");
                  }
                }}
                helperText={descriptionError} // نمایش ارور
                error={!!descriptionError} // بررسی ارور برای فعال کردن حالت قرمز
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>
            {/* Level Selection with Icons */}
            <Grid item xs={12} sm={6} md={4}>
              <Box margin={"0 auto"} width={"100%"}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!selectedLevelError}
                  // helperText={selectedLevelError}
                >
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={selectedLevel}
                    onChange={(event) => {
                      setSelectedLevel(event.target.value);
                      setSelectedLevelError("");
                    }}
                    label="Level"
                    sx={{
                      backgroundColor: "#ffffff", // سفید بودن پس‌زمینه
                      borderRadius: "8px", // گوشه‌های گرد
                      borderColor: "#E0E0E0", // رنگ حاشیه
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E0E0E0", // رنگ حاشیه روی حالت عادی
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#378CE7", // رنگ حاشیه روی هاور
                      },
                      "& .MuiSelect-icon": {
                        color: "#378CE7", // رنگ آیکن
                      },
                    }}
                  >
                    <MenuItem value="">
                      <Box display="flex" alignItems="center" gap={1}>
                        <SchoolOutlined
                          sx={{ fontSize: "1.2rem", color: "#6c757d" }}
                        />
                        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                          All Levels
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Beginner">
                      <Box display="flex" alignItems="center" gap={1}>
                        <School sx={{ fontSize: "1.2rem", color: "#4CAF50" }} />

                        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                          Beginner
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Medium">
                      <Box display="flex" alignItems="center" gap={1}>
                        <School sx={{ fontSize: "1.2rem", color: "#FF9800" }} />
                        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                          Medium
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Advanced">
                      <Box display="flex" alignItems="center" gap={1}>
                        <School sx={{ fontSize: "1.2rem", color: "#F44336" }} />
                        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                          Advanced
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!selectedSubjectsError}
              >
                <InputLabel>Subjects</InputLabel>

                <Select
                  multiple
                  value={selectedSubjects}
                  onChange={(e) => {
                    handleSubjectChange(e);
                    setSelectedSubjectsError("");
                  }}
                  label="Subjects"
                  renderValue={(selected) => selected.join(", ")} // Comma-separated values
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 224, // حداکثر ارتفاع منو
                        width: 250, // عرض منو
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "#ffffff", // Clean white background
                    borderRadius: "8px", // Rounded corners
                    borderColor: "#E0E0E0", // Lighter border color
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0", // Light grey border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#378CE7", // Hover effect with blue border
                    },
                    "& .MuiSelect-icon": {
                      color: "#378CE7", // Icon color matches theme
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.categoryId}
                      value={category.category}
                    >
                      <Checkbox
                        checked={selectedSubjects.includes(category.category)}
                        sx={{
                          color: "#378CE7", // Checkbox icon color matches theme
                          "&.Mui-checked": {
                            color: "#378CE7", // Checked state color
                          },
                        }}
                      />
                      <ListItemText primary={category.category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Typography
                variant="body1"
                sx={
                  priceError
                    ? {
                        color: "#FF0000",
                        fontSize: { xs: "12px", sm: "15px", md: "17px" },
                      }
                    : {
                        color: "inherit",
                        fontSize: { xs: "12px", sm: "15px", md: "17px" },
                      }
                }
              >
                Price:
              </Typography>
              <TextField
                error={!!priceError}
                type="number"
                size="small"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setPriceError("");
                }}
                InputProps={{
                  endAdornment: <Typography>$</Typography>,
                }}
                sx={{ width: "70%" }}
              />
            </Box> */}

            {/* Price */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!priceError}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0", // رنگ حاشیه پیش‌فرض
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#378CE7", // رنگ حاشیه هنگام هاور
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#378CE7", // رنگ حاشیه هنگام فوکوس
                  },
                }}
              >
                <TextField
                  error={!!priceError}
                  type="number"
                  value={price}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value < 0) {
                      setPriceError("Price cannot be negative.");
                    } else {
                      setPrice(value);
                      setPriceError("");
                    }
                  }}
                  label="Price"
                  InputProps={{
                    endAdornment: (
                      <Typography
                        sx={{
                          color: "#378CE7",
                          fontWeight: "bold",
                          fontSize: "14px",
                          marginLeft: 1,
                        }}
                      >
                        $
                      </Typography>
                    ),
                  }}
                  helperText={
                    priceError
                      ? priceError
                      : "Enter a valid price (e.g., 10, 20.5)"
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: priceError ? "#FF0000" : "#E0E0E0", // حاشیه پیش‌فرض
                      },
                      "&:hover fieldset": {
                        borderColor: "#378CE7", // حاشیه هنگام هاور
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#378CE7", // حاشیه هنگام فوکوس
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>
            {/* Upload Image */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 2,
                border: "1px solid #378ce7",
                borderRadius: 2,
                width: 300,
                mt: "30px",
                mb: "30px",
                ml: "250px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#378ce7",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Upload an Image
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#378ce7",
                }}
              >
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              {imageName && (
                <TextField
                  value={imageName}
                  variant="outlined"
                  disabled
                  fullWidth
                  size="small"
                  label="Selected File"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              )}
              {previewImage && (
                <Box
                  component="img"
                  src={previewImage}
                  alt="Uploaded Preview"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              )}
              {selectedImage && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClear}
                  sx={{ mt: 2 }}
                >
                  Remove Image
                </Button>
              )}
            </Box>
          </Grid>

          <Box textAlign="center" mt={3} mb={5}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#378ce7",
              }}
            >
              Add Course
            </Button>
          </Box>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={
              snackbarMessage.includes("successfully") ? "success" : "error"
            }
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
