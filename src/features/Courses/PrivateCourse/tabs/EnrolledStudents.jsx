import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

const EnrolledStudents = ({ students }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enrolled Students
      </Typography>
      {students.length > 0 ? (
        <List>
          {students.map((student) => (
            <ListItem key={student.id}>
              <Avatar alt={student.name} src={student.avatar} sx={{ mr: 2 }} />
              <ListItemText primary={student.name} secondary={student.email} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No students enrolled yet.</Typography>
      )}
    </Box>
  );
};

export default EnrolledStudents;
