import React from "react";
import Stars from "./Stars";
import { Box } from "@mui/material";

const StarsCard = ({ word: item, xs, md }) => {
  return (
    <>
      <Box
        className="lslslslsl"
        sx={{
          display: "flex",
          p: 1,
          m: 1,
          alignContent: "center",
          alignItems: "center",
          justifyItems: "center",
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
