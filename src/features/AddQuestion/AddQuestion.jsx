import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Grid2,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate hook instead of Navigate component

function AddQuestion() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [question, setQuestion] = useState({
    questionName: "",
    question: "",
  });
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [visibility, setVisibility] = useState(false);
  const [tags, setTags] = useState({ tag1: "" });
  const [categories, setCategories] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success, error
  });

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const handleChangeQuestion = (e) => {
    setQuestion((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeOptions = (e) => {
    setOptions((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeVisibility = (event) => {
    setVisibility(event.target.checked);
  };

  const handleChangeRightAnswer = (event, newAlignment) => {
    if (newAlignment !== null) {
      setRightAnswer(newAlignment);
    }
  };

  const handleChangeTag = (e) => {
    setTags((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/common/categories");
        setCategories(response.data.data.categoryList || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChangeAddButton = async () => {
    var [tag1, tag2, tag3] = [...selectedSubjects];
    try {
      const response = await fetch("/api/v1/questions/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"),
        },
        body: JSON.stringify({
          questionName: question.questionName,
          questionText: question.question,
          o1: options.option1,
          o2: options.option2,
          o3: options.option3,
          o4: options.option4,
          rightAnswer: rightAnswer,
          visibility: visibility,
          tag1,
          tag2,
          tag3,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Response:", data);
      setSnackbar({
        open: true,
        message: "Question added successfully!",
        severity: "success",
      });
      useNavigate("/QuestionBank"); // Redirect after successful form submission
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Grid2 container justifyContent={"center"} alignItems={"center"} mt="100px" mb="100px">
      <Box justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 3,
            borderRadius: 2,
            backgroundColor: "white",
            boxShadow: 3,
            width: "90ch",
            minWidth: 600,
          }}
        >
          {/* Question Name */}
          <Typography>Question Name:</Typography>
          <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }} noValidate autoComplete="off">
            <TextField id="questionName" onChange={handleChangeQuestion} />
          </Box>

          {/* Question Text */}
          <Typography>Question:</Typography>
          <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }} noValidate autoComplete="off">
            <TextField id="question" onChange={handleChangeQuestion} multiline rows={5} />
          </Box>

          {/* Options */}
          <Typography>Options:</Typography>
          <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }} noValidate autoComplete="off">
            <TextField id="option1" label="1" onChange={handleChangeOptions} multiline />
            <TextField id="option2" label="2" onChange={handleChangeOptions} multiline />
            <TextField id="option3" label="3" onChange={handleChangeOptions} multiline />
            <TextField id="option4" label="4" onChange={handleChangeOptions} multiline />
          </Box>

          {/* Right Answer */}
          <Box textAlign={"center"}>
            <Typography mb="20px" mt={"20px"}>
              Right Answer
            </Typography>
            <ToggleButtonGroup color="primary" value={rightAnswer} exclusive onChange={handleChangeRightAnswer} aria-label="Right Answer" sx={{ mb: "40px" }}>
              {["1", "2", "3", "4"].map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                  sx={{
                    backgroundColor: rightAnswer === value ? "#387CE7" : "inherit",
                    color: rightAnswer === value ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor: "#387CE7",
                      color: "white",
                    },
                  }}
                >
                  {value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* Subjects (Moved to the bottom) */}
            <FormControl fullWidth variant="outlined">
              <InputLabel>Subjects</InputLabel>
              <Select
                multiple
                value={selectedSubjects}
                onChange={handleSubjectChange}
                label="Subjects"
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Set the maximum height for the dropdown
                      overflowY: 'auto', // Allow scrolling in the dropdown if it's too long
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",  // Align the dropdown below the select field
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top", // Transform the menu to appear below
                    horizontal: "center",
                  },
                }}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  borderColor: "#E0E0E0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#378CE7",
                  },
                  "& .MuiSelect-icon": {
                    color: "#378CE7",
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.categoryId} value={category.category}>
                    <Checkbox
                      checked={selectedSubjects.includes(category.category)}
                      sx={{
                        color: "#378CE7",
                        "&.Mui-checked": {
                          color: "#378CE7",
                        },
                      }}
                    />
                    <ListItemText primary={category.category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Visibility */}
            <FormControlLabel label="Visibility" control={<Checkbox checked={visibility} onChange={handleChangeVisibility} />} />

            {/* Add Question Button */}
            <Button variant="contained" onClick={handleChangeAddButton} sx={{ marginTop: '10px' }}>Add question</Button>
          </Box>
        </Box>
      </Box>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid2>
  );
}

export default AddQuestion;
