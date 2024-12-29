// AboutUs.js
import React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Avatar, Tooltip, Popover
} from "@mui/material";
import dswaminImage from "./assets/dswamin.png";
import { Instagram, GitHub, Email,Phone } from "@mui/icons-material";

const AboutUs = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleEmailClick = (event, email) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmail(email);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEmail("");
  };

  const [showEmail, setShowEmail] = useState(false); // برای نمایش ایمیل

  const handleemailClick = () => {
    setShowEmail(!showEmail); // تغییر وضعیت نمایش ایمیل
  };

  const open = Boolean(anchorEl);

  const teamMembers = [
    {
      name: "Ahmadreza Zabihi",
      role: "Backend Developer",
      description: "Skilled in API development and database management.",
      image: "",
      socials: { github: "https://github.com/ahmadreza", email: "ahmadreza@example.com" },
    
    },
    {
      name: "AmirHossein Kashkouei",
      role: "Backend Developer",
      description: "Expert in server-side development and cloud solutions.",
      image: "",
      socials: { github: "https://github.com/amirhossein", email: "amirhossein@example.com" },
   
    },
    {
      name: "AmirHossein Ghadrdan",
      role: "Frontend Developer",
      description: "Focuses on building interactive user interfaces.",
      image: "",
      socials: { github: "https://github.com/ghadrdan", email: "ghadrdan@example.com" },
    
    },
    {
      name: "Seyed Erfan Masoudi",
      role: "Frontend Developer",
      description: "Proficient in React and Material-UI.",
      image: "",
      socials: { github: "https://github.com/erfanmasoudi", email: "erfanmasoudiba@gmail.com" },
    
    },
    {
      name: "Alireza Karami",
      role: "Frontend Developer",
      description: "Specialized in modern JavaScript frameworks.",
      image: "",
      socials: { github: "https://github.com/alirezakarami", email: "alireza@example.com" },
    
    },
    {
      name: "Mohammadreza Edrisabadi",
      role: "Frontend Developer",
      description: "Experienced in responsive web design.",
      image: "",
      socials: { github: "https://github.com/edrisabadi", email: "edrisabadi@example.com" },
  
    },
  ];
