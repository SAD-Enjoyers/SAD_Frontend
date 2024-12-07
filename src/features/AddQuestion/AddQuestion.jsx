import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Snackbar,
    Menu,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    CircularProgress,
    Link,
    Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import styled from "./AddQuestion.module.css"
import axios from 'axios'

function AddQuestion() {

    const [question, setQuestion] = useState({
        questionName: "",
        question: ""
    });

    const [options, setOptions] = useState({
        option1: "",
        option2: "",
        option3: "",
        option4: ""
    });

    const [visibility, setvisibility] = useState([]);
    const [tags, setTags] = useState({
        tag1: "",
        tag2: "",
        tag3: "",

    });
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [rightAnswer, setRightAnswer] = useState([]);

    const handleChangeQuestion = (e) => {
        switch (e.target.form[0].id) {
            case "questionName":
                setQuestion((prevState) => ({
                    ...prevState,
                    questionName: e.target.value,
                }));
                break;

            case "question":
                setQuestion((prevState) => ({
                    ...prevState,
                    question: e.target.value,
                }));
                break;
        }
        console.log()
    }

    const handleChangeOptions = (e) => {
        switch (e.target.labels[0].htmlFor) {
            case "option1":
                setOptions((prevState) => ({
                    ...prevState,
                    option1: e.target.value,
                }));
                break;

            case "option2":
                setOptions((prevState) => ({
                    ...prevState,
                    option2: e.target.value,
                }));
                break;

            case "option3":
                setOptions((prevState) => ({
                    ...prevState,
                    option3: e.target.value,
                }));
                break;

            case "option4":
                setOptions((prevState) => ({
                    ...prevState,
                    option4: e.target.value,
                }));
                break;
        }

    }


    const handleChangeVisibility = (event) => {
        setvisibility(event.target.checked);
    };


    const handleChangeRightAnswer = (e) => {
        setRightAnswer(e.target.value);
    };

    const handleChangeTag = (e) => {
        switch (e.target.name) {
            case "tag1":
                setTags((prevState) => ({
                    ...prevState,
                    tag1: e.target.value,
                }));
                break;

            case "tag2":
                setTags((prevState) => ({
                    ...prevState,
                    tag2: e.target.value,
                }));
                break;

            case "tag3":
                setTags((prevState) => ({
                    ...prevState,
                    tag3: e.target.value,
                }));
                break;
        }
        console.log(e)
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

        const token = localStorage.getItem("token");
        //if (!token) {
            fetch("/api/v1/profile/private-data", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "x-role": localStorage.getItem("role"),
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        setIsValid(false);
                    } else {
                        return response.json();
                    }
                })
                .catch((err) => {
                    setIsValid(false);
                });
        //}

        fetchCategories();
    }, []);

    const handleChangeAddButton = () => {
        axios.post("http://localhost:8000/add-Question", {
            question_name: question.questionName,
            question_text: question.question,
            o1: options.option1,
            o2: options.option2,
            o3: options.option3,
            o4: options.option4,
            right_answer: rightAnswer,
            visibility: visibility,
            tag1: tags.tag1,
            tag2: tags.tag2,
            tag3: tags.tag3

        })
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