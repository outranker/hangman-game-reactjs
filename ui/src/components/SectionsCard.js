import { Box } from "@mui/material";
import React from "react";

// const customStyles = (cardType) => {
//   switch (cardType) {
//     case "stars":
//       return { width: 100 };
//       break;
//     case "guesses":
//       break;
//     case "resetButton":
//       break;
//     case "defs":
//       break;

//     default:
//       break;
//   }
// };

const SectionsCard = ({ customStyles, children }) => {
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "80%",
          lg: "60%",
        },
        heigh: "100%",
        ...customStyles,
      }}
    >
      {children}
    </Box>
  );
};

export default SectionsCard;
