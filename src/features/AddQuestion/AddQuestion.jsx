import {useState, useEffect} from 'react';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Snackbar,
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
  import axios from "axios"

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

    const handleChangeQuestion = (e) =>{
        switch(e.target.id) {
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
    }
    
    const handleChangeOptions = (e) =>{
        switch(e.target.id) {
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

    
    const handleChangeRightAnswer = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        setRightAnswer(newAlignment);
      };

    const handleChangeTag = (e) => {
        switch(e.target.id) {
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

    const handleChangeAddButton = () => {
        axios.post("/api/v1/questions/add-question",{
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
    console.log(rightAnswer)
    

    return(
        

        
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
                    sx={{ '& .MuiTextField-root': { m: 1, width: '70ch'} }}
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
                    sx={{ '& .MuiTextField-root': { m: 1, width: '70ch'} }}
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
                    sx={{ '& .MuiTextField-root': { m: 1, width: '70ch'}}}
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
                </Box>
                </div>
                <div className={styled.input_box_tag}>
            
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">tag</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="tag1"
                        defaultValue={5}
                        value={tags.tag1}
                        label=""
                        onChange={handleChangeTag}
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

                </div>

                <div className={styled.input_box_tag}>
                    
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">tag</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="tag2"
                        value={tags.tag2}
                        label="tag"
                        onChange={handleChangeTag}
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
                    
                
                </div>

                <div className={styled.input_box_tag}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">tag</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="tag3"
                        value={tags.tag3}
                        label="tag"
                        onChange={handleChangeTag}
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