
import {
  Avatar,
  Box,
  Container,
  Grid2,
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { School, SchoolOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MakeArticle() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(10);
  const [categories, setCategories] = useState([]);
  const [activityStatus, setActivityStatus] = useState("Active");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = name.trim() && description.trim() && level && activityStatus;

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }

    submitImage();
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
        navigate("/profile");
      }
    };

    const storedCategoryList = localStorage.getItem("categoryList");
    if (!storedCategoryList) {
      fetchCategories();
    } else {
      try {
        const parsedCategoryList = JSON.parse(storedCategoryList);
        setCategories(parsedCategoryList);
        // console.log(parsedCategoryList[0]);
      } catch (error) {
        console.error("Error parsing category list from localStorage:", error);
        // Optional: Handle the case where parsing fails, e.g., clear invalid data
        localStorage.removeItem("categoryList");
      }
      setLoading(false);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageName("");
  };

  const submitImage = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
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
      submitArticle(data.data.fileName);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const submitArticle = (image) => {
    var [tag1, tag2, tag3] = [...selectedSubjects];

    const formData = {
      name,
      description,
      level,
      activityStatus,
      price: parseInt(price),
      image,
      tag1,
      tag2,
      tag3,
    };

    console.log(formData);

    fetch("/api/v1/article/make-article", {
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
        alert("Article created successfully");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        border: "2px solid #378CE7",
        mt: "150px",
        mb: "150px",
        borderRadius: "70px",
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <Grid2 container alignItems="center" justifyContent="center">
          <Grid2 size={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Level</InputLabel>
                <Select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Price ($)"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Activity Status</InputLabel>
                <Select
                  value={activityStatus}
                  onChange={(e) => setActivityStatus(e.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{ mt: 3 }}
            >
              <Typography variant="h6">Upload an Image</Typography>
              <Button variant="contained" component="label">
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
                <Button variant="outlined" color="error" onClick={handleClearImage}>
                  Remove Image
                </Button>
              )}
            </Box>
          </Grid2>

          <Grid2 size={4}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>Subjects</InputLabel>

              <Select
                multiple
                value={selectedSubjects}
                onChange={(e) => {
                  handleSubjectChange(e);
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
          </Grid2>

          <Grid2 size={12}>
            <Box textAlign="center" mt={3} mb={5}>
              <Button type="submit" variant="contained" color="primary">
                Make Article
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}




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

