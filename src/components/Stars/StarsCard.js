import React from "react";
import Stars from "./Stars";
import { Grid } from "@mui/material";

const StarsCard = ({ word: item }) => {
  console.log({ wordsfromStarsCard: item });

  return (
    <>
      <Grid
        item
        // xs={6}
        // md={8}
        sx={
          {
            // display: "flex",
            // flexDirection: "row",
            // width: "100%",
            // p: 1,
            // m: 1,
            // alignContent: "center",
            // alignItems: "center",
            // justifyItems: "center",
            // bgcolor: "background.paper",
            // borderRadius: 1,
          }
        }
      >
        {item.letters.map((l) => (
          <Stars key={l.id} letter={l} />
        ))}
      </Grid>
    </>
  );
};

export default StarsCard;
