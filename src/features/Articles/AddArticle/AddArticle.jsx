// import React, { useState } from "react";
// import {
//   TextField,
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Divider,
//   IconButton,
//   Tooltip,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Snackbar,
// } from "@mui/material";
// import ReactMarkdown from "react-markdown";
// import { styled } from "@mui/system";
// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import LinkIcon from "@mui/icons-material/Link";
// import ImageIcon from "@mui/icons-material/Image";
// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import HighlightIcon from "@mui/icons-material/HelpOutline";
// import TextIncreaseIcon from "@mui/icons-material/TextIncrease";

// const StyledPreview = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   backgroundColor: "#f9f9f9",
//   minHeight: "400px",
//   height: "100%",
//   overflowY: "auto",
//   border: `1px solid ${theme.palette.divider}`,
//   borderRadius: theme.shape.borderRadius,
// }));

// const Toolbar = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   gap: theme.spacing(1),
//   backgroundColor: "#f5f5f5",
//   padding: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
// }));

// const AddArticle = () => {
//   const [markdown, setMarkdown] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openImageDialog, setOpenImageDialog] = useState(false);
//   const [linkUrl, setLinkUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [title, setTitle] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [author, setAuthor] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [error, setError] = useState(false);

//   const handleInputChange = (event) => {
//     setMarkdown(event.target.value);
//   };

//   const handleInsert = (symbol) => {
//     const textarea = document.getElementById("markdown-editor");
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const text = markdown;
//     const before = text.substring(0, start);
//     const after = text.substring(end, text.length);
//     const selectedText = text.substring(start, end);

//     const formattedText = symbol.replace("TEXT", selectedText || "");
//     setMarkdown(before + formattedText + after);
//   };

//   const handleLinkInsert = () => {
//     handleInsert(`[TEXT](${linkUrl})`);
//     setOpenDialog(false);
//     setLinkUrl("");
//   };

//   const handleImageInsert = () => {
//     handleInsert(`![alt text](${imageUrl})`);
//     setOpenImageDialog(false);
//     setImageUrl("");
//   };

//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         handleInsert(`![alt text](${reader.result})`);
//       };
//       reader.readAsDataURL(file);
//     }
//     setOpenImageDialog(false);
//   };

//   const handleConfirm = () => {
//     if (!title || !startTime || !author) {
//       setError(true);
//       return;
//     }
//     setError(false);
//     console.log("Article added!", { title, author, startTime, markdown });
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         Add Article
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Title"
//             fullWidth
//             variant="outlined"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             error={error && !title}
//             helperText={error && !title ? "Title is required" : ""}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Date"
//             type="date"
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//             variant="outlined"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             error={error && !startTime}
//             helperText={error && !startTime ? "Date is required" : ""}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Author"
//             fullWidth
//             variant="outlined"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             error={error && !author}
//             helperText={error && !author ? "Author is required" : ""}
//           />
//         </Grid>
//       </Grid>

//       <Divider sx={{ marginY: 2 }} />

//       <Toolbar>
//         <Tooltip title="Help">
//           <IconButton onClick={() => handleInsert("?")}> <HighlightIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Horizontal Rule">
//           <IconButton onClick={() => handleInsert("---")}> <FormatQuoteIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Link">
//           <IconButton onClick={() => setOpenDialog(true)}> <LinkIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Image">
//           <IconButton onClick={() => setOpenImageDialog(true)}> <ImageIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Bulleted List">
//           <IconButton onClick={() => handleInsert("- TEXT\n")}> <FormatListBulletedIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Numbered List">
//           <IconButton onClick={() => handleInsert("1. TEXT\n")}> <FormatListNumberedIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Header">
//           <IconButton onClick={() => handleInsert("# TEXT")}> <TextIncreaseIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Italic">
//           <IconButton onClick={() => handleInsert("*TEXT*")}> <FormatItalicIcon /> </IconButton>
//         </Tooltip>
//         <Tooltip title="Bold">
//           <IconButton onClick={() => handleInsert("**TEXT**")}> <FormatBoldIcon /> </IconButton>
//         </Tooltip>
//       </Toolbar>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             id="markdown-editor"
//             label="Write your article in Markdown"
//             multiline
//             rows={12}
//             fullWidth
//             variant="outlined"
//             value={markdown}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" gutterBottom>
//             Preview
//           </Typography>
//           <StyledPreview>
//             <ReactMarkdown>{markdown}</ReactMarkdown>
//           </StyledPreview>
//         </Grid>
//       </Grid>

