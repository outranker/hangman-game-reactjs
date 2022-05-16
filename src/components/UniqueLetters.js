import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  width: { sx: "1.2rem", md: "1.4rem", lg: "1.8rem" },
  height: { sx: "1.8rem", md: "2rem", lg: "2.4rem" },
  backgroundColor: "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "green",
}));

const UniqueLettersGrid = ({ uniqueLetters, words }) => {
  if (!uniqueLetters.length) return;
  const flattenLetters = [...words.flatMap((m1) => m1.letters)];
  const enrichedUniqueLetters = uniqueLetters
    .map((ul) => {
      return flattenLetters.find((fl) => fl.letter === ul);
    })
    .filter((s) => s);
  console.log(enrichedUniqueLetters);
  return (
    <Box sx={{ width: "100%", height: "1.6rem" }}>
      <Stack direction="row" spacing={2}>
        {enrichedUniqueLetters.map((eul) => (
          <Item key={eul.id}>{eul.letter}</Item>
        ))}
      </Stack>
    </Box>
  );
};
export default UniqueLettersGrid;
