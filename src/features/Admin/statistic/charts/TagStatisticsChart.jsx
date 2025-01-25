import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Typography, Box } from "@mui/material";

export default function TagStatisticsChart(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [data, setData] = useState([]);

  // تبدیل داده‌ها، مرتب کردن بر اساس مقدار و محدود کردن به 15 مورد اول
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
      setWidth(500);
      setHeight(200);
      calData(7);
    } else if (width >= 600 && width < 960) {
      // sm
      setWidth(500);
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

  // این effect برای زمانی است که داده‌ها بارگذاری می‌شوند
  useEffect(() => {
    updateScreenSize(); // به‌روزرسانی اندازه صفحه با داده‌های موجود
  }, [props.Data]); // فقط وقتی داده‌ها تغییر می‌کنند اجرا می‌شود

  // این effect برای زمانی است که اندازه صفحه تغییر می‌کند
  useEffect(() => {
    const handleResize = () => {
      updateScreenSize(); // به‌روزرسانی هنگام تغییر اندازه صفحه
    };

    window.addEventListener("resize", handleResize); // اضافه کردن event listener
    handleResize(); // فراخوانی بلافاصله برای اندازه‌گیری اولیه

    return () => window.removeEventListener("resize", handleResize); // حذف event listener هنگام unmount
  }, []);

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h4" color="error" gutterBottom>
        Tag Statistics
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 400,
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
