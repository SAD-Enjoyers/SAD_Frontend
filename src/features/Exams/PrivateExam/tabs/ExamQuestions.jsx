// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid2,
//   Chip,
//   Rating,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import PeopleIcon from "@mui/icons-material/People";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { motion } from "framer-motion";
// import examQuestionsData from "../data/examQuestions.json"; // Import the JSON data
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useNavigate } from "react-router-dom";
// import { handleAddQuestions } from "./handleAddQuestions";

// function ExamQuestions() {
//   const navigate = useNavigate(); // Use navigation

//   // Add button handler
//   const onAddQuestions = () => handleAddQuestions(navigate);

//   const [questions, setQuestions] = useState(examQuestionsData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [questionToDelete, setQuestionToDelete] = useState(null);
//   const [changesMade, setChangesMade] = useState(false); // Track changes made by drag-and-drop

//   // Snackbar state
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [severity, setSeverity] = useState("success"); // success | error

//   // Error handling for missing data
//   const validQuestions = useMemo(() => {
//     return questions.filter(
//       (question) => question.id && question.name && question.text
//     );
//   }, [questions]);

//   // Pagination (display only 10 questions at a time)
//   const [page, setPage] = useState(0);
//   const itemsPerPage = 100;
//   const paginatedQuestions = validQuestions.slice(
//     page * itemsPerPage,
//     (page + 1) * itemsPerPage
//   );

//   // Handle when a question is dragged and dropped
//   // Updated handleOnDragEnd function
//   const handleOnDragEnd = (result) => {
//     const { destination, source } = result;
//     if (!destination) return;

//     // If the question was dropped in the same place, no changes needed
//     if (destination.index === source.index) return;

//     const reorderedQuestions = Array.from(questions);
//     const [movedQuestion] = reorderedQuestions.splice(source.index, 1);
//     reorderedQuestions.splice(destination.index, 0, movedQuestion);

//     setQuestions(reorderedQuestions);
//     setChangesMade(true); // Mark that a change has been made via drag-and-drop

//     // Provide more granular feedback via snackbar
//     setSnackbarMessage(
//       `Moved "${movedQuestion.name}" from position ${
//         source.index + 1
//       } to position ${destination.index + 1}`
//     );
//     setSeverity("info");
//     setOpenSnackbar(true);
//   };

//   // Handle question deletion with confirmation
//   const handleDeleteQuestion = (id) => {
//     setQuestionToDelete(id);
//     setOpenDialog(true);
//   };

//   const confirmDelete = () => {
//     const updatedQuestions = questions.filter(
//       (question) => question.id !== questionToDelete
//     );
//     setQuestions(updatedQuestions);
//     setOpenDialog(false);
//     setQuestionToDelete(null);
//     // Show snackbar
//     setSnackbarMessage("Question deleted successfully!");
//     setSeverity("success");
//     setOpenSnackbar(true);
//   };

//   const cancelDelete = () => {
//     setOpenDialog(false);
//     setQuestionToDelete(null);
//   };

//   // Confirm all changes
//   const handleConfirmChanges = () => {
//     // Save changes here (e.g., send to backend or update local state)
//     setChangesMade(false); // Reset changes flag
//     setSnackbarMessage("Changes confirmed!");
//     setSeverity("success");
//     setOpenSnackbar(true);
//   };

//   // Reset changes
//   const handleDoNotConfirm = () => {
//     setQuestions(examQuestionsData); // Reset the questions to the original order
//     setChangesMade(false); // Reset changes without confirming
//     setSnackbarMessage("Changes discarded.");
//     setSeverity("error");
//     setOpenSnackbar(true);
//   };

//   // Snackbar close handler
//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       if (changesMade) {
//         event.preventDefault();
//         event.returnValue =
//           "You have unsaved changes. Are you sure you want to leave?";
//       }
//     };

//     // Attach event listener
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [changesMade]);

//   return (
//     <div>
//       {/* Header Section */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "20px 0",
//           borderBottom: "1px solid #ddd", // Optional for separation
//         }}
//       >
//         {/* Title */}
//         <Typography
//           variant="h4"
//           component="h1"
//           sx={{
//             fontWeight: "bold",
//             color: "#333",
//           }}
//         >
//           My Exam Questions
//         </Typography>

