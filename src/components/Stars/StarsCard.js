import React from "react";
import Stars from "./Stars";
import { Box } from "@mui/material";

const StarsCard = ({ word: item }) => {
  console.log({ wordsfromStarsCard: item });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {item.letters.map((l) => (
          <Stars key={l.id} letter={l} />
        ))}
      </Box>
    </>
  );
};

export default StarsCard;
