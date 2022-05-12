import { Grid } from "@mui/material";
import React from "react";

const Stars = ({ letter }) => {
  return (
    <Grid
      item
      sx={{
        borderBottom: 1,
        marginLeft: "3px",
        marginRight: "3px",
        fontSize: "1.2rem",
        padding: "0px 5px",
      }}
    >
      {letter.isFound ? letter.letter : "*"}
    </Grid>
  );
};

export default Stars;
