import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [uploadedImage, setUploadedImage] = useState(examData.fileName); // Updated image state
  // Editable exam data states
  const [name, setName] = useState(examData.name);
  const [description, setDescription] = useState(examData.description);
  const [level, setLevel] = useState(examData.level);
  const [price, setPrice] = useState(examData.price);
  const [activityStatus, setActivityStatus] = useState("Active");
  const [examDuration, setExamDuration] = useState(35);

  // Editable tags states
  const [tag1, setTag1] = useState(examData.tag1);
  const [tag2, setTag2] = useState(examData.tag2);
  const [tag3, setTag3] = useState(examData.tag3);

  // Categories fetched from the API
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([tag1, tag2, tag3]);

  // Common styles
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  };

  const buttonStyles = {
    padding: "12px 24px",
    width: "100%",
    backgroundColor: "#5356FF",
    "&:hover": {
      backgroundColor: "#378CE7",
    },
  };

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

  // Upload new image and update exam data
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

      const newImageName = response.data.data.image; // Get the new image name
      // Log the previous and new image names to the console
      console.log("Previous Image:", uploadedImage);
      console.log("New Image:", newImageName);
      setUploadedImage(newImageName);

      // Extract and prepare the updated parameters
      const updatedExamData = {
        serviceId: parseFloat(examData.serviceId),
        name: name,
        description,
        level,
        price: parseFloat(price), // Ensure price is a number
        activityStatus,
        fileName: newImageName,
        tag1,
        tag2,
        tag3,
        examDuration,
      };

      console.log("updatedExamData:", JSON.stringify(updatedExamData, null, 2));
      // Send updated exam data to the backend
      await axios.put("/api/v1/exam/edit-exam", updatedExamData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      alert("Image updated and exam data saved successfully!");
    } catch (error) {
      console.error("Error updating image or exam data:", error);
      alert("Failed to update image or exam data.");
    } finally {
      setIsUploading(false);
      setNewImage(null);
    }
  };

  // Handle form data changes
  const handleSaveChanges = async () => {
    try {
      // Map selected tags to tag1, tag2, tag3, and fill with null for unselected tags
      const updatedTags = [
        selectedTags[0] || null, // First tag or null
        selectedTags[1] || null, // Second tag or null
        selectedTags[2] || null, // Third tag or null
      ];

      const updatedExamData = {
        serviceId: examData.serviceId,
        name: name,
        description,
        level,
        price: parseFloat(price),
        activityStatus,
        // image:examData.image;
        fileName: examData.fileName,
        tag1: updatedTags[0],
        tag2: updatedTags[1],
        tag3: updatedTags[2],
        examDuration: parseFloat(examDuration),
      };
      console.log(examData.fileName);

      console.log("updatedExamData:", JSON.stringify(updatedExamData, null, 2));

      await axios.put("/api/v1/exam/edit-exam", updatedExamData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      alert("Exam data updated successfully!");
      setSelectedTags(selectedTags); // Update state to reflect saved tags
    } catch (error) {
      console.error("Error updating exam data:", error);
      alert("Failed to update exam data.");
    }
  };

  const handleTagChange = (event) => {
    const { value } = event.target;

    // Ensure selected tags are unique and limited to 3
    if (value.length <= 3) {
      setSelectedTags(value);
    } else {
      alert("You can only select up to 3 tags.");
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Exam Name Section */}
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ marginBottom: 1, fontWeight: "600", color: "#5356FF" }}
        >
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

      {/* Image and Description Section */}
      <Grid item xs={12} container spacing={3} alignItems="flex-start">
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 1, color: "#378CE7" }}
          >
            <ImageIcon sx={{ marginRight: 1 }} /> Current Image:
          </Typography>
          {examData.fileName ? (
            <Avatar
              src={`/api/v1/uploads/service-images/${examData.fileName}`}
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

        <Grid item xs={12} sm={8}>
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
          options: ["Active", "Inactive"],
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

      {/* Tags */}
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
              PaperProps: { style: { maxHeight: 200, overflow: "auto" } },
            }}
            sx={inputStyles}
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
          sx={buttonStyles}
        >
          <SaveIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExamSettings;
