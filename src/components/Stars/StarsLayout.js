import { Box } from "@mui/material";
import React from "react";
import StarsCard from "./StarsCard";
const StarsLayout = ({ words }) => {
  console.log({ wordsfromstarslayout: words });
  return (
    <>
      <Box style={{ width: "100%", height: "100%" }}>
        {words.map((item) => (
          <StarsCard key={item.id} word={item} />
        ))}
      </Box>
    </>
  );
};

export default StarsLayout;
