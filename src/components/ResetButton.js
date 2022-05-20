import { Button } from "@mui/material";
import React from "react";

const ResetButton = ({ onButtonClick }) => {
  return (
    <>
      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Reset
      </Button>
    </>
  );
};

export default ResetButton;
