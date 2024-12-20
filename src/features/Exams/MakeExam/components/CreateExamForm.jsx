import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";

const CreateExamForm = () => {
  const [examName, setExamName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [value, setValue] = useState("");

  const [examNameError, setExamNameError] = useState("");
  const [selectedLevelError, setSelectedLevelError] = useState("");
  const [selectedSubjectsError, setSelectedSubjectsError] = useState("");
  const [timeError, setTimeError] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (!examName.trim()) {
      setExamNameError("Exam name is required.");
      isValid = false;
    } else {
      setExamNameError("");
    }

    if (!selectedLevel) {
      setSelectedLevelError("Level is required.");
      isValid = false;
    } else {
      setSelectedLevelError("");
    }

    if (selectedSubjects.length === 0) {
      setSelectedSubjectsError("At least one subject must be selected.");
      isValid = false;
    } else {
      setSelectedSubjectsError("");
    }

    if (!value) {
      setTimeError("Exam duration is required.");
      isValid = false;
    } else {
      setTimeError("");
    }

    if (isValid) {
      console.log("Form submitted successfully.");
      // Add form submission logic here
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        id="exam-name"
        label="Exam Name"
        variant="standard"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        error={!!examNameError}
        helperText={examNameError}
      />

      <FormControl
        variant="standard"
        error={!!selectedLevelError}
        style={{ marginTop: 16 }}
      >
        <Select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select Level</em>
          </MenuItem>
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
        </Select>
        <FormHelperText>{selectedLevelError}</FormHelperText>
      </FormControl>

      <TextField
        id="subjects"
        label="Subjects (comma separated)"
        variant="standard"
        value={selectedSubjects.join(", ")}
        onChange={(e) =>
          setSelectedSubjects(e.target.value.split(",").map((s) => s.trim()))
        }
        error={!!selectedSubjectsError}
        helperText={selectedSubjectsError}
        style={{ marginTop: 16 }}
      />

      <TextField
        id="duration"
        label="Duration (minutes)"
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!!timeError}
        helperText={timeError}
        style={{ marginTop: 16 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
      >
        Make Exam
      </Button>
    </form>
  );
};

export default CreateExamForm;
