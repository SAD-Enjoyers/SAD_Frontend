// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Snackbar,
//   Alert,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginTop: theme.spacing(2),
// }));

// const ArticleContent = ({ articleData, accessToken }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   // Sync content with article data on initial load
//   useEffect(() => {
//     if (articleData) {
//       setTitle(articleData.title || "");
//       setContent(articleData.text || "");
//       setAttachment(articleData.attachment || null);
//     }
//   }, [articleData]);

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setAttachment(file);
//   };

//   // Submit form
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!title.trim() || !content.trim()) {
//       setSnackbarSeverity("error");
//       setSnackbarMessage("Title and content are required.");
//       setSnackbarOpen(true);
//       return;
//     }
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("text", content);
//       if (attachment) formData.append("attachment", attachment);

//       const response = await fetch("/api/v1/articles/blog", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "x-role": localStorage.getItem("role"),
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setSnackbarSeverity("success");
//       setSnackbarMessage("Article saved successfully!");
//       setSnackbarOpen(true);
//       setTitle("");
//       setContent("");
//       setAttachment(null);
//     } catch (error) {
//       console.error(error);
//       setSnackbarSeverity("error");
//       setSnackbarMessage("Failed to save the article. Please try again.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Form with React Quill Editor
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         {/* Title Input */}
//         <TextField
//           label="Title"
//           variant="outlined"
//           fullWidth
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           margin="normal"
//         />

//         {/* Rich Text Editor */}
//         <Typography variant="h6" gutterBottom>
//           Rich Text Editor
//         </Typography>
//         <ReactQuill
//           theme="snow"
//           value={content}
//           onChange={(value) => setContent(value)} // Update content state
//           style={{ height: "200px", marginBottom: "20px" }}
//         />

//         {/* Rich Text Preview */}
//         <StyledPaper variant="outlined">
//           <Typography variant="h6">Rich Text Preview</Typography>
//           <div
//             style={{
//               whiteSpace: "pre-wrap",
//               border: "1px solid #ddd",
//               padding: "10px",
//               minHeight: "150px",
//             }}
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </StyledPaper>

//         {/* File Upload */}
//         <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
//           Upload Attachment
//           <input type="file" hidden onChange={handleFileChange} />
//         </Button>
//         {attachment && (
//           <Typography variant="body2" sx={{ marginTop: 1 }}>
//             Selected File: {attachment.name}
//           </Typography>
//         )}

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: 3 }}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : "Submit"}
//         </Button>
//       </form>

//       {/* Snackbar for Feedback */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ArticleContent;



import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ArticleContent = ({ articleData, accessToken }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // if (articleData) {
    //   setTitle(articleData.title || "");
    //   setContent(articleData.text || "");
    //   setAttachment(articleData.attachment || null);
    // }

    const fetchArticleContent = async () => {
      // URL of the API endpoint
      const apiUrl = `/api/v1/article/blog/${articleData.serviceId}`; // Replace with your API URL

      // Make the GET request
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        })
        .then(async (response) => {
          if (response?.data?.data) {
            setTitle(response.data.data.title)
            setContent(response.data.data.text)
            setAttachment(response.data.data.attachment)
          }
          else {
            throw new Error("No transactions data");
          }
        })
        .catch((error) => {
          console.error("Error fetching ArticleContent:", error);
          setSnackbarMessage("Failed to load ArticleContent.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    };

    const fetchAttachment = async () => {
      // URL of the API endpoint
      const apiUrl = `/api/v1/educational-service/upload-attachment`; // Replace with your API URL

      // Make the GET request
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        })
        .then(async (response) => {
          if (response?.data?.data) {
            setTitle(response.data.data.title)
            setContent(response.data.data.text)
            setAttachment(response.data.data.attachment)
          }
          else {
            throw new Error("No transactions data");
          }
        })
        .catch((error) => {
          console.error("Error fetching ArticleContent:", error);
          setSnackbarMessage("Failed to load ArticleContent.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    };
    fetchArticleContent();
  }, [articleData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setSnackbarSeverity("error");
      setSnackbarMessage("File size must be less than 5MB.");
      setSnackbarOpen(true);
      return;
    }
    setAttachment(file);
    setAttachmentName(file.name)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Title and content are required.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/v1/article/blog/${articleData.serviceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: JSON.stringify({
          title: title,
          text: content,
          attachment: attachmentName
        }),
      });
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Article saved successfully!");
      setSnackbarOpen(true);
      setTitle("");
      setContent("");
      setAttachment(null);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message || "Failed to save the article. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  console.log(attachment)
  return (
    <Box sx={{ margin: "0 auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          defaultValue={title}
          sx={{ backgroundColor: 'white' }}
        />

        <Box sx={{ display: 'flex' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Rich Text Editor
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              style={{ height: "200px", minHeight: "580px", marginBottom: "70px", minWidth: 650, backgroundColor: 'white', borderRadius: 10 }}
            />
          </Box>

          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" gutterBottom>Text Preview</Typography>
            <div
              style={{
                whiteSpace: "pre-wrap",
                border: "1px solid #ddd",
                minWidth: 650,
                padding: "10px",
                minHeight: "600px",
                maxHeight: "250px",
                overflowY: "auto", // enable vertical scrolling
                backgroundColor: 'white'
              }}

              dangerouslySetInnerHTML={{ __html: content }}

            />
          </Box>
        </Box>

        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Upload Attachment
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {attachment && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Selected File: {attachment}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArticleContent;
