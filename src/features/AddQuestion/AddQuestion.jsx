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



        <div className={styled.countainer}>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",

                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: 3,
                    width: '90ch',
                    minWidth: 600

                }}
            >
                <div>

                    <Typography>
                        Question Name:
                    </Typography>

                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '70ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="questionName"
                            onChange={handleChangeQuestion}
                        />
                    </Box>

                </div>

                <div className={styled.input_box_question}>

                    <Typography>
                        Question:
                    </Typography>

                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '70ch' } }}
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

                    <Typography>
                        Options:
                    </Typography>

                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '70ch' } }}
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


                <div className={styled.input_box_solution}>

                    <div className={styled.input_box_right_answer}>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': {} }}
                            noValidate

                            autoComplete="off"
                        >
                            <Typography>
                                Right Answer
                            </Typography>
                            <ToggleButtonGroup
                                color="primary"
                                value={rightAnswer}
                                exclusive
                                onChange={handleChangeRightAnswer}
                                aria-label="Platform"
                            >
                                <ToggleButton value="1">1</ToggleButton>
                                <ToggleButton value="2">2</ToggleButton>
                                <ToggleButton value="3">3</ToggleButton>
                                <ToggleButton value="4">4</ToggleButton>
                            </ToggleButtonGroup>
                            <p>Current Right Answer: {rightAnswer}</p>
                        </Box>
                    </div>
                    <div className={styled.input_box_tag}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">tag</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name='tag1'
                                defaultValue={5}
                                value={tags.tag1}
                                label="tag"
                                onChange={handleChangeTag}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            display: 'flex',
                                            flexDirection: 'column-reverse',  // This will push items to the bottom
                                            maxHeight: 200,
                                            overflowY: 'auto'
                                        },
                                    },
                                }}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.categoryId} value={category.category}>
                                        <ListItemText primary={category.category} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>

                    <div className={styled.input_box_tag}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">tag</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name='tag2'
                                value={tags.tag2}
                                label="tag"
                                onChange={handleChangeTag}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            display: 'flex',
                                            flexDirection: 'column-reverse',  // This will push items to the bottom
                                            maxHeight: 200,
                                            overflowY: 'auto'
                                        },
                                    },
                                }}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.categoryId} value={category.category}>
                                        <ListItemText primary={category.category} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                    </div>

                    <div className={styled.input_box_tag}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">tag</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={tags.tag3}
                                name='tag3'
                                label="tag"
                                onChange={handleChangeTag}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            display: 'flex',
                                            flexDirection: 'column-reverse',  // This will push items to the bottom
                                            maxHeight: 200,
                                            overflowY: 'auto'
                                        },
                                    },
                                }}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.categoryId} value={category.category}>
                                        {category.category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>

                </div>

                <div className={styled.input_box_other}>

                    <FormControlLabel
                        label="Visibility"
                        control={<Checkbox checked={visibility} onChange={handleChangeVisibility} />}
                    />
                </div>

                <div className={styled.input_box_other}>

                    <Button variant="contained" onClick={handleChangeAddButton}>Add question</Button>

                </div>



            </Box>
        </div>

    )
}

export default AddQuestion;