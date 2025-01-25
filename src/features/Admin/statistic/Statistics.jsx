import React, { useEffect, useState } from "react";
import TagStatisticsChart from "./charts/TagStatisticsChart";
import ActivityStatistics from "./charts/ActivityStatistics";
import ServiceStatistics from "./charts/ServiceStatistics";
import { Grid, Grid2, Typography } from "@mui/material";

export default function Statistics() {
  const [dataTag, setDataTag] = useState("");
  const [dataActivity, setDataActivity] = useState("");
  const [dataService, setDataService] = useState({
    servicetype: [],
    activitystatus: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const tag_usage_statistics_data = () => {
    fetch("/api/v1/admin/tag-usage-statistics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataTag(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tag usage statistics:", err);
        setLoading(false);
      });
  };

  const activity_statistics_data = () => {
    fetch("/api/v1/admin/activity-statistics?days=7", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataActivity(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching activity statistics:", err);
        setLoading(false);
      });
  };

  const service_statistics_data = () => {
    fetch("/api/v1/admin/service-statistics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const servicetype = data.data.serviceType || {};
        const activitystatus = data.data.activityStatus || {};
        const level = data.data.level || {};

        const servicetypeData = [
          {
            name: "Video",
            value: parseInt(servicetype.Video || 0, 10),
            color: "#FF0000",
          },
          {
            name: "Article",
            value: parseInt(servicetype.Article || 0, 10),
            color: "#00FF00",
          },
          {
            name: "Exam",
            value: parseInt(servicetype.Exam || 0, 10),
            color: "#0000FF",
          },
        ];

        const activitystatusData = [
          {
            name: "Passive",
            value: parseInt(activitystatus.Passive || 0, 10),
            color: "#FF0000",
          },
          {
            name: "Active",
            value: parseInt(activitystatus.Active || 0, 10),
            color: "#00FF00",
          },
          {
            name: "Suspended",
            value: parseInt(activitystatus.Suspended || 0, 10),
            color: "#0000FF",
          },
        ];
        const levelData = [
          {
            name: "Advanced",
            value: parseInt(level.Advanced || 0, 10),
            color: "#FF0000",
          },
          {
            name: "Medium",
            value: parseInt(level.Medium || 0, 10),
            color: "#00FF00",
          },
          {
            name: "Beginner",
            value: parseInt(level.Beginner || 0, 10),
            color: "#0000FF",
          },
        ];

        setDataService({
          servicetype: servicetypeData,
          activitystatus: activitystatusData,
          level: levelData,

          total: data.data.total || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching service statistics:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    tag_usage_statistics_data();
    activity_statistics_data();
    service_statistics_data();
  }, []);

  return (
    <>
      {loading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          <TagStatisticsChart Data={dataTag} />
          <ActivityStatistics Data={dataActivity} />
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <ServiceStatistics
                title="Service Type"
                Data={dataService.servicetype}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <ServiceStatistics
                title="Activity Status"
                Data={dataService.activitystatus}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <ServiceStatistics title="Level" Data={dataService.level} />
            </Grid2>
          </Grid2>
        </>
      )}
    </>
  );
}
