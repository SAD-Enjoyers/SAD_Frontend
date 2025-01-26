import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const QuestionsList = ({
  questions,
  currentQuestionIndex,
  markedQuestions,
  onQuestionClick,
}) => {
  return (
    <Box
      sx={{
        width: "300px",
        bgcolor: "#cae4ec",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 2,
          textAlign: "center",
          bgcolor: "#378ce7",
          color: "#fff",
        }}
      >
        Questions List
      </Typography>
      {questions.map((question, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            cursor: "pointer",
            bgcolor:
              currentQuestionIndex === index
                ? "#bbdefb"
                : markedQuestions.includes(index)
                ? "#ffecb3"
                : "transparent",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
          onClick={() => onQuestionClick(index)}
        >
          <Typography variant="body1" fontWeight="bold">
            {`Q${question.sortNumber}: ${question.questionName}`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const OngoingExamPage = () => {
  const location = useLocation();
  const { examData } = location.state || {};
  const serviceId = examData?.serviceId;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0); // Time in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [examToken, setExamToken] = useState("");
  const navigate = useNavigate();
  // Fetch exam questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/v1/exam/start-exam/${serviceId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setExamToken(data.data.examToken);
        setQuestions(data.data.questions);
        setRemainingTime(data.data.examDuration * 60);
      } catch (error) {
        console.error("Failed to fetch exam data:", error);
      }
    };

    if (serviceId) {
      fetchQuestions();
    }
  }, [serviceId]);

  // Timer Effect
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleAnswerChange = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const handleClearAnswer = () => {
    const updatedAnswers = { ...selectedAnswers };
    delete updatedAnswers[currentQuestionIndex];
    setSelectedAnswers(updatedAnswers);
  };

  const handleMarkForReview = () => {
    setMarkedQuestions((prev) =>
      prev.includes(currentQuestionIndex)
        ? prev.filter((q) => q !== currentQuestionIndex)
        : [...prev, currentQuestionIndex]
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitDialogOpen(false);

    const selectedOptions = Object.entries(selectedAnswers)
      .map(([index, answer]) => {
        const currentQuestion = questions[index];
        if (!currentQuestion) return null;
        return {
          questionId: currentQuestion.questionId,
          userAnswer: Object.keys(currentQuestion)
            .filter((key) => key.startsWith("o"))
            .find((key) => currentQuestion[key] === answer)
            ?.slice(1),
        };
      })
      .filter(Boolean);

    // نمایش خروجی
    console.log(selectedOptions);

    const fetchEndExam = async () => {
      console.log(examToken);
      try {
        const response = await fetch("/api/v1/exam/end-exam", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examToken: examToken,
            answers: selectedOptions,
          }),
        });

        if (!response.ok) {
          toast.error(`HTTP error! status: ${response.status}`);

          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const examData = await response.json();

        toast.success("end exam successful! Redirecting to Profile...");
        setTimeout(
          () =>
            navigate("/publicExam", {
              state: {
                examData: { serviceId },
              },
            }),
          2000
        ); // Redirect after 2 seconds
      } catch (error) {
        toast.error(`Failed to fetch exam data: ${error}`);
      }
    };
    fetchEndExam();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isTimeCritical = remainingTime <= 60;

  if (!questions.length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        mt: "70px",
      }}
    >
      <QuestionsList
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        markedQuestions={markedQuestions}
        onQuestionClick={setCurrentQuestionIndex}
      />

      <Container maxWidth="md">
        <Paper sx={{ p: 4, mb: 2 }}>
          <Typography variant="h6">
            {`Q${currentQuestion.sortNumber}: ${currentQuestion.questionText}`}
          </Typography>
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex] || ""}
            onChange={(e) => {
              handleAnswerChange(e, currentQuestion.questionId);
            }}
          >
            {currentQuestion &&
              [1, 2, 3, 4].map((option) => (
                <FormControlLabel
                  key={option}
                  value={currentQuestion[`o${option}`]}
                  control={<Radio />}
                  label={currentQuestion[`o${option}`]}
                />
              ))}
          </RadioGroup>
          <Box sx={{ mt: 2 }}>
            <Tooltip title="Clear Answer">
              <IconButton onClick={handleClearAnswer}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mark for Review">
              <IconButton onClick={handleMarkForReview}>
                {markedQuestions.includes(currentQuestionIndex) ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography
            variant="h6"
            color={isTimeCritical ? "error" : "textPrimary"}
          >
            <AccessTimeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Time Remaining: {formatTime(remainingTime)}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsSubmitDialogOpen(true)}
          >
            Submit Exam
          </Button>
        </Box>

        <Dialog
          open={isSubmitDialogOpen}
          onClose={() => setIsSubmitDialogOpen(false)}
        >
          <DialogTitle>Submit Exam</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to submit the exam?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSubmitDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert severity="success">Exam submitted successfully!</Alert>
        </Snackbar>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default OngoingExamPage;

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControlLabel,
//   Paper,
//   Radio,
//   RadioGroup,
//   Typography,
//   Snackbar,
//   Alert,
//   Tooltip,
//   IconButton,
// } from '@mui/material';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import ClearIcon from '@mui/icons-material/Clear';
// const mockExamData = {
//   examDuration: 35, // Duration in minutes
//   questions: [
//     {
//       sortNumber: 1,
//       questionId: 19,
//       questionName: 'Linux Basics',
//       questionText: 'Which command is used to list all files in a directory?',
//       options: ['ls', 'pwd', 'mkdir', 'cd'],

