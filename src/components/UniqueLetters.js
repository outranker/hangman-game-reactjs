import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  width: { sx: "1.2rem", md: "1.4rem", lg: "1.8rem" },
  height: { sx: "1.8rem", md: "2rem", lg: "2.4rem" },
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

const UniqueLettersGrid = ({ letters, uniqueLetters, words }) => {
  React.useEffect(() => {}, [uniqueLetters]);
  if (!uniqueLetters.length) return;

  return (
    <Box sx={{ width: "100%", height: "1.6rem" }}>
      <Stack direction="row" spacing={2}>
        {uniqueLetters.map((ul) => (
          <Item
            sx={{
              backgroundColor: ul.color === "green" ? "#66bb6a" : "#f44336",
            }}
            key={ul.id}
          >
            {ul.letter}
          </Item>
        ))}
      </Stack>
    </Box>
  );
};
export default UniqueLettersGrid;
