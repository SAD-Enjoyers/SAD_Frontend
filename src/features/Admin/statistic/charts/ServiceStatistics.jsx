import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

export default function ServiceStatistics(props) {
  const [data, setData] = useState([]); // مقدار پیش‌فرض یک آرایه خالی

  useEffect(() => {
    if (props && props.Data) {
      setData(props.Data);
    }
  }, [props.Data]); // وابستگی به props.Data

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        {props.title}
      </Typography>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} /> // اگر رنگ تعریف نشده باشد، از رنگ پیش‌فرض استفاده کنید
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Box>
  );
}
