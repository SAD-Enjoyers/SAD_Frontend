import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const ActivityStatistics = (props) => {
  const [formattedData, setFormattedData] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [size, setSize] = useState(300);
  const updateScreenSize = () => {
    const width = window.innerWidth;
    if (width < 600) {
      // xs
      setWidth(500);
      setHeight(200);
      setSize(300);
    } else if (width >= 600 && width < 960) {
      // sm
      setWidth(500);
      setHeight(200);
      setSize(300);
    } else if (width >= 960 && width < 1280) {
      // md
      setWidth(500);
      setHeight(200);
      setSize(500);
    } else {
      // lg
      setWidth(1000);
      setHeight(400);
      setSize(500);
    }
  };
  useEffect(() => {
    if (props.Data && props.Data.data && props.Data.data.userActivity) {
      const data = props.Data.data.userActivity.map((item) => {
        const date = Object.keys(item)[0];
        const activity = item[date];
        return { date, activity };
      });
      setFormattedData(data);
      updateScreenSize();
    }
  }, [props.Data]);
  useEffect(() => {
    const handleResize = () => {
      updateScreenSize();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#378CE7", mb: 2 }}
        >
          User Activity
        </Typography>
        <LineChart
          width={size}
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
            stroke="#67C6E3"
            strokeWidth={2}
            dot={{ fill: "#378CE7", r: 5 }}
          />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default ActivityStatistics;
