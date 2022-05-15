import { Box } from "@mui/material";
import React from "react";
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        // border: "2px white dotted",
        padding: "12px",
        paddingBottom: "40px",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "#060930",
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