//       <Divider sx={{ marginY: 2 }} />

//       <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//         <Button variant="contained" color="success" onClick={handleConfirm}>
//           Submit
//         </Button>
//       </Box>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Insert Link</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Enter URL (e.g., https://example.com)"
//             type="url"
//             fullWidth
//             variant="outlined"
//             value={linkUrl}
//             onChange={(e) => setLinkUrl(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} sx={{ color: "white", backgroundColor: "red" }}>
//             Cancel
//           </Button>
//           <Button onClick={handleLinkInsert} sx={{ color: "white", backgroundColor: "green" }}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Insert Image</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Enter Image URL (e.g., https://example.com/image.png)"
//             type="url"
//             fullWidth
//             variant="outlined"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//           />
//           <Divider sx={{ marginY: 2 }} />
//           <Button
//             variant="contained"
//             component="label"
//             fullWidth
//             sx={{ marginTop: 2 }}
//           >
//             Upload from System
//             <input type="file" hidden accept="image/*" onChange={handleFileInputChange} />
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenImageDialog(false)} sx={{ color: "white", backgroundColor: "red" }}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         message={error ? "Please fill all required fields!" : "Article added successfully!"}
//         sx={{ backgroundColor: error ? "red" : "green" }}
//       />
//     </Box>
//   );
// };

// export default AddArticle;;

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

export default function AddArticle() {
  const [articlename, setArticleName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [price, setPrice] = useState(10);
  const [priceError, setPriceError] = useState("");
  const [categories, setCategories] = useState([]);
  // const [activityStatus, setActivityStatus] = useState("Active");
  const [selectedLevelError, setSelectedLevelError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [courseNameError, setcourseNameError] = useState("");
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectsError, setSelectedSubjectsError] = useState("");
  // const [tag1, setTag1] = useState("");
  // const [tag2, setTag2] = useState("");
  // const [tag3, setTag3] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (!coursename.trim()) {
      setcourseNameError(" ");
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
          navigate("/PrivateCourse");
        })
        .catch((error) => {
          console.error("Error:", error);
          // setSnackbarMessage("Failed to create course. Please try again.");
          // setOpenSnackbar(true);
        });
    };
  
    // if (isLoading) {
    //   return <LoadingScreen />;
    // }
    return (
      <Container maxWidth="md">
        <Box
          mt={6}
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
            sx={{ fontWeight: 600, color: "#333" , mb:4,}}
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
                    let value = e.target.value;
                    setCourseName(value);
                    setcourseNameError("");
                  }}
                  helperText={!coursename && "Course name is required."}
                  error={!coursename}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
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
                  onChange={(e) => setDescription(e.target.value)}
                  helperText={!description && "Description is required."}
                  error={!description}
                  variant="outlined"
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
          priceError ? priceError : "Enter a valid price (e.g., 10, 20.5)"
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
                  mb:"30px",
                  ml:"250px"
                }}
              >
                <Typography variant="h6">Upload an Image</Typography>
                <Button variant="contained" component="label" sx={{
                  backgroundColor: "#378ce7"
                }}>
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
                  <Button variant="outlined" color="error" onClick={handleClear}>
                    Remove Image
                  </Button>
                )}
              </Box>
              {/* Submit Button */}
              {/* <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#378ce7",
                    width: "100%",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#285e99",
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit Course"}
                </Button>
              </Grid> */}
            </Grid>
  
            <Box textAlign="center" mt={3} mb={5}>
              <Button type="submit" variant="contained"  sx={{
                  backgroundColor: "#378ce7"
                }}>
                Add Course
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    );
  }
