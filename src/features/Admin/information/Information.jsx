import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../common/Loading";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../Users/PrivateProfile/components/EditProfile";

export default function Information() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    organizationalPosition: "",
  });
  const closeState = () => {
    setOpen(false);
  };
  const fetchData = (tokenCheck) => {
    fetch("/api/v1/admin/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenCheck}`,
        "x-role": localStorage.getItem("AdminRole"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsValid(false);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setData(data);
        setFormData({
          firstName: data.data.expertData.firstName,
          lastName: data.data.expertData.lastName,
          userName: data.data.expertData.userName,
          phoneNumber: data.data.expertData.phoneNumber,
          organizationalPosition: data.data.expertData.organizationalPosition,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("AdminToken");

    if (!token || !data) {
      fetchData(token);
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!isValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <>
      <Grid2 container>
        <Grid2 size={9}>
          <Card
            sx={{
              p: 2,
              mb: 6,
              maxWidth: 600,
              mx: "auto",
              boxShadow: "none",
            }}
          >
            <Grid2
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              direction={{ xs: "column", md: "row" }}
            >
              {/* Profile Image */}
              <Grid2>
                <Box display="flex" justifyContent="center">
                  <Avatar
                    alt="User Name"
                    src={"images/profile.png"}
                    sx={{ width: "150px", height: "150px" }}
                  />
                </Box>
              </Grid2>

              {/* User Information */}
              <CardContent sx={{ textAlign: "justify" }}>
                <Typography variant="h6" component="div">
                  Full Name: {formData.firstName + " " + formData.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Username: {formData.userName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  organizationalPosition: {formData.organizationalPosition}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  phoneNumber: {formData.phoneNumber}
                </Typography>
              </CardContent>
            </Grid2>

            {/* Edit Button */}
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setOpen(true)}
              >
                Edit profile
              </Button>
            </Box>
          </Card>
          {open && <EditProfile closeState={closeState} />}
        </Grid2>
      </Grid2>
    </>
  );
}