//     },
//     {
//       sortNumber: 2,
//       questionId: 22,
//       questionName: 'Network Basics',
//       questionText: 'What is the default port for HTTP?',
//       options: ['80', '443', '21', '8080'],

//     },
//     {
//       sortNumber: 3,
//       questionId: 23,
//       questionName: 'File Permissions',
//       questionText: 'Which command is used to change file permissions?',
//       options: ['chmod', 'chown', 'ls', 'mv'],

//     },
//   ],
// };

// const QuestionsList = ({
//   questions,
//   currentQuestionIndex,
//   markedQuestions,
//   onQuestionClick,
// }) => {
//   return (
//     <Box
//       sx={{
//         width: '300px',
//         bgcolor: '#cae4ec',
//         boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
//         overflowY: 'visible', // اطمینان از اینکه اسکرول غیرضروری ایجاد نشود
//       }}
//     >
//       <Typography
//         variant="h5"
//         sx={{
//           p: 2,
//           textAlign: 'center',
//           bgcolor: '#378ce7',
//           color: '#fff',
//         }}
//       >
//         Questions List
//       </Typography>
//       {questions.map((question, index) => (
//         <Box
//           key={index}
//           sx={{
//             p: 2,
//             cursor: 'pointer',
//             bgcolor:
//               currentQuestionIndex === index
//                 ? '#bbdefb'
//                 : markedQuestions.includes(index)
//                 ? '#ffecb3'
//                 : 'transparent',
//             '&:hover': {
//               backgroundColor: '#e3f2fd',
//             },
//           }}
//           onClick={() => onQuestionClick(index)}
//         >
//           <Typography variant="body1" fontWeight="bold">
//             {`Q${question.sortNumber}: ${question.questionName}`}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const OngoingExamPage = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [remainingTime, setRemainingTime] = useState(
//     mockExamData.examDuration * 60
//   ); // Time in seconds
//   const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [markedQuestions, setMarkedQuestions] = useState([]);

//   // Timer Effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRemainingTime((prev) => Math.max(prev - 1, 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleAnswerChange = (event) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [currentQuestionIndex]: event.target.value,
//     });
//   };

//   const handleClearAnswer = () => {
//     const updatedAnswers = { ...selectedAnswers };
//     delete updatedAnswers[currentQuestionIndex];
//     setSelectedAnswers(updatedAnswers);
//   };

