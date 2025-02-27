import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import {
  QRCodePng,
  appStorePng,
  googlePlayPng,
  facebookPng,
  instagramPng,
  twitterPng,
  linkedinPng,
} from "../../assets";
import SendIcon from "@mui/icons-material/Send";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  const labelStyles = {
    fontWeight: 300,
    cursor: "pointer",
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: "3rem",
        paddingLeft: is700 ? "1rem" : "3rem",
        paddingRight: is700 ? "1rem" : "3rem",
        paddingBottom: "1.5rem",
        rowGap: "5rem",
        color: theme.palette.primary.light,
        justifyContent: "space-around",
      }}
    >
      <Stack alignSelf={"center"}>
        <Typography color={"GrayText"}>
          &copy; Mern Store {new Date().getFullYear()}. All right reserved
        </Typography>
      </Stack>
    </Stack>
  );
};
