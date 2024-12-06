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
} from "@mui/material";
import styled from "./AddQuestion.module.css";
import axios from "axios";

function AddQuestion() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [question, setQuestion] = useState({
    questionName: "",
    question: "",
  });
  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    if (selected.length <= 3) {
      setSelectedSubjects(selected);
    }
  };

  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [visibility, setvisibility] = useState(false);
  const [tags, setTags] = useState({
    tag1: "",
  });
  const [categories, setCategories] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");

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
    setvisibility(event.target.checked);
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
    console.log({
      question_name: question.questionName,
      question_text: question.question,
      o1: options.option1,
      o2: options.option2,
      o3: options.option3,
      o4: options.option4,
      right_answer: rightAnswer,
      visibility: visibility,
      tag1,
      tag2,
      tag3,
    });
    try {
      const response = await fetch("/api/v1/questions/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // توکن را اینجا اضافه کنید
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
    } catch (error) {
      console.error(error);
      alert(" Please try again.");
    }
  };

  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      mt="100px"
      mb="100px"
    >
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        textAlign={"center"}
      >
        <div className={styled.countainer}>
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
            <div>
              <Typography>Question Name:</Typography>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField id="questionName" onChange={handleChangeQuestion} />
              </Box>
            </div>

            <div className={styled.input_box_question}>
              <Typography>Question:</Typography>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="question"
                  onChange={handleChangeQuestion}
                  multiline
                  rows={5}
                />
              </Box>
            </div>

            <div>
              <Typography>Options:</Typography>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="option1"
                  label="1"
                  onChange={handleChangeOptions}
                  multiline
                />
                <TextField
                  id="option2"
                  label="2"
                  onChange={handleChangeOptions}
                  multiline
                />
                <TextField
                  id="option3"
                  label="3"
                  onChange={handleChangeOptions}
                  multiline
                />
                <TextField
                  id="option4"
                  label="4"
                  onChange={handleChangeOptions}
                  multiline
                />
              </Box>
            </div>

            <div>
              <Typography mb="20px" mt={"20px"}>
                Right Answer
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={rightAnswer}
                exclusive
                onChange={handleChangeRightAnswer}
                aria-label="Right Answer"
                sx={{ mb: "40px" }}
              >
                {["1", "2", "3", "4"].map((value) => (
                  <ToggleButton
                    key={value}
                    value={value}
                    sx={{
                      backgroundColor:
                        rightAnswer === value ? "#387CE7" : "inherit",
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
            </div>

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
                  <MenuItem key={category.categoryId} value={category.category}>
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

            <div className={styled.input_box_other}>
              <FormControlLabel
                label="Visibility"
                control={
                  <Checkbox
                    checked={visibility}
                    onChange={handleChangeVisibility}
                  />
                }
              />
            </div>

            <div className={styled.input_box_other}>
              <Button variant="contained" onClick={handleChangeAddButton}>
                Add question
              </Button>
            </div>
          </Box>
        </div>
      </Box>
    </Grid2>
  );
}

export default AddQuestion;
