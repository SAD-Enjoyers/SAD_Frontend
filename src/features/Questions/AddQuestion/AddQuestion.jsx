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
  Grid,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddQuestion() {
  const navigate = useNavigate();

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
    severity: "success",
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
    if (
      !question.questionName ||
      !question.question ||
      !options.option1 ||
      !options.option2 ||
      !options.option3 ||
      !options.option4 ||
      !rightAnswer ||
      selectedSubjects.length === 0
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all the fields.",
        severity: "error",
      });
      return;
    }

    const [tag1, tag2, tag3] = selectedSubjects;
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
      // navigate("/QuestionBank"); // Uncomment for navigation after submission
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 8, mb: 8 }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "70%" },
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Add a Question
        </Typography>

        {/* Question Name */}
        <Typography>Question Name:</Typography>
        <TextField
          id="questionName"
          onChange={handleChangeQuestion}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Question Text */}
        <Typography>Question:</Typography>
        <TextField
          id="question"
          onChange={handleChangeQuestion}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Options */}
        <Typography>Options:</Typography>
        {["option1", "option2", "option3", "option4"].map((id, index) => (
          <TextField
            key={id}
            id={id}
            label={`Option ${index + 1}`}
            onChange={handleChangeOptions}
            fullWidth
            sx={{ mb: 1 }}
          />
        ))}

        {/* Right Answer */}
        <Typography>Right Answer:</Typography>
        <ToggleButtonGroup
          color="primary"
          value={rightAnswer}
          exclusive
          onChange={handleChangeRightAnswer}
          fullWidth
          sx={{ mb: 2 }}
        >
          {["1", "2", "3", "4"].map((value) => (
            <ToggleButton key={value} value={value}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Subjects */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Subjects</InputLabel>
          <Select
            multiple
            value={selectedSubjects}
            onChange={handleSubjectChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.category}>
                <Checkbox
                  checked={selectedSubjects.includes(category.category)}
                />
                <ListItemText primary={category.category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Visibility */}
        <FormControlLabel
          label="Visibility"
          control={
            <Checkbox checked={visibility} onChange={handleChangeVisibility} />
          }
          sx={{ mb: 2 }}
        />

        {/* Add Question Button */}
        <Button
          variant="contained"
          onClick={handleChangeAddButton}
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Question
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default AddQuestion;
