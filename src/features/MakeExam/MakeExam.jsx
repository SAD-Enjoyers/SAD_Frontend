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
// import LoadingScreen from "../PrivateProfile/components/Loading";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function MakeExam() {
  const [value, setValue] = useState();
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
          alert("Please select an image first!");
          return;
      }

      // بررسی فرمت فایل
      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(selectedImage.type)) {
          alert("Only image files (jpeg, png) are allowed!");
          return;
      }

      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
          // کامنت کردن کد مربوط به ارسال تصویر به بک‌اند
          /*
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
          submitInformation(data.data.image);
          */
          // در اینجا می‌توانید از کدهای شبیه‌سازی شده برای تست استفاده کنید
          const dummyImageData = { data: { image: "dummyImageUrl" } };
          submitInformation(dummyImageData.data.image);
      } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image. Please try again.");
      }
  };

  useEffect(() => {
      setLoading(true);
      const fetchCategories = async () => {
          try {
              // کامنت کردن کد مربوط به فراخوانی دسته‌بندی‌ها از سرور
              /*
              const response = await axios.get("/api/v1/common/categories");
              const fetchedCategories = response.data.data.categoryList || [];
              setCategories(fetchedCategories);
              setLoading(false);
              localStorage.setItem("categoryList", JSON.stringify(fetchedCategories));
              */
              // برای تست، از داده‌های نمونه استفاده کنید
              const dummyCategories = [
                  { categoryId: 1, category: "Math" },
                  { categoryId: 2, category: "Science" },
              ];
              setCategories(dummyCategories);
              setLoading(false);
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

  const submitInformation = (image) => {
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

      // کامنت کردن کد مربوط به ارسال اطلاعات فرم به بک‌اند
      /*
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
          alert("maked exam successfully");
          navigate("/profile");
      })
      .catch((error) => {
          console.error("Error:", error);
      });
      */
      console.log("Form submitted:", formData);
      alert("Form submitted successfully.");
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
                  gap: 2,
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  width: 400,
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
                  <Button
                      variant="outlined"
                      color="error"
                      onClick={handleClear}
                      sx={{ mt: 2 }}
                  >
                      Clear Image
                  </Button>
              )}
          </Box>
      );
  };

  return (
      <Container>
          <form onSubmit={handleFormSubmit}>
              {/* ادامه فرم */}
          </form>
      </Container>
  );
}