//         {/* Add Questions Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={onAddQuestions}
//           sx={{
//             padding: "10px 20px",
//             fontWeight: "bold",
//             fontSize: "1rem",
//           }}
//         >
//           Add Questions
//         </Button>
//       </Box>
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable droppableId="questions" direction="vertical">
//           {(provided) => (
//             <Grid2
//               container
//               spacing={3}
//               sx={{ marginTop: "20px" }}
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {paginatedQuestions.map((question, index) => (
//                 <Draggable
//                   key={question.id}
//                   draggableId={question.id.toString()}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <Grid2
//                       item
//                       xs={12} // Ensures each question takes up the full row
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       sx={{
//                         padding: "20px",
//                         borderRadius: "12px",
//                         backgroundColor: "#fff",
//                         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
//                         transition: "transform 0.3s ease-in-out",
//                         "&:hover": {
//                           transform: "scale(1.03)",
//                         },
//                         width: "100%",
//                         margin: "0 auto",
//                         boxSizing: "border-box",
//                         position: "relative", // Ensures delete button is positioned within the item container
//                         "&:hover .delete-icon": {
//                           opacity: 1, // Make the delete button visible on hover
//                         },
//                         marginBottom: "15px", // Adds space between the cards
//                       }}
//                       aria-labelledby={`question-${question.id}`}
//                     >
//                       {/* Question Title */}
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           color: "#4A90E2",
//                           fontWeight: "bold",
//                           textDecoration: "none",
//                           marginBottom: "10px",
//                           lineHeight: "1.4",
//                           fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
//                         }}
//                         id={`question-${question.id}`}
//                       >
//                         <Link
//                           to={`/question/${question.id}`}
//                           style={{ textDecoration: "none" }}
//                         >
//                           {question.name}
//                         </Link>
//                       </Typography>

//                       {/* Question Description */}
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           marginBottom: "10px",
//                           fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                           lineHeight: "1.5",
//                         }}
//                       >
//                         {question.text.split(" ").slice(0, 15).join(" ")}...
//                       </Typography>

//                       {/* Subjects */}
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexWrap: "wrap",
//                           gap: "8px",
//                           marginBottom: "15px",
//                         }}
//                       >
//                         {question.subjects.map((subject, index) => (
//                           <Chip
//                             key={index}
//                             label={subject}
//                             color="primary"
//                             variant="outlined"
//                             size="small"
//                             sx={{
//                               fontSize: "0.75rem",
//                               fontWeight: "bold",
//                               borderRadius: "4px",
//                               padding: "2px 8px",
//                             }}
//                           />
//                         ))}
//                       </Box>

//                       {/* Score & Writer */}
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           marginTop: "15px",
//                           borderTop: "1px solid #ddd",
//                           paddingTop: "10px",
//                         }}
//                       >
//                         {/* Score */}
//                         <Rating
//                           name="score"
//                           value={question.score}
//                           max={5}
//                           readOnly
//                           sx={{
//                             fontSize: "1.2rem",
//                             "& .MuiRating-iconFilled": { color: "#ffcc00" },
//                           }}
//                         />

//                         {/* Display number of voters */}
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: "#6c757d",
//                             fontWeight: "bold",
//                             fontSize: "0.9rem",
//                             display: "flex",
//                             alignItems: "center",
//                           }}
//                         >
//                           <PeopleIcon
//                             sx={{ marginRight: "5px", fontSize: "1rem" }}
//                           />
//                           {question.numberOfVoters} Voters
//                         </Typography>

//                         {/* Writer Name with Motion Effects */}
//                         <motion.div
//                           whileHover={{ scale: 1.05, color: "#4A90E2" }}
//                           whileTap={{ scale: 0.98 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               color: "#6c757d",
//                               fontWeight: "bold",
//                               fontSize: "0.9rem",
//                             }}
//                           >
//                             <Link
//                               to={`/profile/${question.writerId}`}
//                               style={{
//                                 color: "#6c757d",
//                                 textDecoration: "none",
//                               }}
//                             >
//                               {question.writer}
//                             </Link>
//                           </Typography>
//                         </motion.div>
//                       </Box>

//                       {/* Delete Icon Button */}
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteQuestion(question.id)}
//                         className="delete-icon" // Add a class for styling
//                         sx={{
//                           position: "absolute",
//                           top: "10px",
//                           right: "10px",
//                           zIndex: 1, // Ensure delete button is always on top of the content
//                           opacity: 0, // Hidden by default
//                           transition: "opacity 0.3s ease",
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Grid2>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </Grid2>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* Confirm Changes Buttons with Animation */}
//       {changesMade && (
//         <Box
//           sx={{
//             position: "fixed",
//             bottom: "20px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 10,
//           }}
//         >
//           <Box sx={{ display: "flex", gap: "10px" }}>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={handleConfirmChanges}
//                 sx={{ padding: "10px 20px" }}
//               >
//                 Confirm Changes
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={handleDoNotConfirm}
//                 sx={{ padding: "10px 20px" }}
//               >
//                 Do Not Confirm
//               </Button>
//             </motion.div>
//           </Box>
//         </Box>
//       )}

//       {/* Snackbar for Alerts */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000} // 3 seconds
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       {/* Confirmation Dialog for Deleting */}
//       <Dialog
//         open={openDialog}
//         onClose={cancelDelete}
//         aria-labelledby="delete-dialog-title"
//         aria-describedby="delete-dialog-description"
//       >
//         <DialogTitle id="delete-dialog-title">
//           <Typography variant="h6" component="span" color="textPrimary">
//             <DeleteIcon sx={{ marginRight: 1 }} fontSize="small" />
//             Confirm Deletion
//           </Typography>
//         </DialogTitle>

//         <DialogContent>
//           <Typography
//             id="delete-dialog-description"
//             variant="body1"
//             color="textSecondary"
//           >
//             Are you sure you want to delete this question? This action cannot be
//             undone.
//           </Typography>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={cancelDelete} color="primary" variant="outlined">
//             Cancel
//           </Button>
//           <Button
//             onClick={confirmDelete}
//             color="error"
//             variant="contained"
//             startIcon={<DeleteIcon />}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default ExamQuestions;
import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Grid2,
  Chip,
  Rating,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { handleAddQuestions } from "./handleAddQuestions";

function ExamQuestions(examData) {
  const navigate = useNavigate(); // Use navigation

  // Add button handler
  const onAddQuestions = () => {
    navigate("/QuestionBank", { state: { examData } });
  };

  const [questions, setQuestions] = useState([]); // Assume initially there are no questions
  const [openDialog, setOpenDialog] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [changesMade, setChangesMade] = useState(false); // Track changes made by drag-and-drop

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // success | error

  // Error handling for missing data
  const validQuestions = useMemo(() => {
    return questions.filter(
      (question) => question.id && question.name && question.text
    );
  }, [questions]);

  // Pagination (display only 10 questions at a time)
  const [page, setPage] = useState(0);
  const itemsPerPage = 100;
  const paginatedQuestions = validQuestions.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  // Handle when a question is dragged and dropped
  // Updated handleOnDragEnd function
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    // If the question was dropped in the same place, no changes needed
    if (destination.index === source.index) return;

    const reorderedQuestions = Array.from(questions);
    const [movedQuestion] = reorderedQuestions.splice(source.index, 1);
    reorderedQuestions.splice(destination.index, 0, movedQuestion);

    setQuestions(reorderedQuestions);
    setChangesMade(true); // Mark that a change has been made via drag-and-drop

    // Provide more granular feedback via snackbar
    setSnackbarMessage(
      `Moved "${movedQuestion.name}" from position ${
        source.index + 1
      } to position ${destination.index + 1}`
    );
    setSeverity("info");
    setOpenSnackbar(true);
  };

  // Handle question deletion with confirmation
  const handleDeleteQuestion = (id) => {
    setQuestionToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionToDelete
    );
    setQuestions(updatedQuestions);
    setOpenDialog(false);
    setQuestionToDelete(null);
    // Show snackbar
    setSnackbarMessage("Question deleted successfully!");
    setSeverity("success");
    setOpenSnackbar(true);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setQuestionToDelete(null);
  };

  // Confirm all changes
  const handleConfirmChanges = () => {
    // Save changes here (e.g., send to backend or update local state)
    setChangesMade(false); // Reset changes flag
    setSnackbarMessage("Changes confirmed!");
    setSeverity("success");
    setOpenSnackbar(true);
  };

  // Reset changes
  const handleDoNotConfirm = () => {
    setQuestions([]); // Reset the questions to an empty array (or to original state)
    setChangesMade(false); // Reset changes without confirming
    setSnackbarMessage("Changes discarded.");
    setSeverity("error");
    setOpenSnackbar(true);
  };

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (changesMade) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    // Attach event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [changesMade]);

  return (
    <div>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "1px solid #ddd", // Optional for separation
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          My Exam Questions
        </Typography>

        {/* Add Questions Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={onAddQuestions}
          sx={{
            padding: "10px 20px",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Add Questions
        </Button>
      </Box>

      {/* Conditional rendering: If no questions */}
      {validQuestions.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <Typography variant="h5" color="textSecondary">
            There are no questions for your exam.
          </Typography>
        </Box>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="questions" direction="vertical">
            {(provided) => (
              <Grid2
                container
                spacing={3}
                sx={{ marginTop: "20px" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {paginatedQuestions.map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Grid2
                        item
                        xs={12} // Ensures each question takes up the full row
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          padding: "20px",
                          borderRadius: "12px",
                          backgroundColor: "#fff",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.03)",
                          },
                          width: "100%",
                          margin: "0 auto",
                          boxSizing: "border-box",
                          position: "relative", // Ensures delete button is positioned within the item container
                          "&:hover .delete-icon": {
                            opacity: 1, // Make the delete button visible on hover
                          },
                          marginBottom: "15px", // Adds space between the cards
                        }}
                        aria-labelledby={`question-${question.id}`}
                      >
                        {/* Question Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#4A90E2",
                            fontWeight: "bold",
                            textDecoration: "none",
                            marginBottom: "10px",
                            lineHeight: "1.4",
                            fontSize: {
                              xs: "1rem",
                              sm: "1.2rem",
                              md: "1.4rem",
                            },
                          }}
                          id={`question-${question.id}`}
                        >
                          <Link
                            to={`/question/${question.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {question.name}
                          </Link>
                        </Typography>

                        {/* Question Description */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            marginBottom: "10px",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            lineHeight: "1.5",
                          }}
                        >
                          {question.text.split(" ").slice(0, 15).join(" ")}...
                        </Typography>

                        {/* Subjects */}
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginBottom: "15px",
                          }}
                        >
                          {question.subjects.map((subject, index) => (
                            <Chip
                              key={index}
                              label={subject}
                              color="primary"
                              variant="outlined"
                              size="small"
                              sx={{
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                borderRadius: "4px",
                                padding: "2px 8px",
                              }}
                            />
                          ))}
                        </Box>

                        {/* Score & Writer */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "15px",
                            borderTop: "1px solid #ddd",
                            paddingTop: "10px",
                          }}
                        >
                          {/* Score */}
                          <Rating
                            name="score"
                            value={question.score}
                            max={5}
                            readOnly
                            sx={{
                              fontSize: "1.2rem",
                              "& .MuiRating-iconFilled": { color: "#ffcc00" },
                            }}
                          />

                          {/* Display number of voters */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#6c757d",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <PeopleIcon
                              sx={{ marginRight: "5px", fontSize: "1rem" }}
                            />
                            {question.numberOfVoters} Voters
                          </Typography>

                          {/* Writer Name with Motion Effects */}
                          <motion.div
                            whileHover={{ scale: 1.05, color: "#4A90E2" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#6c757d",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                              }}
                            >
                              <Link
                                to={`/profile/${question.writerId}`}
                                style={{
                                  color: "#6c757d",
                                  textDecoration: "none",
                                }}
                              >
                                {question.writer}
                              </Link>
                            </Typography>
                          </motion.div>
                        </Box>

                        {/* Delete Icon Button */}
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="delete-icon" // Add a class for styling
                          sx={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            zIndex: 1, // Ensure delete button is always on top of the content
                            opacity: 0, // Hidden by default
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid2>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid2>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default ExamQuestions;
