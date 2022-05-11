import { Box } from "@mui/material";
import React from "react";

const Stars = ({ letter }) => {
  return (
    <Box
      sx={{
        borderBottom: 1,
      }}
    >
      {letter.isFound ? letter.letter : "*"}
    </Box>
  );
};

export default Stars;
