import { Button } from "@mui/material";
import React, { useState } from "react";

const ResetButton = ({ resetStars }) => {
  // const [border, setBorder] = useState(
  //   "border-solid border border-indigo-500/40"
  // );
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => resetStars()}>
        Reset
      </Button>
    </>
  );
};

export default ResetButton;
