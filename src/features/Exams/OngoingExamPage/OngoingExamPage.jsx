import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ClearIcon from '@mui/icons-material/Clear';

const OngoingExamPage = () => {
  // const { serviceId } = useParams(); // خواندن serviceId از پارامترهای URL
  const location = useLocation();
  const { examData } = location.state || {};
  const serviceId = examData.serviceId;
  console.log("Service ID:", serviceId);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0); 
  // const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [questions, setQuestions] = useState([]); 
  // const [examToken, setExamToken] = useState(""); 
  const [loading, setLoading] = useState(true);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  
  useEffect(() => {
    console.log("useEffect is running...");
    console.log("Service ID:", serviceId);
    const startExam = async () => {
      if (!serviceId) {
        setSnackbarMessage("Service ID is missing. Please try again.");
        setSnackbarOpen(true);
        return;
      }
      
      const token = localStorage.getItem("token"); 
      console.log("Token:", token);
  
      if (!token) {
        setSnackbarMessage("Authentication token is missing. Please login again.");
        setSnackbarOpen(true);
        setTimeout(() => navigate("/login"), 3000);
        return;
      }
    
      // const storedExamToken = localStorage.getItem("examToken");
      // if (storedExamToken) {
      //   setSnackbarMessage("Exam already started!");
      //   setSnackbarOpen(true);
      //   setLoading(false); 
      //   return;
      // }

      setLoading(true); 
      try {
        console.log(`Sending GET request to /api/v1/exam/start-exam/${serviceId}`);
        const response = await fetch(`/api/v1/exam/start-exam/${serviceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
  
    
        console.log("Fetch response:", response);
        if (!response.ok) {
          console.log("Response not OK. Status:", response.status);
          if (response.status === 403) {
            setSnackbarMessage("You are not authorized to access this exam.");
            setSnackbarOpen(true);
            return;
          }
          throw new Error("Failed to fetch exam data.");
        }

        const data = await response.json();
        console.log("Received Data:", data); 
  
        if (data.status === "success") {
          const fetchedQuestions = data.data.questions.map((q) => ({
            questionId: q.questionId,
            questionText: q.questionText,
            options: [q.o1, q.o2, q.o3, q.o4],
          }));
  
          setQuestions(fetchedQuestions); 
          setTimeRemaining(data.data.examDuration * 60); 
          localStorage.setItem("examToken", data.data.examToken);
          console.log("Exam token saved:", data.data.examToken);

          setSnackbarMessage("Exam started successfully!");
          setSnackbarOpen(true);


        } else {
          throw new Error(data.message || "Unexpected response format.");
        }
      } catch (error) {
        console.error("Error starting exam:", error); 
        alert(error.message || "Failed to start the exam."); 
      } finally {
        setLoading(false); 
      }
    };
  
    startExam();
  }, [serviceId, navigate]); 
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  // useEffect(() => {
  //   setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  // }, [currentQuestionIndex, questions.length]);

  const handleOptionChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const handleClearAnswer = () => {
    setSelectedOption({
      ...selectedOption,
      [currentQuestionIndex]: undefined,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    setOpenDialog(true);
  };

  const confirmSubmission = async () => {
    setOpenDialog(false);

    const answers = questions.map((question, index) => ({
      questionId: question.questionId,
      userAnswer: selectedOption[index] || null,
    }));
    console.log(answers)

    try {
       const token = localStorage.getItem("examToken");
      const response = await fetch("/api/v1/exam/end-exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${examToken}`,
        },
        body: JSON.stringify({
          examToken, 
          answers, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit exam.");
      }

      const data = await response.json();

      if (data.status === "success") {
        console.log("Exam submitted successfully:", data);
        alert("Exam finished successfully.");
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Error submitting exam.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return <Typography variant="h6">Loading exam data...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <AppBar position="static" sx={{ width: "100%", maxWidth: "850px", bgcolor: "#3f51b5", borderRadius: "8px", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ongoing Exam
          </Typography>
          <Typography variant="subtitle1">Time Remaining: {formatTime(timeRemaining)}</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Card sx={{ flex: 3, boxShadow: 3, bgcolor: "#ffffff", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].questionText}
              </Typography>
              <RadioGroup value={selectedOption[currentQuestionIndex] || ""} onChange={handleOptionChange}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    label={`${String.fromCharCode(97 + index)}) ${option}`}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
              <Button
                variant="text"
                startIcon={<Clear />}
                onClick={handleClearAnswer}
                sx={{
                  mt: 2,
                  color: "#f44336",
                  "&:hover": { color: "#d32f2f" },
                }}
              >
                Clear Answer
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit your exam?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmSubmission} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
    open={snackbarOpen}
    autoHideDuration={3000} 
    onClose={() => setSnackbarOpen(false)} 
    message={snackbarMessage} 
    anchorOrigin={{ vertical: "top", horizontal: "center" }} 
    sx={{
      "& .MuiSnackbarContent-root": {
        bgcolor: "#4caf50", 
        color: "#fff", 
        fontSize: "16px", 
        fontWeight: "bold", 
      },
    }}
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
