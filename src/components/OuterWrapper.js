import { Box } from "@mui/material";
import React from "react";
const OuterWrapper = ({ children }) => {
  return <Box sx={{ height: "100vh", width: "100vw" }}>{children}</Box>;
};

export default OuterWrapper;
