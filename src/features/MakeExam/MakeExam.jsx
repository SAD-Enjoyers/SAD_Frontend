import {
  Avatar,
  Box,
  Container,
  Grid2,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import quiz from "../../assets/images/quiz.png";
import ImageUpload from "./components/ImageUpload";

export default function MakeExam() {
  const [value, setValue] = useState(null);
  const [maxMembers, setMaxMembers] = useState(10);
  const [price, setPrice] = useState(10);
  const [examName, setExamName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
    const formData = {
      examName,
      quizTime: value,
      maxMembers,
      price,
      description,
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

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          border: "2px solid #378CE7",
          mt: "150px",
          mb: "150px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid2 container alignItems="center" justifyContent="center">
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
            <Grid2 size={6}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"flex-end"}
                mb={"20px"}
                sx={{
                  "& .MuiTextField-root": {
                    mb: 4,
                    width: { xs: "50%", sm: "50%", md: "30%" },
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
            <Grid2 size={6}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"left"}
                mb={"20px"}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "12px", sm: "15px", md: "17px" },
                    mb: "7px",
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
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                mb={"20px"}
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: { xs: "50%", sm: "50%", md: "40%" },
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
            <Grid2 size={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
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
                    sx={{ width: { xs: "100px", sm: "150px", md: "180px" } }}
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
                    sx={{ width: { xs: "100px", sm: "150px", md: "180px" } }}
                  />
                </Box>
              </Box>
            </Grid2>
          </Grid2>

          {/* دکمه ارسال */}
          <Box textAlign="center" mt={3} mb={5}>
            <Button type="submit" variant="contained" color="primary">
              Make Exam
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
