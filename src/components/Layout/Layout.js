import { Box } from "@mui/material";
import React from "react";
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        border: "2px white dotted",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
