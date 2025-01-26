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
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { School, SchoolOutlined } from "@mui/icons-material";
import LoadingScreen from "../../../common/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function MakeExam() {
  const [value, setValue] = useState();
  const [maxMembers, setMaxMembers] = useState(10);
  const [price, setPrice] = useState(10);
  const [minScore, setMinScore] = useState(50);
  const [examName, setExamName] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [selectedLevel, setSelectedLevel] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imageNameUrl, setImageNameurl] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [examNameError, setExamNameError] = useState("");
  const [selectedLevelError, setSelectedLevelError] = useState("");
  const [selectedSubjectsError, setSelectedSubjectsError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [minScoreError, setMinScoreError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (!examName.trim()) {
      setExamNameError(" ");
      isValid = false;
    } else {
      setExamNameError("");
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

    if (!value) {
      setTimeError(" ");
      isValid = false;
    } else {
      setTimeError("");
    }
    if (!price) {
      setPriceError(" ");
      isValid = false;
    } else {
      setPriceError("");
    }
    if (!minScore) {
      setMinScoreError(" ");
      isValid = false;
    } else {
      setMinScoreError("");
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
      setSelectedImage(file); // ذخیره فایل برای ارسال به سرور
      setPreviewImage(URL.createObjectURL(file)); // پیش‌نمایش
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
      toast.error("Please select an image first!", {
        autoClose: 3000,
      });
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(selectedImage.type)) {
      toast.error("Only image files (jpeg, png) are allowed!", {
        autoClose: 3000,
      });
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
      submitExam(data.data.fileName);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.", {
        autoClose: 3000,
      });
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

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const submitExam = (image) => {
    var [tag1, tag2, tag3] = [...selectedSubjects];
    const formData = {
      name: examName,
      description,
      level: selectedLevel,
      activityStatus: "Active",
      serviceType: "1",
      price: parseInt(price),
      image: image,
      tag1,
      tag2,
      tag3,
      examDuration: value,
      maxMembers,
      minPassScore: parseInt(minScore),
    };
    console.log(formData);

    fetch("/api/v1/exam/make-exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"), // Add role to headers
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Add Exam successfully");
        setTimeout(() => {
          navigate("/PrivateExam/" + data.data.serviceId);
        }, 4000);
      })
      .catch((error) => {
        console.error("Error:", error);

        toast.error("Failed to create exam. Please try again.", {
          autoClose: 3000,
        });
      });
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  const ImageUpload = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          gap: 2,
          p: 2,
          border: "1px solid #378ce7",
          borderRadius: 2,
          width: 300,
          mt: "30px",
          mb: "20px",
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
    );
  };

  return (
    <>
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
            Add New Exam
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid2
              container
              // alignItems="center"
              // justifyContent="center"
              spacing={3}
            >
              <Grid2 size={12}>
                <TextField
                  label="Exam Name"
                  fullWidth
                  required
                  value={examName}
                  onChange={(e) => {
                    setExamName(e.target.value);
                    if (e.target.value.trim() === "") {
                      setExamNameError("Course name is required.");
                    } else {
                      setExamNameError("");
                    }
                  }}
                  onBlur={() => {
                    if (examName.trim() === "") {
                      setExamNameError("Course name is required.");
                    }
                  }}
                  helperText={examNameError}
                  error={!!examNameError}
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
              </Grid2>
              <Grid2 size={12}>
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
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            All Levels
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Beginner">
                        <Box display="flex" alignItems="center" gap={1}>
                          <School
                            sx={{ fontSize: "1.2rem", color: "#4CAF50" }}
                          />

                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            Beginner
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Medium">
                        <Box display="flex" alignItems="center" gap={1}>
                          <School
                            sx={{ fontSize: "1.2rem", color: "#FF9800" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            Medium
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Advanced">
                        <Box display="flex" alignItems="center" gap={1}>
                          <School
                            sx={{ fontSize: "1.2rem", color: "#F44336" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            Advanced
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mb={"25px"}
                  justifyContent={"center"}
                  alignItems={"center"}

                  // ml={"90px"}
                >
                  <TextField
                    error={!!timeError}
                    label="exam time"
                    // helperText={timeError}

                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setTimeError("");
                    }}
                    type="number"
                    placeholder="exam time(minutes:)"
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
                  ></TextField>
                </Box>
              </Grid2>

              <Grid2 size={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
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
                      sx={{
                        width: "70%",
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
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={
                        minScoreError
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
                      min pass score:
                    </Typography>
                    <TextField
                      error={!!minScoreError}
                      type="number"
                      size="small"
                      value={minScore}
                      onChange={(e) => {
                        setMinScore(e.target.value);
                        setMinScoreError("");
                      }}
                      InputProps={{
                        endAdornment: <Typography>%</Typography>,
                      }}
                      sx={{
                        width: "70%",
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
                    />
                  </Box>
                </Box>
              </Grid2>
              <ImageUpload />
            </Grid2>

            {/* دکمه ارسال */}
            <Box textAlign="center" mt={3} mb={5}>
              <Button type="submit" variant="contained" color="primary">
                Add Exam
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
        <ToastContainer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "100px",
          }}
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </>
  );
}
