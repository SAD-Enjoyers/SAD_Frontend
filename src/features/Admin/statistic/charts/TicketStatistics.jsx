import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Typography from "@mui/material/Typography";

const TicketStatistics = (props) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (props.Data) {
      const data = [
        { name: "Pending", value: props.Data.data.pending, color: "#fff59d" },
        { name: "Under Review", value: props.Data.data.UnderReview, color: "#90caf9" },
        { name: "Checked", value: props.Data.data.Checked, color: "#f48fb1" },
      ];
      setFormattedData(data);
    }
  }, [props.Data]); // Add props.Data as a dependency

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop:5,
        justifyContent: "center",
        width: "100%",
        height: "400px",
      }}
    >
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Ticket Statistics
      </Typography>
      <ResponsiveContainer width="80%" height="100%">
        <BarChart data={formattedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TicketStatistics;
