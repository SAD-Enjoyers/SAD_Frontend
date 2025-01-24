// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   TextField,
//   Typography,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const UploadVideo = ({ courseId, accessToken }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   console.log(courseId);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setError(""); // Clear any previous error
//     setSuccess(false); // Reset success message
//   };
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a video to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       setUploading(true);
//       setError(""); // Clear any previous error

//       const uploadResponse = await axios.post(
//         `/api/v1/educational-service/upload-video`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Upload Request Payload (FormData):");
//       console.log([...formData.entries()]); // Logs FormData entries (file details)

//       console.log("Upload Response:");
//       console.log(JSON.stringify(uploadResponse.data, null, 2)); // Logs response in JSON format

//       if (uploadResponse.data.status === "success") {
//         setFileName(uploadResponse.data.data.fileName);
//       } else {
//         throw new Error(uploadResponse.data.message || "Upload failed.");
//       }
//     } catch (err) {
//       setError(err.message || "Something went wrong during upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!title || !description || !fileName) {
//       setError("Please fill out all fields and upload a video.");
//       return;
//     }

//     const payload = {
//       serviceId: courseId,
//       title,
//       description,
//       address: fileName,
//     };

//     try {
//       console.log("Submit Request Payload:");
//       console.log(JSON.stringify(payload, null, 2)); // Logs the payload in JSON format

//       const response = await axios.post(`/api/v1/course/add-video`, payload, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Submit Response:");
//       console.log(JSON.stringify(response.data, null, 2)); // Logs the response in JSON format

//       if (response.data.status === "success") {
//         setSuccess(true);
//         setTitle("");
//         setDescription("");
//         setFileName("");
//         setSelectedFile(null);
//       } else {
//         throw new Error(response.data.message || "Failed to add video.");
//       }
//     } catch (err) {
//       console.error(err.message || "Something went wrong.");
//       setError(err.message || "Something went wrong.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 2,
//         p: 3,
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Upload Video
//       </Typography>
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//         id="video-upload-input"
//       />
//       <label htmlFor="video-upload-input">
//         <Button variant="contained" component="span" disabled={uploading}>
//           Choose Video
//         </Button>
//       </label>
//       {selectedFile && (
//         <Typography variant="body2">{selectedFile.name}</Typography>
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleUpload}
//         disabled={uploading}
//       >
//         {uploading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
//       </Button>
//       {fileName && (
//         <Box sx={{ width: "100%", mt: 2 }}>
//           <TextField
//             label="Title"
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             margin="normal"
//           />
//           <Button variant="contained" color="secondary" onClick={handleSubmit}>
//             Submit Video Details
//           </Button>
//         </Box>
//       )}
//       {error && <Alert severity="error">{error}</Alert>}
//       {success && <Alert severity="success">Video added successfully!</Alert>}
//     </Box>
//   );
// };

// export default UploadVideo;

import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";

const UploadVideo = ({ courseId, accessToken }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(""); // Clear any previous error
    setSuccess(false); // Reset success message
  };

  const handleSubmit = async () => {
    if (!selectedFile || !title || !description) {
      setError("Please fill out all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      setError(""); // Clear any previous error

      // Upload video first
      const uploadResponse = await axios.post(
        `/api/v1/educational-service/upload-video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.data.status === "success") {
        const videoFileName = uploadResponse.data.data.fileName;

        // Now submit video details with file name
        const payload = {
          serviceId: courseId,
          title,
          description,
          address: videoFileName,
        };

        const response = await axios.post(`/api/v1/course/add-video`, payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.status === "success") {
          setSuccess(true);
          setTitle("");
          setDescription("");
          setFileName("");
          setSelectedFile(null);
        } else {
          throw new Error(response.data.message || "Failed to add video.");
        }
      } else {
        throw new Error(uploadResponse.data.message || "Upload failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "auto",
        width: "100%",
        "@media (max-width: 600px)": {
          p: 3,
          maxWidth: "90%",
        },
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Upload Your Video
      </Typography>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="video-upload-input"
      />

      <label htmlFor="video-upload-input">
        <Button
          variant="contained"
          component="span"
          disabled={uploading}
          sx={{
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
            width: "100%",
          }}
        >
          Choose Video
        </Button>
      </label>

      {selectedFile && (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
          {selectedFile.name}
        </Typography>
      )}

      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        sx={{
          input: { fontSize: "1rem" },
          "@media (max-width: 600px)": {
            fontSize: "0.9rem",
          },
        }}
      />

      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        sx={{
          input: { fontSize: "1rem" },
          "@media (max-width: 600px)": {
            fontSize: "0.9rem",
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={uploading}
        sx={{
          mt: 2,
          width: "100%",
          height: "48px",
          fontWeight: "bold",
          backgroundColor: "#4caf50",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
          "@media (max-width: 600px)": {
            height: "42px",
          },
        }}
      >
        {uploading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
      </Button>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
          Video uploaded successfully!
        </Alert>
      )}
    </Box>
  );
};

export default UploadVideo;
