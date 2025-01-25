// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
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
// import axios from "axios";

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginTop: theme.spacing(2),
// }));

// const ArticleContent = ({ articleData, accessToken }) => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [attachmentName, setAttachmentName] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     const fetchArticleContent = async () => {
//       try {
//         const apiUrl = `/api/v1/article/blog/${articleData.serviceId}`;
//         const response = await axios.get(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "x-role": localStorage.getItem("role"),
//           },
//         });

//         if (response?.data?.data) {
//           setTitle(response.data.data.title || "");
//           setContent(response.data.data.text || "");
//           setAttachmentName(response.data.data.attachment || null);
//         } else {
//           throw new Error("No article data found.");
//         }
//       } catch (error) {
//         console.error("Error fetching article content:", error);
//         setSnackbarSeverity("error");
//         setSnackbarMessage("Failed to load article content.");
//         setOpenSnackbar(true);
//       }
//     };

//     fetchArticleContent();
//   }, [articleData]);

// const handleFileChange = async (event) => {
//   const file = event.target.files[0];
//   if (file && file.size > 5 * 1024 * 1024) {
//     setSnackbarSeverity("error");
//     setSnackbarMessage("File size must be less than 5MB.");
//     setOpenSnackbar(true);
//     return;
//   }

//   try {
//     const response = await fetch(`/api/v1/educational-service/upload-attachment`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "x-role": localStorage.getItem("role"),
//       },
//       body: JSON.stringify({
//         file: file
//       }),
//     });

//     setAttachmentName(file.name)
//     setAttachment(file)

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//     }

//     setSnackbarSeverity("success");
//     setSnackbarMessage("Attachment saved successfully!");
//     setOpenSnackbar(true);
//   } catch (error) {
//     console.error("Error saving Attachment:", error);
//     console.log(file)
//     setSnackbarSeverity("error");
//     setSnackbarMessage(error.message || "Failed to save the Attachment.");
//     setOpenSnackbar(true);
//   } finally {
//     setLoading(false);
//   }
// };

// const handlePublicPage = () => {
//   localStorage.setItem("articleData", JSON.stringify(articleData)); // Save to localStorage
//   navigate("/PublicArticle", { state: { articleData } });

// };

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   if (!title.trim() || !content.trim()) {
//     setSnackbarSeverity("error");
//     setSnackbarMessage("Title and content are required.");
//     setOpenSnackbar(true);
//     return;
//   }

//   setLoading(true);
//   console.log(attachment)
//   try {
//     const response = await fetch(`/api/v1/article/blog/${articleData.serviceId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "x-role": localStorage.getItem("role"),
//       },
//       body: JSON.stringify({
//         title,
//         text: content,
//         attachment: attachmentName,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//     }

//     setSnackbarSeverity("success");
//     setSnackbarMessage("Article saved successfully!");
//     setOpenSnackbar(true);
//   } catch (error) {
//     console.error("Error saving article:", error);
//     setSnackbarSeverity("error");
//     setSnackbarMessage(error.message || "Failed to save the article.");
//     setOpenSnackbar(true);
//   } finally {
//     setLoading(false);
//   }
// };

// return (
//   <div style={{ margin: "0 auto", padding: 2, maxWidth: "1350px", width: "100%" }}>
//     <form onSubmit={handleSubmit}>
//       <TextField
//         label="Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//         sx={{ backgroundColor: "white" }}
//       />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//         }}
//       >
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h6" gutterBottom>
//             Rich Text Editor
//           </Typography>
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={(value) => setContent(value)}
//             style={{
//               height: "200px",
//               minHeight: "1025px",
//               marginBottom: "40px",
//               width: "100%",
//               backgroundColor: "white",
//               borderRadius: 10,
//             }}
//           />
//         </Box>

//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h6" gutterBottom >
//             Text Preview
//           </Typography>
//           <div
//             style={{
//               whiteSpace: "pre-wrap",
//               border: "1px solid #ddd",
//               padding: "10px",
//               minHeight: "1045px",
//               maxHeight: "1000px",
//               overflowY: "auto",
//               backgroundColor: "white",
//               fontFamily: "'Roboto', 'Arial', sans-serif", // Add your desired font here
//               lineHeight: "1.6", // Optional: improve readability
//             }}
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </Box>
//       </Box>

//       <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
//         Upload Attachment
//         <input type="file" hidden onChange={handleFileChange} />
//       </Button>

//       {attachmentName && (
//         <Typography variant="body2" sx={{ marginTop: 1 }}>
//           Selected File: {attachmentName}
//         </Typography>
//       )}

//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ marginTop: 3 }}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : "Submit"}
//       </Button>
//     </form>

//     <Button
//       color="primary"
//       fullWidth
//       onClick={handlePublicPage}
//       sx={{ marginTop: 3 }}

//     >
//       see public page
//     </Button>

//     <Snackbar
//       open={openSnackbar}
//       autoHideDuration={3000}
//       onClose={() => setOpenSnackbar(false)}
//       anchorOrigin={{ vertical: "top", horizontal: "center" }}
//     >
//       <Alert
//         onClose={() => setOpenSnackbar(false)}
//         severity={snackbarSeverity}
//         sx={{ width: "100%" }}
//       >
//         {snackbarMessage}
//       </Alert>
//     </Snackbar>
//   </div>
// );
// };

// export default ArticleContent;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const apiUrl = `/api/v1/article/blog/${articleData.serviceId}`;
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        });

        if (response?.data?.data) {
          setTitle(response.data.data.title || "");
          setContent(response.data.data.text || "");
          setAttachmentName(response.data.data.attachment || null);
        } else {
          throw new Error("No article data found.");
        }
      } catch (error) {
        console.error("Error fetching article content:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to load article content.");
        setOpenSnackbar(true);
      }
    };

    fetchArticleContent();
  }, [articleData]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setSnackbarSeverity("error");
      setSnackbarMessage("File size must be less than 5MB.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/v1/educational-service/upload-attachment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // Assuming the server returns the name of the file as `fileName` in the response
      setAttachmentName(responseData.data.fileName || file.name);
      setAttachment(file);

      setSnackbarSeverity("success");
      setSnackbarMessage("Attachment uploaded successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error uploading attachment:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message || "Failed to upload the attachment.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };


  const handlePublicPage = () => {
    localStorage.setItem("articleData", JSON.stringify(articleData)); // Save to localStorage
    navigate("/PublicArticle", { state: { articleData } });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Title and content are required.");
      setOpenSnackbar(true);
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
          title,
          text: content,
          attachment: attachmentName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Article saved successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving article:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message || "Failed to save the article.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "0 auto", padding: 2, maxWidth: "1350px", width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          sx={{ backgroundColor: "white" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Rich Text Editor
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              style={{
                height: "200px",
                minHeight: "1025px",
                marginBottom: "40px",
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom >
              Text Preview
            </Typography>
            <div
              style={{
                whiteSpace: "pre-wrap",
                border: "1px solid #ddd",
                padding: "10px",
                minHeight: "1045px",
                maxHeight: "1000px",
                overflowY: "auto",
                backgroundColor: "white",
                fontFamily: "'Roboto', 'Arial', sans-serif", // Add your desired font here
                lineHeight: "1.6", // Optional: improve readability
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Box>
        </Box>

        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Upload Attachment
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {attachmentName && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Selected File: {attachmentName}
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

      <Button
        color="primary"
        fullWidth
        onClick={handlePublicPage}
        sx={{ marginTop: 3 }}

      >
        see public page
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ArticleContent;
