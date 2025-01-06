import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure you have axios installed

// Material-UI components
import {
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
  Snackbar,
  Alert,
} from "@mui/material";

// Material-UI icons
import {
  Image as ImageIcon,
  Description as DescriptionIcon,
  Grade as GradeIcon,
  AttachMoney as AttachMoneyIcon,
  Timelapse as TimelapseIcon,
  Save as SaveIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";

const CourseSettings = ({ courseData, accessToken }) => {
  // Editable course data states
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(courseData.image);
  const [courseName, setCourseName] = useState(courseData.name);
  const [description, setDescription] = useState(courseData.description);
  const [level, setLevel] = useState(courseData.level);
  const [price, setPrice] = useState(courseData.price);
  const [activityStatus, setActivityStatus] = useState(
    courseData.activityStatus
  );
  console.log(courseData);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Editable tags states
  const [tag1, setTag1] = useState(courseData.tag1);
  const [tag2, setTag2] = useState(courseData.tag2);
  const [tag3, setTag3] = useState(courseData.tag3);

  // State to hold selected tags (tags the user selects)
  const [selectedTags, setSelectedTags] = useState([tag1, tag2, tag3]);

  // Initialize selectedTags with existing courseData tags
  useEffect(() => {
    setSelectedTags(
      [courseData.tag1, courseData.tag2, courseData.tag3].filter(Boolean) // Filter out null or undefined tags
    );
  }, [courseData]);

  // List of available tags fetched from the backend
  console.log("Response Data:", JSON.stringify(courseData, null, 2));

  // State to hold categories fetched from the API
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Make API request to fetch categories
        const response = await axios.get("/api/v1/common/categories");
        if (response.data.status === "success") {
          // Update categories state with the fetched data
          setCategories(response.data.data.categoryList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch categories when component mounts
    fetchCategories();
  }, []);

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };
  const uploadNewImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);
    console.log(courseData);

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
      console.log(newImageName);
      setUploadedImage(newImageName);

      const updatedcourseData = {
        serviceId: parseFloat(courseData.serviceId),
        name: courseName,
        description,
        level,
        price: parseFloat(price),
        activityStatus,
        image: newImageName,
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
      };
      console.log(
        "updatedcourseData:",
        JSON.stringify(updatedcourseData, null, 2)
      );
      await axios.put("/api/v1/course/edit-course", updatedcourseData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      // Show success snackbar
      setSnackbarMessage("Image updated and course data saved successfully!");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating image or course data:", error);

      // Show error snackbar
      setSnackbarMessage("Failed to update image or course data.");
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsUploading(false);
      setNewImage(null);
    }
  };

  // Function to handle tag selection changes
  const handleTagChange = (event) => {
    const { value } = event.target;

    // Ensure selected tags are unique and limited to 3
    if (value.length <= 3) {
      setSelectedTags(value); // Update selected tags
    } else {
      alert("You can only select up to 3 tags."); // Alert user if more than 3 tags are selected
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare updated course data, including the selected tags
      const updatedTags = [
        selectedTags[0] || null,
        selectedTags[1] || null,
        selectedTags[2] || null,
      ];

      const updatedCourseData = {
        serviceId: courseData.serviceId,
        name: courseName,
        description,
        level,
        price: parseFloat(price),
        activityStatus,
        image: uploadedImage,
        tag1: updatedTags[0],
        tag2: updatedTags[1],
        tag3: updatedTags[2],
      };

      // Send updated data to the API
      await axios.put("/api/v1/course/edit-course", updatedCourseData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-role": localStorage.getItem("role"),
        },
      });

      // Show success snackbar message
      setSnackbarMessage("course data updated successfully!");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating course data:", error);

      // Show error snackbar message
      setSnackbarMessage("Failed to update course data.");
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
        {courseData.image ? (
          <Avatar
            src={`/api/v1/uploads/service-images/${courseData.image}`}
            alt="Course Image"
            sx={{ width: 200, height: 200, marginBottom: 2, boxShadow: 3 }}
          />
        ) : (
          <CircularProgress size={50} sx={{ marginBottom: 2 }} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "block", marginBottom: "12px", fontSize: "14px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={uploadNewImage}
          sx={{
            marginTop: 2,
            width: "100%",
            backgroundColor: "#378CE7",
            "&:hover": { backgroundColor: "#67C6E3" },
          }}
          disabled={isUploading || !newImage}
        >
          {isUploading ? "Uploading..." : "Upload & Save Image"}
        </Button>
      </Grid>

      {/* Course Name and Description Section */}
      <Grid item xs={12} sm={8} container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ marginBottom: 1, fontWeight: "bold", color: "#67C6E3" }}
          >
            <DescriptionIcon sx={{ marginRight: 1 }} />
            Course Name:
          </Typography>
          <TextField
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            variant="outlined"
            placeholder="Enter course name"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 1, color: "#67C6E3" }}
          >
            <DescriptionIcon sx={{ marginRight: 1 }} /> Course Description:
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
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          />
        </Grid>
      </Grid>

      {/* Editable Course Data */}
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
      ].map((field, index) => (
        <Grid item xs={12} sm={4} key={index}>
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
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
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
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          )}
        </Grid>
      ))}

      {/* Tags Section */}
      <Grid item xs={12} sm={4}>
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
            value={selectedTags} // Current selected tags
            onChange={handleTagChange} // Handle tag change
            renderValue={(selected) => selected.join(", ")} // Show selected tags as comma-separated
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Limit dropdown height
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
            {/* Map through the fetched categories and create menu items for each category */}
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.category}>
                <Checkbox
                  checked={selectedTags.indexOf(category.category) > -1}
                />{" "}
                {/* Checkbox for selection */}
                <ListItemText primary={category.category} />{" "}
                {/* Display category name */}
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
            "&:hover": { backgroundColor: "#378CE7" },
          }}
        >
          <SaveIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> Save Changes
        </Button>
      </Grid>

      {/* Snackbar for Success/Error Messages */}
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

export default CourseSettings;