//   const handleMarkForReview = () => {
//     setMarkedQuestions((prev) =>
//       prev.includes(currentQuestionIndex)
//         ? prev.filter((q) => q !== currentQuestionIndex)
//         : [...prev, currentQuestionIndex]
//     );
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < mockExamData.questions.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = () => {
//     setIsSubmitDialogOpen(false);
//     setShowSnackbar(true);
//     console.log('Exam Submitted', selectedAnswers);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const currentQuestion = mockExamData.questions[currentQuestionIndex];
//   const isTimeCritical = remainingTime <= 60; // True if 1 minute or less remains

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         minHeight: '100vh',
//         backgroundColor: '#f4f6f8',
//       }}
//     >
//       {/* Questions List Sidebar */}
//       <QuestionsList
//         questions={mockExamData.questions}
//         currentQuestionIndex={currentQuestionIndex}
//         markedQuestions={markedQuestions}
//         onQuestionClick={setCurrentQuestionIndex}
//       />

//       {/* Main Exam Content */}
//       <Container maxWidth="md">
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 3,
//             backgroundColor: '#cae4ec',
//             boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
//           }}
//         >
// <Box
//   display="flex"
//   justifyContent="space-between"
//   alignItems="center"
//   sx={{
//     p: 2,
//     mb: 5,
//     backgroundColor: '#378ce7', // رنگ پس‌زمینه
//     color: '#fff',
//     borderRadius: 2,
//   }}
// >
//   {/* تایمر */}
//   <Typography
//     variant="h6"
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       color: remainingTime <= 60 ? '#d32f2f' : '#fff',
//       fontWeight: remainingTime <= 60 ? 'bold' : 'normal',
//     }}
//   >
//     <AccessTimeIcon sx={{ mr: 1 }} />
//     {formatTime(remainingTime)}
//   </Typography>

//   {/* نام سوال */}
//   <Typography
//     variant="h6"
//     sx={{
//       fontWeight: 'bold',
//       color: '#fff',
//       textAlign: 'center',
//     }}
//   >
//    {currentQuestion.sortNumber}. {currentQuestion.questionName}
//   </Typography>

//   {/* دکمه Mark for Review */}
//   <Tooltip title="Mark for Review">
//     <IconButton
//       onClick={handleMarkForReview}
//       sx={{
//         color: markedQuestions.includes(currentQuestionIndex)
//           ? '#d32f2f'
//           : '#fff',
//         borderRadius: 2,
//       }}
//     >
//       {markedQuestions.includes(currentQuestionIndex) ? (
//         <BookmarkIcon />
//       ) : (
//         <BookmarkBorderIcon />
//       )}
//     </IconButton>
//   </Tooltip>
// </Box>

//           {/* Question Card */}

//           <Typography
//             variant="body1"
//             sx={{
//               mb: 3,
//               fontSize: '1.25rem', // Increase text size slightly
//               color: 'black',
//             }}
//           >
//             {currentQuestion.questionText}
//           </Typography>

//           {/* Options */}
//           <RadioGroup
//             value={selectedAnswers[currentQuestionIndex] || ''}
//             onChange={handleAnswerChange}
//           >
//             {currentQuestion.options.map((option, index) => (
//               <FormControlLabel
//                 key={index}
//                 value={option}
//                 control={<Radio />}
//                 label={`${index + 1}. ${option}`}
//                 sx={{
//                   mb: 2,
//                   p: 2,
//                   borderRadius: 2,
//                   bgcolor:
//                     selectedAnswers[currentQuestionIndex] === option
//                       ? '#e3f2fd'
//                       : '#ffffff',
//                   '&:hover': {
//                     backgroundColor: '#f0f0f0',
//                   },
//                   transition: 'background-color 0.3s ease',
//                 }}
//               />
//             ))}
//           </RadioGroup>

//           {/* Navigation Buttons */}
//           <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               sx={{
//                 bgcolor: '#378ce7',
//                 '&:hover': {
//                   backgroundColor: '#2c387e',
//                 },
//               }}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               startIcon={<ClearIcon />}
//               onClick={handleClearAnswer}
//               sx={{
//                 mx: 2,
//                 color: '#d32f2f',
//                 borderColor: '#d32f2f',
//                 '&:hover': {
//                   backgroundColor: '#fbe9e7',
//                 },
//               }}
//             >
//               Clear Answer
//             </Button>
//             {currentQuestionIndex < mockExamData.questions.length - 1 ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 sx={{
//                   bgcolor: '##378ce7',
//                   '&:hover': {
//                     backgroundColor: '#2c387e',
//                   },
//                 }}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => setIsSubmitDialogOpen(true)}
//                 sx={{
//                   bgcolor: '#d32f2f',
//                   '&:hover': {
//                     backgroundColor: '#9a0007',
//                   },
//                 }}
//               >
//                 Submit
//               </Button>
//             )}
//           </Box>
//         </Paper>

//         {/* Submit Confirmation Dialog */}
//         <Dialog
//           open={isSubmitDialogOpen}
//           onClose={() => setIsSubmitDialogOpen(false)}
//         >
//           <DialogTitle>Submit Exam</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to submit your answers? Here is a summary:
//             </Typography>
//             <Typography>Completed: {Object.keys(selectedAnswers).length}</Typography>
//             <Typography>Marked for Review: {markedQuestions.length}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => setIsSubmitDialogOpen(false)}
//               variant="outlined"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               color="primary"
//               variant="contained"
//             >
//               Submit
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for Submission Success */}
//         <Snackbar
//           open={showSnackbar}
//           autoHideDuration={4000}
//           onClose={() => setShowSnackbar(false)}
//         >
//           <Alert
//             onClose={() => setShowSnackbar(false)}
//             severity="success"
//             sx={{ width: '100%' }}
//           >
//             Exam submitted successfully!
//           </Alert>
//         </Snackbar>
//       </Container>
//     </Box>
//   );
// };

// export default OngoingExamPage;
