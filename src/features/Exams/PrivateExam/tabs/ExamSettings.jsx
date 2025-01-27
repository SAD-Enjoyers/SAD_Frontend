import React, { useState, useEffect } from "react";
import axios from "axios";
import TitleIcon from "@mui/icons-material/Title";

// Material-UI components
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Snackbar,
  Alert,
  ListItemText,
} from "@mui/material";

// Material-UI icons
import {
  Image as ImageIcon,
  Description as DescriptionIcon,
  Grade as GradeIcon,
  AttachMoney as AttachMoneyIcon,
  Timelapse as TimelapseIcon,
  LocalOffer as LocalOfferIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

const ExamSettings = ({ examData, accessToken }) => {
  const [name, setName] = useState(examData.name); // New state for the exam name
  const [newImage, setNewImage] = useState(null); // New image file
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [uploadedImage, setUploadedImage] = useState(examData.image); // Updated image state
  // Editable exam data states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // 'success' or 'error'

  const [description, setDescription] = useState(examData.description);
  const [level, setLevel] = useState(examData.level);
  const [price, setPrice] = useState(examData.price);
  const [activityStatus, setActivityStatus] = useState(examData.activityStatus);
  const [examDuration, setExamDuration] = useState(examData.examDuration);

  // Editable tags states
  const [tag1, setTag1] = useState(examData.tag1);
  const [tag2, setTag2] = useState(examData.tag2);
  const [tag3, setTag3] = useState(examData.tag3);

  // Categories fetched from the API
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([tag1, tag2, tag3]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        if (response.data.status === "success") {
          setCategories(response.data.data.categoryList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    console.log("accesstoken:", accessToken);

    fetchCategories();

    // Initialize selectedTags with existing examData tags
    setSelectedTags(
      [examData.tag1, examData.tag2, examData.tag3].filter(Boolean) // Filter out null or undefined tags
    );
  }, [examData]);

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };
  const uploadNewImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);
    console.log(examData);

    try {
      setIsUploading(true);

      // Upload the new image
      const response = await axios.post(
        "/api/v1/educational-service/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
            "x-role": localStorage.getItem("role"),
          },
        }
      );

      const newImageName = response.data.data.fileName;
      console.log(response);
      setUploadedImage(newImageName);

      const updatedExamData = {
        serviceId: parseFloat(examData.serviceId),
        name: name,
        description,
        level,
        price: parseFloat(price),
        activityStatus,
        image: newImageName,
        tag1,
        tag2,
        tag3,
        examDuration,
      };

      // Update the exam data on the backend
      await axios.put("/api/v1/exam/edit-exam", updatedExamData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      // Fetch the updated exam data from the backend
      const fetchResponse = await fetch(
        `/api/v1/exam/${updatedExamData.serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-role": "user",
          },
        }
      );

      const fetchedData = await fetchResponse.json();

      // Update state with the fetched data
      if (fetchedData.status === "success") {
        const updatedExam = fetchedData.data;
        setName(updatedExam.name);
        setDescription(updatedExam.description);
        setLevel(updatedExam.level);
        setPrice(updatedExam.price);
        setActivityStatus(updatedExam.activityStatus);
        setExamDuration(updatedExam.examDuration);
        setTag1(updatedExam.tag1);
        setTag2(updatedExam.tag2);
        setTag3(updatedExam.tag3);
        setUploadedImage(updatedExam.image); // Update the image with the new one
      }

      // Show success snackbar
      setSnackbarMessage("Image updated and exam data saved successfully!");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating image or exam data:", error);

      // Show error snackbar
      setSnackbarMessage("Failed to update image or exam data.");
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsUploading(false);
      setNewImage(null);
    }
  };

  // Handle form data changes
  const handleSaveChanges = async () => {
    try {
      const updatedTags = [
        selectedTags[0] || null,
        selectedTags[1] || null,
        selectedTags[2] || null,
      ];

      const updatedExamData = {
        serviceId: examData.serviceId,
        name: name,
        description,
        level,
        price: parseFloat(price),
        activityStatus,
        image: uploadedImage, // Use the uploaded image
        tag1: updatedTags[0],
        tag2: updatedTags[1],
        tag3: updatedTags[2],
        examDuration: parseFloat(examDuration),
      };

      // Send the PUT request to save changes
      await axios.put("/api/v1/exam/edit-exam", updatedExamData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      // Fetch the updated exam data from the backend
      const response = await fetch(`/api/v1/exam/${examData.serviceId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-role": "user",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch updated exam data");
      }

      const updatedData = await response.json();
      if (updatedData.status === "success") {
        const newExamData = updatedData.data;

        // Update each state variable with the new data
        setName(newExamData.name);
        setDescription(newExamData.description);
        setLevel(newExamData.level);
        setPrice(newExamData.price);
        setActivityStatus(newExamData.activityStatus);
        setExamDuration(newExamData.examDuration);
        setUploadedImage(newExamData.image);
        setSelectedTags([newExamData.tag1, newExamData.tag2, newExamData.tag3]);
      }

      // Show success snackbar
      setSnackbarMessage("Exam data updated and fetched successfully!");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating exam data:", error);

      // Show error snackbar
      setSnackbarMessage("Failed to update exam data.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleTagChange = (event) => {
    const { value } = event.target;

    // Ensure selected tags are unique and limited to 3
    if (value.length <= 3) {
      setSelectedTags(value);
    } else {
      setSnackbarMessage("You can only select up to 3 tags.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Image Section */}
      <Grid item xs={12} sm={4}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 1, color: "#378CE7" }}
        >
          <ImageIcon sx={{ marginRight: 1 }} /> Current Image:
        </Typography>
        {examData.image ? (
          <Avatar
            src={`/api/v1/uploads/service-images/${examData.image}`}
            alt="Exam Image"
            sx={{ width: 200, height: 200, marginBottom: 2, boxShadow: 3 }}
          />
        ) : (
          <CircularProgress size={50} sx={{ marginBottom: 2 }} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            display: "block",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={uploadNewImage}
          sx={{
            marginTop: 2,
            width: "100%",
            backgroundColor: "#378CE7",
            "&:hover": {
              backgroundColor: "#67C6E3",
            },
          }}
          disabled={isUploading || !newImage}
        >
          {isUploading ? "Uploading..." : "Upload & Save Image"}
        </Button>
      </Grid>

      {/* Exam Name and Description Section */}
      <Grid item xs={12} sm={8} container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ marginBottom: 1, fontWeight: "bold", color: "#67C6E3" }}
          >
            <TitleIcon sx={{ marginRight: 1 }} />
            Exam Name:
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            placeholder="Enter exam name"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 1, color: "#67C6E3" }}
          >
            <DescriptionIcon sx={{ marginRight: 1 }} /> Exam Description:
          </Typography>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter a brief description"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Editable Exam Data */}
      {[
        {
          label: "Level",
          icon: <GradeIcon sx={{ marginRight: 1, color: "#5356FF" }} />,
          value: level,
          onChange: setLevel,
          options: ["Beginner", "Medium", "Advanced"],
        },
        {
          label: "Price",
          icon: <AttachMoneyIcon sx={{ marginRight: 1, color: "#FFAB00" }} />,
          value: price,
          onChange: setPrice,
          type: "number",
        },
        {
          label: "Activity Status",
          icon: <TimelapseIcon sx={{ marginRight: 1, color: "#F9A825" }} />,
          value: activityStatus,
          onChange: setActivityStatus,
          options: ["Active", "Passive"],
        },
        {
          label: "Exam Duration",
          icon: <TimelapseIcon sx={{ marginRight: 1, color: "#F9A825" }} />,
          value: examDuration,
          onChange: setExamDuration,
          type: "number",
        },
      ].map((field, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Typography
            variant="body1"
            sx={{ marginBottom: 1, fontWeight: "600", color: "#5356FF" }}
          >
            {field.icon} {field.label}:
          </Typography>
          {field.options ? (
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                label={field.label}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              type={field.type || "text"}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              variant="outlined"
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          )}
        </Grid>
      ))}

      {/* Tags Section */}
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ marginBottom: 1, fontWeight: "600", color: "#0288D1" }}
        >
          <LocalOfferIcon sx={{ marginRight: 1 }} /> Tags:
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={selectedTags}
            onChange={handleTagChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflow: "auto",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.category}>
                <Checkbox
                  checked={selectedTags.indexOf(category.category) > -1}
                />
                <ListItemText primary={category.category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Save Changes Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveChanges}
          sx={{
            padding: "12px 24px",
            width: "100%",
            backgroundColor: "#5356FF",
            "&:hover": {
              backgroundColor: "#378CE7",
            },
          }}
        >
          <SaveIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> Save Changes
        </Button>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ExamSettings;
