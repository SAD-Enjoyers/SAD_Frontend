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
    






