import { Button } from "@mui/material";
import React, { useState } from "react";

const ResetButton = ({ onButtonClick }) => {
  // const [border, setBorder] = useState(
  //   "border-solid border border-indigo-500/40"
  // );
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onButtonClick()}
      >
        Reset
      </Button>
    </>
  );
};

export default ResetButton;
