import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const ActivityStatistics = (props) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (props.Data && props.Data.data && props.Data.data.userActivity) {
      const data = props.Data.data.userActivity.map((item) => {
        const date = Object.keys(item)[0];
        const activity = item[date];
        return { date, activity };
      });
      setFormattedData(data);
    }
  }, [props.Data]);

  return (
    <Card
      sx={{ backgroundColor: "transparent", boxShadow: "none", border: "none" }}
    >
      <CardContent>
        <Typography variant="h6" align="center" sx={{ color: "green", mb: 2 }}>
          User Activity
        </Typography>
        <LineChart
          width={500}
          height={300}
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fill: "#000" }}
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis tick={{ fill: "#000" }} />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "none" }} />
          <Line
            type="monotone"
            dataKey="activity"
            stroke="#800080"
            strokeWidth={2}
            dot={{ fill: "#d2691e", r: 5 }}
          />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default ActivityStatistics;
