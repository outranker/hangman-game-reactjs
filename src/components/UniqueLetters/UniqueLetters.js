import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Shake from "./Shake";

const UniqueLettersGrid = ({ uniqueLetters, lastPressedLetter }) => {
  useEffect(() => {}, [uniqueLetters]);

  if (!uniqueLetters.length) return;

  return (
    <>
      <Box sx={{ width: "100%", height: "1.6rem" }}>
        <Stack direction="row" spacing={2}>
          {uniqueLetters.map((ul) => (
            <Shake
              key={ul.id}
              letterObj={ul}
              lastPressedLetter={lastPressedLetter}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};
export default UniqueLettersGrid;
