import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Typography, Box } from "@mui/material";

export default function TagStatisticsChart(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [data, setData] = useState([]);

  const calData = (slice) => {
    if (props.Data) {
      setData(
        Object.entries(props.Data)
          .map(([key, value]) => ({ name: key, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, slice)
      );
    }
  };

  const updateScreenSize = () => {
    const width = window.innerWidth;
    if (width < 600) {
      // xs
      setWidth(400);
      setHeight(200);
      calData(7);
    } else if (width >= 600 && width < 960) {
      // sm
      setWidth(400);
      setHeight(200);
      calData(7);
    } else if (width >= 960 && width < 1280) {
      // md
      setWidth(500);
      setHeight(200);
      calData(15);
    } else {
      // lg
      setWidth(1000);
      setHeight(400);
      calData(15);
    }
  };

  useEffect(() => {
    updateScreenSize();
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
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" color="#5356FF" gutterBottom>
        Tag Statistics
      </Typography>
      <Box
        sx={{
          width: "100%",
          // height: 400,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 90,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </Box>
    </Box>
  );
}
