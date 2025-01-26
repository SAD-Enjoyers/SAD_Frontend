import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Typography from "@mui/material/Typography";

const TicketStatistics = (props) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (props.Data && props.Data.data) {
      const data = [
        {
          name: "Pending",
          value: props.Data.data.pending || 0,
          color: "#fff59d",
        },
        {
          name: "Under Review",
          value: props.Data.data.UnderReview || 0,
          color: "#90caf9",
        },
        {
          name: "Checked",
          value: props.Data.data.Checked || 0,
          color: "#f48fb1",
        },
      ];
      setFormattedData(data);
    }
  }, [props.Data]);

  // اگر داده‌ها وجود نداشته باشند، یک پیام بارگذاری نمایش دهید
  if (!props.Data || !props.Data.data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Loading data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: { xs: "50%", sm: "80%", md: "100%" }, // واکنش‌گرا
        height: "300px",
        paddingTop: 5,
        margin: "0 auto", // برای وسط‌چین کردن
      }}
    >
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Ticket Statistics
      </Typography>
      <ResponsiveContainer width="50%" height="100%">
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
