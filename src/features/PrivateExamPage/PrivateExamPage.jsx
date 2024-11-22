import React, { Them, useTheme } from "react";
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
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Divider,
  Tooltip,
  Chip,
  Rating,
  ListItemAvatar,
  Avatar,
  Grid2,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "./PrivateExamPage.module.css";

function PrivateExamPage() {
  const [submit, setSubmit] = React.useState([0]);
  const [addQuestion, setAddQuestion] = React.useState([0]);

  const handleChangeSubmit = (e) => {
    setSubmit(e.target.value);
  };

  const handleChangeAddQuestion = (e) => {
    setAddQuestion(e.target.value);
  };

  const handleChangeDelete = (e) => {
    console.log(e);
    // console.log(e)
  };

  const questions = [
    {
      id: 1,
      name: "What is React?",
      writer: "Alice",
      score: 4,
      subjects: ["JavaScript", "Frontend"],
      text: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      name: "What is Node.js?",
      writer: "Bob",
      score: 3.5,
      subjects: ["JavaScript", "Backend"],
      text: "Node.js is a runtime environment for JavaScript outside the browser.",
    },
    {
      id: 3,
      name: "What is Machine Learning?",
      writer: "Charlie",
      score: 4.5,
      subjects: ["AI", "Data Science"],
      text: "Machine learning is a subset of AI that uses algorithms to learn.",
    },
    {
      id: 4,
      name: "What is CSS Flexbox?",
      writer: "David",
      score: 4,
      subjects: ["Frontend", "CSS"],
      text: "CSS Flexbox is a layout model that allows you to design complex layouts with ease using flexible containers and items.",
    },
    {
      id: 5,
      name: "What is the difference between SQL and NoSQL?",
      writer: "Eve",
      score: 4.2,
      subjects: ["Backend", "Database"],
      text: "SQL databases are relational, while NoSQL databases are non-relational. SQL is best for structured data, while NoSQL is better for unstructured data.",
    },
    {
      id: 6,
      name: "What are the main types of machine learning?",
      writer: "Frank",
      score: 4.7,
      subjects: ["AI", "Machine Learning"],
      text: "The main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning.",
    },
    {
      id: 7,
      name: "What is Docker?",
      writer: "Grace",
      score: 3.9,
      subjects: ["Backend", "DevOps"],
      text: "Docker is a platform that allows you to automate the deployment of applications inside lightweight containers.",
    },
    {
      id: 8,
      name: "What is the difference between JavaScript and TypeScript?",
      writer: "Henry",
      score: 4.3,
      subjects: ["JavaScript", "Frontend", "AI"],
      text: "TypeScript is a superset of JavaScript that adds static types and other features, making it easier to scale large applications.",
    },
    {
      id: 9,
      name: "What are neural networks?",
      writer: "Ivy",
      score: 4.6,
      subjects: ["AI", "Machine Learning"],
      text: "Neural networks are a type of machine learning algorithm inspired by the structure of the human brain, used to recognize patterns and make decisions.",
    },
    {
      id: 10,
      name: "What is RESTful API?",
      writer: "Jack",
      score: 4.1,
      subjects: ["Backend", "API"],
      text: "A RESTful API is an architectural style for designing networked applications, based on stateless, client-server interactions using HTTP.",
    },
    {
      id: 11,
      name: "What is Git?",
      writer: "Kathy",
      score: 4.5,
      subjects: ["Development", "Version Control"],
      text: "Git is a distributed version control system that allows multiple developers to track changes in source code and collaborate on projects.",
    },
    {
      id: 12,
      name: "What is Blockchain?",
      writer: "Leo",
      score: 4.8,
      subjects: ["Technology", "Blockchain"],
      text: "Blockchain is a decentralized, distributed ledger technology that securely records transactions across many computers.",
    },
    {
      id: 13,
      name: "What are cloud services?",
      writer: "Mia",
      score: 4.2,
      subjects: ["Cloud", "DevOps"],
      text: "Cloud services provide on-demand access to computing resources such as servers, storage, and databases over the internet, typically on a pay-as-you-go basis.",
    },
  ];

  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      mt="100px"
      mb="100px"
    >
      <div className={styled.countainer}>
        <Typography
          variant="h5"
          sx={{
            color: "#5356FF",
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          Questions
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRadius: 2,
            backgroundColor: "white",
            boxShadow: 3,
            width: "100ch",
            minWidth: 600,
          }}
        >
          <Box sx={{ marginTop: "10px" }}>
            {questions.map((question, index) => (
              <Box
                key={question.id}
                sx={{
                  width: "90ch",
                  display: "block",
                  flexDirection: "column",
                  padding: "15px",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  marginBottom: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Typography>{index + 1}</Typography>

                <Divider />

                <Typography
                  variant="h6"
                  sx={{ color: "#5356FF", textDecoration: "none" }}
                >
                  <Link
                    to={`/question/${question.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {question.name}
                  </Link>
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "5px" }}
                >
                  {question.text.split(" ").slice(0, 10).join(" ")}...
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {question.subjects.map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject}
                        sx={{
                          backgroundColor: "#67C6E3",
                          color: "#fff",
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      By {question.writer}
                    </Typography>

                    <Rating value={question.score} readOnly size="small" />

                    <Button variant="contained" onClick={handleChangeDelete}>
                      delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}

            <div className={styled.input_box_solution}>
              <Button variant="contained" onClick={handleChangeAddQuestion}>
                Add question
              </Button>
            </div>
          </Box>
        </Box>
        <div className={styled.input_box_option}>
          <Button variant="contained" onClick={handleChangeSubmit}>
            confirm
          </Button>
        </div>

        {/* <div>
          <Typography
            variant="h5"
            sx={{ color: "#5356FF", textDecoration: "none", marginTop: "60px" }}
          >
            Comments
          </Typography>
        </div>

        <Box sx={{ marginTop: "10px" }}>
          {questions.map((question) => (
            <Box
              key={question.id}
              sx={{
                width: "90ch",
                display: "flex",
                flexDirection: "column",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0)",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={question.writer} />
                </ListItemAvatar>
                <ListItemText
                  primary={question.writer}
                  secondary={
                    <React.Fragment>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Box>
          ))}
        </Box> */}
      </div>
    </Grid2>
  );
}

export default PrivateExamPage;
