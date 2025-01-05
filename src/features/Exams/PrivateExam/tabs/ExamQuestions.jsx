import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Alert, // Import Alert
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const ExamQuestions = (examData) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!examData?.examData?.serviceId) {
        setSnackbarMessage("Invalid service ID. Cannot fetch questions.");
        setSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      try {
        const response = await fetch(
          `/api/v1/exam/questions/${examData.examData.serviceId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${examData.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${responseData.message}`);
        }
        // console.log("Response Data:", JSON.stringify(responseData, null, 2));

        setQuestions(responseData.data || []);
      } catch (error) {
        setSnackbarMessage(error.message || "Failed to fetch questions.");
        setSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchQuestions();
  }, [examData]);

  const validQuestions = useMemo(
    () =>
      questions.filter(
        (q) =>
          q?.Question?.question_id &&
          q?.Question?.question_name &&
          q?.Question?.question_text
      ),
    [questions]
  );

  const paginatedQuestions = validQuestions.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleOnDragEnd = async ({ source, destination }) => {
    if (!destination || source.index === destination.index) return;

    const startIndex = page * itemsPerPage;
    const sourceIndex = startIndex + source.index;
    const destinationIndex = startIndex + destination.index;

    const reordered = Array.from(questions);
    const [removed] = reordered.splice(sourceIndex, 1);
    reordered.splice(destinationIndex, 0, removed);

    const updatedOrders = reordered.map((q, index) => ({
      questionId: q.Question?.question_id,
      sortNumber: index + 1,
    }));

    setQuestions(reordered);

    try {
      const response = await fetch(`/api/v1/exam/reorder-questions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${examData.accessToken}`,
        },
        body: JSON.stringify({
          serviceId: examData.examData.serviceId,
          reorderedQuestions: updatedOrders,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update question order.");
      }

      setSnackbarMessage("Question order updated successfully.");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating question order:", error);
      setSnackbarMessage("Error updating question order. Please try again.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteQuestion = (id) => {
    setQuestionToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const questionToDeleteData = questions.find(
        (question) => question.Question.question_id === questionToDelete
      );

      if (!questionToDeleteData) {
        setSnackbarMessage("Question not found.");
        setSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      const { question_id } = questionToDeleteData.Question;
      const { sort_number } = questionToDeleteData;
      console.log(questionToDeleteData);
      console.log(question_id, sort_number, examData.examData.serviceId);

      const response = await fetch(`/api/v1/exam/delete-question`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${examData.accessToken}`,
        },
        body: JSON.stringify({
          questionId: question_id,
          serviceId: examData.examData.serviceId,
          sortNumber: sort_number,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete question on the backend.");
      }

      setQuestions((prev) =>
        prev.filter((q) => q.Question.question_id !== questionToDelete)
      );
      setSnackbarMessage("Question deleted successfully.");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting question:", error);
      setSnackbarMessage("Bad Network, Please try again later.");
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setOpenDialog(false);
      setQuestionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setQuestionToDelete(null);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const changePage = (newPage) => setPage(newPage);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">My Exam Questions</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/QuestionBank", { state: { examData } })}
        >
          Add Questions
        </Button>
      </Box>

      {validQuestions.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 5 }} variant="h6">
          No questions found.
        </Typography>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="questions" direction="vertical">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {paginatedQuestions.map((question, index) => (
                  <Draggable
                    key={question.Question.question_id.toString()}
                    draggableId={question.Question.question_id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          border: "1px solid #ccc",
                          p: 2,
                          mb: 2,
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6">
                            {question.Question.question_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {question.Question.question_text}
                          </Typography>
                        </Box>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDeleteQuestion(question.Question.question_id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this question?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExamQuestions;
