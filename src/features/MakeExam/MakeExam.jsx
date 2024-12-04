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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { School, SchoolOutlined } from "@mui/icons-material";
import LoadingScreen from "../PrivateProfile/components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MakeExam() {
  const [value, setValue] = useState(null);
  const [maxMembers, setMaxMembers] = useState(10);
  const [price, setPrice] = useState(10);
  const [minScore, setMinScore] = useState(50);
  const [examName, setExamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const imageUploadRef = useRef(null);

  useEffect(() => {
    const categoryList = localStorage.getItem("categoryList");

    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        setCategories(response.data.data.categoryList || []);
        setLoading(false);
        localStorage.setItem("categoryList", response.data.data.categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
        navigate("/profile");
      }
    };
    if (!categoryList) {
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
    const formData = {
      examName,
      quizTime: value,
      maxMembers,
      price,
      description,
      selectedSubjects,
      selectedLevel,
      minScore,
    };

    console.log("Form Data Submitted:", formData);
    // در اینجا می‌توانید داده‌ها را به سرور ارسال کنید
    // fetch("/api/some-endpoint", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "x-role": localStorage.getItem("role"), // Add role to headers
    //   },
    //   body: JSON.stringify({ data: "some data" }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    // // Storing the theme
    // localStorage.setItem("theme", "dark");

    // // Retrieving the theme
    // const theme = localStorage.getItem("theme");
    // console.log(theme); // Output: dark
  };
  if (isLoading) {
    return <LoadingScreen />; // نمایش لودینگ
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          border: "2px solid #378CE7",
          mt: "150px",
          mb: "150px",
          bgcolor: "",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid2 container alignItems="center" justifyContent="center">
            <Grid2 size={{ xs: 6, sm: 6, md: 4 }}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={{ xs: "center", md: "flex-end" }}
                mr={{ xs: "7px", sm: "100px", md: "80px" }}
                textAlign={"center"}
                sx={{
                  "& .MuiTextField-root": {
                    mb: 4,
                    width: { xs: "50%", sm: "50%", md: "50%" },
                  },
                }}
              >
                <TextField
                  id="standard-required"
                  label="Exam Name:"
                  variant="standard"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={"20px"}
              >
                <ImageUpload />
              </Box>
            </Grid2>
            <Grid2 size={4}>
              <Box margin={"0 auto"} width={"50%"}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={selectedLevel}
                    onChange={(event) => setSelectedLevel(event.target.value)}
                    label="Level"
                  >
                    FormControl
                    <MenuItem value="">
                      <ListItemIcon>
                        <SchoolOutlined
                          sx={{ fontSize: "1.2rem", color: "#6c757d" }}
                        />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        All Levels
                      </Typography>
                    </MenuItem>
                    <MenuItem value="beginner">
                      <ListItemIcon>
                        <School sx={{ fontSize: "1.2rem", color: "#4CAF50" }} />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        Beginner
                      </Typography>
                    </MenuItem>
                    <MenuItem value="intermediate">
                      <ListItemIcon>
                        <School sx={{ fontSize: "1.2rem", color: "#FF9800" }} />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        Intermediate
                      </Typography>
                    </MenuItem>
                    <MenuItem value="advanced">
                      <ListItemIcon>
                        <School sx={{ fontSize: "1.2rem", color: "#F44336" }} />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        Advanced
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 size={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subjects</InputLabel>

                <Select
                  multiple
                  value={selectedSubjects}
                  onChange={handleSubjectChange}
                  label="Subjects"
                  renderValue={(selected) => selected.join(", ")} // Comma-separated values
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
            <Grid2 size={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                mb={"25px"}
                justifyContent={"center"}
                alignItems={"center"}
                // ml={"90px"}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "12px", sm: "15px", md: "17px" },
                    // mb: "7px",
                    ml: { md: "25px" },
                  }}
                >
                  exam time:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    views={["hours", "minutes"]}
                    ampm={false}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "50%" }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid2>

            <Grid2 size={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }}
                  >
                    max members:
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(e.target.value)}
                    sx={{ width: "100%" }}
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
                    sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }}
                  >
                    Price:
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      endAdornment: <Typography>$</Typography>,
                    }}
                    sx={{ width: "100%" }}
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
                    sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }}
                  >
                    min pass score:
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    InputProps={{
                      endAdornment: <Typography>%</Typography>,
                    }}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                mb={"20px"}
                mt={"20px"}
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: { xs: "70%", sm: "70%", md: "50%" },
                    mt: "20px",
                  },
                }}
              >
                <TextField
                  id="outlined-multiline"
                  label="Desciption"
                  multiline
                  rows={3}
                  placeholder="Enter your text here"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Grid2>
          </Grid2>

          {/* دکمه ارسال */}
          <Box textAlign="center" mt={3} mb={5}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                console.log(imageUploadRef);
              }}
            >
              Make Exam
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

const ImageUpload = React.forwardRef((props, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/v1/educational-service/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // توکن را اینجا اضافه کنید
          "x-role": localStorage.getItem("role"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };
  useImperativeHandle(ref, () => ({
    submitImage,
  }));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        maxWidth: 400,
        mt: "30px",
      }}
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
        <Button variant="outlined" color="error" onClick={handleClear}>
          Remove Image
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={submitImage}
        disabled={!selectedImage}
      >
        Upload Image
      </Button>
    </Box>
  );
});
