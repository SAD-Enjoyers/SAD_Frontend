import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle"; //
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddCategoryButton() {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setError(false);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName("");
    setError(false);
  };
  const handleSave = () => {
    if (categoryName.trim() === "") {
      setError(true);
      toast.error("Please enter a category name!", {
        autoClose: 3000,
      });
      return;
    }

    fetch(`/api/v1/admin/new-category/?category=${categoryName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Category added successfully!");
        setTimeout(() => {
          handleClose();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add category. Please try again.");
      });
  };

  return (
    <Stack direction="row" spacing={2}>
      {/* دکمه Add Category */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Category
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={error}
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setError(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Stack>
  );
}
